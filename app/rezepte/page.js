// Eingabeformular für neue Rezepte
import Link from "next/link";

export default function Rezepte() {


	return (
		<>
			<h1>Rezepte</h1>
			<Link href="/rezepte/erfassung">Neues Rezept erstellen</Link>
		</>

	);
}