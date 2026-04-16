import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUser } from "@/app/actions";
import { comparePasswords } from "@/lib/auth";

/**
 * next-auth v4 Konfiguration mit Credentials Provider (MongoDB-User).
 *
 * authOptions wird auch von anderen Server-Komponenten importiert (z.B. admin/layout.js),
 * damit getServerSession() überall dieselbe Konfiguration verwendet.
 */
export const authOptions = {
	providers: [
		CredentialsProvider({
			name: "Anmeldung",
			credentials: {
				email:    { label: "E-Mail",   type: "email" },
				password: { label: "Passwort", type: "password" },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) return null;

				// User aus der MongoDB laden
				const user = await getUser(credentials.email);
				if (!user) return null;

				// Passwort gegen den gespeicherten bcrypt-Hash prüfen
				const isValid = await comparePasswords(credentials.password, user.password);
				if (!isValid) return null;

				// Nur sichere Felder zurückgeben – kein Passwort-Hash!
				return {
					id:        user._id,
					email:     user.email,
					name:      `${user.firstname ?? ""} ${user.lastname ?? ""}`.trim(),
					firstname: user.firstname ?? "",
					isadmin:   user.isadmin ?? false,
				};
			},
		}),
	],

	callbacks: {
		/**
		 * JWT: zusätzliche Felder aus dem User-Objekt in den Token schreiben.
		 * Wird bei jeder Session-Prüfung aufgerufen.
		 */
		async jwt({ token, user }) {
			if (user) {
				token.id       = user.id;
				token.firstname = user.firstname;
				token.isadmin  = user.isadmin;
			}
			return token;
		},

		/**
		 * Session: Token-Felder in das Client-seitig zugängliche Session-Objekt übertragen.
		 */
		async session({ session, token }) {
			if (token) {
				session.user.id       = token.id;
				session.user.firstname = token.firstname;
				session.user.isadmin  = token.isadmin;
			}
			return session;
		},
	},

	pages: {
		signIn: "/login",   // Login-Seite des Projekts
	},

	session: {
		strategy: "jwt",    // Kein Datenbank-Session-Store nötig
	},
};

// App-Router-konformer Handler für GET und POST
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };