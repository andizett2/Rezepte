'use client';

import { useCallback, useEffect, useState, type ChangeEvent, type KeyboardEvent } from 'react';
import RecipeListItem from '@/components/RecipeListItem';
import type { Recipe } from '@/types/recipe';

const isRecipe = (value: unknown): value is Recipe => {
	if (!value || typeof value !== 'object') {
		return false;
	}

	const record = value as Record<string, unknown>;
	return typeof record.title === 'string' && Array.isArray(record.steps) && Array.isArray(record.ingredients);
};

export default function Rezepte() {
	const [recipes, setRecipes] = useState<Recipe[]>([]);
	const [searchterm, setSearchterm] = useState<string>('');
	const [debouncedSearchterm, setDebouncedSearchterm] = useState<string>('');

	const fetchRecipesWithHeaders = useCallback(async (): Promise<Recipe[]> => {
		try {
			const response = await fetch(`/api/recipes?nochache=${Math.random().toString()}`, {
				method: 'GET',
				headers: {
					'X-Searchterm': debouncedSearchterm,
					'Content-Type': 'application/json',
				},
			});

			if (!response.ok) {
				throw new Error('Fehler beim Laden');
			}

			const data = await response.json();
			return Array.isArray(data) ? data.filter(isRecipe) : [];
		} catch (error) {
			console.error('Fehler:', error);
			return [];
		}
	}, [debouncedSearchterm]);

	// Debouncing
	useEffect(() => {
		const timerId = setTimeout(() => {
			setDebouncedSearchterm(searchterm);
		}, 400);
		return () => clearTimeout(timerId);
	}, [searchterm]);

	// Suchen
	useEffect(() => {
		if (debouncedSearchterm) {
			fetchRecipesWithHeaders().then((result) => {
				setRecipes(result);
			});
		}
	}, [debouncedSearchterm, fetchRecipesWithHeaders]);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchterm(e.target.value);
	};

	// Initiale Suche
	useEffect(() => {
		fetchRecipesWithHeaders().then((result) => {
			setRecipes(result);
		});
	}, [fetchRecipesWithHeaders]);

	// Beim Debouncing klappt es nicht immer beim Leeren des Input-Feldes.
	const checkForceAll = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.currentTarget.value === '') {
			fetchRecipesWithHeaders().then((result) => {
				setRecipes(result);
			});
		}
	};

	return (
		<>
			<div className="container mx-auto max-w-4xl px-4 py-8">
				<h1 className="mb-6 text-3xl font-bold">Rezepte </h1>

				<div className="relative mb-4">
					<span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400" aria-hidden="true">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
							<circle cx="11" cy="11" r="7" />
							<line x1="16.65" y1="16.65" x2="21" y2="21" />
						</svg>
					</span>
					<input
						className="form-input w-full rounded-(--border-radius-sm) border border-gray-300 py-2 pr-4 pl-10 transition focus:border-orange-400 focus:ring-1 focus:ring-orange-400 focus:ring-opacity-50 focus:outline-none"
						name="searchterm"
						placeholder="Was ist noch im Kühlschrank?"
						onKeyUp={checkForceAll}
						onChange={handleChange}
						value={searchterm}
					/>
				</div>
				{searchterm.length > 0 && <span>{recipes.length || 'keine'} Fundstellen</span>}
				<ul>
					{recipes.map((recipe) => (
						<li key={recipe._id}>
							<RecipeListItem recipe={recipe} />
						</li>
					))}
				</ul>
			</div>
		</>
	);
}
