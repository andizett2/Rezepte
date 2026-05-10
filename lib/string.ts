/**
 * Extrahiert die ersten Zeichen eines Textes bis zum letzten Leerzeichen/Satzzeichen,
 * ohne Wörter zu zerschneiden. Optional mit Auslassungspunkten.
 */
export const truncateText = (
	text: string,
	maxLength: number = 200,
	addEllipsis: boolean = true,
): string => {
	if (!text || text.length <= maxLength) {
		return text;
	}

	// Letztes Leerzeichen oder Satzzeichen vor maxLength finden
	const lastSpace = text.lastIndexOf(' ', maxLength);
	const lastPunctuation = Math.max(
		text.lastIndexOf('.', maxLength),
		text.lastIndexOf(',', maxLength),
		text.lastIndexOf(';', maxLength),
		text.lastIndexOf(':', maxLength),
		text.lastIndexOf('!', maxLength),
		text.lastIndexOf('?', maxLength),
	);

	// Position zum Abschneiden bestimmen (priorisiere Satzzeichen vor Leerzeichen)
	const cutPosition = Math.max(lastPunctuation, lastSpace);

	if (cutPosition === -1) {
		// Falls kein Leerzeichen/Satzzeichen gefunden wurde, einfach bei maxLength schneiden
		return `${text.substring(0, maxLength).trim()}${addEllipsis ? '...' : ''}`;
	}

	// Text bis zur gefundenen Position kürzen und ggf. Auslassungspunkte hinzufügen
	const truncated = text.substring(0, cutPosition).trim();

	return addEllipsis ? `${truncated}...` : truncated;
};
