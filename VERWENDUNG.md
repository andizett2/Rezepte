# CSS-Verwendung – Kochrezepte

## Einbinden in Next.js

In deiner `app/layout.js` oder `pages/_app.js`:

```js
import '@/styles/globals.css';
```

---

## Header-Komponente (Beispiel)

```jsx
// components/Header.jsx
export default function Header({ isLoggedIn }) {
  return (
    <>
      <header className="header">
        <div className="container header__inner">

          {/* Logo */}
          <a href="/" className="header__logo">
            <img src="/logo_kfn.png" alt="Kochrezepte Logo" />
          </a>

          {/* Primäre Navigation */}
          <nav className="nav-primary">
            <ul className="nav-primary__list">
              <li><a href="/rezepte"    className="nav-primary__link">Rezepte</a></li>
              <li><a href="/kategorien" className="nav-primary__link">Kategorien</a></li>
              <li><a href="/kontakt"    className="nav-primary__link">Kontakt</a></li>
            </ul>

            {isLoggedIn
              ? <a href="/logout" className="btn-auth">Abmelden</a>
              : <a href="/login"  className="btn-auth">Anmelden</a>
            }
          </nav>
        </div>
      </header>

      {/* Sekundäre Navigation – nur wenn eingeloggt */}
      {isLoggedIn && (
        <nav className="nav-secondary">
          <div className="container nav-secondary__inner">
            <ul className="nav-secondary__list">
              <li><a href="/dashboard"       className="nav-secondary__link active">Dashboard</a></li>
              <li><a href="/meine-rezepte"   className="nav-secondary__link">Meine Rezepte</a></li>
              <li><a href="/rezept-erstellen" className="nav-secondary__link">+ Rezept erstellen</a></li>
              <li><a href="/favoriten"       className="nav-secondary__link">Favoriten</a></li>
              <li><a href="/profil"          className="nav-secondary__link">Profil</a></li>
            </ul>
          </div>
        </nav>
      )}
    </>
  );
}
```

---

## Footer-Komponente (Beispiel)

```jsx
// components/Footer.jsx
export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__top">
          <div>
            <div className="footer__brand">Kochen</div>
            <p className="footer__tagline">für Nerds</p>
          </div>
          <div className="footer__links">
            <a href="/impressum"  className="footer__link">Impressum</a>
            <a href="/ueber-mich" className="footer__link">Über mich</a>
          </div>
        </div>
        <p className="footer__copy">
          ©2026 Kochen für Nerds. Alle Rechte vorbehalten.
        </p>
      </div>
    </footer>
  );
}
```

---

## Rezeptkarte (Beispiel)

```jsx
// components/RecipeCard.jsx
export default function RecipeCard({ title, category, time, image, href }) {
  return (
    <a href={href} className="card">
      <div className="card__image-wrapper">
        <img src={image} alt={title} />
        <span className="card__category">{category}</span>
      </div>
      <div className="card__body">
        <h3 className="card__title">{title}</h3>
        <div className="card__meta">
          <span className="card__meta-item">⏱ {time} min</span>
        </div>
      </div>
    </a>
  );
}

// Grid-Nutzung auf einer Seite:
// <div className="card-grid">
//   {rezepte.map(r => <RecipeCard key={r.id} {...r} />)}
// </div>
```

---

## Hero-Sektion (Startseite)

```jsx
<section className="hero">
  <div className="container">
    <span className="hero__eyebrow">Willkommen</span>
    <h1 className="hero__title">
      Entdecke <em>leckere</em> Rezepte<br />für jeden Anlass
    </h1>
    <p className="hero__subtitle">
      Einfach kochen, besser essen – mit unserer wachsenden Rezeptsammlung.
    </p>
    <a href="/rezepte" className="btn btn--primary">Alle Rezepte</a>
  </div>
</section>
```

---

## Wichtige Utility-Klassen

| Klasse | Verwendung |
|--------|-----------|
| `.container` | Zentrierter Inhaltsbereich (max 1200px) |
| `.btn.btn--primary` | Hauptbutton (rot) |
| `.btn.btn--secondary` | Umriss-Button |
| `.card-grid` | Responsives Rezepte-Grid |
| `.category-grid` | Kategorie-Kacheln |
| `.page-header` | Seitenüberschrift mit Trennlinie |
| `.alert--success/error/info` | Feedback-Meldungen |
| `.form-group` + `.form-input` | Formularfelder |
