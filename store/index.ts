import { create } from 'zustand';
import type { AppUser } from '@/types/user';

export interface AppStore {
	currentUser: AppUser | null;
	setCurrentUser: (user: AppUser | null) => void;
	locale: string;
	setLocale: (locale: string) => void;
}

export const useStore = create<AppStore>((set) => ({
	// Hier wird der angemeldete Benutzer gehalten (E-Mail)
	currentUser: null,
	setCurrentUser: (user) => {
		set({ currentUser: user });
	},
	locale: 'de',
	setLocale: (locale) => {
		set({ locale });
	},
}));
