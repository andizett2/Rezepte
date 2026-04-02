'use client';
import { useStore } from "@/store";
import Link from 'next/link';

const UserNav = () => {

	const user = useStore((state) => state.currentUser);

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
