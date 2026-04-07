import { getRecipe } from "@/app/actions";
import { useStore } from "@/store";
import { getUnits, getUnit } from "@/lib/lookups";

const RecipeDetail = async({ params }) => {

	const { id } = await params; // URL-Parameter auslesen

	const recipe = await getRecipe( id );
	const currentLocale = "de";

	const units = getUnits(currentLocale);

	return(
	<>
		<h1>{recipe.title}</h1>
		<p>{recipe.description}</p>
		<ul>
			{
				recipe.ingredients.map( (i,ix) => <li key={ix}>{i.amount} {getUnit(i.unit, currentLocale).value} {i.name}</li>)
			}
		</ul>

	</>
	)
}

export default RecipeDetail;