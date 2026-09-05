import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';

// Cross-page navigation (static pages under public/, served extensionless via vercel.json)
const pageLinks = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/web-development', label: 'Web Dev' },
  { href: '/ecommerce-development', label: 'E-Commerce' },
  { href: '/tutoring', label: 'Tutoring' },
  { href: '/blog', label: 'Blog' },
];

const Header = ({ onSectionChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNavClick = (sectionId) => {
    onSectionChange(sectionId);
    setIsMenuOpen(false);
  };

  // Desktop Header
  if (!isMobile) {
    return (
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 right-0 left-0 z-40 px-8 py-4"
        style={{ marginLeft: '80px' }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="relative">
            {/* Animated Border Effect - Outer Glow */}
            <motion.div
              className="absolute -inset-[2px] rounded-2xl"
              animate={{
                opacity: [0.4, 0.9, 0.4],
                background: [
                  'linear-gradient(90deg, #ff6d00, #9d4edd, #ff6d00, #9d4edd)',
                  'linear-gradient(270deg, #ff6d00, #9d4edd, #ff6d00, #9d4edd)',
                  'linear-gradient(90deg, #ff6d00, #9d4edd, #ff6d00, #9d4edd)',
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{
                borderRadius: '1rem',
                filter: 'blur(3px)',
              }}
            />

            {/* Main Header Container */}
            <motion.div
              className="relative rounded-2xl px-6 py-3"
              animate={{
                borderColor: [
                  'rgba(255, 109, 0, 0.4)',
                  'rgba(157, 78, 221, 0.4)',
                  'rgba(255, 109, 0, 0.4)',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{
                background: 'linear-gradient(90deg, rgba(36, 0, 70, 0.95) 0%, rgba(60, 9, 108, 0.9) 100%)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 109, 0, 0.3)',
              }}
            >
              {/* Animated inner border line */}
              <motion.div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                animate={{
                  boxShadow: [
                    'inset 0 0 10px rgba(255, 109, 0, 0.1)',
                    'inset 0 0 20px rgba(157, 78, 221, 0.2)',
                    'inset 0 0 10px rgba(255, 109, 0, 0.1)',
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              <div className="flex items-center justify-between gap-4">
                {/* Logo and Name with Rotating Animation */}
                <motion.div
                  className="flex items-center gap-3 cursor-pointer group flex-shrink-0"
                  onClick={() => handleNavClick('hero')}
                  whileHover={{ scale: 1.02 }}
                >
                  <motion.div
                    className="relative"
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  >
                    <div className="w-8 h-8 flex items-center justify-center">
                      <img src='logo.png' alt="Saqlain Amin logo" />
                    </div>
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      animate={{
                        boxShadow: [
                          '0 0 5px rgba(255, 109, 0, 0.3)',
                          '0 0 15px rgba(157, 78, 221, 0.5)',
                          '0 0 5px rgba(255, 109, 0, 0.3)',
                        ],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                  </motion.div>
                  
                  <div>
                    <span className="block font-['Playfair_Display'] text-xl font-bold text-white">
                      Saqlain Amin
                    </span>
                    <p className="text-[10px] text-retro-orange-5">Web &amp; E-Commerce Developer · IT Educator</p>
                  </div>
                </motion.div>

                {/* Cross-page nav links */}
                <nav className="hidden lg:flex items-center gap-5">
                  {pageLinks.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      className="text-[11px] tracking-[0.14em] uppercase text-white/75 hover:text-retro-orange-5 transition-colors whitespace-nowrap"
                      style={{ fontFamily: '"Space Mono", monospace', textDecoration: 'none' }}
                    >
                      {l.label}
                    </a>
                  ))}
                </nav>

                {/* Desktop Hire Me Button */}
                <a href="/hire" style={{ textDecoration: 'none' }} className="flex-shrink-0">
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative group flex items-center gap-2.5 px-6 py-2.5 rounded-full overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, #3c096c 0%, #ff6d00 130%)",
                    border: "1px solid rgba(255,109,0,0.4)",
                    color: "#fff",
                    fontSize: "12px",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    fontFamily: '"Space Mono", monospace',
                    cursor: "pointer",
                    boxShadow: "0 0 28px rgba(255,109,0,0.22), inset 0 1px 0 rgba(255,255,255,0.09)",
                  }}
                >
                  <motion.span
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.13) 50%, transparent 70%)",
                      backgroundSize: "300% 100%",
                    }}
                    animate={{ backgroundPosition: ["300% 0", "-300% 0"] }}
                    transition={{ duration: 2.6, repeat: Infinity, ease: "linear" }}
                  />
                  <span className="relative z-10">Hire Me</span>
                  <ArrowRight size={12} className="relative z-10 opacity-60 transition-transform group-hover:translate-x-0.5" />
                </motion.button>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.header>
    );
  }

  // Mobile Header — matches the standalone content pages (sticky top bar)
  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: 'rgba(36, 0, 70, 0.97)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255, 109, 0, 0.25)',
      }}
    >
      <div className="flex items-center gap-3 px-4 py-3">
        {/* Brand */}
        <button
          onClick={() => handleNavClick('hero')}
          className="flex items-center gap-2"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          <img src="/favicon-96x96.png" alt="Saqlain Amin logo" width="24" height="24" />
          <span className="font-['Playfair_Display'] text-base font-bold text-white">Saqlain Amin</span>
        </button>

        {/* Burger */}
        <button
          onClick={() => setIsMenuOpen((o) => !o)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="ml-auto w-9 h-9 rounded-lg flex items-center justify-center"
          style={{ background: 'rgba(255, 109, 0, 0.12)', border: '1px solid rgba(255, 109, 0, 0.3)' }}
        >
          {isMenuOpen
            ? <X size={18} className="text-retro-orange-5" />
            : <Menu size={18} className="text-retro-orange-5" />}
        </button>
      </div>

      {/* Dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            style={{ borderTop: '1px solid rgba(255, 109, 0, 0.15)' }}
          >
            <div className="flex flex-col pb-4">
              {pageLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-3.5 text-white/85 hover:text-retro-orange-5 transition-colors"
                  style={{
                    fontFamily: '"Space Mono", monospace',
                    fontSize: '0.8rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                  }}
                >
                  {item.label}
                </a>
              ))}
              <a
                href="/hire"
                onClick={() => setIsMenuOpen(false)}
                className="mx-4 mt-3 py-2.5 rounded-full text-center text-white"
                style={{
                  background: 'linear-gradient(135deg, #3c096c 0%, #ff6d00 130%)',
                  border: '1px solid rgba(255, 109, 0, 0.4)',
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '0.8rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                }}
              >
                Hire Me
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;