import NextAuth, { type AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getUser } from '@/app/actions';
import { comparePasswords } from '@/lib/auth';

/**
 * next-auth v4 Konfiguration mit Credentials Provider (MongoDB-User).
 *
 * authOptions wird auch von anderen Server-Komponenten importiert,
 * damit getServerSession() überall dieselbe Konfiguration verwendet.
 */
export const authOptions: AuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'Anmeldung',
			credentials: {
				email: { label: 'E-Mail', type: 'email' },
				password: { label: 'Passwort', type: 'password' },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) {
					return null;
				}

				const user = await getUser(credentials.email);
				if (!user) {
					return null;
				}

				const isValid = await comparePasswords(credentials.password, user.password ?? '');
				if (!isValid) {
					return null;
				}

				return {
					id: user._id,
					email: user.email,
					name: `${user.firstname ?? ''} ${user.lastname ?? ''}`.trim(),
					firstname: user.firstname ?? '',
					isadmin: user.isadmin ?? false,
				};
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
				token.firstname = user.firstname;
				token.isadmin = user.isadmin;
			}
			return token;
		},
		async session({ session, token }) {
			if (session.user) {
				session.user.id = token.id;
				session.user.firstname = token.firstname;
				session.user.isadmin = token.isadmin;
			}
			return session;
		},
	},
	pages: {
		signIn: '/login',
	},
	session: {
		strategy: 'jwt',
	},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
