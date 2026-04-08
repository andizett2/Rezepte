export default function Footer() {
	return (
		<>
			<footer className="footer">
				<div className="container footer__inner">
					<div className="footer__top">
						<div>
							<div className="footer__brand">Kochen für Nerds</div>
						</div>
						<div className="footer__links">
							<a href="/impressum" className="footer__link">Impressum</a>
							<a href="/ueber-mich" className="footer__link">Über mich</a>
						</div>
					</div>
					<p className="footer__copy">
						©2026 Kochen für Nerds. Alle Rechte vorbehalten.
					</p>
				</div>
			</footer>
		</>
	)
}