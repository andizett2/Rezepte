// Einfaches Login Formular
'use client'
import { useStore } from "@/store";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import "../login/login.css";

const Register = () => {
	const router = useRouter();
	const setCurrentUser = useStore((state) => state.setCurrentUser);

	// Formularvariablen
	const [firstname, setFirstname] = useState("");
	const [lastname, setLastname] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordrepeat, setPasswordRepeat] = useState("");
	const [error, setError] = useState("");

	// Ein User-Objekt für die E-Mail suchen
	const getUser = async (email) => {
		const response = await fetch(`/api/users/${email}`);
		const user = await response.json();
		return user;
	}

	// Ein User-Objekt hinzufügen
	const storeUser = async (user) => {
		const response = await fetch('/api/users', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(user),
		});

		if (response.ok) {
			const data = await response.json();
			return data;
		}
	}

	// Formular wird gesendet
	const submitHandler = (e) => {
		e.preventDefault();

		const user = getUser(email);

		if (user) {
			setError("Benutzer existiert bereits!");
		} else {
			if (password !== passwordrepeat) {
				setError("Passwörter stimmen nicht überein!");
			} else if ( !firstname.length ) {
				setError("Bitte gib deinen Vornamen ein!");
			} else {
				setError("Dein Account wurde erstellt.");
				const newUser = { id: email, firstname: firstname, lastname:lastname, email: email, password:password, isadmin: false, slogan: '' };
				const result = storeUser( newUser );
				console.log(result);
				setCurrentUser(newUser);
				console.log("Registrierung erfolgreich!");
				setTimeout(() => {
					router.push('/');
				}, 2000)
			}
		}
	}



	return (
		<>
			<div className="login-container">
				<div className="login-card">
					<h1>Komm in die Küche</h1>
					<form onSubmit={submitHandler}>
						<div className="form-group">
							<label htmlFor="firstname">Vorname</label>
							<input
								type="text"
								id="firstname"
								name="firstname"
								value={firstname}
								onChange={(e) => setFirstname(e.target.value)}
								required
							/>
						</div>
						<div className="form-group">
							<label htmlFor="lastname">Nachname</label>
							<input
								type="text"
								id="lastname"
								name="lastname"
								value={lastname}
								onChange={(e) => setLastname(e.target.value)}
							/>
						</div>
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
						<div className="form-group">
							<label htmlFor="passwordrepeat">Passwort wiederholen</label>
							<input
								type="password"
								id="passwordrepeat"
								name="passwordrepeat"
								placeholder=""
								value={passwordrepeat}
								onChange={(e) => setPasswordRepeat(e.target.value)}
								required
							/>
						</div>
						{error && <div className="error-message">{error}</div>}
						<button type="submit" className="submit-button">Loskochen!</button>
					</form>
				</div>
			</div>
		</>
	)
}

export default Register;