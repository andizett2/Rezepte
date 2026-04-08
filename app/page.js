'use client';

import { useStore } from "@/store";
import Link from "next/link";
import { getRecipes } from "@/app/actions";
import { getUser } from "@/app/actions";
import { useState, useEffect } from "react";
import RecipeCard from "@/components/RecipeCard";

export default function Home() {

	const currentUser = useStore(state => state.currentUser);
	const [mostRecent, setMostRecent] = useState([]);


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
			<div className="container">
				<cite>
					Es ist 2 Uhr nachts und plötzlich knurrt dein Magen
					<br />
					so laut, dass es durch die Kopfhörer dringt.
				</cite>
				<section className="hero">
					<div className="container">
						<span className="hero__eyebrow">
							Willkommen {currentUser && <span>{currentUser.firstname}</span>}
						</span>
						<h1 className="hero__title">
							Entdecke <em>schnelle</em> Rezepte<br />für Zwischendurch
						</h1>
						<p className="hero__subtitle">
							Einfach kochen, besser essen – mit unserer wachsenden Rezeptsammlung.
						</p>
						<a href="/rezepte" className="btn btn--primary">Alle Rezepte</a>
					</div>
				</section>
				<ul>
					{
						mostRecent.map(recipe => <li key={recipe._id}>
							<RecipeCard recipe={recipe} />
						</li>)
					}
				</ul>
			</div>
		</>
	);
}
