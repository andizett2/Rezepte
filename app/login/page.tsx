'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { type SubmitEvent, useState } from 'react';
import { useStore } from '@/store';
import './login.css';

const Login = () => {
	const router = useRouter();
	const setCurrentUser = useStore((state) => state.setCurrentUser);

	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [error, setError] = useState<string>('');

	const submitHandler = async (e: SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();

		// signIn('credentials') sendet E-Mail und Passwort nur serverseitig an den authorize-Callback.
		const result = await signIn('credentials', {
			email,
			password,
			redirect: false,
		});

		if (result?.ok) {
			setCurrentUser({ email, firstname: '' });
			setError('');
			router.push('/');
		} else {
			setError('E-Mail oder Passwort falsch.');
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
								autoFocus
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
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</div>
						{error && <div className="error-message">{error}</div>}
						<button type="submit" className="submit-button">
							Loskochen!
						</button>
					</form>
					<p className="mt-4 text-center text-sm text-gray-600">
						Neu hier? <Link href="/register" className="text-blue-500 hover:underline">Registrieren</Link>
					</p>
				</div>
			</div>
		</>
	);
};

export default Login;
