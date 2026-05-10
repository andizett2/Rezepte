import { NextResponse } from 'next/server';
import { getRecipes } from '@/app/actions';
import type { RecipeQueryOptions } from '@/types/recipe';

const getFilter = (value: string) => ({
	$or: [
		{
			title: {
				$regex: value,
				$options: 'i',
			},
		},
		{
			description: {
				$regex: value,
				$options: 'i',
			},
		},
		{
			steps: {
				$elemMatch: {
					$regex: value,
					$options: 'i',
				},
			},
		},
		{
			author: {
				$regex: value,
				$options: 'i',
			},
		},
		{
			'ingredients.name': {
				$regex: value,
				$options: 'i',
			},
		},
	],
});

export async function GET(request: Request) {
	try {
		const searchterm = request.headers.get('X-Searchterm') ?? '';
		const options: RecipeQueryOptions = {};

		if (searchterm.length) {
			options.filter = getFilter(searchterm);
		}

		const response = await getRecipes(options);
		return NextResponse.json(response);
	} catch (error) {
		return NextResponse.json({ error: `Fehler beim Abrufen der Rezepte${String(error)}` }, { status: 500 });
	}
}
