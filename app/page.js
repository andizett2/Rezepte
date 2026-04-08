'use client';

import { useStore } from "@/store";

export default function Home() {

	const currentUser = useStore(state => state.currentUser);

	return (
		<>
			<div className="container">
				<section className="hero">
					<div className="container">
						<span className="hero__eyebrow">
							Willkommen { currentUser && <span>{currentUser.firstname}</span>}
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
			</div>
		</>
	);
}
