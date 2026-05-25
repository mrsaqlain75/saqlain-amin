import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import TerminalHeading from "./TerminalHeading";

const milestones = [
  { id: 1,  year: "2018",     label: "Hello, World.",                  sub: "First line of C",                         detail: "Wrote my very first line of code — a Hello World in C. The moment everything began.",              side: "left"  },
  { id: 2,  year: "2020",     label: "The Web Awakens",                sub: "First website built",                     detail: "Built my first website. Discovered the power of making things others can actually see and use.", side: "right" },
  { id: 3,  year: "2022",     label: "Going Mobile",                   sub: "First Android app",                       detail: "Shipped my first Android app — the thrill of seeing it run on a real device.",                  side: "left"  },
  { id: 4,  year: "Jan 2023", label: "First Foreign Project",          sub: "VPN Android app",                         detail: "Landed my first international client. Crossed borders without leaving my desk.",                 side: "right" },
  { id: 5,  year: "Jun 2023", label: "The Mentor Emerges",             sub: "Trained a US student for CompTIA A+",     detail: "Teaching became part of the journey. First international student, first real impact.",           side: "left"  },
  { id: 6,  year: "Aug 2023", label: "Academia Calls",                 sub: "Lecturer — Government University",        detail: "Appointed Lecturer at a government university. Officially trusted to shape the next generation.", side: "right" },
  { id: 7,  year: "Dec 2023", label: "The Stack Shift",                sub: "Android → MERN",                          detail: "Pivoted from Android to MERN Stack. A calculated evolution, not a detour.",                     side: "left"  },
  { id: 8,  year: "Mar 2024", label: "SADEVZ is Born",                 sub: "Founded my startup",                      detail: "Started SADEVZ — my own software company. The entrepreneur inside finally had a name.",          side: "right" },
  { id: 9,  year: "Jun 2024", label: "First SADEVZ Delivery",          sub: "Drosh Inn Hotel",                         detail: "Delivered the first product under SADEVZ. Proof of concept, realized.",                        side: "left"  },
  { id: 10, year: "Jan 2025", label: "Design at Scale",                sub: "10+ international projects",              detail: "Completed 10+ foreign graphic design projects, including one for Free Library Foundation Philly.", side: "right" },
  { id: 11, year: "Dec 2025", label: "Community Impact",               sub: "50+ students trained in Chitral",         detail: "Knowledge multiplied across a community. 50+ students in web development across Chitral.",        side: "left"  },
  { id: 12, year: "Feb 2026", label: "SADEVZ Rebooted",                sub: "Team of 6",                               detail: "Relaunched SADEVZ with a 6-person team. Solo founder no more — building something bigger.",     side: "right" },
  { id: 13, year: "Apr 2026", label: "Head of Engineering",            sub: "Leadership appointed",                    detail: "The builder became the architect of builders. Appointed Head of Engineering.",                  side: "left"  },
  { id: 14, year: "May 2026", label: "Native Resort & Bamborate",      sub: "Full-stack delivery",                     detail: "Completed a complex full-stack project for Native Resort and Camping Bamborate.",               side: "right" },
  { id: 15, year: "Present",  label: "The Journey Continues",          sub: "5+ active projects at SADEVZ",            detail: "Currently shipping 5+ projects with the SADEVZ team. The story isn't over — it's accelerating.", side: "left"  },
];

const COLORS = {
  orange: "#ff6d00",
  orangeLight: "#ff9e00",
  purple: "#9d4edd",
  purpleDark: "#3c096c",
  purpleLight: "#7b2cbf",
  bg: "#0a0a0f",
  line: "rgba(255, 109, 0, 0.15)",
  dot: "#ff6d00",
  dotIdle: "rgba(255,109,0,0.25)",
  textPrimary: "#ffffff",
  textMuted: "rgba(255,255,255,0.45)",
  accent: "#ff9e00",
};

