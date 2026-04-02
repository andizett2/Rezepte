// app/api/users/[email]/route.js
import { NextResponse } from 'next/server';
import couchdb from 'nano';

const getRezept_db = () => {
	const couch = couchdb({
		url: process.env.COUCHDB_URL,
		requestDefaults: {
			auth: {
				username: process.env.COUCHDB_USER,
				password: process.env.COUCHDB_PASSWORD
			}
		}
	});
	return couch.use('rezept_db');
}

export async function GET(request, { params }) {

	const db = getRezept_db();

	try {
		const { email } = await params; // In Next.js 15 muss params mit await aufgelöst werden
		const userDoc = await db.get(email);

		return NextResponse.json(userDoc);

	} catch (error) {
		// Fehlerbehandlung
		if (error.statusCode === 404) {
			return NextResponse.json(
				{ error: 'Benutzer nicht gefunden' },
				{ status: 404 }
			);
		}

		return NextResponse.json(
			{ error: 'Fehler beim Abrufen des Benutzers' },
			{ status: 500 }
		);
	}
}