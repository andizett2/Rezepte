/**
 * Extrahiert die ersten Zeichen eines Textes bis zum letzten Leerzeichen/Satzzeichen,
 * ohne Wörter zu zerschneiden. Optional mit Auslassungspunkten.
 * @param {string} text - Der Eingabetext.
 * @param {number} maxLength - Maximale Zeichenlänge (Standard: 200).
 * @param {boolean} addEllipsis - Ob Auslassungspunkte hinzugefügt werden sollen (Standard: true).
 * @returns {string} Der gekürzte Text.
 */
export const truncateText = (text, maxLength = 200, addEllipsis = true) => {
	if (!text || text.length <= maxLength) {
		return text; // Kein Truncation nötig
	}

	// Letztes Leerzeichen oder Satzzeichen vor maxLength finden
	let lastSpace = text.lastIndexOf(' ', maxLength);
	let lastPunctuation = Math.max(
		text.lastIndexOf('.', maxLength),
		text.lastIndexOf(',', maxLength),
		text.lastIndexOf(';', maxLength),
		text.lastIndexOf(':', maxLength),
		text.lastIndexOf('!', maxLength),
		text.lastIndexOf('?', maxLength)
	);

	// Position zum Abschneiden bestimmen (priorisiere Satzzeichen vor Leerzeichen)
	const cutPosition = Math.max(lastPunctuation, lastSpace);

	if (cutPosition === -1) {
		// Falls kein Leerzeichen/Satzzeichen gefunden wurde, einfach bei maxLength schneiden
		return `${text.substring(0, maxLength).trim()}${addEllipsis ? '...' : ''}`;
	}

	// Text bis zur gefundenen Position kürzen und ggf. Auslassungspunkte hinzufügen
	let truncated = text.substring(0, cutPosition).trim();

	return addEllipsis ? `${truncated}...` : truncated;
};