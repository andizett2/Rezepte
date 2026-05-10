import Image from 'next/image';
import { notFound } from 'next/navigation';
import Ingredients from '@/components/Ingredients';
import { getRecipe, getUser } from '@/app/actions';
import './page.css';

interface RecipeDetailProps {
	params: Promise<{ id: string }>;
}

const RecipeDetail = async ({ params }: RecipeDetailProps) => {
	const { id } = await params;
	const recipe = await getRecipe(id);

	if (!recipe) {
		notFound();
	}

	const user = recipe.author ? await getUser(recipe.author) : null;

	return (
		<>
			<div className="container mx-auto mb-10 max-w-4xl rounded-(--border-radius-md) bg-(--background-light) px-6 py-10 shadow-(--box-shadow-light)">
				<h1 className="text-3xl">{recipe.title}</h1>
				{user && (
					<small className="text-gray-500">
						Eingereich von {user.firstname} {user.lastname} am {new Date(recipe.dtCreated ?? '').toLocaleDateString()}
					</small>
				)}
				<p className="my-4">{recipe.description}</p>
				{recipe.image_url && <Image src={recipe.image_url} className="recipe-image mb-6" width={500} height={500} alt="" />}
				{recipe && <Ingredients recipe={recipe} />}
				<h2 className="mt-6 mb-2 text-xl">Zubereitung</h2>
				<ul>
					{recipe.steps.filter((step) => step.length > 0).map((step, ix) => (
						<li key={ix}>{step}</li>
					))}
				</ul>
			</div>
		</>
	);
};

export default RecipeDetail;
