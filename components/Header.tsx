'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, type MouseEvent } from 'react';
import { useSession } from 'next-auth/react';

interface NavLink {
	href: string;
	label: string;
}

export default function Header() {
	const { data: session, status } = useSession();
	const pathname = usePathname();
	const [menuOpen, setMenuOpen] = useState<boolean>(false);
	const isLoggedIn = status === 'authenticated';

	// Scrollen des Body sperren, wenn das mobile Menü offen ist.
	useEffect(() => {
		document.body.style.overflow = menuOpen ? 'hidden' : '';
		return () => {
			document.body.style.overflow = '';
		};
	}, [menuOpen]);

	const toggleMenuOpen = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setMenuOpen((prev) => !prev);
	};

	const closeMobileMenu = () => {
		setMenuOpen(false);
	};

	const navLinks: NavLink[] = [
		{ href: '/rezepte', label: 'Rezepte' },
		{ href: '/kontakt', label: 'Kontakt' },
	];

	const subNavLinks: NavLink[] = [
		{ href: '/rezepte/erfassung', label: '+ Rezept erstellen' },
		{ href: '/meine-rezepte', label: 'Meine Rezepte' },
		{ href: '/rezepte/favoriten', label: 'Favoriten' },
	];

	const showAuthAsLoggedIn = typeof isLoggedIn === 'boolean' && isLoggedIn;

	return (
		<>
			<header className="relative z-50 bg-white text-gray-800 shadow-md">
				<div className="container mx-auto px-4">
					<div className="flex h-16 items-center justify-between">
						<div className="flex items-center space-x-4">
							<Link href="/" className="">
								<Image width={150} height={150} src="/logo_kfn.png" alt="Kochrezepte Logo" className="mt-16.25" />
							</Link>

							<nav className="hidden space-x-6 md:flex">
								{navLinks.map(({ href, label }) => (
									<Link key={href} href={href} className={`hover:text-gray-600 ${pathname === href ? ' active' : ''}`}>
										{label}
									</Link>
								))}
							</nav>
						</div>

						<button className="hidden rounded-2xl bg-primary px-5 py-2 text-white hover:bg-orange-700 focus:outline-none md:block">
							<Link href={showAuthAsLoggedIn ? '/logoff' : '/login'} className="hover:text-gray-200">
								{showAuthAsLoggedIn ? 'Abmelden' : 'Anmelden'}
							</Link>
						</button>

						<button id="menuBtn" className="focus:outline-none md:hidden" onClick={toggleMenuOpen}>
							<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
							</svg>
						</button>
					</div>
				</div>

				{showAuthAsLoggedIn && (
					<div id="sub-nav" className="hidden bg-gray-700 md:block">
						<div className="container mx-auto flex min-h-6 space-x-6 px-4 py-2 pl-50">
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

				<div
					id="mobileMenu"
					className={`${menuOpen ? 'block' : 'hidden'} absolute top-full left-0 w-full bg-gray-100 shadow-lg md:hidden`}
				>
					<div className="space-y-2 px-4 py-4">
						{navLinks.map(({ href, label }) => (
							<Link
								key={href}
								href={href}
								className={`block hover:text-gray-800 ${pathname === href ? ' active' : ''}`}
								onClick={closeMobileMenu}
							>
								{label}
							</Link>
						))}

						{showAuthAsLoggedIn && (
							<>
								<hr className="my-2 border-gray-600" />
								{subNavLinks.map(({ href, label }) => (
									<Link
										key={href}
										href={href}
										className={`block hover:text-gray-800 ${pathname === href ? ' active' : ''}`}
										onClick={closeMobileMenu}
									>
										{label}
									</Link>
								))}
							</>
						)}

						<hr className="my-2 border-gray-600" />

						<Link
							href={showAuthAsLoggedIn ? '/logoff' : '/login'}
							className="block hover:text-gray-800"
							onClick={closeMobileMenu}
						>
							{showAuthAsLoggedIn ? 'Abmelden' : 'Anmelden'}
						</Link>
					</div>
				</div>
			</header>
		</>
	);
}
