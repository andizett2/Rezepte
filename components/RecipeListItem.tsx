'use client';

import type { MouseEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { deleteRecipe } from '@/app/actions';
import { truncateText } from '@/lib/string';
import type { Recipe } from '@/types/recipe';
import type { AppUser } from '@/types/user';

interface RecipeListItemProps {
	recipe: Recipe;
	user?: AppUser | null;
	onDelete?: (deletedId: string) => void;
}

const RecipeListItem = ({ recipe, user, onDelete }: RecipeListItemProps) => {
	const router = useRouter();

	const clickEditHandler = (e: MouseEvent<HTMLButtonElement>, data: string) => {
		e.preventDefault();
		router.push(`/rezept-bearbeiten/${data}`);
	};

	const clickDeleteHandler = async (e: MouseEvent<HTMLButtonElement>, data: string) => {
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
		<div className="flex flex-row-reverse items-center gap-4 rounded-[8px] border border-[#e8d5c4] bg-[linear-gradient(135deg,#faf6f0_0%,#f5ede4_100%)] p-4 transition-all duration-300 ease-in-out hover:border-[#d4b5a0] hover:bg-[linear-gradient(135deg,#f5ede4_0%,#efe3da_100%)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)] md:gap-3 md:p-3 max-[480px]:flex-col max-[480px]:gap-2 max-[480px]:p-2">
			{user && user.email === recipe.author && (
				<>
					<div>
						<button
							onClick={(e) => clickEditHandler(e, recipe._id || '')}
							className="inline-flex items-center rounded-md border border-(--color-border) bg-transparent px-3 py-1.5 text-sm font-medium text-(--color-text-muted) transition-colors duration-200 hover:border-primary hover:text-primary"
						>
							Bearbeiten
						</button>
					</div>
					<div>
						<button
							onClick={(e) => clickDeleteHandler(e, recipe._id || '')}
							className="inline-flex items-center rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-(--color-primary-hover)"
						>
							Löschen
						</button>
					</div>
				</>
			)}

			<Link href={`/rezepte/${recipe._id}`}>
				<div className="flex h-25 w-25 shrink-0 items-center justify-center overflow-hidden rounded-md bg-[#e8e8e8] md:h-20 md:w-20 max-[480px]:h-37.5 max-[480px]:w-full">
					{recipe.image_url && (
						<Image
							alt={recipe.title || 'Recipe image'}
							width={100}
							height={100}
							src={recipe.image_url}
							loading="eager"
							className="h-full w-full object-cover"
						/>
					)}
				</div>
			</Link>

			<div className="min-w-0 flex-1">
				<Link
					href={`/rezepte/${recipe._id}`}
					className="block wrap-break-word text-[1.2rem] leading-[1.4] font-semibold text-[#4a4a4a] transition-colors duration-300 hover:text-[#c9673f] max-[480px]:text-center"
				>
					{recipe.title}
					<p className="mt-1 text-sm font-normal text-(--color-text-muted)">{truncateText(recipe.description || '', 50)}</p>
				</Link>
			</div>
		</div>
	);
};

export default RecipeListItem;
