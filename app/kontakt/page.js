'use client'
export default function Kontakt() {
	return (
		<>
			<div className="container">
				<h1>📢 Deine Fragen, Ideen & Feedback</h1>

				<p>Hast du eine <strong>geniale Rezept-Idee</strong>, die wir unbedingt auf unserer Seite veröffentlichen sollten? Möchtest du uns <strong>Feedback</strong> geben oder hast du eine Frage zum Projekt? Oder vielleicht eine <strong>Zusammenarbeit</strong> mit uns im Sinn?</p>

				<p>Wir freuen uns über jeden Kontakt und versuchen, so schnell wie möglich zu antworten. Hier findest du alle Möglichkeiten, uns zu erreichen:</p>

				<div className="contact-method">
					<h2>📧 E-Mail</h2>
					<p>Schreib uns eine <strong>direkte Nachricht</strong> an:</p>
					<p><strong>👉 <a href="" onClick={(e)=>{alert('Tut mir leid. Der Teilnehmer ist momentan nicht erreichbar')}}>kontakt@rezepte-iota.de</a></strong></p>
					<p>Wir ignorieren deine Antwort 24/7</p>
				</div>

				<div className="contact-method">
					<h2>💬 Kontaktformular</h2>
					<p>Nutze einfach unser <strong>unteres Kontaktformular</strong>, um uns eine Nachricht zu schicken. Gib uns gerne so viele Details wie möglich – wir freuen uns über jedes Feedback!</p>
				</div>

				<div className="contact-method">
					<h2>📌 Was uns interessiert:</h2>
					<ul>
						<li><strong>Rezeptvorschläge</strong> (besonders mit technischem Twist!)</li>
						<li><strong>Fehlerberichte</strong> (z. B. kaputte Links, falsche Angaben)</li>
						<li><strong>Fragen zur Website</strong> (Funktionen, Bedienung)</li>
						<li><strong>Kooperationsanfragen</strong> (z. B. Food-Blogger, Entwickler)</li>
						<li><strong>Allgemeines Feedback</strong> (Was gefällt dir? Was könnte besser sein?)</li>
					</ul>
				</div>

				<div className="contact-method">
					<h2>🤝 Warum mit uns Kontakt aufnehmen?</h2>
					<ul>
						<li>✅ <strong>Wir lieben kulinarische Experimente</strong> – besonders, wenn Code oder Technik im Spiel ist!</li>
						<li>✅ <strong>Deine Rezepte könnten auf unserer Seite erscheinen</strong> (mit deinem Namen und Link).</li>
						<li>✅ <strong>Wir sind offen für neue Ideen</strong> – vielleicht entsteht daraus ein gemeinsames Projekt.</li>
					</ul>
				</div>

				<div className="contact-method">
					<h2>⚠️ Wichtig zu wissen:</h2>
					<ul>
						<li><strong>Keine Spam-Nachrichten</strong>, bitte! Wir behalten uns vor, unangemessene Inhalte zu ignorieren oder zu löschen.</li>
						<li><strong>Persönliche Daten</strong> werden vertraulich behandelt und nicht an Dritte weitergegeben.</li>
						<li><strong>Keine Support-Anfragen für externe Projekte</strong> – wir konzentrieren uns auf unsere Rezept-Plattform.</li>
					</ul>
				</div>

				<div className="contact-method">
					<h2>📅 Erwartete Antwortzeit</h2>
					<p>Wir bemühen uns, innerhalb von <strong>1–2 Werktagen</strong> zu antworten. Bei dringenden Anfragen (z. B. Kooperationen) priorisieren wir diese.</p>
				</div>

				<div className="contact-method">
					<h2>📝 Beispiel-Nachrichten, die wir gerne beantworten:</h2>
					<ul>
						<li><strong>Hallo! Ich habe ein Rezept für &laquo;Programmierer-Pizza&raquo; mit einer Zutatenliste in JSON-Format. Könntet ihr das testen und veröffentlichen?</strong></li>
						<li><strong>Euer Kontaktformular zeigt einen Fehler an, wenn ich Sonderzeichen eingebe. Hier ist der Screenshot: [Link].</strong></li>
						<li><strong>Ich möchte euch ein Rezept für &laquo;Debugging-Desserts&raquo; vorschlagen – es basiert auf Algorithmen! 😄</strong></li>
					</ul>
				</div>

				<p className="tip">💡 <strong>Tipp:</strong> Falls du ein Rezept einreichen möchtest, nutze am besten unser <a href="#contact-form"><strong>Rezept-Formular</strong></a> oder schick uns eine E-Mail mit:
					<ul>
						<li>Titel des Rezepts</li>
						<li>Zutatenliste</li>
						<li>Zubereitungsschritten</li>
						<li>Optional: Einem Foto des Gerichts</li>
					</ul>
				</p>

				<p>Wir freuen uns auf deine kreativen Ideen! 🍳💻</p>

			</div>

		</>
	)
}