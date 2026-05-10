'use server';

import { join } from 'node:path';
import { readFile } from 'node:fs/promises';
import { ObjectId } from 'mongodb';
import { put } from '@vercel/blob';
import { getDb } from '@/lib/mongodb';
import { hashPassword, comparePasswords } from '@/lib/auth';
import type {
	AppUser,
	UserWriteResult,
	UserDeleteResult,
} from '@/types/user';
import type {
	Recipe,
	RecipeQueryOptions,
	RecipeWriteResult,
	RecipeDeleteResult,
	RecipeUpdateResult,
} from '@/types/recipe';

type MongoUser = Omit<AppUser, '_id'> & { _id?: ObjectId };
type MongoRecipe = Omit<Recipe, '_id'> & { _id?: ObjectId };

const mapMongoUser = (user: MongoUser): AppUser => ({
	...user,
	_id: user._id?.toString(),
});

const mapMongoRecipe = (recipe: MongoRecipe): Recipe => ({
	...recipe,
	_id: recipe._id?.toString(),
});

const normalizeAppUser = (value: unknown): AppUser => {
	const record = value as Record<string, unknown>;

	return {
		_id: typeof record._id === 'string' ? record._id : undefined,
		email: typeof record.email === 'string' ? record.email : '',
		firstname: typeof record.firstname === 'string' ? record.firstname : '',
		lastname: typeof record.lastname === 'string' ? record.lastname : undefined,
		password: typeof record.password === 'string' ? record.password : undefined,
		isadmin: typeof record.isadmin === 'boolean' ? record.isadmin : undefined,
		slogan: typeof record.slogan === 'string' ? record.slogan : undefined,
		created_at: typeof record.created_at === 'string' ? record.created_at : undefined,
	};
};

/**
 * Rezeptbild hochladen.
 */
export async function uploadRecipeImage(name: string, file: Blob): Promise<string> {
	const { url } = await put(`recipes/${name}`, file, {
		access: 'public',
		addRandomSuffix: true,
	});
	return url;
}

/*
 *
 *  USER ACTIONS
 *
 */

/**
 * GET user by email address.
 */
export async function getUser(email: string): Promise<AppUser | null> {
	try {
		const db = await getDb();
		const user = await db.collection<MongoUser>('users').findOne({ email });

		if (!user) {
			return null;
		}
		return mapMongoUser(user);
	} catch (error) {
		console.log('Failed to fetch user:', error);
	}

	return null;
}

/**
 * GET all users sorted by firstname.
 */
export async function getUsers(): Promise<AppUser[]> {
	try {
		const db = await getDb();
		const users = await db.collection<MongoUser>('users').find().sort({ firstname: 1 }).toArray();
		return users.map((user) => mapMongoUser(user));
	} catch (error) {
		console.log('Failed to fetch users', error);
		return [];
	}
}

/**
 * Creates a new user.
 */
export async function addUser(user: AppUser): Promise<UserWriteResult> {
	const hashedPassword = await hashPassword(user.password ?? '');
	const { _id: _unusedUserId, ...userWithoutId } = user;
	const userToInsert = {
		...userWithoutId,
		password: hashedPassword,
	};

	const db = await getDb();
	const result = await db.collection<MongoUser>('users').insertOne(userToInsert);
	return {
		acknowledged: result.acknowledged,
		insertedId: result.insertedId.toString(),
	};
}

/**
 * Delete a user by the email.
 */
export async function deleteUser(email: string): Promise<UserDeleteResult> {
	const db = await getDb();
	const deletedDocument = await db.collection<MongoUser>('users').findOneAndDelete({ email });

	return {
		acknowledged: deletedDocument !== null,
		deletedCount: deletedDocument ? 1 : 0,
		deletedDocument: deletedDocument
			? mapMongoUser(deletedDocument)
			: null,
	};
}

/**
 * Updates a user by email.
 */
