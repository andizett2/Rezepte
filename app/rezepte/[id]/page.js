import { getRecipe } from "@/app/actions";
import { useStore } from "@/store";
import { getUnits, getUnit } from "@/lib/lookups";
import { getUser } from "@/app/actions";
import Image from "next/image";
import Ingredients from "@/components/Ingredients";
import './page.css';

const RecipeDetail = async ({ params }) => {

	const { id } = await params; // URL-Parameter auslesen

	const recipe = await getRecipe(id);
	const user = await getUser(recipe.author)
	const currentLocale = "de";
	const units = getUnits(currentLocale);


	return (
		<>
			<div className="container mx-auto mb-10 max-w-4xl rounded-(--border-radius-md) bg-(--background-light) px-6 py-10 shadow-(--box-shadow-light)">
				<h1 className="text-3xl">{recipe.title}</h1>
				{user &&
					<small className="text-gray-500">Eingereich von {user.firstname} {user.lastname} am {new Date(recipe.dtCreated).toLocaleDateString()}</small>
				}
				<p className="my-4">{recipe.description}</p>
				{
					recipe.image_url && <Image src={recipe.image_url} className="recipe-image mb-6" width="500" height="500" alt="" />
				}
				{/* Die Zutatenliste soll die Menge anhand der Personen errechnen */}
				{
					recipe && <Ingredients recipe={recipe} units={units} />
				}
				<h2 className="text-xl mt-6 mb-2">Zubereitung</h2>
				<ul>
					{
						recipe.steps.filter(step => step.length > 0).map((i, ix) => <li key={ix}>{i}</li>)
					}
				</ul>
			</div>
		</>
	)
}

export default RecipeDetail;