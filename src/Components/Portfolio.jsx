import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TerminalHeading from "./TerminalHeading";
import projectsData from "../data/projects.json";

// Background images for categories
const bgImages = {
  fullstack: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&q=60",
  mobile: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=1200&q=60",
  design: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=60",
  ai: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&q=60",
};

// Screenshot placeholder
const screenshotPlaceholder = (caption, index) =>
  `https://images.unsplash.com/photo-${
    ["1461749280684-dccba630e2f6", "1498050108023-c5249f4df085",
     "1555066931-4365d14bab8c", "1593642632559-0c6d3fc62b89",
     "1547658719-da2b51169166"][index % 5]
  }?w=800&q=70`;

// Screenshot Gallery Component
function ScreenshotGallery({ screenshots }) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      <div
        className="relative w-full overflow-hidden rounded-lg"
        style={{
          aspectRatio: "16/9",
          background: "rgba(36,0,70,0.06)",
          border: "1px solid rgba(60,9,108,0.1)",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={active}
            src={screenshotPlaceholder(screenshots[active]?.caption, active)}
            alt={screenshots[active]?.caption || "Screenshot"}
            className="w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35 }}
          />
        </AnimatePresence>

        <div
          className="absolute bottom-0 left-0 right-0 px-4 py-3"
          style={{
            background: "linear-gradient(to top, rgba(26,0,53,0.85), transparent)",
          }}
        >
          <p
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 10,
              color: "rgba(255,255,255,0.7)",
              letterSpacing: "0.06em",
            }}
          >
            {screenshots[active]?.caption}
          </p>
        </div>

        {screenshots.length > 1 && (
          <>
            <button
              onClick={() => setActive((a) => (a - 1 + screenshots.length) % screenshots.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full transition-all"
              style={{ background: "rgba(245,240,235,0.85)", border: "1px solid rgba(60,9,108,0.12)" }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M8 2L4 6l4 4" stroke="#1a0035" strokeWidth="1.5"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={() => setActive((a) => (a + 1) % screenshots.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full transition-all"
              style={{ background: "rgba(245,240,235,0.85)", border: "1px solid rgba(60,9,108,0.12)" }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M4 2l4 4-4 4" stroke="#1a0035" strokeWidth="1.5"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </>
        )}
      </div>

      {screenshots.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {screenshots.map((s, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="flex-shrink-0 overflow-hidden rounded transition-all"
              style={{
                width: 72,
                height: 46,
                border: `1.5px solid ${i === active ? "#ff6d00" : "rgba(60,9,108,0.1)"}`,
                opacity: i === active ? 1 : 0.55,
              }}
            >
              <img
                src={screenshotPlaceholder(s.caption, i)}
                alt={s.caption}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Rank Card Component
function RankCard({ project, index, onClick }) {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const bg = bgImages[project.categoryTag] || bgImages.fullstack;
  const statusLabel = {
    live: { text: "● LIVE", color: "#22c55e" },
    delivered: { text: "✓ DELIVERED", color: "#9d4edd" },
    internal: { text: "◈ INTERNAL", color: "#ff8500" },
  }[project.status] || { text: project.status, color: "#888" };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative overflow-hidden cursor-pointer"
      style={{
        height: 120,
        borderBottom: "1px solid rgba(60,9,108,0.1)",
      }}
    >
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bg})` }}
        animate={{ filter: hovered ? "blur(18px) brightness(0.45)" : "blur(14px) brightness(0.35)" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />

      <motion.div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(90deg, rgba(26,0,53,0.72) 0%, rgba(36,0,70,0.45) 60%, transparent 100%)`,
        }}
        animate={{ opacity: hovered ? 0.9 : 0.75 }}
        transition={{ duration: 0.4 }}
      />

      <motion.div
        className="absolute left-0 top-0 bottom-0 w-[2px]"
        style={{ background: project.accentColor }}
        animate={{ opacity: hovered ? 1 : 0.35, scaleY: hovered ? 1 : 0.6 }}
        transition={{ duration: 0.3 }}
      />

      {/* Rank number */}
      <div
        className="absolute select-none pointer-events-none"
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(80px, 12vw, 120px)",
          fontWeight: 800,
          fontStyle: "italic",
          color: "rgba(255,255,255,0.06)",
          lineHeight: 1,
          top: "50%",
          left: 24,
          transform: "translateY(-50%)",
          letterSpacing: "-0.05em",
        }}
      >
        {project.rank}
      </div>

      {/* Desktop Content */}
      <div className="absolute inset-0 hidden md:flex items-center px-8 md:px-12 gap-8">
        <div className="flex-shrink-0">
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 11,
              color: project.accentColor,
              letterSpacing: "0.2em",
              opacity: 0.8,
            }}
          >
            {project.rank}
          </span>
        </div>

        <div
          className="flex-shrink-0 w-px h-8"
          style={{ background: "rgba(255,255,255,0.12)" }}
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1">
            <p
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 10,
                color: project.accentColor,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
              }}
            >
              {project.category} · {project.year}
            </p>
            <span style={{ color: statusLabel.color, fontSize: 9 }}>{statusLabel.text}</span>
          </div>
          <h3
            className="leading-tight truncate"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(16px, 3vw, 22px)",
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-0.01em",
            }}
          >
            {project.title}
          </h3>
          <p
            className="mt-1 truncate"
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 10,
              color: "rgba(255,255,255,0.5)",
              letterSpacing: "0.06em",
            }}
          >
            {project.client}
          </p>
        </div>

        <motion.div
          className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full"
          style={{ border: `1px solid ${project.accentColor}44` }}
          animate={{
            opacity: hovered ? 1 : 0,
            x: hovered ? 0 : 8,
          }}
          transition={{ duration: 0.3 }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 6h8M7 3l3 3-3 3" stroke={project.accentColor}
              strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </div>

      {/* Mobile Content - No overlap */}
      <div className="md:hidden absolute inset-0 flex items-center px-6">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 10,
                color: project.accentColor,
                letterSpacing: "0.22em",
              }}
            >
              {project.rank}
            </span>
            <span className="text-[8px] px-2 py-0.5 rounded-full" style={{ background: `${project.accentColor}20`, color: project.accentColor }}>
              {project.category}
            </span>
            <span style={{ color: statusLabel.color, fontSize: 8 }}>{statusLabel.text}</span>
          </div>
          <h3
            className="leading-tight text-white text-base font-bold truncate"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {project.title}
          </h3>
          <p
            className="text-[9px] text-white/50 truncate mt-0.5"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            {project.client}
          </p>
        </div>
        <div
          className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full ml-3"
          style={{ border: `1px solid ${project.accentColor}66` }}
        >
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
            <path d="M2 6h8M7 3l3 3-3 3" stroke={project.accentColor}
              strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}

