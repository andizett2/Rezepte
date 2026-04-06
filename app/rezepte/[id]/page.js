import { getRecipe } from "@/app/actions";

const RecipeDetail = async({ params }) => {

	const { id } = await params; // URL-Parameter auslesen

	const recipe = await getRecipe( id );

	return(
	<>
		<h1>{recipe.title}</h1>
		<p>{recipe.description}</p>

	</>
	)
}

export default RecipeDetail;