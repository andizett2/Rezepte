import de from './translations/de.json';
import en from './translations/en.json';
import fr from './translations/fr.json';

export type Locale = 'de' | 'en' | 'fr';
export type TranslationDictionary = Record<string, string>;

const translations: Record<Locale, TranslationDictionary> = {
	de,
	en,
	fr,
};

const isLocale = (value: string): value is Locale => value in translations;

export function getTranslations(locale: string): TranslationDictionary {
	return isLocale(locale) ? translations[locale] : translations.de;
}

export function getTranslation(key: string, locale: string): string | undefined {
	return getTranslations(locale)[key];
}
