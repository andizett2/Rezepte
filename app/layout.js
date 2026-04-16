import '@/styles/globals.css';
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css"; // Importiere die globale CSS-Datei
import LoginButton from "../components/LoginButton";
import AdminNav from "../components/AdminNav";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

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

export default async function RootLayout({ children }) {

	// Session serverseitig lesen – kein Re-Render, kein Client-Code nötig
	const session = await getServerSession(authOptions);
	const isLoggedIn = !!session?.user;

	return (
		<html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} data-scroll-behavior="smooth">
			<body className="flex flex-col min-h-screen"> {/* Flexbox für Sticky Footer */}
				<Providers>
					<Header isLoggedIn={isLoggedIn} />

					<main className="flex-grow"> {/* Nimmt den verfügbaren Platz ein */}
						{children}
					</main>
					<Footer/>
				</Providers>
			</body>
		</html>
	);
}
