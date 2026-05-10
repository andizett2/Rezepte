'use client';

import type { MouseEvent } from 'react';

export default function Kontakt() {
	const showUnavailableAlert = (e: MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		alert('Tut mir leid. Der Teilnehmer ist momentan nicht erreichbar');
	};

	return (
		<>
			<div className="container mx-auto mb-10 max-w-4xl rounded-(--border-radius-md) bg-(--background-light) px-6 py-10 shadow-(--box-shadow-light)">
				<h1 className="text-3xl">📢 Deine Fragen, Ideen & Feedback</h1>

				<p className="my-4">
					Hast du eine <strong>geniale Rezept-Idee</strong>, die wir unbedingt auf unserer Seite veröffentlichen sollten? Möchtest du uns <strong>Feedback</strong> geben oder hast du eine Frage zum Projekt? Oder vielleicht eine <strong>Zusammenarbeit</strong> mit uns im Sinn?
				</p>

				<p className="my-4">
					Wir freuen uns über jeden Kontakt und versuchen, so schnell wie möglich zu antworten. Hier findest du alle Möglichkeiten, uns zu erreichen:
				</p>

				<div className="contact-method my-6">
					<h2 className="text-2xl">📧 E-Mail</h2>
					<p className="my-2">Schreib uns eine <strong>direkte Nachricht</strong> an:</p>
					<p className="my-2">
						<strong>
							👉{' '}
							<a href="" onClick={showUnavailableAlert}>
								kontakt@rezepte-iota.de
							</a>
						</strong>
					</p>
					<p className="my-2">Wir ignorieren deine Antwort 24/7</p>
				</div>

				<div className="contact-method my-6">
					<h2 className="text-2xl">💬 Kontaktformular</h2>
					<p className="my-4">
						Nutze einfach unser <strong>unteres Kontaktformular</strong>, um uns eine Nachricht zu schicken. Gib uns gerne so viele Details wie möglich – wir freuen uns über jedes Feedback!
					</p>
				</div>

				<div className="contact-method my-6">
					<h2 className="text-2xl">📌 Was uns interessiert:</h2>
					<ul>
						<li><strong>Rezeptvorschläge</strong> (besonders mit technischem Twist!)</li>
						<li><strong>Fehlerberichte</strong> (z. B. kaputte Links, falsche Angaben)</li>
						<li><strong>Fragen zur Website</strong> (Funktionen, Bedienung)</li>
						<li><strong>Kooperationsanfragen</strong> (z. B. Food-Blogger, Entwickler)</li>
						<li><strong>Allgemeines Feedback</strong> (Was gefällt dir? Was könnte besser sein?)</li>
					</ul>
				</div>

				<div className="contact-method my-6">
					<h2 className="text-2xl">🤝 Warum mit uns Kontakt aufnehmen?</h2>
					<ul>
						<li>✅ <strong>Wir lieben kulinarische Experimente</strong> – besonders, wenn Code oder Technik im Spiel ist!</li>
						<li>✅ <strong>Deine Rezepte könnten auf unserer Seite erscheinen</strong> (mit deinem Namen und Link).</li>
						<li>✅ <strong>Wir sind offen für neue Ideen</strong> – vielleicht entsteht daraus ein gemeinsames Projekt.</li>
					</ul>
				</div>

				<div className="contact-method my-6">
					<h2 className="text-2xl">⚠️ Wichtig zu wissen:</h2>
					<ul>
						<li><strong>Keine Spam-Nachrichten</strong>, bitte! Wir behalten uns vor, unangemessene Inhalte zu ignorieren oder zu löschen.</li>
						<li><strong>Persönliche Daten</strong> werden vertraulich behandelt und nicht an Dritte weitergegeben.</li>
						<li><strong>Keine Support-Anfragen für externe Projekte</strong> – wir konzentrieren uns auf unsere Rezept-Plattform.</li>
					</ul>
				</div>

				<div className="contact-method my-6">
					<h2 className="text-2xl">📅 Erwartete Antwortzeit</h2>
					<p className="my-2">Wir bemühen uns.</p>
				</div>

				<div className="contact-method my-6">
					<h2 className="text-2xl">📝 Beispiel-Nachrichten, die wir gerne beantworten:</h2>
					<ul>
						<li><strong>Hallo! Ich habe ein Rezept für &laquo;Programmierer-Pizza&raquo; mit einer Zutatenliste in JSON-Format. Könntet ihr das testen und veröffentlichen?</strong></li>
						<li><strong>Euer Kontaktformular zeigt einen Fehler an, wenn ich Sonderzeichen eingebe. Hier ist der Screenshot: [Link].</strong></li>
						<li><strong>Ich möchte euch ein Rezept für &laquo;Debugging-Desserts&raquo; vorschlagen – es basiert auf Algorithmen! 😄</strong></li>
					</ul>
				</div>

				<div className="tip my-6">
					💡 <strong>Tipp:</strong> Falls du ein Rezept einreichen möchtest, nutze am besten unser <a href="#contact-form"><strong>Rezept-Formular</strong></a> oder schick uns eine E-Mail mit:
					<ul>
						<li>Titel des Rezepts</li>
						<li>Zutatenliste</li>
						<li>Zubereitungsschritten</li>
						<li>Optional: Einem Foto des Gerichts</li>
					</ul>
				</div>

				<p className="my-4">Wir freuen uns auf deine kreativen Ideen!</p>
			</div>
		</>
	);
}
