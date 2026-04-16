// Einfaches Login Formular
'use client'
import { useStore } from "@/store";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
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

	// Anmeldeversuch über next-auth starten
	const submitHandler = async (e) => {
		e.preventDefault();

		// signIn("credentials") sendet E-Mail und Passwort NUR serverseitig an den
		// authorize()-Callback in route.js – das Passwort verlässt nie den Server.
		const result = await signIn("credentials", {
			email,
			password,
			redirect: false,   // Fehler selbst behandeln, nicht automatisch weiterleiten
		});

		if (result?.ok) {
			setCurrentUser({ email });   // Zustand Store aktualisieren
			setError("");
			router.push("/");
		} else {
			setError("E-Mail oder Passwort falsch.");
		}
	};

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