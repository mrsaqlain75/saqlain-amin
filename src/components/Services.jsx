import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import TerminalHeading from "./TerminalHeading";

// ── Hover Card Animations (unchanged) ─────────────────────────────────────────

function FullStackAnimation() {
  return (
    <div className="relative w-full h-32 flex items-center justify-center overflow-hidden">
      {["Database", "API", "Server", "Client"].map((layer, i) => (
        <motion.div
          key={layer}
          className="absolute left-1/2 -translate-x-1/2 rounded-sm border border-retro-purple-3/40 bg-retro-purple-1/5 backdrop-blur-xs flex items-center justify-center"
          style={{ width: 160 - i * 16, top: 8 + i * 26, height: 22 }}
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.12, duration: 0.4, ease: "easeOut" }}
        >
          <span className="font-mono-premium text-[10px] tracking-widest text-retro-purple-4/70 uppercase">
            {layer}
          </span>
        </motion.div>
      ))}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 w-1.5 h-1.5 rounded-full bg-retro-orange-1"
          style={{ marginLeft: -3 }}
          initial={{ top: 120, opacity: 0 }}
          animate={{ top: 0, opacity: [0, 1, 1, 0] }}
          transition={{
            delay: 0.6 + i * 0.5,
            duration: 1.2,
            repeat: Infinity,
            repeatDelay: 1,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function AnimatedFrontendAnimation() {
  const items = [
    { w: "80%", h: 10, delay: 0 },
    { w: "60%", h: 10, delay: 0.08 },
    { w: "90%", h: 28, delay: 0.16 },
    { w: "50%", h: 10, delay: 0.24 },
  ];
  return (
    <div className="relative w-full h-32 flex flex-col items-center justify-center gap-2 px-6 overflow-hidden">
      {items.map((item, i) => (
        <motion.div
          key={i}
          className="rounded-sm bg-gradient-to-r from-retro-orange-1/30 via-retro-purple-4/40 to-retro-orange-3/20"
          style={{ width: item.w, height: item.h }}
          animate={{
            scaleX: [1, 1.04, 0.97, 1],
            opacity: [0.5, 1, 0.7, 0.5],
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 2.5,
            delay: item.delay + i * 0.15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      <motion.div
        className="absolute w-2 h-2 rounded-full bg-retro-orange-1 shadow-[0_0_8px_rgba(255,109,0,0.8)]"
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "0px 44px" }}
      />
    </div>
  );
}

function GraphicDesignAnimation() {
  const shapes = [
    { cx: 50, cy: 50, r: 28, fill: "#ff6d00", delay: 0 },
    { cx: 80, cy: 50, r: 28, fill: "#9d4edd", delay: 0.15 },
    { cx: 65, cy: 74, r: 28, fill: "#ff9e00", delay: 0.3 },
  ];
  return (
    <div className="relative w-full h-32 flex items-center justify-center overflow-hidden">
      <svg width="130" height="110" viewBox="0 0 130 110">
        <defs>
          <filter id="blur-blend">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        {shapes.map((s, i) => (
          <motion.circle
            key={i}
            cx={s.cx}
            cy={s.cy}
            r={s.r}
            fill={s.fill}
            fillOpacity={0.55}
            filter="url(#blur-blend)"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [1, 1.08, 0.96, 1],
              opacity: [0.55, 0.75, 0.55],
            }}
            transition={{
              delay: s.delay,
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ transformOrigin: `${s.cx}px ${s.cy}px` }}
          />
        ))}
        <motion.text
          x="65"
          y="58"
          textAnchor="middle"
          fontSize="11"
          fontFamily="'Space Mono', monospace"
          fill="white"
          fillOpacity={0.9}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          SHOP
        </motion.text>
      </svg>
    </div>
  );
}

function EducatorAnimation() {
  const lines = [
    "const teach = (student) => {",
    "  return knowledge++;",
    "};",
    "// ✓ skill unlocked",
  ];
  return (
    <div className="relative w-full h-32 flex items-center justify-center overflow-hidden px-4">
      <div className="font-mono-premium text-[11px] space-y-1 w-full">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            className="overflow-hidden whitespace-nowrap"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "100%", opacity: 1 }}
            transition={{
              delay: 0.3 + i * 0.4,
              duration: 0.6,
              ease: "easeOut",
            }}
          >
            <span
              className={
                i === 3
                  ? "text-retro-orange-1"
                  : i === 0
                  ? "text-retro-purple-4"
                  : "text-retro-purple-3/70"
              }
            >
              {line}
            </span>
          </motion.div>
        ))}
        <motion.span
          className="inline-block w-1.5 h-3 bg-retro-orange-1 ml-0.5 align-middle"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.9, repeat: Infinity }}
        />
      </div>
    </div>
  );
}

// ── Service Data ──────────────────────────────────────────────────────────────

