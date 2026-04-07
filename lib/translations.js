// lib/translations.js
import de from './translations/de.json';
import en from './translations/en.json';
import fr from './translations/fr.json';

const translations = { de, en, fr };

export function getTranslations(locale) {
	return translations[locale] || translations.de; // Fallback auf Deutsch
}

export function getTranslation(key, locale) {
	return getTranslations(locale)[key];
}
