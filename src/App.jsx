import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Hero from './components/Hero';

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
        
        <section id="stack" className="min-h-screen bg-gray-50">
          <div className="md:pl-24 px-4 md:px-8 py-20 h-full">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-['Playfair_Display'] font-bold text-retro-purple-1">My Stack</h2>
            </div>
          </div>
        </section>
        
        <section id="journey" className="min-h-screen">
          <div className="md:pl-24 px-4 md:px-8 py-20 h-full">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-['Playfair_Display'] font-bold text-retro-purple-1">My Journey</h2>
            </div>
          </div>
        </section>
        
        <section id="portfolio" className="min-h-screen bg-gray-50">
          <div className="md:pl-24 px-4 md:px-8 py-20 h-full">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-['Playfair_Display'] font-bold text-retro-purple-1">Portfolio</h2>
            </div>
          </div>
        </section>
        
        <section id="testimonials" className="min-h-screen">
          <div className="md:pl-24 px-4 md:px-8 py-20 h-full">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-['Playfair_Display'] font-bold text-retro-purple-1">Testimonials</h2>
            </div>
          </div>
        </section>
        
        <section id="connect" className="min-h-screen bg-gray-50">
          <div className="md:pl-24 px-4 md:px-8 py-20 h-full">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-['Playfair_Display'] font-bold text-retro-purple-1">Connect</h2>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;