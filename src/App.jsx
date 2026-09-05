import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Hero from './components/Hero';
import Stack from './components/Stack';
import Journey from './components/Journey';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import Services from './components/Services';

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
  const sections = ['hero', 'services', 'stack', 'journey', 'portfolio', 'testimonials', 'connect'];
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log('Section visible:', entry.target.id); // Debug log
          setActiveSection(entry.target.id);
        }
      });
    },
    { threshold: 0.2, rootMargin: '-50px 0px 0px 0px' } // Reduced from 80px to 50px
  );

  sections.forEach((section) => {
    const element = document.getElementById(section);
    if (element) {
      console.log('Observing section:', section); // Debug log
      observer.observe(element);
    } else {
      console.log('Section not found:', section); // Debug log
    }
  });

  return () => observer.disconnect();
}, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar activeSection={activeSection} onSectionChange={handleSectionChange} />
      <Header onSectionChange={handleSectionChange} />
      
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

        <section id="journey" aria-label="Journey">
          <h2 className="sr-only">
            Saqlain Amin's journey — from first line of code to Head of Engineering and IT educator in Chitral
          </h2>
          <Journey />
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