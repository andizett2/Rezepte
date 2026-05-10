export type RecipeId = string;

export interface RecipeIngredient {
	amount: number;
	unit: number;
	name: string;
}

export type RecipeStep = string;

export interface Recipe {
	_id?: RecipeId;
	title: string;
	description?: string;
	image_url?: string;
	author?: string;
	steps: RecipeStep[];
	ingredients: RecipeIngredient[];
	dtCreated?: string;
}

export interface RecipeQueryOptions {
	filter?: Record<string, unknown>;
	sort?: Record<string, 1 | -1>;
	limit?: number;
}

export interface RecipeWriteResult {
	acknowledged: boolean;
	insertedId: string;
}

export interface RecipeDeleteResult {
	acknowledged: boolean;
	deletedCount: number;
}

export interface RecipeUpdateResult {
	acknowledged: boolean;
	value: Recipe | null;
}
