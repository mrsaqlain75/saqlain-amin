import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";

export default function WhatsAppFloat() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 300) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const phoneNumber = "923275857692";
  const message = "Hi Saqlain! I visited your portfolio and would like to connect.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  // Responsive sizing
  const buttonSize = isMobile ? "w-10 h-10" : "w-14 h-14";
  const iconSize = isMobile ? 20 : 28;
  const bottomPosition = isMobile ? "bottom-6" : "bottom-6";
  const rightPosition = "right-6";

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`fixed ${rightPosition} z-50 ${bottomPosition}`}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          {/* Ripple effect */}
          <motion.div
            className={`absolute inset-0 rounded-full ${buttonSize}`}
            animate={{ scale: [1, 1.2, 1.5], opacity: [0.6, 0.3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
            style={{ background: "#25D366" }}
          />

          {/* Main WhatsApp Button */}
          <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`relative flex items-center justify-center ${buttonSize} rounded-full shadow-2xl cursor-pointer transition-all duration-300`}
            style={{
              background: "linear-gradient(135deg, #25D366, #128C7E)",
              boxShadow: "0 4px 20px rgba(37, 211, 102, 0.3)",
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <MessageCircle size={iconSize} className="text-white" />
          </motion.a>

          {/* Tooltip - only show on desktop */}
          {!isMobile && (
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="absolute right-16 top-1/2 transform -translate-y-1/2 whitespace-nowrap"
                >
                  <div
                    className="px-3 py-1.5 rounded-lg text-xs font-mono"
                    style={{
                      background: "#1a1a2e",
                      color: "#fff",
                      fontFamily: "'Space Mono', monospace",
                    }}
                  >
                    Let's chat on WhatsApp
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}