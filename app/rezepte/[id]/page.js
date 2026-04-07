import { getRecipe } from "@/app/actions";
import { useStore } from "@/store";
import { getUnits, getUnit } from "@/lib/lookups";
import { getUser } from "@/app/actions";

const RecipeDetail = async ({ params }) => {

	const { id } = await params; // URL-Parameter auslesen

	const recipe = await getRecipe(id);
	const user = await getUser( recipe.author )
	const currentLocale = "de";

	const units = getUnits(currentLocale);

	return (
		<>
			<h1>{recipe.title}</h1>
			{ user &&
				<small>Eingereich von {user.firstname} {user.lastname} am {new Date(recipe.dtCreated).toLocaleDateString()}</small>
			}
			<p>{recipe.description}</p>
			<h2>Zutaten</h2>
			<ul>
				{
					recipe.ingredients.map((i, ix) => <li key={ix}>{i.amount} {getUnit(i.unit, currentLocale).value} {i.name}</li>)
				}
			</ul>
			<h2>Zubereitung</h2>
			<ul>
				{
					recipe.steps.filter(step => step.length > 0).map((i, ix) => <li key={ix}>{i}</li>)
				}
			</ul>

		</>
	)
}

export default RecipeDetail;