This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# Projektarbeit Andreas Zipfel
Dieses Projekt ist als Abschlussarbeit einer React-Schulung erstellt worden. Die Weiterbildung erfolgte bei alfatraining.de

## Beschreibung
Die erstellte Website ist ein Rezept-Fundus. Es soll im Speziellen Software-Entwickler ansprechen, die sich mit Kochen schwerer tun als ein Computerprogramm zu erstellen.

## Zielsetzung
Es sollen möglichst viele gelernte Inhalte ausprobiert und eingesetzt werden können. Das erstellt Projekt sollte schliesslich auch im Portfolio genutzt werden können.

## Technologie
Die Website ist als Nextjs-Projekt erstellt. Da Benutzerdaten und Bilder persistent abgelegt werden müssen, bietet das Framework die besten Möglichkeiten.
Für die Datenhaltung wird eine lokale CouchDB-Instanz genutzt.
Bilder werden im public-Ordner abgelegt.

## Aufbau und Inhalte der Website
### Startseite
Hier wird ein kuzer Einleitungstext angezeigt und einige der neuesten Rezepte angeteased.

### Rezepte
Auf dieser Seite können alle Rezepte gefunden werden. Es kann nach Kategorien gefiltert werden.

### Kontakt
Hier finden sich die Kontaktdaten und ein Feedback-Formular.

### Impressum und AGB
Sind die bekannten Textseiten.

### Login / Registrierung 
Um ein Rezept erstellen zu können, ist eine Registration notwendig. 
In dieser Anwendung genügt eine E-Mail-Adresse und ein Passwort. Auf Funktionen wie _Passwort vergessen_ oder _Passwort ändern_ wird verzichtet.

### Administratoren 
Bei Usern, die als Administrator geführt sind, werden weitere Funktionen angezeigt. Das betrifft z.B. Neueinlesen der Testdaten.

## JSON-Strukturen

Benutzer
```
user
├── _id            <- E-Mail
├── type           <- user
├── firstname 	   
├── lastname 
├── email
├── slogan
├── isadmin
├── password
└── created_at     <- date

```

Rezept
```
recipe
├── id
├── type           <- recipe
├── title
├── ingredients[] 
│   ├── amount     <- numeric
│   ├── unit
│   └── name
├── steps[]
├── description
├── created_at     <- date
└── author
```
---


## Getting Started ( als Originaltext nach Setup )

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
