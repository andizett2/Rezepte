'use client';

import { useRouter } from 'next/navigation';
import { SubmitEvent, useState } from 'react';
import { addUser, getUser } from '@/app/actions';
import { useStore } from '@/store';
import type { AppUser } from '@/types/user';
import '../login/login.css';

const Register = () => {
	const router = useRouter();
	const setCurrentUser = useStore((state) => state.setCurrentUser);

	const [firstname, setFirstname] = useState<string>('');
	const [lastname, setLastname] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [passwordrepeat, setPasswordRepeat] = useState<string>('');
	const [error, setError] = useState<string>('');

	const storeUser = async (user: AppUser) => {
		return await addUser(user);
	};

	const submitHandler = async (e: SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();

		const existingUser = await getUser(email);

		if (existingUser) {
			setError('Benutzer existiert bereits!');
			return;
		}

		if (password !== passwordrepeat) {
			setError('Passwörter stimmen nicht überein!');
			return;
		}

		if (!firstname.length) {
			setError('Bitte gib deinen Vornamen ein!');
			return;
		}

		setError('Dein Account wurde erstellt.');
		const newUser: AppUser = {
			firstname,
			lastname,
			email,
			password,
			isadmin: false,
			slogan: '',
		};

		await storeUser(newUser);
		setCurrentUser(newUser);
		console.log('Registrierung erfolgreich!');
		setTimeout(() => {
			router.push('/');
		}, 2000);
	};

	return (
		<>
			<div className="login-container">
				<div className="login-card">
					<h1>Komm in die Küche</h1>
					<form onSubmit={submitHandler}>
						<div className="form-group">
							<label htmlFor="firstname" className="after:content-['*']">
								Vorname
							</label>
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
								value={passwordrepeat}
								onChange={(e) => setPasswordRepeat(e.target.value)}
								required
							/>
						</div>
						{error && <div className="error-message">{error}</div>}
						<button type="submit" className="submit-button">
							Loskochen!
						</button>
					</form>
				</div>
			</div>
		</>
	);
};

export default Register;