// Project Detail Overlay
function ProjectDetail({ project, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const tagStyles = {
    background: "rgba(255,109,0,0.08)",
    border: "1px solid rgba(255,109,0,0.22)",
    color: "#ff6d00",
    borderRadius: 4,
    padding: "3px 10px",
    fontFamily: "'Space Mono', monospace",
    fontSize: 10,
    letterSpacing: "0.08em",
  };

  const statusLabel = {
    live: { text: "● LIVE", color: "#22c55e" },
    delivered: { text: "✓ DELIVERED", color: "#9d4edd" },
    internal: { text: "◈ INTERNAL", color: "#ff8500" },
  }[project.status] || { text: project.status, color: "#888" };

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-end md:items-center justify-center p-0 md:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="absolute inset-0"
        style={{ background: "rgba(26,0,53,0.6)", backdropFilter: "blur(8px)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      <motion.div
        className="relative w-full md:max-w-3xl max-h-[92vh] overflow-y-auto rounded-t-2xl md:rounded-2xl"
        style={{
          background: "#f5f0eb",
          border: "1px solid rgba(60,9,108,0.1)",
          boxShadow: "0 -8px 60px rgba(26,0,53,0.18)",
        }}
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 60, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="md:hidden flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full" style={{ background: "rgba(60,9,108,0.15)" }} />
        </div>

        <div
          className="sticky top-0 z-10 flex items-center justify-between px-6 py-4"
          style={{
            background: "rgba(245,240,235,0.95)",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid rgba(60,9,108,0.07)",
          }}
        >
          <div className="flex items-center gap-3">
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 11,
                color: project.accentColor,
                letterSpacing: "0.2em",
              }}
            >
              {project.rank}
            </span>
            <div className="w-px h-4" style={{ background: "rgba(60,9,108,0.15)" }} />
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 9,
                color: statusLabel.color,
                letterSpacing: "0.15em",
              }}
            >
              {statusLabel.text}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full transition-colors"
            style={{ border: "1px solid rgba(60,9,108,0.12)" }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 1l10 10M11 1L1 11" stroke="#1a0035" strokeWidth="1.5"
                strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="px-6 py-6 flex flex-col gap-8">
          <div>
            <p
              className="mb-1"
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 10,
                color: project.accentColor,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
              }}
            >
              {project.category} · {project.year} · {project.client}
            </p>
            <h2
              className="leading-tight"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(22px, 5vw, 32px)",
                fontWeight: 700,
                color: "#1a0035",
                letterSpacing: "-0.02em",
              }}
            >
              {project.title}
            </h2>
          </div>

          <ScreenshotGallery screenshots={project.screenshots} />

          <div className="w-full h-px" style={{ background: "rgba(60,9,108,0.07)" }} />

          <div>
            <p
              className="mb-3"
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 9,
                color: "rgba(36,0,70,0.4)",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              Overview
            </p>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                color: "rgba(26,0,53,0.75)",
                lineHeight: 1.75,
              }}
            >
              {project.description}
            </p>
          </div>

          <div
            className="rounded-lg p-5"
            style={{
              background: `${project.accentColor}08`,
              border: `1px solid ${project.accentColor}22`,
            }}
          >
            <p
              className="mb-2"
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 9,
                color: project.accentColor,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              The Challenge
            </p>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13.5,
                color: "rgba(26,0,53,0.68)",
                lineHeight: 1.7,
              }}
            >
              {project.challenge}
            </p>
          </div>

          <div>
            <p
              className="mb-3"
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 9,
                color: "rgba(36,0,70,0.4)",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              Stack
            </p>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span key={tech} style={tagStyles}>{tech}</span>
              ))}
            </div>
          </div>

          {project.liveUrl && (
            <div className="pt-2">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg transition-all"
                style={{
                  background: project.accentColor,
                  color: "#ffffff",
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  textDecoration: "none",
                }}
              >
                View Live
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                  <path d="M2 10L10 2M10 2H5M10 2v5" stroke="white" strokeWidth="1.5"
                    strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// Featured Projects Section
function FeaturedProjects() {
  const [selected, setSelected] = useState(null);
  const projects = projectsData.featuredProjects;

  return (
    <section
      id="projects"
      className="relative py-12 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #fffaf5 0%, #fff5ea 25%, #fffaf0 50%, #fff5ea 75%, #fffaf5 100%)",
      }}
    >
      {/* Background pattern - same as hero */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.08]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="gridPortfolio" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#ff9e00" strokeWidth="0.5" />
              <circle cx="30" cy="30" r="1" fill="#9d4edd" opacity="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#gridPortfolio)" />
        </svg>
      </div>

      {/* Floating orbs - same as hero */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-retro-orange-1/5 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-retro-purple-5/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full bg-retro-orange-1/3 blur-3xl" />
      </div>

          {/* Header */}
<div className="relative z-10 mr-2 md:ml-8 lg:ml-4 mr-8">
  <TerminalHeading title="featured_projects" delay={0} darkBg={false} />
</div>

      {/* Project list - with left padding for navbar */}
      <div className="relative z-10 md:ml-16 lg:ml-28">
        {projects.map((p, i) => (
          <RankCard
            key={p.id}
            project={p}
            index={i}
            onClick={() => setSelected(p)}
          />
        ))}
      </div>

      {/* Project detail overlay */}
      <AnimatePresence>
        {selected && (
          <ProjectDetail project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

export default FeaturedProjects;