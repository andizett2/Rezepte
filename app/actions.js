"use server";

// MongoDB
import { getDb, convertMongoDoc } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

import { join } from 'node:path';
import { readFile } from 'node:fs/promises';
import { hashPassword, comparePasswords } from '@/lib/auth';

import { put } from "@vercel/blob";

/**
 * Rezeptbild hochladen
 * @param {string} name enthält die ID des Rezepts
 * @param {*} file binäre Daten
 */
export async function uploadRecipeImage( name, file ) {
const { url } = await put(
		`recipes/${name}`,
		file,
		{
			access: 'public',
			addRandomSuffix: true
		});
	return url;
}

/*
 *
 *
 *  USER ACTIONS
 *
 *
 */

/**
 * GET user by email address
 * @param {string} email
 * @return {*}
 */
export async function getUser(email) {
	try {
		const db = await getDb();
		const user = await db
			.collection("users")
			.findOne(
				{ email: email }
			);

		if (user) {
			// stringify the _id
			user._id = user._id.toString();
		}
		return user;

	} catch (error) {
		console.log("Failed to fetch user:", error);
	}
	return null;
}

/**
 * GET all users sorted by firstname
 * @returns {*}
 */
export async function getUsers() {
	try {
		const db = await getDb();
		const users = await db.collection("users")
			.find()
			.sort({ firstname: 1 })
			.toArray()
		return users.map(user => ({ ...user, _id: user._id.toString() }));
	} catch (e) {
		console.log("Failed to fetch users", e);
	}
}


/**
 * Creates a new user
 * @param {object} user
 * @returns {*}
 */
export async function addUser(user) {
	// password stored as a hash
	const hashedPassword = await hashPassword(user.password);
	user.password = hashedPassword;
	const db = await getDb();
	const result = await db.collection("users").insertOne(user);
	return {
		acknowledged: result.acknowledged,
		insertedId: result.insertedId.toString()
	};
}

/**
 * Delete a user by the email
 * @param {string} email
 * @returns {*}
 */
export async function deleteUser(email) {
	const db = await getDb();
	const result = await db
		.collection("users")
		.findOneAndDelete({ email: email });
	return {
		acknowledged: result.ok === 1,
		deletedCount: result.lastErrorObject?.n || 0,
		deletedDocument: result.value ? { ...result.value, _id: result.value._id.toString() } : null
	};
}

/**
 * Updates a User by the email
 * @param {{email: string, firstname?: string, lastname?: string, slogan?: string}} user
 * @returns {*}
 */
export async function updateUser(user) {
	const db = await getDb();
	await db
		.collection("users")
		.findOneAndUpdate(
			{ email: user.email },
			{
				$set: {
					firstname: user.firstname,
					lastname: user.lastname,
					slogan: user.slogan
				}
			},
		);
}

/**
 * Prüft Autorisierung anhand Passwort
 * @param {*} plainPassword
 * @param {*} hashedPassword
 * @returns
 */
export async function userIsAuthorized(user, password) {
	const isAuthorized = await comparePasswords(password, user.password);
	return isAuthorized;
}

/**
 * Die User-Objekte werden aus einem JSON-File in die DB geschrieben
 * @param {string} filename
 * @returns {*}
 */
export async function setupUsers(filename) {
	const data = await readJSONFile(filename);
	const deleted = data.map(user => deleteUser(user.email));
	const results = data.map(user => addUser(user));
	return data;
}

/*
 *
 *
 *  RECEIP ACTIONS
 *
 *
 */

/**
 * GET recipe
 * @returns
 */
export async function getRecipe(id) {
	try {
		const db = await getDb();
		const recipe = await db
			.collection("recipes")
			.findOne(
				{ _id: new ObjectId(id) }
			);
		return recipe ? { ...recipe, _id: recipe._id.toString() } : null;
	} catch (error) {
		console.log(error)
	}
}

/**
 * GET all recipes
 * @param {object}
 * @returns {*}
 */
export async function getRecipes(options={ filter:{}, sort:{'dtCreated': -1}, limit:100}) {
	const {filter, sort, limit} = options;

	try {
		const db = await getDb();
		const recipes = await db.collection("recipes")
			.find(filter, { sort, limit })
			.toArray();
		return recipes.map(recipe => ({ ...recipe, _id: recipe._id.toString() }));
	} catch (e) {
		console.log(e);
	}
}

/**
 * Creates a new recipe
 * @param {object} recipe
 */
export async function addRecipe(recipe) {
	const db = await getDb();
	const result = await db.collection("recipes").insertOne(recipe);
	return {
		acknowledged: result.acknowledged,
		insertedId: result.insertedId.toString()
	};
}

/**
 * Update a recipe by its _id
 * @param {object} recipe
 * @returns {*}
 */
export async function updateRecipe(recipe) {
	const db = await getDb();
	const { _id, ...updateFields } = recipe;
	if (!_id) {
		throw new Error('Recipe _id is required for update');
	}
	const result = await db.collection("recipes").findOneAndUpdate(
		{ _id: new ObjectId(_id) },
		{ $set: updateFields },
		{ returnDocument: 'after' }
	);
	return {
		acknowledged: result.ok === 1,
		value: result.value ? { ...result.value, _id: result.value._id.toString() } : null
	};
}

/**
 * Delete a recipe by Id
 * @param {string} id
 * @returns {*}
 */
export async function deleteRecipe(id) {
	const db = await getDb();
	const result = await db.collection("recipes").deleteOne({
		_id: new ObjectId(id),
	});
	return {
		acknowledged: result.acknowledged,
		deletedCount: result.deletedCount
	};
}

/*
 *
 * HELPERS
 *
 */

/**
 * Einlesen eines JSON-Files aus dem public-Ordner im Filesystem
 * @param filename
 */
async function readJSONFile(filename) {
	const filepath = join(process.cwd(), 'public', filename);
	const file = await readFile(filepath)
	const data = JSON.parse(file);

	return data
};