// Einfaches Login Formular
'use client'
import { useStore } from "@/store";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import Link from "next/link";
import "./login.css";

const Login = () => {
	// Weiterleitung nach erfolgreicher Anmeldung
	const router = useRouter();
	// Funktionen des Stores
	const setCurrentUser = useStore((state) => state.setCurrentUser);

	// Formulardaten
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	// Ein User-Objekt für die E-Mail suchen
	const getUser = async (email) => {
		const response = await fetch(`/api/users/${email}`);
		const user = await response.json();
		return user;
	}

	// Anmeldeversuch starten
	const submitHandler = async (e) => {
		e.preventDefault();

		// ToDo: neuen Endpunkt nutzen, da sonst das Passwort des Users übermittelt wird
		// Versuch diesen User zu finden
		const user = await getUser(email);

		// Passwort Prüfung
		if (user) {
			if (user.error) {
				setError(user.error);
			} else if (user.password === password) {
				setCurrentUser(user);
				setError("");
				console.log("Login erfolgreich!");
				router.push('/');
			} else {
				setError("Falsches Passwort!");
			}
		} else {
			setError("Benutzer nicht gefunden!");
		}

	}
	return (
		<>
			<div className="login-container">
				<div className="login-card">
					<h1>Anmelden</h1>
					<form onSubmit={submitHandler}>
						<div className="form-group">
							<label htmlFor="email">E-Mail</label>
							<input
								type="email"
								id="email"
								name="email"
								placeholder="deine@mail.de"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</div>
						<div className="form-group">
							<label htmlFor="password">Passwort</label>
							<input
								type="password"
								id="password"
								name="password"
								placeholder="••••••••"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</div>
						{error && <div className="error-message">{error}</div>}
						<button type="submit" className="submit-button">Loskochen!</button>
					</form>
					<p>
						Neu hier? <Link href="/register">Registrieren</Link>
					</p>
				</div>
			</div>
		</>
	)
}

export default Login;