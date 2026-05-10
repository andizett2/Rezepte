import { NextResponse } from 'next/server';
import { getRezept_db } from '@/components/db';

interface UserByEmailRouteProps {
	params: Promise<{ email: string }>;
}

export async function GET(_request: Request, { params }: UserByEmailRouteProps) {
	const db = getRezept_db();

	try {
		const { email } = await params;
		const userDoc = await db.get(email);
		return NextResponse.json(userDoc);
	} catch (error: unknown) {
		if (typeof error === 'object' && error !== null && 'statusCode' in error && error.statusCode === 404) {
			return NextResponse.json({ error: 'Benutzer nicht gefunden' }, { status: 404 });
		}

		return NextResponse.json({ error: 'Fehler beim Abrufen des Benutzers' }, { status: 500 });
	}
}
