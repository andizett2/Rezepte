'use client'
import { signOut } from "next-auth/react";
import { useStore } from "@/store";
import { useEffect } from "react";
import Link from "next/link";

const Logoff = () => {

	const setCurrentUser = useStore((state) => state.setCurrentUser);

	useEffect(() => {
		// signOut() löscht den Session-Cookie und leitet danach auf / weiter.
		// Das Zustand-Store-Reset passiert davor synchron.
		setCurrentUser(null);
		const timer = setTimeout(() => {
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
};

export default Logoff;