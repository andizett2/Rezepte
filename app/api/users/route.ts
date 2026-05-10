import { NextResponse, type NextRequest } from 'next/server';
import { getRezept_db } from '@/components/db';
import type { AppUser } from '@/types/user';

const normalizeAppUser = (value: unknown): AppUser => {
	const record = value as Record<string, unknown>;

	return {
		_id: typeof record._id === 'string' ? record._id : undefined,
		email: typeof record.email === 'string' ? record.email : '',
		firstname: typeof record.firstname === 'string' ? record.firstname : '',
		lastname: typeof record.lastname === 'string' ? record.lastname : undefined,
		password: typeof record.password === 'string' ? record.password : undefined,
		isadmin: typeof record.isadmin === 'boolean' ? record.isadmin : undefined,
		slogan: typeof record.slogan === 'string' ? record.slogan : undefined,
		created_at: typeof record.created_at === 'string' ? record.created_at : undefined,
	};
};

export async function GET() {
	try {
		const db = getRezept_db();
		const response = await db.view('users', 'all');
		return NextResponse.json(response.rows.map((row) => normalizeAppUser(row.value)));
	} catch (error) {
		return NextResponse.json({ error: `Fehler beim Abrufen der User${String(error)}` }, { status: 500 });
	}
}

export async function POST(request: NextRequest) {
	const user = normalizeAppUser(await request.json());
	const { firstname, lastname = '', email, password, isadmin = false, slogan = '' } = user;

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
		const db = getRezept_db();
		const response = await db.insert(userDoc);
		return NextResponse.json(response);
	} catch (error) {
		return NextResponse.json({ error: `Fehler beim Erstellen des Users${String(error)}` }, { status: 500 });
	}
}

export async function PUT(request: NextRequest) {
	const user = normalizeAppUser(await request.json());
	const { firstname, lastname = '', email, password, isadmin = false, slogan = '' } = user;

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
		const db = getRezept_db();
		const response = await db.insert(userDoc);
		return NextResponse.json(response);
	} catch (error) {
		return NextResponse.json({ error: `Fehler beim Aktualisieren des Users${String(error)}` }, { status: 500 });
	}
}