const services = [
  {
    id: "fullstack",
    title: "Full-Stack Web & Mobile Development",
    side: "left",
    tagline: "A software engineer in Chitral, building end-to-end.",
    description:
      "I architect and ship complete web and mobile products for clients in Chitral and worldwide — database schema to pixel-perfect UI. React, Next.js, TypeScript, Node.js, Prisma and PostgreSQL on the web; React Native and Android for mobile. REST APIs, auth, and cloud deployment. One mind, entire stack.",
    Animation: FullStackAnimation,
  },
  {
    id: "ecommerce",
    title: "E-Commerce Website Development",
    side: "right",
    tagline: "E-commerce websites built with Next.js.",
    description:
      "As an e-commerce website developer I build fast, SEO-friendly online stores with Next.js, Prisma and Stripe: product catalog, cart and checkout, order management, and a self-service admin dashboard so the owner can run the shop without a developer. An e-commerce website builder tuned for real businesses.",
    Animation: GraphicDesignAnimation,
  },
  {
    id: "frontend",
    title: "Frontend Engineering & Animation",
    side: "left",
    tagline: "Interfaces that move like they're alive.",
    description:
      "Motion-first React and Next.js interfaces with Framer Motion and CSS craft. Scroll-driven narratives, physics-based interactions and micro-animations — high-performance frontends that stay fast on low-bandwidth connections.",
    Animation: AnimatedFrontendAnimation,
  },
  {
    id: "education",
    title: "IT Educator & Online Tutor",
    side: "right",
    tagline: "Computer science & Python tutoring, online and in Chitral.",
    description:
      "I'm an IT educator and computer science tutor in Chitral and online worldwide. One-on-one and group tutoring in Python programming, computer science fundamentals, web development and IT — plus curriculum design and workshops. 50+ students trained; former Computer Science lecturer and Director Academics in Chitral.",
    Animation: EducatorAnimation,
  },
];

// ── Hover Card Component (Desktop only) ───────────────────────────────────────

function HoverCard({ service, side }) {
  const { Animation } = service;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.97 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className={`absolute top-1/2 -translate-y-1/2 z-30 w-80
        ${side === "left" ? "left-full ml-5" : "right-full mr-5"}
        bg-white/95 backdrop-blur-sm border border-stone-200/80
        shadow-[0_8px_40px_rgba(36,0,70,0.12),0_2px_8px_rgba(36,0,70,0.06)]
        rounded-xl overflow-hidden
      `}
    >
      <div className="bg-stone-50/80 border-b border-stone-100">
        <Animation />
      </div>
      <div className="p-5">
        <p className="font-premium text-[11px] tracking-[0.18em] uppercase text-retro-orange-1 mb-2">
          {service.tagline}
        </p>
        <p className="font-sans-premium text-[14px] leading-relaxed text-stone-600">
          {service.description}
        </p>
      </div>
    </motion.div>
  );
}

// ── Mobile Modal Component ────────────────────────────────────────────────────

