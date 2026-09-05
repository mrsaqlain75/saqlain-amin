import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Zap, ArrowRight, Sparkles } from 'lucide-react';

const mobileNavItems = [
  { id: 'hero', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'stack', label: 'Stack' },
  { id: 'portfolio', label: 'Work' },
  { id: 'testimonials', label: 'Reviews' },
  { id: 'connect', label: 'Connect' },
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

  const handleConnectClick = () => {
    const connectSection = document.getElementById('connect');
    if (connectSection) {
      window.scrollTo({
        top: connectSection.offsetTop - 80,
        behavior: 'smooth'
      });
    }
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

              <div className="flex items-center justify-between">
                {/* Logo and Name with Rotating Animation */}
                <motion.div
                  className="flex items-center gap-3 cursor-pointer group"
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

                {/* Desktop Connect Button - FIXED */}
                <a href="#connect" style={{ textDecoration: 'none' }}>
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
                  <span className="relative z-10">Connect</span>
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

  // Mobile Header
  return (
    <>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 pt-2"
      >
        <div className="relative">
          {/* Animated Border Effect for Mobile */}
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

          {/* Main Mobile Header Container */}
          <div
            className="relative rounded-2xl px-4 py-3"
            style={{
              background: 'linear-gradient(90deg, rgba(36, 0, 70, 0.95) 0%, rgba(60, 9, 108, 0.9) 100%)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 109, 0, 0.3)',
            }}
          >
            {/* Animated inner border for mobile */}
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

            <div className="flex items-center justify-between">
              {/* Logo and Full Name for Mobile */}
              <motion.div
                className="flex items-center gap-2 cursor-pointer"
                whileHover={{ scale: 1.02 }}
                onClick={() => handleNavClick('hero')}
              >
                <motion.div
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                >
                  <div className="w-7 h-7 flex items-center justify-center">
                    <img src='logo.png' alt="Saqlain Amin logo" />
                  </div>
                </motion.div>
                <div className="flex flex-col">
                  <span className="block font-['Playfair_Display'] text-sm font-bold text-white leading-normal">
                    Saqlain Amin
                  </span>
                  <p className="text-[9px] text-retro-orange-5">Web &amp; E-Commerce Developer · IT Educator</p>
                </div>
              </motion.div>

              {/* Hamburger Menu Button */}
              <motion.button
                onClick={() => setIsMenuOpen(true)}
                className="relative w-8 h-8 rounded-full flex items-center justify-center"
                style={{
                  background: 'rgba(255, 109, 0, 0.15)',
                  border: '1px solid rgba(255, 109, 0, 0.3)',
                }}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
              >
                <Menu size={16} className="text-retro-orange-1" />
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{
                    boxShadow: [
                      '0 0 0px rgba(255, 109, 0, 0)',
                      '0 0 10px rgba(255, 109, 0, 0.3)',
                      '0 0 0px rgba(255, 109, 0, 0)',
                    ],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50"
            />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="relative w-full max-w-sm mx-auto">
                <motion.button
                  onClick={() => setIsMenuOpen(false)}
                  className="absolute -top-12 right-0 p-2 text-retro-orange-1"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={24} />
                </motion.button>
                
                <div
                  className="rounded-2xl p-6"
                  style={{
                    background: 'linear-gradient(135deg, rgba(36, 0, 70, 0.98) 0%, rgba(60, 9, 108, 0.95) 100%)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 109, 0, 0.2)',
                  }}
                >
                  <div className="flex flex-col gap-3">
                    {mobileNavItems.map((item, idx) => (
                      <motion.button
                        key={item.id}
                        onClick={() => handleNavClick(item.id)}
                        className="w-full py-2 rounded-lg text-center"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.03 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="font-['Playfair_Display'] text-lg text-white">
                          {item.label}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                  
                  {/* Mobile Connect Button - FIXED */}
                  <a href="#connect" style={{ textDecoration: 'none' }}>
                  <motion.button
                    className="mt-4 w-full py-2 rounded-lg font-['Playfair_Display'] font-medium text-sm relative overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255, 109, 0, 0.15), rgba(255, 158, 0, 0.1))',
                      border: '1px solid rgba(255, 109, 0, 0.4)',
                    }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="flex items-center justify-center gap-2">
                      <span className="text-retro-orange-1">Connect Now</span>
                      <ArrowRight size={14} className="text-retro-orange-1" />
                    </span>
                  </motion.button>
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;