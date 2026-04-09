
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
					console.log( 'debounced')
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
			<h1>Rezepte </h1>

			<input className="form-input" name="searchterm" placeholder="Was ist noch im Kühlschrank?" onKeyUp={checkForceAll} onChange={handleChange} value={searchterm} />
			{searchterm.length > 0 && <span>{recipes.length || 'keine'} Fundstellen</span>}
			<ul>
				{
					recipes.map(recipe => <li key={recipe._id}><RecipeListItem recipe={recipe} /></li>)
				}
			</ul>
		</>

	);
}