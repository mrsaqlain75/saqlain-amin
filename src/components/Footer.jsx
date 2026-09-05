import { motion } from "framer-motion";
import { Heart, Code, Zap, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="relative py-12 pb-24 overflow-hidden"
      style={{
        background: "#0a0a0f",
      }}
    >
      {/* Background pattern - same as Stack */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.08]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="gridFooter" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#ff9e00" strokeWidth="0.5" />
              <circle cx="30" cy="30" r="1" fill="#ff9e00" opacity="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#gridFooter)" />
        </svg>
      </div>

      {/* Floating orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-20 w-40 h-40 rounded-full bg-retro-orange-1/5 blur-3xl" />
        <div className="absolute bottom-10 right-20 w-40 h-40 rounded-full bg-retro-purple-5/5 blur-3xl" />
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-8 md:ml-16 lg:ml-24">
        
        {/* Top Section - Logo & Tagline */}
        <div className="flex flex-col items-center text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <img src="sadevz.png" className="h-16" alt="SADEVZ — software development studio in Chitral, Pakistan founded by Saqlain Amin" />
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-400 text-sm font-mono max-w-md"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            Learn. Create. Evolve.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-gray-500 text-xs mt-3 max-w-lg"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            Saqlain Amin — full-stack &amp; e-commerce web developer, mobile developer and IT educator
            in Chitral, Pakistan. Available for web &amp; Next.js e-commerce projects and online
            computer science, Python &amp; IT tutoring worldwide.
          </motion.p>
        </div>

        {/* Page nav */}
        <motion.nav
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-8"
        >
          {[
            { href: "/projects", label: "Projects" },
            { href: "/web-development", label: "Web Development" },
            { href: "/ecommerce-development", label: "E-Commerce Development" },
            { href: "/tutoring", label: "IT Tutoring" },
            { href: "/learn", label: "Learn" },
            { href: "/hire", label: "Hire Me" },
            { href: "/resume", label: "Résumé" },
          ].map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[11px] tracking-[0.12em] uppercase text-gray-400 hover:text-retro-orange-1 transition-colors"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              {l.label}
            </a>
          ))}
        </motion.nav>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full h-px mb-8"
          style={{ background: "linear-gradient(90deg, transparent, rgba(255,109,0,0.3), transparent)" }}
        />

        {/* Bottom Section - Copyright & Social */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center gap-2"
          >
            <span
              className="text-gray-500 text-xs font-mono"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              © {new Date().getFullYear()} Saqlain Amin
            </span>
            <span className="text-gray-600 text-xs">•</span>
            <span
              className="text-gray-500 text-xs font-mono flex items-center gap-1"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              Made with <Heart size={10} className="text-red-500 animate-pulse" /> in Chitral
            </span>
          </motion.div>

          {/* Scroll to Top Button */}
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-full transition-all hover:scale-105"
            style={{
              background: "rgba(255,109,0,0.1)",
              border: "1px solid rgba(255,109,0,0.2)",
              fontFamily: "'Space Mono', monospace",
            }}
            whileHover={{ y: -3 }}
          >
            <span className="text-retro-orange-1 text-xs">Back to top</span>
            <ArrowUp size={12} className="text-retro-orange-1" />
          </motion.button>
        </div>

        {/* Bottom line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 pt-4 text-center"
        >
          <p
            className="text-gray-600 text-[8px] font-mono tracking-wider"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            {`< trying to do better />`}
          </p>
        </motion.div>
      </div>
    </footer>
  );
}