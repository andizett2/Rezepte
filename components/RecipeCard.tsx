import Image from 'next/image';
import type { AppUser } from '@/types/user';
import type { Recipe } from '@/types/recipe';

interface RecipeCardProps {
	recipe: Recipe;
	user?: AppUser | null;
}

const RecipeCard = ({ recipe, user = null }: RecipeCardProps) => {
	return (
		<>
			<a
				href={`/rezepte/${recipe._id}`}
				className="block overflow-hidden rounded-(--border-radius-md) bg-white shadow-(--box-shadow-light) transition hover:-translate-y-1 hover:shadow-(--box-shadow-hover)"
			>
				<div className="relative aspect-4/3 w-full overflow-hidden bg-(--background-light)">
					{recipe.image_url && (
						<Image
							src={recipe.image_url}
							width={1200}
							height={1200}
							alt={recipe.title}
							loading="eager"
							className="h-full w-full object-cover"
						/>
					)}
				</div>
				<div className="px-5 py-4">
					<h3 className="text-lg font-semibold tracking-tight text-(--secondary-color)">{recipe.title}</h3>
					{/*<div className="card__meta">
						<span className="card__meta-item">von {user?.firstname}</span>
					</div>*/}
				</div>
			</a>
		</>
	);
};

export default RecipeCard;
