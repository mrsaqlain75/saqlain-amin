import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Header from './components/Header';

function App() {
  const [activeSection, setActiveSection] = useState('hero');

  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Scroll spy to update active section
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
      
      {/* Main Content Area with left padding for navbar on desktop */}
      <main className="md:ml-24">
        {/* Section spacers */}
        <div className="pt-24 md:pt-32" />
        
        {/* Hero Section */}
        <section id="hero" className="min-h-screen px-4 md:px-8 py-20">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-['Playfair_Display'] font-bold text-retro-purple-1 text-center">
              Hero Section Content
            </h1>
            <p className="text-retro-purple-3 text-center mt-4">Light background content</p>
          </div>
        </section>
        
        {/* Stack Section */}
        <section id="stack" className="min-h-screen px-4 md:px-8 py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-['Playfair_Display'] font-bold text-retro-purple-1">My Stack</h2>
          </div>
        </section>
        
        {/* Journey Section */}
        <section id="journey" className="min-h-screen px-4 md:px-8 py-20">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-['Playfair_Display'] font-bold text-retro-purple-1">My Journey</h2>
          </div>
        </section>
        
        {/* Portfolio Section */}
        <section id="portfolio" className="min-h-screen px-4 md:px-8 py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-['Playfair_Display'] font-bold text-retro-purple-1">Portfolio</h2>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section id="testimonials" className="min-h-screen px-4 md:px-8 py-20">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-['Playfair_Display'] font-bold text-retro-purple-1">Testimonials</h2>
          </div>
        </section>
        
        {/* Connect Section */}
        <section id="connect" className="min-h-screen px-4 md:px-8 py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-['Playfair_Display'] font-bold text-retro-purple-1">Connect</h2>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;