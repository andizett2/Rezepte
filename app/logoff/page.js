'use client'
import { useStore } from "@/store";
import { useRouter } from 'next/navigation';
import Link from "next/link";

const Logoff = () => {

	const router = useRouter();
	const setCurrentUser = useStore((state) => state.setCurrentUser);

	setTimeout(() => {
		setCurrentUser(null);
		router.push('/');
	}, 2000);

	return (
		<>
			<h1>Du wurdest abgemeldet.</h1>
			<p>Weiterleitung erfolgt in 2 Sekunden auf die <Link href="/">Startseite.</Link></p>
		</>

	)
}

export default Logoff;