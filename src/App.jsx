import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Stack from './components/Stack';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';

function App() {
  const [activeSection, setActiveSection] = useState('hero');

  const handleSectionChange = (sectionId) => {
  setActiveSection(sectionId);
  const element = document.getElementById(sectionId);
  if (element) {
    // Get navbar height (approximately 80px)
    const navbarHeight = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - navbarHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

useEffect(() => {
  const sections = ['hero', 'services', 'stack', 'portfolio', 'testimonials', 'connect'];
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    },
    { threshold: 0.2, rootMargin: '-50px 0px 0px 0px' }
  );

  sections.forEach((section) => {
    const element = document.getElementById(section);
    if (element) {
      observer.observe(element);
    }
  });

  return () => observer.disconnect();
}, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar activeSection={activeSection} onSectionChange={handleSectionChange} />
      <Header />

      <main>
        <section id="hero">
          <Hero />
        </section>

        <section id="services" aria-label="Services">
          <h2 className="sr-only">
            Services — full-stack web &amp; mobile development, e-commerce websites, and IT tutoring in Chitral
          </h2>
          <Services />
        </section>

        <section id="stack" aria-label="Tech stack">
          <h2 className="sr-only">
            Tech stack — React, Next.js, TypeScript, Node.js, Prisma, PostgreSQL, React Native
          </h2>
          <Stack />
        </section>

        <section id="portfolio" aria-label="Portfolio">
          <h2 className="sr-only">
            Portfolio — full-stack, e-commerce and mobile projects built for clients in Chitral and worldwide
          </h2>
          <Portfolio />
        </section>

        <section id="testimonials" aria-label="Testimonials">
          <h2 className="sr-only">
            Testimonials from web development clients and computer science &amp; Python tutoring students
          </h2>
          <Testimonials />
        </section>

        <section id="connect" aria-label="Contact">
          <h2 className="sr-only">
            Contact Saqlain Amin — hire a web developer in Chitral or book online IT &amp; Python tutoring
          </h2>
          <Contact />
        </section>

        <Footer />
        <WhatsAppFloat />
      </main>
    </div>
  );
}

export default App;