function Node({ m, index, active, setActive }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isLeft = m.side === "left";
  const isActive = active === m.id;

  return (
    <motion.div
      ref={ref}
      className="relative flex items-center w-full"
      style={{ minHeight: 80 }}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.04 }}
    >
      {/* Desktop two-column */}
      <div className="hidden md:flex w-full items-center">
        <div className={`w-[46%] pr-10 ${isLeft ? "text-right" : ""}`}>
          {isLeft && (
            <TextBlock m={m} inView={inView} index={index} isActive={isActive}
              setActive={setActive} dir={-1} />
          )}
        </div>

        <div className="w-[8%] flex justify-center">
          <Dot m={m} inView={inView} index={index} isActive={isActive}
            setActive={setActive} />
        </div>

        <div className={`w-[46%] pl-10`}>
          {!isLeft && (
            <TextBlock m={m} inView={inView} index={index} isActive={isActive}
              setActive={setActive} dir={1} />
          )}
        </div>
      </div>

      {/* Mobile single-column */}
      <div className="flex md:hidden w-full items-start gap-5 pl-1">
        <div className="flex-shrink-0 mt-1">
          <Dot m={m} inView={inView} index={index} isActive={isActive} setActive={setActive} />
        </div>
        <div className="flex-1 pb-7">
          <TextBlock m={m} inView={inView} index={index} isActive={isActive}
            setActive={setActive} dir={1} />
        </div>
      </div>
    </motion.div>
  );
}

