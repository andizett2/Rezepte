import { withAuth } from "next-auth/middleware";

/**
 * Proxy – Zugriffsschutz für geschützte Routen.
 *
 * Regeln:
 *  - /admin/*              → nur User mit isadmin === true
 *  - /rezepte/erfassung/*  → jeder angemeldete User (token vorhanden)
 *  - /meine-rezepte/*      → jeder angemeldete User (token vorhanden)
 *
 * Bei fehlendem/ungültigem Token → Redirect auf /login.
 */
export default withAuth({
	pages: {
		signIn: "/login",
	},
	callbacks: {
		authorized: ({ token, req }) => {
			const path = req.nextUrl.pathname;

			if (path.startsWith("/admin")) {
				return token?.isadmin === true;
			}

			return token !== null;
		},
	},
});

export const config = {
	matcher: [
		"/admin/:path*",
		"/rezepte/erfassung/:path*",
		"/meine-rezepte/:path*",
	],
};