function MobileModal({ service, onClose }) {
  const { Animation } = service;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ background: "rgba(0,0,0,0.7)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-[90vw] bg-white/95 backdrop-blur-sm border border-stone-200/80 rounded-xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center transition-colors"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M1 1l10 10M11 1L1 11" stroke="#666" strokeWidth="1.3" strokeLinecap="round"/>
          </svg>
        </button>
        
        <div className="bg-stone-50/80 border-b border-stone-100">
          <Animation />
        </div>
        <div className="p-5">
          <p className="font-premium text-[11px] tracking-[0.18em] uppercase text-retro-orange-1 mb-2">
            {service.tagline}
          </p>
          <p className="font-sans-premium text-[14px] leading-relaxed text-stone-600">
            {service.description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Single Service Row (original layout, fixed overflow) ──────────────────────

function ServiceRow({ service, index, onOpenModal }) {
  const [isMobile, setIsMobile] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [cardSide, setCardSide] = useState(service.side);
  const ref = useRef(null);
  const buttonRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isLeft = service.side === "left";

  // Check for mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Check for overflow and adjust card position (desktop only)
  useEffect(() => {
    if (isMobile) return;
    
    const checkOverflow = () => {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const cardWidth = 320;
        const margin = 20;
        
        if (isLeft) {
          const cardRightEdge = rect.right + cardWidth + margin;
          if (cardRightEdge > viewportWidth) {
            setCardSide("right");
          } else {
            setCardSide("left");
          }
        } else {
          const cardLeftEdge = rect.left - cardWidth - margin;
          if (cardLeftEdge < 0) {
            setCardSide("left");
          } else {
            setCardSide("right");
          }
        }
      }
    };
    
    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [isMobile, isLeft]);

  // Desktop: hover card appears beside
  if (!isMobile) {
    return (
      <motion.div
        ref={ref}
        className={`flex items-center w-full ${isLeft ? "justify-start" : "justify-end"}`}
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={`flex items-center ${isLeft ? "flex-row" : "flex-row-reverse"} gap-0`}>
          <motion.div
            className="h-[2px] bg-gradient-to-r from-stone-500/50 to-stone-400/30 origin-left"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 + 0.2, ease: "easeOut" }}
          >
            <div className="w-20 sm:w-32 md:w-48 h-[2px]" />
          </motion.div>

          <motion.div
            className="w-2 h-2 rounded-full bg-stone-500 flex-shrink-0"
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ duration: 0.3, delay: index * 0.1 + 0.45 }}
          />

          <div className="relative flex-shrink-0" ref={buttonRef}>
            <motion.button
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              className="relative group cursor-pointer select-none px-5 py-2 mx-3
                font-premium text-base sm:text-lg md:text-xl tracking-tight text-white"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 320, damping: 22 }}
            >
              <motion.span
                className="absolute bottom-0 left-5 right-5 h-[2px] bg-gradient-to-r from-retro-orange-1/80 via-retro-purple-4/60 to-transparent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: hovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                style={{ transformOrigin: isLeft ? "left" : "right" }}
              />
              {service.title}
            </motion.button>

            <AnimatePresence>
              {hovered && (
                <HoverCard service={service} side={cardSide} />
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    );
  }

// Mobile: original layout with proper line direction
return (
  <motion.div
    ref={ref}
    className="flex items-center w-full"
    initial={{ opacity: 0, y: 24 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
  >
    <div className={`flex items-center gap-2 w-full ${isLeft ? "justify-start" : "justify-end"}`}>
      {/* Left side service: line on left, text on right */}
      {isLeft && (
        <>
          <motion.div
            className="h-[2px] bg-gradient-to-r from-stone-500/50 to-transparent flex-1 max-w-[60px]"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 + 0.2, ease: "easeOut" }}
            style={{ transformOrigin: "left" }}
          />
          <motion.div
            className="w-2 h-2 rounded-full bg-stone-500 flex-shrink-0"
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ duration: 0.3, delay: index * 0.1 + 0.45 }}
          />
          <motion.button
            onClick={() => onOpenModal(service)}
            className="cursor-pointer select-none px-3 py-2 font-premium text-base tracking-tight text-white whitespace-nowrap"
            whileTap={{ scale: 0.98 }}
          >
            {service.title}
          </motion.button>
        </>
      )}

      {/* Right side service: text on left, line on right */}
      {!isLeft && (
        <>
          <motion.button
            onClick={() => onOpenModal(service)}
            className="cursor-pointer select-none px-3 py-2 font-premium text-base tracking-tight text-white whitespace-nowrap"
            whileTap={{ scale: 0.98 }}
          >
            {service.title}
          </motion.button>
          <motion.div
            className="w-2 h-2 rounded-full bg-stone-500 flex-shrink-0"
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ duration: 0.3, delay: index * 0.1 + 0.45 }}
          />
          <motion.div
            className="h-[2px] bg-gradient-to-l from-stone-500/50 to-transparent flex-1 max-w-[60px]"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 + 0.2, ease: "easeOut" }}
            style={{ transformOrigin: "right" }}
          />
        </>
      )}
    </div>
  </motion.div>
);
}

// ── Section Header ────────────────────────────────────────────────────────────

function SectionHeader() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      className="mb-12 md:mb-16"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <p className="font-mono-premium text-[11px] tracking-[0.25em] uppercase text-retro-orange-1 mb-3">
        What I do
      </p>
      <h2 className="font-premium text-3xl md:text-5xl text-white leading-tight">
        Services
      </h2>
      <div className="mt-4 w-10 h-px bg-retro-orange-1/30" />
    </motion.div>
  );
}

// ── Main Export ───────────────────────────────────────────────────────────────

export default function ServicesSection() {
  const [modalService, setModalService] = useState(null);

  return (
    <section
      id="services"
      className="relative overflow-hidden py-12 md:min-h-screen py-16 lg:overflow-visible"
      style={{
        background: "#0a0a0f",
      }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.08]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="gridServices" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#ff9e00" strokeWidth="0.5" />
              <circle cx="30" cy="30" r="1" fill="#ff9e00" opacity="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#gridServices)" />
        </svg>
      </div>

      {/* Floating orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-retro-orange-1/10 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-retro-purple-5/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full bg-retro-orange-1/5 blur-3xl" />
      </div>


          {/* Header */}
<div className="relative z-10 mr-2 md:ml-8 lg: pl-1 pr-12">
  <TerminalHeading title="my_services" delay={0} darkBg={true} />
</div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-8 md:ml-16 lg:ml-24">



        {/* Services list */}
        <div className="flex flex-col gap-6 md:gap-12">
          {services.map((service, i) => (
            <ServiceRow 
              key={service.id} 
              service={service} 
              index={i} 
              onOpenModal={setModalService}
            />
          ))}
        </div>

      </div>

      {/* Mobile Modal */}
      <AnimatePresence>
        {modalService && (
          <MobileModal 
            service={modalService} 
            onClose={() => setModalService(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
}