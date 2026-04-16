'use client';

import { useStore } from "@/store";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { getRecipes } from "@/app/actions";
import { useState, useEffect } from "react";
import RecipeCard from "@/components/RecipeCard";

export default function Home() {

	const { data: session } = useSession();
	const firstname = session?.user?.firstname;
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
							Willkommen {firstname && <span>{firstname}</span>}
						</span>
						<h1 className="hero__title">
							Entdecke <em>schnelle</em> Rezepte<br />für Zwischendurch
						</h1>
						<p className="hero__subtitle">
							Einfach kochen, besser essen – mit unserer wachsenden Rezeptsammlung.
						</p>
						<Link href="/rezepte" className="btn btn--primary">Alle Rezepte</Link>
					</div>
				</section>
				<ul style={{maxWidth:"500px", margin:"auto"}}>
					{
						mostRecent.map(recipe => <li key={recipe._id} style={{marginBottom:"1rem"}}>
							<RecipeCard recipe={recipe} />
						</li>)
					}
				</ul>
			</div>
		</>
	);
}
