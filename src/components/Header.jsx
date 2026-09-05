import { useState } from 'react';

// Same header markup/classes as the standalone content pages.
// Styles come from public/site-nav.css (loaded in index.html).
const pageLinks = [
  { href: '/', label: 'Home', current: true },
  { href: '/projects', label: 'Projects' },
  { href: '/web-development', label: 'Web Dev' },
  { href: '/ecommerce-development', label: 'E-Commerce' },
  { href: '/tutoring', label: 'Tutoring' },
  { href: '/learn', label: 'Learn' },
];

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="nav-wrap">
        <a className="brand" href="/">
          <img src="/favicon-96x96.png" alt="Saqlain Amin logo" width="26" height="26" />
          <b>Saqlain Amin</b>
        </a>

        <button
          type="button"
          className="nav-burger"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? '✕' : '☰'}
        </button>

        <nav className={open ? 'nav-links open' : 'nav-links'}>
          {pageLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              aria-current={l.current ? 'page' : undefined}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a className="nav-cta" href="/hire" onClick={() => setOpen(false)}>
            Hire Me
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
