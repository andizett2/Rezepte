// components/Header.jsx
'use client'; // Next.js App Router – useState braucht eine Client Component

import Image from "next/image";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useStore } from "../store/index";
import AdminNav from "./AdminNav";


export default function Header() {

	const currentUser = useStore(state => state.currentUser);
	const isAdmin = currentUser && currentUser.isadmin;

	const [menuOpen, setMenuOpen] = useState(false);
	const pathname = usePathname();

	// Menü schließen wenn sich die Route ändert (z.B. nach Link-Klick)
	useEffect(() => {
		setMenuOpen(false);
	}, [pathname]);

	// Scrollen des Body sperren wenn Menü offen ist
	useEffect(() => {
		document.body.style.overflow = menuOpen ? 'hidden' : '';
		return () => { document.body.style.overflow = ''; };
	}, [menuOpen]);

	const navLinks = [
		{ href: '/rezepte', label: 'Rezepte' },
		{ href: '/kontakt', label: 'Kontakt' },
	];

	const subNavLinks = [
		{ href: '/rezepte/erfassung', label: '+ Rezept erstellen' },
		{ href: '/meine-rezepte', label: 'Meine Rezepte' },
		{ href: '/rezepte/favoriten', label: 'Favoriten' },
	];

	return (
		<>
			{/* ── Haupt-Header ── */}
			<header className="header">
				<div className="container header__inner">

					{/* Logo */}
					<Link href="/" className="header__logo">
						<Image width="150" height="150" src="/logo_kfn.png" alt="Kochrezepte Logo" />
					</Link>

					{/* Primäre Navigation */}
					<nav className="nav-primary">
						<ul className={`nav-primary__list${menuOpen ? ' is-open' : ''}`}>
							{navLinks.map(({ href, label }) => (
								<li key={href}>
									<Link
										href={href}
										className={`nav-primary__link${pathname === href ? ' active' : ''}`}
									>
										{label}
									</Link>
								</li>
							))}
							{currentUser && subNavLinks.map(({href,label}) => (
								<li key={href} className="nav-secondary__item">
									<Link
										href={href}
										className={`nav-primary__link${pathname === href ? ' active' : ''}`}
									>
										{label}
									</Link>
								</li>
							))}

							{/* Anmelden/Abmelden – erscheint im mobilen Menü ganz unten */}
							<li>
								<Link
									href={currentUser ? '/logoff' : '/login'}
									className="btn-auth"
								>
									{currentUser ? 'Abmelden' : 'Anmelden'}
								</Link>
							</li>
						</ul>
					</nav>

					{/* Hamburger-Button – nur auf Mobile sichtbar */}
					<button
						className={`hamburger${menuOpen ? ' is-open' : ''}`}
						onClick={() => setMenuOpen(!menuOpen)}
						aria-label={menuOpen ? 'Menü schließen' : 'Menü öffnen'}
						aria-expanded={menuOpen}
						aria-controls="primary-nav"
					>
						<span className="hamburger__line" />
						<span className="hamburger__line" />
						<span className="hamburger__line" />
					</button>
				</div>
			</header>

			{/* ── Sekundäre Navigation (nur eingeloggt) ── */}
			{currentUser && (
				<nav className="nav-secondary" aria-label="Benutzer-Navigation">
					<div className="container nav-secondary__inner">
						<ul className="nav-secondary__list">
							{subNavLinks.map(({ href, label }) => (
								<li key={href}>
									<Link
										href={href}
										className={`nav-secondary__link${pathname === href ? ' active' : ''}`}
									>
										{label}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</nav>
			)}
		</>
	);
}
