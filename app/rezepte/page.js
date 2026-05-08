
'use client';
// Eingabeformular für neue Rezepte
import Link from "next/link";
import { useState, useEffect } from "react";
import RecipeListItem from "@/components/RecipeListItem";

export default function Rezepte() {

	const [recipes, setRecipes] = useState([]);
	const [searchterm, setSearchterm] = useState('');
	const [debouncedSearchterm, setDebouncedSearchterm] = useState('');

	async function fetchRecipesWithHeaders() {
		try {
			const response = await fetch('/api/recipes?nochache=' + Math.random().toString(), {
				method: 'GET',
				headers: {
					'X-Searchterm': debouncedSearchterm,
					'Content-Type': 'application/json',
				},
			});
			if (!response.ok) throw new Error('Fehler beim Laden');
			return await response.json();
		} catch (error) {
			console.error('Fehler:', error);
			return [];
		}
	}

	// Debouncing
	useEffect(() => {
		const timerId = setTimeout(() => {
			setDebouncedSearchterm(searchterm)
		}, 400);
		return () => clearTimeout(timerId);
	}, [searchterm]);

	// Suchen
	useEffect(() => {
		if (debouncedSearchterm) {
			const data = fetchRecipesWithHeaders()
				.then(result => {
					setRecipes(result);
					console.log('debounced')
				});
		}
	}, [debouncedSearchterm]);

	const handleChange = async (e) => {
		setSearchterm(e.target.value);

	}

	// initiale Suche
	useEffect(() => {
		fetchRecipesWithHeaders()
			.then(result => {
				setRecipes(result);
			});
	}, [])

	// Beim debouncing klappt es nicht immer beim leeren des input Feldes
	function checkForceAll(e) {
		if (e.target.value == '') {
			fetchRecipesWithHeaders()
				.then(result => {
					setRecipes(result);
					console.log(e.target.value, 'gesetzt')
				});
		}
	}

	return (
		<>
			<div className="container mx-auto px-4 py-8 max-w-4xl">
				<h1 className="text-3xl font-bold mb-6">Rezepte </h1>

				<div className="relative mb-4">
					<span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400" aria-hidden="true">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
							<circle cx="11" cy="11" r="7" />
							<line x1="16.65" y1="16.65" x2="21" y2="21" />
						</svg>
					</span>
					<input
						className="form-input w-full rounded-(--border-radius-sm) border border-gray-300 py-2 pr-4 pl-10 focus:border-orange-400 focus:ring-orange-400 focus:ring-opacity-50 focus:outline-none focus:ring-1 transition"
						name="searchterm"
						placeholder="Was ist noch im Kühlschrank?"
						onKeyUp={checkForceAll}
						onChange={handleChange}
						value={searchterm}
					/>
				</div>
				{searchterm.length > 0 && <span>{recipes.length || 'keine'} Fundstellen</span>}
				<ul>
					{
						recipes.map(recipe => <li key={recipe._id}><RecipeListItem recipe={recipe} /></li>)
					}
				</ul>
			</div>
		</>

	);
}