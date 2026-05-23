import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Hero from './components/Hero';
import Stack from './Components/Stack';
import Journey from './Components/Journey';
import Portfolio from './components/Portfolio';
import Testimonials from './Components/Testimonials';
import Contact from './Components/Contact';
import Footer from './Components/Footer';

function App() {
  const [activeSection, setActiveSection] = useState('hero');

  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    const sections = ['hero', 'stack', 'journey', 'portfolio', 'testimonials', 'connect'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-80px 0px 0px 0px' }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar activeSection={activeSection} onSectionChange={handleSectionChange} />
      <Header onSectionChange={handleSectionChange} />
      
      {/* No padding on main - each section handles its own */}
      <main>
        <section id="hero" className="min-h-screen">
          <Hero />
        </section>
        
        <section id="stack">
          <Stack />
        </section>
        
        <section id="journey" className="min-h-screen">
          <Journey />
        </section>
        
        <section id="portfolio" className="">
          <Portfolio />
        </section>
        
        <section id="testimonials" className="">
          <Testimonials />
        </section>
        
        <section id="connect" className="">
          <Contact />
        </section>
        <Footer />
      </main>
    </div>
  );
}

export default App;