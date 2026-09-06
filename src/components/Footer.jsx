// Same footer markup/classes as the standalone content pages.
// Styles come from public/site-nav.css (loaded in index.html).
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="foot-wrap">
        <div className="fn">Saqlain Amin</div>
        <nav className="foot-links">
          <a href="/">Home</a>
          <a href="/projects">Projects</a>
          <a href="/web-development">Web Development</a>
          <a href="/ecommerce-development">E-Commerce Development</a>
          <a href="/tutoring">IT Tutoring</a>
          <a href="/learn">Learn</a>
          <a href="/hire">Hire Me</a>
          <a href="/resume">Résumé</a>
        </nav>
        <p className="foot-meta">
          Full-stack &amp; e-commerce web developer and IT educator in Chitral, Pakistan. Available for
          web &amp; Next.js e-commerce projects and online computer science, Python &amp; IT tutoring
          worldwide.<br />
          <a href="mailto:saqlainamin646@gmail.com">saqlainamin646@gmail.com</a> ·{' '}
          <a href="https://wa.me/923275857692">WhatsApp</a> ·{' '}
          <a href="https://github.com/mrsaqlain75">GitHub</a> ·{' '}
          <a href="https://linkedin.com/in/saqlain-amin-99206b260">LinkedIn</a><br />
          © 2026 Saqlain Amin · Made in Chitral
        </p>
      </div>
    </footer>
  );
}
