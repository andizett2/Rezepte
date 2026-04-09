import { getRecipes } from "@/app/actions";
import { NextResponse } from "next/server";

export async function GET(request) {

	// Filter zur Suche mit Suchbegriff
	const getFilter = (value) => {
		return {
			'$or': [
				{
					'title': {
						'$regex': value,
						'$options': 'i'
					}
				}, {
					'description': {
						'$regex': value,
						'$options': 'i'
					}
				}, {
					'steps': {
						'$elemMatch': {
							'$regex': value,
							'$options': 'i'
						}
					}
				}, {
					'author': {
						'$regex': value,
						'$options': 'i'
					}
				}, {
					'ingredients.name': {
						'$regex': value,
						'$options': 'i'
					}
				}
			]
		}

	}

	try {

		const searchterm = request.headers.get('X-Searchterm');
		const options = {};
		if (searchterm.length) {
			options.filter = getFilter(searchterm);
		}
		const response = await getRecipes(options);
		return NextResponse.json(response);
	} catch (error) {
		return NextResponse.json(
			{ error: 'Fehler beim Abrufen der Rezepte' + error },
			{ status: 500 }
		);
	}
}