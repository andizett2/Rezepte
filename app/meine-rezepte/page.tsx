'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getRecipes } from '@/app/actions';
import RecipeListItem from '@/components/RecipeListItem';
import { useStore } from '@/store';
import type { Recipe } from '@/types/recipe';

export default function MeineRezepte() {
	const currentUser = useStore((state) => state.currentUser);
	const [myRecipes, setMyRecipes] = useState<Recipe[]>([]);
	const router = useRouter();

	useEffect(() => {
		if (!currentUser) {
			router.push('/login');
			return;
		}

		getRecipes({
			filter: { author: currentUser.email },
			sort: { dtCreated: -1 },
		}).then((result) => {
			setMyRecipes(result ?? []);
		});
	}, [currentUser, router]);

	const handleRecipeDelete = (deletedId: string) => {
		setMyRecipes((prev) => prev.filter((recipe) => recipe._id !== deletedId));
	};

	return (
		<>
			<div className="container mx-auto mb-10 max-w-4xl rounded-(--border-radius-md) bg-(--background-light) px-6 py-10 shadow-(--box-shadow-light)">
				<h1>Von Dir erstellte Rezepte</h1>
				<ul>
					{myRecipes.map((recipe) => (
						<li key={recipe._id}>
							<RecipeListItem recipe={recipe} user={currentUser} onDelete={handleRecipeDelete} />
						</li>
					))}
				</ul>
			</div>
		</>
	);
}
