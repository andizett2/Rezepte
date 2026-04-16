'use client'
import { useStore } from "@/store";
import { useRouter } from 'next/navigation';
import { useEffect } from "react";
import Link from "next/link";

const Logoff = () => {

	const router = useRouter();
	const setCurrentUser = useStore((state) => state.setCurrentUser);

	// useEffect stellt sicher, dass der Code erst nach dem Mount im Browser läuft,
	// nicht während des Static-Pre-Renderings beim Build.
	useEffect(() => {
		const timer = setTimeout(() => {
			setCurrentUser(null);
			router.push('/');
		}, 2000);

		return () => clearTimeout(timer);
	}, [router, setCurrentUser]);

	return (
		<>
			<h1>Du wurdest abgemeldet.</h1>
			<p>Weiterleitung erfolgt in 2 Sekunden auf die <Link href="/">Startseite.</Link></p>
		</>
	);
}

export default Logoff;