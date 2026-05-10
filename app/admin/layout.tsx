import type { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

interface AdminLayoutProps {
	children: ReactNode;
}

/**
 * Admin-Layout – zweite Schutzebene (nach der Middleware).
 *
 * getServerSession() liest die JWT-Session serverseitig aus.
 * Falls kein Admin eingeloggt ist, wird sofort auf /login umgeleitet –
 * BEVOR irgendein Admin-Inhalt gerendert wird.
 */
export default async function AdminLayout({ children }: AdminLayoutProps) {
	const session = await getServerSession(authOptions);

	if (!session?.user?.isadmin) {
		redirect('/login');
	}

	return (
		<>
			<div className="admin-layout">{children}</div>
		</>
	);
}