export async function updateUser(user: Pick<AppUser, 'email' | 'firstname' | 'lastname' | 'slogan'>): Promise<void> {
	const db = await getDb();
	await db.collection<MongoUser>('users').findOneAndUpdate(
		{ email: user.email },
		{
			$set: {
				firstname: user.firstname,
				lastname: user.lastname,
				slogan: user.slogan,
			},
		},
	);
}

/**
 * Prüft Autorisierung anhand Passwort.
 */
export async function userIsAuthorized(user: AppUser, password: string): Promise<boolean> {
	return comparePasswords(password, user.password ?? '');
}

/**
 * Die User-Objekte werden aus einem JSON-File in die DB geschrieben.
 */
export async function setupUsers(filename: string): Promise<AppUser[]> {
	const data = await readJSONFile(filename);
	await Promise.all(data.map((user) => deleteUser(user.email)));
	await Promise.all(data.map((user) => addUser(user)));
	return data;
}

/*
 *
 *  RECIPE ACTIONS
 *
 */

/**
 * GET recipe.
 */
export async function getRecipe(id: string): Promise<Recipe | null> {
	try {
		const db = await getDb();
		const recipe = await db.collection<MongoRecipe>('recipes').findOne({ _id: new ObjectId(id) });

		if (!recipe) {
			return null;
		}
		return mapMongoRecipe(recipe);
	} catch (error) {
		console.log(error);
	}

	return null;
}

/**
 * Update a recipe by its _id.
 */
export async function updateRecipe(recipe: Recipe): Promise<RecipeUpdateResult> {
	const db = await getDb();
	const { _id, ...updateFields } = recipe;

	if (!_id) {
		throw new Error('Recipe _id is required for update');
	}

	const updatedValue = await db.collection<MongoRecipe>('recipes').findOneAndUpdate(
		{ _id: new ObjectId(_id) },
		{ $set: updateFields },
		{ returnDocument: 'after' },
	);

	return {
		acknowledged: updatedValue !== null,
		value: updatedValue ? mapMongoRecipe(updatedValue) : null,
	};
}

/**
 * GET all recipes.
 */
export async function getRecipes(options: RecipeQueryOptions = {}): Promise<Recipe[]> {
	const filter = options.filter || {};
	const defaultSort: NonNullable<RecipeQueryOptions['sort']> = { dtCreated: -1 };
	const sort = options.sort || defaultSort;
	const limit = options.limit || 100;

	try {
		const db = await getDb();
		const recipes = await db.collection<MongoRecipe>('recipes').find(filter, { sort, limit }).toArray();
		return recipes.map((recipe) => mapMongoRecipe(recipe));
	} catch (error) {
		console.log(error);
		return [];
	}
}

/**
 * Creates a new recipe.
 */
export async function addRecipe(recipe: Recipe): Promise<RecipeWriteResult> {
	const db = await getDb();
	const { _id: _unusedRecipeId, ...recipeToInsert } = recipe;
	const result = await db.collection<MongoRecipe>('recipes').insertOne(recipeToInsert);
	return {
		acknowledged: result.acknowledged,
		insertedId: result.insertedId.toString(),
	};
}

/**
 * Delete a recipe by id.
 */
export async function deleteRecipe(id: string): Promise<RecipeDeleteResult> {
	const db = await getDb();
	const result = await db.collection('recipes').deleteOne({
		_id: new ObjectId(id),
	});

	return {
		acknowledged: result.acknowledged,
		deletedCount: result.deletedCount,
	};
}

/*
 * HELPERS
 */

/**
 * Einlesen eines JSON-Files aus dem public-Ordner im Filesystem.
 */
async function readJSONFile(filename: string): Promise<AppUser[]> {
	const filepath = join(process.cwd(), 'public', filename);
	const file = await readFile(filepath, 'utf-8');
	const parsed = JSON.parse(file);
	return Array.isArray(parsed) ? parsed.map((entry) => normalizeAppUser(entry)) : [];
}
