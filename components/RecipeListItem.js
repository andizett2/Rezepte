'use client';

import Image from "next/image";
import Link from "next/link";
import './RecipeListItem.css';
import { useRouter } from 'next/navigation';
import { deleteRecipe } from '@/app/actions';
import { truncateText } from "@/lib/string";

const RecipeListItem = ({ recipe, user, onDelete }) => {
	const router = useRouter();

	const clickEditHandler = (e, data) => {
		e.preventDefault();
		router.push(`/rezept-bearbeiten/${data}`);
	};

	const clickDeleteHandler = async (e, data) => {
		e.preventDefault();
		e.stopPropagation();

		if (!confirm('Möchtest du dieses Rezept wirklich löschen?')) {
			return;
		}

		try {
			const result = await deleteRecipe(data);
			if (result.acknowledged) {
				if (typeof onDelete === 'function') {
					onDelete(data);
				} else {
					router.refresh();
				}
			}
		} catch (error) {
			console.error('Failed to delete recipe:', error);
		}
	};

	return (
		<div className="recipe-list-item">
			{user && user.email === recipe.author && (
				<>
					<div className="recipe-actions">
						<button onClick={(e) => clickEditHandler(e, recipe._id)} className="btn btn--secondary">
							Bearbeiten
						</button>
					</div>
					<div className="recipe-actions">

						<button onClick={(e) => clickDeleteHandler(e, recipe._id)} className="btn btn--primary">
							Löschen
						</button>
					</div>
				</>
			)}

			<Link href={`/rezepte/${recipe._id}`} className="recipe-thumbnail-link">
				<div className="recipe-thumbnail">
					{recipe.image_url && <Image alt={recipe.title || 'Recipe image'} width="100" height="100" src={recipe.image_url} loading="eager"/>}
				</div>
			</Link>

			<div className="recipe-link">
				<Link href={`/rezepte/${recipe._id}`}>
					{recipe.title}
					<p>{truncateText(recipe.description, 50)}</p>
				</Link>
			</div>
		</div>
	);
};

export default RecipeListItem;