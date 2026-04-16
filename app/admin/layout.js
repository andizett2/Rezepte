import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import AdminNav from "@/components/AdminNav";

/**
 * Admin-Layout – zweite Schutzebene (nach der Middleware).
 *
 * getServerSession() liest die JWT-Session serverseitig aus.
 * Falls kein Admin eingeloggt ist, wird sofort auf /login umgeleitet –
 * BEVOR irgendein Admin-Inhalt gerendert wird.
 */
export default async function AdminLayout({ children }) {

	const session = await getServerSession(authOptions);

	if (!session?.user?.isadmin) {
		redirect("/login");
	}

	return (
		<>
			<div className="admin-layout">
				{children}
			</div>
		</>
	);
}

