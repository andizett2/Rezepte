import { NextResponse } from 'next/server';
import { setupUsers } from '@/app/actions';

export async function GET() {
	try {
		const data = await setupUsers('users.json');
		return NextResponse.json(data);
	} catch (error) {
		console.error('Fehler beim Laden der Benutzerdaten:', error);
		return NextResponse.json({ error: 'Fehler beim Laden der Benutzerdaten' }, { status: 500 });
	}
}
