'use client';
import { useSession } from "next-auth/react";
import Link from 'next/link';

const UserNav = () => {

	const { data: session } = useSession();
	const user = session?.user;

	return (
		<>
			{
				user
				? (<><span>Hallo {user.firstname} <Link href="/logoff" className="login-button">Abmelden</Link></span></>)
				: (<Link href="/login" className="login-button">Anmelden</Link>)
			}
		</>
	)
}

export default UserNav;
