'use client'

/**
 * Thin wrapper um den next-auth SessionProvider.
 * Wird im Root-Layout gebraucht, damit Client-Komponenten (z.B. LoginButton)
 * mit useSession() auf die Session zugreifen können.
 *
 * Muss eine eigene Datei sein, weil app/layout.js eine Server-Component ist
 * und 'use client' nicht direkt enthalten darf.
 */
import { SessionProvider } from "next-auth/react";

export default function Providers({ children }) {
	return <SessionProvider>{children}</SessionProvider>;
}
