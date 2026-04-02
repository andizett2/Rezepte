import { NextResponse } from "next/server";
import { getRezept_db } from "@/components/db";

export async function GET() {
	const db = getRezept_db();

	fetch('./users.json')
		.then(response => response.json())
		.then(data => {
			console.log(data, 'Benutzerdaten geladen');
			// jeder Eintrag wird auf /api/users gepostet
			data.forEach(user => {
				fetch('/api/users', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(user),
				});
			});
			return NextResponse.json(data);
		})
		.catch(error => {
			return NextResponse.json(
				{ error: 'Fehler beim Laden der Benutzerdaten' },
				{ status: 500 }
			);
			console.error('Fehler beim Laden der Benutzerdaten:', error);
		});
}
