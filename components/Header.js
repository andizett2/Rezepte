// components/Header.jsx
'use client'; // Next.js App Router – useState braucht eine Client Component
import "tailwindcss";
import Image from "next/image";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useStore } from "../store/index";
import AdminNav from "./AdminNav";


export default function Header() {

	const currentUser = useStore(state => state.currentUser);
	const isAdmin = currentUser && currentUser.isadmin;

	// menuOpen wird beim Pfadwechsel automatisch zurückgesetzt,
	// weil pathname als Key im State-Initializer wirkt.
	const pathname = usePathname();
	const [menuOpen, setMenuOpen] = useState(false);
	const [lastPathname, setLastPathname] = useState(pathname);

	if (pathname !== lastPathname) {
		setLastPathname(pathname);
		setMenuOpen(false);
	}

	function toggleMenuOpen(e) {
		e.preventDefault();
		setMenuOpen(!menuOpen);
	}

	// Scrollen des Body sperren wenn Menü offen ist
	useEffect(() => {
		document.body.style.overflow = menuOpen ? 'hidden' : '';
		console.log('Menu open:', menuOpen);
		document.getElementById('mobileMenu').classList.toggle('hidden', !menuOpen);

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
			<header className="bg-white text-gray-800 shadow-md relative z-50">
				{/* Main Navigation */}
				<div className="container mx-auto px-4">
					<div className="flex items-center justify-between h-16">
						<div className="flex items-center space-x-4">

							{/* Logo */}
							<Link href="/" className="">
								<Image width="150" height="150" src="/logo_kfn.png" alt="Kochrezepte Logo" className="mt-16.25" />
							</Link>

							{/* Primäre Desktop-Nav */}
							<nav className="hidden md:flex space-x-6">
								{navLinks.map(({ href, label }) => (
									<Link
										key={href}
										href={href}
										className={`hover:text-gray-600 ${pathname === href ? ' active' : ''}`}
									>
										{label}
									</Link>
								))}
							</nav>
						</div>
						<button className="hidden md:block bg-primary text-white px-5 py-2 rounded-2xl hover:bg-orange-700 focus:outline-none">

							<Link
								href={currentUser ? '/logoff' : '/login'}
								className="hover:text-gray-200"
							>
								{currentUser ? 'Abmelden' : 'Anmelden'}
							</Link>
						</button>
						{/* Hamburger */}
						<button
							id="menuBtn"
							className="md:hidden focus:outline-none"
							onClick={toggleMenuOpen}
						>
							<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
								viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
									d="M4 6h16M4 12h16M4 18h16" />
							</svg>
						</button>
					</div>
				</div>

				{/* Sub Navigation (Desktop) */}
				{currentUser && (
					<div id="sub-nav" className="hidden bg-gray-700 md:block">
						<div className="container mx-auto px-4 py-2 flex pl-50 space-x-6 min-h-6">
							{subNavLinks.map(({ href, label }) => (
								<Link
									key={href}
									className={`text-white ${pathname === href ? ' font-bold' : ''} hover:text-gray-300`}
									href={href}
								>
									{label}
								</Link>
							))}

						</div>
					</div>
				)}

				{/* Mobile Menu */}
				<div id="mobileMenu" className="hidden md:hidden bg-gray-100 absolute top-full left-0 w-full shadow-lg">
					<div className="px-4 py-4 space-y-2">
						{/* Main */}
						{navLinks.map(({ href, label }) => (
							<Link
								key={href}
								href={href}
								className={`block hover:text-gray-800 ${pathname === href ? ' active' : ''}`}
							>
								{label}
							</Link>
						))}

						{/* Sub */}
						{currentUser && (
							<>
								<hr className="border-gray-600 my-2" />
								{subNavLinks.map(({ href, label }) => (
									<Link
										key={href}
										href={href}
										className={`block hover:text-gray-800 ${pathname === href ? ' active' : ''}`}
									>
										{label}
									</Link>
								))}
							</>
						)}

						<hr className="border-gray-600 my-2" />

						{/* Anmelden/Abmelden – erscheint im mobilen Menü ganz unten */}

						<Link
							href={currentUser ? '/logoff' : '/login'}
							className="block hover:text-gray-800"
						>
							{currentUser ? 'Abmelden' : 'Anmelden'}
						</Link>
					</div>
				</div>
			</header>
		</>
	);
}
