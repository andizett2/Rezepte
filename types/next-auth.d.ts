import NextAuth from 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
	interface Session {
		user: {
			id?: string;
			firstname?: string;
			isadmin?: boolean;
		} & Session['user'];
	}

	interface User {
		id?: string;
		firstname?: string;
		isadmin?: boolean;
	}
}

declare module 'next-auth/jwt' {
	interface JWT {
		id?: string;
		firstname?: string;
		isadmin?: boolean;
	}
}
