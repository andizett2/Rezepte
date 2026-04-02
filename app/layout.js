import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css"; // Importiere die globale CSS-Datei
import LoginButton from "../components/LoginButton";
import AdminNav from "../components/AdminNav";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata = {
	title: "Projektarbeit",
	description: "Projektarbeit von Andreas Zipfel mit React und Next.js",
};

export default function RootLayout({ children }) {

	return (
		<html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
			<body className="flex flex-col min-h-screen"> {/* Flexbox für Sticky Footer */}
				<header>
					<nav>
						<div className="logo">
							<Link href="/">Kochrezepte</Link> {/* Logo als Link zur Startseite */}
						</div>
						<ul className="main-nav">
							<li><Link href="/rezepte">Rezepte</Link></li>
							<li><Link href="/kategorien">Kategorien</Link></li>
							<li><Link href="/kontakt">Kontakt</Link></li>
						</ul>
						<LoginButton />
					</nav>
					<AdminNav/>
				</header>
				<main className="flex-grow"> {/* Nimmt den verfügbaren Platz ein */}
					{children}
				</main>
				<footer>
					<p>&copy; 2026 Kochrezepte für ProgrammiererInnen. Alle Rechte vorbehalten.</p>
					<div className="footer-links">
						<Link href="/impressum">Impressum</Link>
						<Link href="/ueber-mich">Über mich</Link>
					</div>
				</footer>
			</body>
		</html>
	);
}
