import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Palette, GraduationCap, Briefcase } from "lucide-react";

export default function Hero() {
  const [currentPhrase, setCurrentPhrase] = useState(0);

  const phrases = [
    "build full-stack web & mobile apps",
    "develop Next.js e-commerce websites",
    "teach computer science, Python & IT",
    "tutor students online & in Chitral",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % phrases.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  const achievements = [
    { value: "20+", label: "Projects Shipped", icon: Briefcase, color: "#ff6d00" },
    { value: "5+", label: "E-Commerce Sites", icon: Palette, color: "#ff8500" },
    { value: "50+", label: "Students Trained", icon: GraduationCap, color: "#9d4edd" },
  ];

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #fffaf5 0%, #fff5ea 25%, #fffaf0 50%, #fff5ea 75%, #fffaf5 100%)",
        margin: 0,
        padding: 0,
      }}
    >
      {/* Background grid - minimal */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.08]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#ff9e00" strokeWidth="0.5" />
              <circle cx="30" cy="30" r="1" fill="#9d4edd" opacity="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Floating orbs background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute rounded-full blur-3xl"
          style={{
            left: "60%",
            top: "50%",
            width: "500px",
            height: "500px",
            background: "radial-gradient(circle, rgba(255,109,0,0.12), transparent)",
          }}
          animate={{
            x: [0, 30, -30, 0],
            y: [0, -40, 20, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute rounded-full blur-3xl"
          style={{
            left: "70%",
            top: "30%",
            width: "350px",
            height: "350px",
            background: "radial-gradient(circle, rgba(157,78,221,0.1), transparent)",
          }}
          animate={{
            x: [0, -20, 20, 0],
            y: [0, 30, -20, 0],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      {/* DESKTOP LAYOUT */}
      <div className="hidden md:block relative min-h-screen">
{/* LEFT SIDE - Content */}
<div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 w-full md:w-auto md:pt-16 lg:pt-20">
  <div className="md:pl-32 pl-8 pr-8 md:pr-0 max-w-2xl">
    
    {/* Subtitle */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-1"
    >
      <span className="text-retro-orange-5 font-mono text-sm tracking-wider uppercase">
        Hi, my name is
      </span>
    </motion.div>

    {/* Name */}
    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="text-5xl md:text-6xl lg:text-7xl font-bold mb-2 text-retro-purple-1 leading-[1.02]"
      style={{
        fontFamily: "'Playfair Display', serif",
      }}
    >
      Saqlain <span className="text-retro-orange-1">Amin</span>
    </motion.h1>

    {/* Role line */}
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.15 }}
      className="text-base md:text-lg font-medium mb-3"
      style={{
        color: "#240046",
        opacity: 0.85,
        fontFamily: "'Playfair Display', serif",
      }}
    >
      Full-Stack &amp; E-Commerce Web Developer · IT Educator · Chitral, Pakistan
    </motion.p>

    {/* Animated Phrase Line */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="flex items-center gap-2 mb-5 flex-wrap"
    >
      <span 
        className="text-2xl md:text-3xl font-semibold"
        style={{
          color: "#240046",
          opacity: 0.9,
          fontFamily: "'Playfair Display', serif",
        }}
      >
        I
      </span>
      <div className="relative flex items-center min-h-[70px] md:min-h-[80px]">
        <AnimatePresence mode="wait">
          <motion.span
            key={currentPhrase}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="text-2xl md:text-3xl font-semibold"
            style={{
              color: "#240046",
              opacity: 0.9,
              fontFamily: "'Playfair Display', serif",
            }}
          >
            {phrases[currentPhrase]}
          </motion.span>
        </AnimatePresence>
      </div>
    </motion.div>

    {/* Achievements */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="flex gap-4 mb-5 flex-wrap"
    >
      {achievements.map((item) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={item.label}
            className="relative group"
            whileHover={{ y: -3 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <div
              className="px-4 py-2 rounded-xl backdrop-blur-sm transition-all duration-300 ease-out"
              style={{
                background: "rgba(255,255,255,0.7)",
                border: `1px solid ${item.color}20`,
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <div className="flex items-center gap-1.5 mb-0.5">
                <Icon size={14} style={{ color: item.color }} />
                <span className="text-lg md:text-xl font-bold" style={{ color: item.color }}>
                  {item.value}
                </span>
              </div>
              <div className="text-[9px] font-mono text-gray-500 tracking-wider">
                {item.label}
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>

    {/* CTA Buttons - Side by side Desktop */}
    <div className="flex gap-4">
      {/* Get My Resume Button */}
      <motion.a
        href="/resume"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.6 }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        className="relative group flex items-center gap-2 px-6 py-2.5 rounded-full overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.5)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255,109,0,0.3)",
          color: "#ff6d00",
          fontSize: "11px",
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          fontFamily: '"Space Mono", monospace',
          cursor: "pointer",
          fontWeight: "bold",
          textDecoration: "none"
        }}
      >
        <span className="relative z-10">Get My Resume</span>
      </motion.a>

      {/* Connect Button */}
      <a href="/hire" style={{ textDecoration: 'none' }}>
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        className="relative group flex items-center gap-2 px-6 py-2.5 rounded-full overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #3c096c 0%, #ff6d00 130%)",
          border: "1px solid rgba(255,109,0,0.4)",
          color: "#fff",
          fontSize: "11px",
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
        <ArrowRight size={11} className="relative z-10 opacity-70 transition-transform group-hover:translate-x-1" />
      </motion.button>
      </a>
    </div>
  </div>
</div>

        {/* RIGHT SIDE - Image */}
        <div className="absolute bottom-0 right-auto z-10" style={{ margin: 0, padding: 0, right: "5%" }}>
          <div style={{ margin: 0, padding: 0, lineHeight: 0 }}>
            <motion.div
              className="relative"
              style={{ margin: 0, padding: 0 }}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 100, 
                damping: 20,
                delay: 0.3
              }}
            >
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{
                  background: "radial-gradient(circle, rgba(255,109,0,0.2), rgba(157,78,221,0.1))",
                  filter: "blur(40px)",
                }}
              />
              
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                  scale: [1.1, 1, 1.1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                style={{
                  background: "radial-gradient(circle, rgba(255,133,0,0.15), rgba(123,44,191,0.08))",
                  filter: "blur(50px)",
                }}
              />
              
              <motion.div
                className="absolute -inset-4 rounded-full pointer-events-none"
                style={{
                  background: "conic-gradient(from 0deg, #ff9e00, #9d4edd, #ff6d00, #ff9e00)",
                  opacity: 0.2,
                }}
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              />
              
              <motion.div
                className="absolute -inset-8 rounded-full pointer-events-none"
                style={{
                  border: "1px solid rgba(255,109,0,0.1)",
                }}
                animate={{ rotate: [360, 0] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              
              <img
                src="./pic.png"
                alt="Saqlain Amin — full-stack and e-commerce web developer and IT educator in Chitral, Pakistan"
                className="object-contain relative z-10"
                style={{
                  filter: "drop-shadow(0 30px 40px rgba(0,0,0,0.06))",
                  display: "block",
                  margin: 0,
                  padding: 0,
                  width: "clamp(280px, 32vw, 480px)",
                }}
              />
              
              <motion.div
                className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-3/4 h-4 rounded-full pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse, rgba(0,0,0,0.08), transparent)",
                  filter: "blur(8px)",
                }}
                animate={{
                  width: ["70%", "80%", "70%"],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </motion.div>
          </div>
        </div>
      </div>

{/* MOBILE LAYOUT - Fixed */}
<div className="block md:hidden relative w-full" style={{ height: "100dvh" }}>
  {/* Background pattern for mobile */}
  <div className="absolute inset-0 pointer-events-none opacity-[0.08]">
    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="gridMobile" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#ff9e00" strokeWidth="0.5" />
          <circle cx="30" cy="30" r="1" fill="#9d4edd" opacity="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#gridMobile)" />
    </svg>
  </div>

  {/* Floating orbs for mobile */}
  <div className="absolute inset-0 pointer-events-none">
    <div
      className="absolute rounded-full blur-3xl"
      style={{
        left: "50%",
        top: "50%",
        width: "300px",
        height: "300px",
        background: "radial-gradient(circle, rgba(255,109,0,0.12), transparent)",
        transform: "translate(-50%, -50%)",
      }}
    />
  </div>

  {/* Content - Stack from top with flex column */}
  <div className="relative z-10 flex flex-col justify-between h-full pt-16">
    

    
    {/* Text Content */}
    <div className="px-6">
      {/* Subtitle */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <span className="text-retro-orange-5 font-mono text-sm tracking-wider uppercase">
          Hi, my name is
        </span>
      </motion.div>

      {/* Name */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-5xl font-bold text-retro-purple-1 text-center mt-2 leading-[1.05]"
        style={{
          fontFamily: "'Playfair Display', serif",
        }}
      >
        Saqlain <span className="text-retro-orange-1">Amin</span>
      </motion.p>

      <p
        className="text-sm font-medium text-center mt-2 px-4"
        style={{
          color: "#240046",
          opacity: 0.85,
          fontFamily: "'Playfair Display', serif",
        }}
      >
        Full-Stack &amp; E-Commerce Web Developer · IT Educator · Chitral, Pakistan
      </p>

      <div className="flex items-center justify-center gap-2 mt-3 text-center flex-wrap">
        <span 
          className="text-xl font-semibold"
          style={{
            color: "#240046",
            opacity: 0.9,
            fontFamily: "'Playfair Display', serif",
          }}
        >
          I
        </span>
        <div className="relative overflow-visible">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPhrase}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <span
                className="text-xl font-semibold"
                style={{
                  color: "#240046",
                  opacity: 0.9,
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                {phrases[currentPhrase]}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex justify-center gap-4 mt-6 flex-wrap"
      >
        {achievements.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="px-4 py-2 rounded-xl"
              style={{
                background: "rgba(255,255,255,0.7)",
                border: `1px solid ${item.color}20`,
              }}
            >
              <div className="flex items-center gap-1.5">
                <Icon size={14} style={{ color: item.color }} />
                <span className="text-lg font-bold" style={{ color: item.color }}>
                  {item.value}
                </span>
              </div>
              <div className="text-[10px] font-mono text-gray-500 tracking-wider text-center mt-0.5">
                {item.label}
              </div>
            </div>
          );
        })}
      </motion.div>

{/* CTA Buttons - Side by side */}
<div className="flex justify-center gap-3 mt-6">
  {/* Get My Resume Button */}
  <motion.a
    href="/resume"
    target="_blank"
    rel="noopener noreferrer"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.35, duration: 0.6 }}
    whileTap={{ scale: 0.98 }}
    className="relative group flex items-center gap-2 px-5 py-2.5 rounded-full overflow-hidden"
    style={{
      background: "rgba(255,255,255,0.5)",
      backdropFilter: "blur(8px)",
      border: "1px solid rgba(255,109,0,0.3)",
      color: "#ff6d00",
      fontSize: "10px",
      letterSpacing: "0.16em",
      textTransform: "uppercase",
      fontFamily: '"Space Mono", monospace',
      cursor: "pointer",
      fontWeight: "bold",
      textDecoration: "none"
    }}
  >
    <span className="relative z-10">Get My Resume</span>
  </motion.a>

  {/* Connect Button */}
  <a href="/hire" style={{ textDecoration: 'none' }}>
  <motion.button
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.4, duration: 0.6 }}
    whileTap={{ scale: 0.98 }}
    className="relative group flex items-center gap-2 px-5 py-2.5 rounded-full overflow-hidden"
    style={{
      background: "linear-gradient(135deg, #3c096c 0%, #ff6d00 130%)",
      border: "1px solid rgba(255,109,0,0.4)",
      color: "#fff",
      fontSize: "10px",
      letterSpacing: "0.16em",
      textTransform: "uppercase",
      fontFamily: '"Space Mono", monospace',
      cursor: "pointer",
      boxShadow: "0 0 28px rgba(255,109,0,0.22), inset 0 1px 0 rgba(255,255,255,0.09)",
    }}
  >
    <span className="relative z-10">Hire Me</span>
    <ArrowRight size={10} className="relative z-10 opacity-70" />
  </motion.button>
  </a>
</div>
    </div>

    {/* Mobile Image - Centered, no extra padding */}
    <div className="flex justify-center">
      <div className="relative">
        {/* Static glow - original size restored */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(255,109,0,0.2), rgba(157,78,221,0.1))",
            filter: "blur(30px)",
            width: "100%",
            height: "100%",
          }}
        />
        
        {/* Static outer glow - restored */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(255,133,0,0.15), rgba(123,44,191,0.08))",
            filter: "blur(40px)",
            width: "100%",
            height: "100%",
          }}
        />
        
        {/* Static gradient ring - restored */}
        <div
          className="absolute -inset-4 rounded-full pointer-events-none"
          style={{
            background: "conic-gradient(from 0deg, #ff9e00, #9d4edd, #ff6d00, #ff9e00)",
            opacity: 0.2,
          }}
        />
        
        {/* Static border ring - restored */}
        <div
          className="absolute -inset-8 rounded-full pointer-events-none"
          style={{
            border: "1px solid rgba(255,109,0,0.15)",
          }}
        />
        
        {/* Static pulsing ring - restored */}
        <div
          className="absolute -inset-12 rounded-full pointer-events-none"
          style={{
            border: "1px solid rgba(157,78,221,0.1)",
          }}
        />
        
        <img
          src="./pic.png"
          alt="Saqlain Amin — full-stack and e-commerce web developer and IT educator in Chitral, Pakistan"
          className="object-contain relative z-10 block mx-auto"
          style={{
            width: "clamp(350px, 82vw, 420px)",
            filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.08))",
          }}
        />
        
        {/* Static shadow - restored */}
        <div
          className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-3/4 h-3 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(ellipse, rgba(0,0,0,0.1), transparent)",
            filter: "blur(6px)",
          }}
        />
      </div>
    </div>
    
    {/* No spacer at bottom - remove the h-2 */}

  </div>
</div>
    </section>
  );
}