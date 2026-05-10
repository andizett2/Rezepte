import Link from 'next/link';

export default function Footer() {
	return (
		<>
			<footer className="mt-10 bg-(--background-dark) py-6 text-white">
				<div className="container mx-auto px-4">
					<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-6">
						<div>
							<div className="text-lg font-semibold">Kochen für Nerds</div>
						</div>
						<div className="flex items-center gap-6">
							<Link href="/impressum" className="text-sm text-white/80 hover:text-white">
								Impressum
							</Link>
							<Link href="/ueber-mich" className="text-sm text-white/80 hover:text-white">
								Über mich
							</Link>
						</div>
						<div className="text-sm text-white/70 md:text-right">©2026 Kochen für Nerds. Alle Rechte vorbehalten.</div>
					</div>
				</div>
			</footer>
		</>
	);
}
