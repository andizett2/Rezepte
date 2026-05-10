import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { getServerSession } from 'next-auth/next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Providers from '@/components/Providers';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import './globals.css';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Projektarbeit',
	description: 'Projektarbeit von Andreas Zipfel mit React und Next.js',
};

interface RootLayoutProps {
	children: ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
	// Session serverseitig lesen – kein Re-Render, kein Client-Code nötig.
	const session = await getServerSession(authOptions);
	const isLoggedIn = Boolean(session?.user);
	console.log( session, isLoggedIn );

	return (
		<html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} data-scroll-behavior="smooth">
			<body className="flex min-h-screen flex-col bg-orange-50">
				<Providers>
					<Header />
					<main className="container mx-auto grow px-4 py-8">{children}</main>
					<Footer />
				</Providers>
			</body>
		</html>
	);
}
