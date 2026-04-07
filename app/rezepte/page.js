
// Eingabeformular für neue Rezepte
import Link from "next/link";
import { getRecipes } from "../actions";

export default async function Rezepte() {

	const recipes = await getRecipes();

	return (
		<>
			<h1>Rezepte</h1>
			<ul>

			{
				recipes.map( recipe => <li key={recipe._id}><Link href={`/rezepte/${recipe._id}`}>{recipe.title}</Link></li>)
			}
			</ul>
		</>

	);
}