import '@/styles/globals.css';
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css"; // Importiere die globale CSS-Datei
import LoginButton from "../components/LoginButton";
import AdminNav from "../components/AdminNav";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
				<Header isLoggedIn={true} />

				<main className="flex-grow"> {/* Nimmt den verfügbaren Platz ein */}
					{children}
				</main>
				<Footer/>
			</body>
		</html>
	);
}
