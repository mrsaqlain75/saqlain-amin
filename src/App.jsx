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
  const sections = ['hero', 'stack', 'journey', 'portfolio', 'testimonials', 'connect'];
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
        
        <section id="stack">
          <Stack />
        </section>
        
        <section id="journey">
          <Journey />
        </section>
        
        <section id="portfolio">
          <Portfolio />
        </section>
        
        <section id="testimonials">
          <Testimonials />
        </section>
        
        <section id="connect">
          <Contact />
        </section>
        
        <Footer />
        <WhatsAppFloat />
      </main>
    </div>
  );
}

export default App;