
// Eingabeformular für neue Rezepte
import Link from "next/link";
import { getRecipes } from "../actions";
import RecipeListItem from "@/components/RecipeListItem";

export default async function Rezepte() {

	const recipes = await getRecipes();
	console.log(recipes)

	return (
		<>
			<h1>Rezepte</h1>
			<ul>
				{
					recipes.map(recipe => <li key={recipe._id}><RecipeListItem recipe={recipe} /></li>)
				}
			</ul>
		</>

	);
}