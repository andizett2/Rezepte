'use client'
import { signOut } from "next-auth/react";
import { useStore } from "@/store";
import { useEffect } from "react";
import Link from "next/link";

const Logoff = () => {

	const setCurrentUser = useStore((state) => state.setCurrentUser);

	useEffect(() => {
		const timer = setTimeout(() => {
			// Zustand-Store zurücksetzen
			setCurrentUser(null);
			// next-auth Session-Cookie löschen und auf Startseite weiterleiten
			signOut({ callbackUrl: "/" });
		}, 2000);

		return () => clearTimeout(timer);
	}, [setCurrentUser]);

	return (
		<>
			<h1>Du wurdest abgemeldet.</h1>
			<p>Weiterleitung erfolgt in 2 Sekunden auf die <Link href="/">Startseite.</Link></p>
		</>
	);
}

export default Logoff;