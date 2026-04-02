// app/api/users/route.js
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

export async function GET() {

	const db = getRezept_db();

	try {
		const response = await db.view( 'users', 'all');
		return NextResponse.json(response.rows.map(row => row.value));
	} catch (error) {
		return NextResponse.json(
			{ error: 'Fehler beim Abrufen der User' + error },
			{ status: 500 }
		);
	}
}

export async function POST(request) {
	const db = getRezept_db();
	const user = await request.json();
	const { firstname, lastname='', email, password, isadmin=false, slogan='' } = user;

	const userDoc = {
		_id: email,
		type: 'user',
		firstname,
		lastname,
		email,
		password,
		isadmin,
		created_at: new Date().toISOString(),
		slogan,
	};

	try {
		const response = await db.insert(userDoc);
		return NextResponse.json(response);
	} catch (error) {
		return NextResponse.json(
			{ error: 'Fehler beim Erstellen des Users' + error },
			{ status: 500 }
		);
	}
}

export async function PUT(request) {
	const db = getRezept_db();
	const user = await request.json();
	const { firstname, lastname='', email, password, isadmin=false, slogan='' } = user;

	const userDoc = {
		_id: email,
		type: 'user',
		firstname,
		lastname,
		email,
		password,
		isadmin,
		created_at: new Date().toISOString()
	}

	try {
		const response = await db.update(userDoc);
		return NextResponse.json(response);
	} catch (error) {
		return NextResponse.json(
			{ error: 'Fehler beim Aktualisieren des Users' + error },
			{ status: 500 }
		);
	}
}