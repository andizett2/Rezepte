'use client';
import { useStore } from "@/store";
import Link from "next/link";
import { getRecipes } from "@/app/actions";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import RecipeListItem from '@/components/RecipeListItem';

export default function MeineRezepte() {

	const currentUser = useStore(state => state.currentUser);
	const [myRecipes, setMyRecipes] = useState([]);

	const router = useRouter();

	useEffect(() => {
		if (!currentUser) {
			router.push('/login');
		} else {
			getRecipes({
				filter: { author: currentUser.email },
				sort: { 'dtCreated': -1 }
			})
				.then(result => {
					setMyRecipes(result);
				})
		}
	}, [currentUser, router]);

	const handleRecipeDelete = (deletedId) => {
		setMyRecipes(prev => prev.filter(recipe => recipe._id !== deletedId));
	};

	return (
		<>
			<h1>Von Dir erstellte Rezepte</h1>
			<ul>

			{
				myRecipes.map(recipe => (
					<li key={recipe._id}>
						<RecipeListItem recipe={recipe} user={currentUser} onDelete={handleRecipeDelete} />
					</li>
				))
			}
			</ul>
		</>
	)
}