function Dot({ m, inView, index, isActive, setActive }) {
  return (
    <motion.button
      onClick={() => setActive(isActive ? null : m.id)}
      className="relative flex items-center justify-center focus:outline-none"
      style={{ width: 28, height: 28 }}
      initial={{ scale: 0 }}
      animate={inView ? { scale: 1 } : {}}
      transition={{ type: "spring", stiffness: 400, damping: 22, delay: index * 0.04 + 0.1 }}
      whileHover={{ scale: 1.25 }}
      whileTap={{ scale: 0.88 }}
    >
      <motion.div
        className="absolute inset-0 rounded-full border"
        style={{ borderColor: COLORS.orange, opacity: isActive ? 0.5 : 0.18 }}
        animate={isActive ? { scale: [1, 1.6, 1], opacity: [0.5, 0.15, 0.5] } : {}}
        transition={{ duration: 2, repeat: isActive ? Infinity : 0 }}
      />
      <div
        className="rounded-full transition-all duration-300"
        style={{
          width: isActive ? 11 : 7,
          height: isActive ? 11 : 7,
          background: isActive ? COLORS.orange : COLORS.dotIdle,
          boxShadow: isActive ? `0 0 12px ${COLORS.orange}88` : "none",
        }}
      />
      {m.year === "Present" && (
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ border: `1px solid ${COLORS.orange}` }}
          animate={{ scale: [1, 2], opacity: [0.5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
        />
      )}
    </motion.button>
  );
}

function TextBlock({ m, inView, index, isActive, setActive, dir }) {
  const isRight = dir === 1;
  return (
    <motion.div
      className={`cursor-pointer select-none ${isRight ? "" : ""}`}
      initial={{ x: dir * 28, opacity: 0 }}
      animate={inView ? { x: 0, opacity: 1 } : {}}
      transition={{ duration: 0.55, delay: index * 0.04 + 0.12, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => setActive(isActive ? null : m.id)}
      whileHover={{ x: dir * 3 }}
    >
      <p
        className="text-xs tracking-[0.22em] uppercase mb-[3px]"
        style={{
          fontFamily: "'Space Mono', monospace",
          color: isActive ? COLORS.orange : COLORS.textMuted,
          fontSize: 10,
          transition: "color 0.3s",
        }}
      >
        {m.year}
      </p>

      <h3
        className="leading-tight mb-[2px]"
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 15,
          fontWeight: isActive ? 700 : 500,
          color: isActive ? COLORS.orangeLight : COLORS.textPrimary,
          transition: "all 0.3s",
          letterSpacing: "-0.01em",
        }}
      >
        {m.label}
      </h3>

      <p
        className="text-xs"
        style={{
          fontFamily: "'Space Mono', monospace",
          color: isActive ? COLORS.accent : COLORS.textMuted,
          fontSize: 10,
          transition: "color 0.3s",
          letterSpacing: "0.05em",
        }}
      >
        {m.sub}
      </p>

      <AnimatePresence>
        {isActive && (
          <motion.p
            className="mt-2 leading-relaxed"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 12.5,
              color: "rgba(255,255,255,0.65)",
              maxWidth: 280,
            }}
            initial={{ height: 0, opacity: 0, y: -4 }}
            animate={{ height: "auto", opacity: 1, y: 0 }}
            exit={{ height: 0, opacity: 0, y: -4 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            {m.detail}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Journey() {
  const [active, setActive] = useState(null);
  const containerRef = useRef(null);
  const nodeRefs = useRef([]);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start 80%", "end 20%"] });
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Auto-activate milestone when it comes to center of screen
  useEffect(() => {
    const handleScroll = () => {
      const centerY = window.innerHeight / 2;
      let closestId = null;
      let closestDistance = Infinity;

      nodeRefs.current.forEach((ref, idx) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          const distance = Math.abs(rect.top + rect.height / 2 - centerY);
          if (distance < closestDistance && distance < 200) {
            closestDistance = distance;
            closestId = milestones[idx].id;
          }
        }
      });

      if (closestId && closestId !== active) {
        setActive(closestId);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [active]);

  return (
    <section
      id="journey"
      className="relative min-h-screen py-16 px-4 overflow-hidden"
      style={{ background: "#0a0a0f" }}
    >
      {/* Background pattern - dark theme */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.08]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="gridJourney" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#ff9e00" strokeWidth="0.5" />
              <circle cx="30" cy="30" r="1" fill="#ff9e00" opacity="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#gridJourney)" />
        </svg>
      </div>

      {/* Floating orbs - dark theme */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-retro-orange-1/10 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-retro-purple-5/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full bg-retro-orange-1/8 blur-3xl" />
      </div>

      {/* Corner brackets */}
      {[
        { top: 32, left: 32, rotate: 0 },
        { top: 32, right: 32, rotate: 90 },
        { bottom: 32, left: 32, rotate: 270 },
        { bottom: 32, right: 32, rotate: 180 },
      ].map((pos, i) => (
        <motion.div
          key={i}
          className="absolute hidden md:block"
          style={{ ...pos, rotate: `${pos.rotate}deg`, width: 20, height: 20 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 + i * 0.1 }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M0 20 L0 0 L20 0" stroke={COLORS.purple} strokeWidth="1" strokeOpacity="0.3" />
          </svg>
        </motion.div>
      ))}

      {/* Header */}
      <div className="relative z-10 text-center mb-24">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Header */}
          <div className="relative z-10 -ml-4 mr-0 md:ml-8 lg:ml-0 mr-4">
            <TerminalHeading title="my_journey" delay={0} darkBg={true} />
          </div>
        </motion.div>
      </div>

      {/* Timeline */}
      <div ref={containerRef} className="relative z-10 max-w-3xl mx-auto">
        {/* Static spine */}
        <div
          className="absolute hidden md:block left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
          style={{ background: COLORS.line }}
        />
        <div
          className="absolute block md:hidden left-[13px] top-0 bottom-0 w-px"
          style={{ background: COLORS.line }}
        />

        {/* Animated fill */}
        <div
          className="absolute hidden md:block left-1/2 top-0 -translate-x-1/2 overflow-hidden"
          style={{ width: 1, bottom: 0 }}
        >
          <motion.div
            className="w-full origin-top"
            style={{
              scaleY: lineScaleY,
              height: "100%",
              background: `linear-gradient(to bottom, ${COLORS.orange}88, ${COLORS.purple}55)`,
            }}
          />
        </div>

        <div className="flex flex-col" style={{ gap: 12 }}>
          {milestones.map((m, i) => (
            <div key={m.id} ref={el => nodeRefs.current[i] = el}>
              <Node m={m} index={i} active={active} setActive={setActive} />
            </div>
          ))}
        </div>

        {/* End marker */}
        <motion.div
          className="flex flex-col items-center mt-10 hidden md:flex"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <div
            className="w-px h-6"
            style={{ background: `linear-gradient(to bottom, ${COLORS.orange}55, transparent)` }}
          />
          <p
            className="mt-2 text-xs tracking-[0.3em] uppercase"
            style={{ fontFamily: "'Space Mono', monospace", color: COLORS.textMuted, fontSize: 9 }}
          >
            Still writing
          </p>
        </motion.div>
      </div>
    </section>
  );
}