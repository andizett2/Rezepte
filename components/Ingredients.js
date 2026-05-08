'use client';

import { useState } from 'react';
import { getUnit } from "@/lib/lookups";


const Ingredients = ({ recipe = {} }) => {

	const ingredients = recipe.ingredients || [];
	const [persons, setPersons] = useState(1);
	const currentLocale = "de";


	const handlePersonsChange = (e) => {
		setPersons(e.target.value * 1);
	}

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