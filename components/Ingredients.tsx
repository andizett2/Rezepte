'use client';

import { useState, type ChangeEvent } from 'react';
import { getUnit } from '@/lib/lookups';
import type { RecipeIngredient } from '@/types/recipe';

interface IngredientsProps {
	recipe?: {
		ingredients?: RecipeIngredient[];
	} | null;
}

const Ingredients = ({ recipe }: IngredientsProps) => {
	const ingredients = recipe?.ingredients ?? [];
	const [persons, setPersons] = useState<number>(1);
	const currentLocale = 'de';

	const handlePersonsChange = (e: ChangeEvent<HTMLInputElement>) => {
		setPersons(Number(e.target.value));
	};

	return (
		<>
			<h2>
				Zutaten für&nbsp;
				<input
					className="form-input"
					style={{ width: '5em' }}
					type="number"
					value={persons}
					onChange={handlePersonsChange}
					min="1"
				/>{' '}
				Person{persons === 1 ? '' : 'en'}
			</h2>
			<ul>
				{ingredients.map((ingredient, ix) => (
					<li key={ix}>
						{ingredient.amount * persons} {getUnit(ingredient.unit, currentLocale).value} {ingredient.name}
					</li>
				))}
			</ul>
		</>
	);
};

export default Ingredients;
