import { create } from 'zustand';

// Zustand Store
export const useStore = create((set, get) => ({
	// Hier wird der angemeldete Benutzer gehalten ( E-Mail )
	currentUser: null,
	setCurrentUser: (user) => {
		set({ currentUser: user });
	},
	locale: "de",
	setLocale: (locale) => {
		set({locale: locale})
	}
}));
