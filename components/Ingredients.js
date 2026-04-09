'use client';

import { useState, useEffect } from 'react';
import { getUnits, getUnit } from "@/lib/lookups";


const Ingredients = ({ recipe = {}, units }) => {

	const [ingredients, setIngredients] = useState(recipe.ingredients || []);
	const [persons, setPersons] = useState(1);
	const currentLocale = "de";


	const handlePersonsChange = (e) => {
		setPersons(e.target.value * 1);
	}

	useEffect(() => {
		setIngredients(recipe.ingredients || [])
	}, [recipe]);

	return (
		<>
			<h2>Zutaten für&nbsp;
				<input
					className="form-input" style={{ width: "5em" }}
					type="number"
					value={persons}
					onChange={handlePersonsChange}
					min="1"
				/> Person{persons == 1 ? '': 'en'}
			</h2>
			<ul>
				{
					ingredients?.map((i, ix) => <li key={ix}>{i.amount * persons} {getUnit(i.unit, currentLocale).value} {i.name}</li>)
				}
			</ul>
		</>
	)
}

export default Ingredients;