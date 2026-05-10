'use client';

import { useSession } from "next-auth/react";
import Link from "next/link";
import { getRecipes } from "@/app/actions";
import { useState, useEffect } from "react";
import RecipeCard from "@/components/RecipeCard";
import type { Recipe } from "@/types/recipe";

export default function Home() {

	const { data: session } = useSession();
	const firstname = session?.user?.firstname;
	const [mostRecent, setMostRecent] = useState<Recipe[]>([]);

	useEffect(() => {
		getRecipes({
			filter: { image_url: { $exists: true, $ne: '' } },
			limit: 3,
			sort: { 'dtCreated': -1 }
		})
			.then(result => {
				setMostRecent(result);
			})
	}, []);

	return (
		<>
			<div className="container my-10">

				<cite className="text-center block mb-10 italic text-gray-600">
					Es ist 2 Uhr nachts und plötzlich knurrt dein Magen
					<br />
					so laut, dass es durch die Kopfhörer dringt.
				</cite>
				<section className="block text-2xl text-center mb-16">
					<div className="container mx-auto max-w-4xl rounded-(--border-radius-md) bg-(--background-light) px-6 py-10 shadow-(--box-shadow-light)">
						<span className="mb-3 block text-xl font-medium uppercase tracking-[0.12em] text-(--secondary-color)/80">
							Willkommen {firstname && <span className="font-bold">{firstname}</span>}
						</span>
						<h1 className="mb-4 text-4xl font-bold leading-tight text-(--secondary-color) md:text-5xl">
							Entdecke <em>schnelle</em> Rezepte<br />für Zwischendurch
						</h1>
						<p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-(--text-color) md:text-lg">
							Einfach kochen, besser essen – mit unserer wachsenden Rezeptsammlung.
						</p>
						<button className="inline-flex rounded-(--border-radius-sm) bg-(--primary-color) px-6 py-3 font-semibold text-(--light-text-color) transition hover:brightness-95">
							<Link href="/rezepte" className="inline-flex items-center">Alle Rezepte</Link>
						</button>
					</div>
				</section>
				<ul className="max-w-125 mx-auto">
					{
						mostRecent.map(recipe => (
							<li key={recipe._id} className="mb-10">
								<RecipeCard recipe={recipe} />
							</li>)
						)
					}
				</ul>
			</div>
		</>
	);
}
