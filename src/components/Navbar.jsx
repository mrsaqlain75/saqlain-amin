import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  Code2,
  TrendingUp,
  Layers,
  Star,
  MessageCircle,
  Settings,
} from 'lucide-react';

const navItems = [
  { id: 'hero', icon: Home, label: 'Home', activeColor: '#ff6d00', defaultColor: '#9d4edd' },
  { id: 'services', icon: Settings, label: 'Services', activeColor: '#ff8500', defaultColor: '#9d4edd' },
  { id: 'stack', icon: Code2, label: 'Stack', activeColor: '#ff7900', defaultColor: '#9d4edd' },
  { id: 'journey', icon: TrendingUp, label: 'Journey', activeColor: '#ff8500', defaultColor: '#9d4edd' },
  { id: 'portfolio', icon: Layers, label: 'Work', activeColor: '#ff9100', defaultColor: '#9d4edd' },
  { id: 'testimonials', icon: Star, label: 'Reviews', activeColor: '#ff9e00', defaultColor: '#9d4edd' },
  { id: 'connect', icon: MessageCircle, label: 'Connect', activeColor: '#9d4edd', defaultColor: '#9d4edd' },
];

const Navbar = ({ activeSection, onSectionChange }) => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [navbarTop, setNavbarTop] = useState('50%');
  const navbarRef = useRef(null);
  const [hoveredItem, setHoveredItem] = useState(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const centerNavbar = () => {
      if (navbarRef.current && !isMobile) {
        const viewportHeight = window.innerHeight;
        const navbarHeight = navbarRef.current.offsetHeight;
        const topPosition = (viewportHeight - navbarHeight) / 2;
        setNavbarTop(`${topPosition}px`);
      }
    };
    
    centerNavbar();
    window.addEventListener('resize', centerNavbar);
    window.addEventListener('scroll', centerNavbar);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('resize', centerNavbar);
      window.removeEventListener('scroll', centerNavbar);
    };
  }, [isMobile, isNavbarOpen]);

  // Handle nav click
  const handleNavClick = (sectionId) => {
    onSectionChange(sectionId);
    // Use native hash navigation
    window.location.hash = sectionId;
  };

  if (isMobile) return null;

  return (
    <motion.nav
      ref={navbarRef}
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed left-0 z-50"
      style={{ top: navbarTop }}
      onMouseEnter={() => setIsNavbarOpen(true)}
      onMouseLeave={() => setIsNavbarOpen(false)}
    >
      <div className="relative">
        {/* Animated Border Effect - Outer Glow */}
        <motion.div
          className="absolute -inset-[2px] rounded-r-2xl"
          animate={{
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            background: 'linear-gradient(135deg, #ff6d00, #9d4edd, #ff6d00)',
            borderRadius: '1rem',
            filter: 'blur(4px)',
          }}
        />

        {/* Main Navbar Container */}
        <motion.div
          className="relative rounded-r-2xl overflow-hidden"
          animate={{
            width: isNavbarOpen ? '200px' : '64px',
          }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          style={{
            background: 'linear-gradient(135deg, rgba(36, 0, 70, 0.98) 0%, rgba(60, 9, 108, 0.95) 100%)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 109, 0, 0.3)',
            borderLeft: 'none',
          }}
        >
          {/* Animated Right Border Line */}
          <motion.div
            className="absolute right-0 top-0 bottom-0 w-[2px]"
            animate={{
              background: [
                'linear-gradient(180deg, #ff6d00, #9d4edd)',
                'linear-gradient(180deg, #9d4edd, #ff6d00)',
                'linear-gradient(180deg, #ff6d00, #9d4edd)',
              ],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Content */}
          <div className="flex flex-col gap-2 py-4">
            {navItems.map((item, idx) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onHoverStart={() => setHoveredItem(item.id)}
                  onHoverEnd={() => setHoveredItem(null)}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.id);
                    }}
                    className="relative flex items-center w-full px-3 py-2 rounded-lg group"
                    style={{ textDecoration: 'none', cursor: 'pointer' }}
                  >
                    {/* Innovative Hover Effect - Glowing background */}
                    <motion.div
                      className="absolute inset-0 rounded-lg"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{
                        opacity: hoveredItem === item.id ? 0.15 : 0,
                        scale: hoveredItem === item.id ? 1 : 0.8,
                      }}
                      transition={{ duration: 0.2 }}
                      style={{
                        background: `radial-gradient(circle at center, ${item.activeColor}, transparent)`,
                      }}
                    />

                    {/* Icon with scale on hover */}
                    <motion.div
                      className="relative z-10 flex-shrink-0"
                      animate={{
                        scale: hoveredItem === item.id ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <Icon
                        size={20}
                        strokeWidth={1.5}
                        style={{
                          color: isActive ? item.activeColor : item.defaultColor,
                        }}
                      />
                    </motion.div>

                    {/* Text label with slide animation */}
                    <AnimatePresence>
                      {isNavbarOpen && (
                        <motion.span
                          initial={{ opacity: 0, x: -5 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -5 }}
                          transition={{ duration: 0.15 }}
                          className="ml-3 font-['Playfair_Display'] text-sm whitespace-nowrap relative z-10"
                          style={{
                            color: isActive ? item.activeColor : '#ffffff',
                          }}
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>

                    {/* Active indicator - Minimalist dot positioned on the far right */}
                    {isActive && (
                      <motion.div
                        layoutId="activeDot"
                        className="absolute w-1.5 h-1.5 rounded-full"
                        style={{
                          right: isNavbarOpen ? '12px' : '8px',
                          background: item.activeColor,
                          boxShadow: `0 0 8px ${item.activeColor}`,
                        }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </a>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom decorative line */}
          <motion.div
            className="absolute bottom-2 left-3 right-3 h-px"
            animate={{
              background: [
                'linear-gradient(90deg, transparent, #ff6d00, #9d4edd, transparent)',
                'linear-gradient(90deg, transparent, #9d4edd, #ff6d00, transparent)',
              ],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;