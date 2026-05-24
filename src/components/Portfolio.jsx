import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import projectsData from "../data/projects.json";
import TerminalHeading from "./TerminalHeading";

/*
  FEATURED WORK — "The Footnote" v2
  ─────────────────────────────────
  Changes from v1:
  1. Uniform title sizes across all rows
  2. Removed "5 Projects" pill
  3. TerminalHeading used instead of custom heading
  4. Compact row heights — entire list fits one viewport
  5. FloatingThumb disabled on touch/mobile
  6. Image slideshow with prev/next in side panel
  7. Purple from config used on hover states
*/

const T = {
  ground:   "#f8f7f4",
  surface:  "#ffffff",
  ink:      "#0e0e0d",
  muted:    "rgba(14,14,13,0.4)",
  faint:    "rgba(14,14,13,0.09)",
  // orange scale
  orange1:  "#ff6d00",
  orange2:  "#ff7900",
  orange3:  "#ff8500",
  orange5:  "#ff9e00",
  orangeD:  "#e55f00",
  // purple scale
  purple1:  "#240046",
  purple2:  "#3c096c",
  purple3:  "#5a189a",
  purple4:  "#7b2cbf",
  purple5:  "#9d4edd",
  F: {
    display: "'Playfair Display', serif",
    mono:    "'Space Mono', monospace",
    sans:    "'Inter', sans-serif",
  },
};

const STATUS = {
  live:      { label: "Live",      color: "#3a8a58" },
  delivered: { label: "Delivered", color: T.purple5  },
  internal:  { label: "Internal",  color: T.orange1  },
};

const SEEDS = [
  "1461749280684-dccba630e2f6",
  "1498050108023-c5249f4df085",
  "1555066931-4365d14bab8c",
  "1593642632559-0c6d3fc62b89",
  "1547658719-da2b51169166",
];
const imgUrl = (i, w = 800) =>
  `https://images.unsplash.com/photo-${SEEDS[i % SEEDS.length]}?w=${w}&q=80`;

/* ── detect touch device ─────────────────── */
function useIsTouch() {
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    setIsTouch(window.matchMedia("(hover: none)").matches);
  }, []);
  return isTouch;
}

/* ── Corner marks ────────────────────────── */
function Marks({ size = 10, color = T.orange1 }) {
  const arm = { position: "absolute", background: color };
  return (
    <>
      <span style={{ position:"absolute", top:0, left:0 }}>
        <span style={{ ...arm, top:0, left:0, width:size, height:1.5 }} />
        <span style={{ ...arm, top:0, left:0, width:1.5, height:size }} />
      </span>
      <span style={{ position:"absolute", top:0, right:0 }}>
        <span style={{ ...arm, top:0, right:0, width:size, height:1.5 }} />
        <span style={{ ...arm, top:0, right:0, width:1.5, height:size }} />
      </span>
      <span style={{ position:"absolute", bottom:0, left:0 }}>
        <span style={{ ...arm, bottom:0, left:0, width:size, height:1.5 }} />
        <span style={{ ...arm, bottom:0, left:0, width:1.5, height:size }} />
      </span>
      <span style={{ position:"absolute", bottom:0, right:0 }}>
        <span style={{ ...arm, bottom:0, right:0, width:size, height:1.5 }} />
        <span style={{ ...arm, bottom:0, right:0, width:1.5, height:size }} />
      </span>
    </>
  );
}

/* ── Image slideshow (for panel) ─────────── */
function Slideshow({ screenshots, projectIndex }) {
  const [cur, setCur] = useState(0);
  // build array: use screenshots if available, else single seed image
  const slides = screenshots && screenshots.length > 0
    ? screenshots
    : [{ caption: null }];
  const n = slides.length;

  const go = (dir) => setCur(i => (i + dir + n) % n);

  return (
    <div className="flex flex-col gap-2">
      <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
        <AnimatePresence mode="wait">
          <motion.img
            key={cur}
            src={imgUrl(projectIndex + cur, 800)}
            alt={slides[cur]?.caption || ""}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            style={{ filter: "saturate(0.88) contrast(1.03)" }}
          />
        </AnimatePresence>

        {/* purple-bottom wash */}
        <div style={{
          position:"absolute", inset:0, pointerEvents:"none",
          background:"linear-gradient(to top, rgba(36,0,70,0.14) 0%, transparent 55%)",
        }} />
        <Marks />

        {/* caption */}
        {slides[cur]?.caption && (
          <div style={{
            position:"absolute", bottom:0, left:0, right:0,
            padding:"6px 12px",
            background:"rgba(248,247,244,0.92)",
            borderTop:`1px solid ${T.faint}`,
          }}>
            <span style={{ fontFamily:T.F.mono, fontSize:9,
              color:T.muted, letterSpacing:"0.08em" }}>
              {slides[cur].caption}
            </span>
          </div>
        )}

        {/* prev / next arrows — only if multiple */}
        {n > 1 && (
          <>
            <SlideBtn dir="left"  onClick={() => go(-1)} />
            <SlideBtn dir="right" onClick={() => go(1)} />
          </>
        )}
      </div>

      {/* dot indicators */}
      {n > 1 && (
        <div className="flex gap-1.5 justify-center" style={{ paddingTop: 2 }}>
          {slides.map((_, i) => (
            <button key={i} onClick={() => setCur(i)}
              style={{
                width: i === cur ? 18 : 5, height: 3,
                borderRadius: 2, border:"none", cursor:"pointer", padding:0,
                background: i === cur ? T.orange1 : T.faint,
                transition:"all 0.25s",
                boxShadow: i === cur ? `0 0 5px rgba(255,109,0,0.35)` : "none",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function SlideBtn({ dir, onClick }) {
  const [h, setH] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        position:"absolute", top:"50%", transform:"translateY(-50%)",
        [dir === "left" ? "left" : "right"]: 10,
        width:28, height:28,
        display:"flex", alignItems:"center", justifyContent:"center",
        background: h ? T.orange1 : "rgba(248,247,244,0.88)",
        border:`1px solid ${h ? T.orange1 : T.faint}`,
        cursor:"pointer", transition:"all 0.2s",
      }}
    >
      <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
        {dir === "left"
          ? <path d="M6 1L2 4.5l4 3.5" stroke={h?"#fff":T.muted} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          : <path d="M3 1l4 3.5-4 3.5" stroke={h?"#fff":T.muted} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
        }
      </svg>
    </button>
  );
}

/* ── Floating cursor thumbnail (desktop only) */
function FloatingThumb({ index, visible, x, y }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position:"fixed",
            left: x + 20,
            top: y - 70,
            width: 200, height: 130,
            pointerEvents:"none",
            zIndex: 9999,
            overflow:"hidden",
            boxShadow:"0 12px 40px rgba(14,14,13,0.16)",
          }}
        >
          <img src={imgUrl(index)} alt=""
            style={{ width:"100%", height:"100%", objectFit:"cover",
              filter:"saturate(0.85) contrast(1.04)" }} />
          <div style={{
            position:"absolute", top:0, left:0, right:0,
            height:2, background:T.orange1,
          }} />
          {/* purple tint on thumb */}
          <div style={{
            position:"absolute", inset:0, pointerEvents:"none",
            background:"linear-gradient(135deg, rgba(157,78,221,0.1) 0%, transparent 60%)",
          }} />
          <Marks size={8} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Side panel ───────────────────────────── */
function SidePanel({ project, index, onClose }) {
  const status = STATUS[project.status] || { label: project.status, color: T.muted };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const esc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", esc);
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[300] flex justify-end"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* scrim */}
      <motion.div
        className="absolute inset-0"
        style={{ background:"rgba(14,14,13,0.2)" }}
        initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
        onClick={onClose}
      />

      {/* panel */}
      <motion.div
        className="relative flex flex-col overflow-y-auto"
        style={{
          width:"min(100%, 500px)",
          height:"100%",
          background:T.surface,
          borderLeft:`1px solid ${T.faint}`,
          boxShadow:"-16px 0 48px rgba(14,14,13,0.07)",
        }}
        initial={{ x:"100%" }}
        animate={{ x:0 }}
        exit={{ x:"100%" }}
        transition={{ type:"spring", stiffness:340, damping:36 }}
      >
        {/* purple radial wash */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background:`radial-gradient(ellipse at top right, rgba(36,0,70,0.06) 0%, transparent 65%)`,
        }} />
        {/* orange top bar */}
        <div style={{
          position:"absolute", top:0, left:0, right:0,
          height:2, background:T.orange1,
          boxShadow:`0 0 10px rgba(255,109,0,0.28)`,
        }} />

        {/* header */}
        <div className="flex items-start justify-between relative z-10"
          style={{ padding:"28px 28px 20px", borderBottom:`1px solid ${T.faint}` }}>
          <div>
            <p style={{
              fontFamily:T.F.mono, fontSize:9,
              color:T.orange1, letterSpacing:"0.28em",
              textTransform:"uppercase", marginBottom:8,
            }}>
              {String(index + 1).padStart(2,"0")} / {project.category}
            </p>
            <h3 style={{
              fontFamily:T.F.display,
              fontSize:"clamp(18px, 2.5vw, 24px)",
              fontWeight:700, color:T.ink,
              letterSpacing:"-0.02em", lineHeight:1.12,
            }}>
              {project.title}
            </h3>
            <p style={{
              fontFamily:T.F.mono, fontSize:9,
              color:T.muted, letterSpacing:"0.1em", marginTop:6,
            }}>
              {project.client} · {project.year}
            </p>
          </div>
          <button onClick={onClose}
            style={{
              flexShrink:0, marginLeft:12,
              width:30, height:30,
              border:`1px solid ${T.faint}`,
              background:"transparent", cursor:"pointer",
              display:"flex", alignItems:"center", justifyContent:"center",
              transition:"border-color 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = T.orange1}
            onMouseLeave={e => e.currentTarget.style.borderColor = T.faint}
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M1 1l8 8M9 1L1 9" stroke={T.muted} strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* body */}
        <div className="flex flex-col relative z-10"
          style={{ padding:"24px 28px 40px", gap:22, flex:1 }}>

          {/* slideshow */}
          <Slideshow screenshots={project.screenshots} projectIndex={index} />

          {/* status row */}
          <div className="flex items-center gap-3">
            <span style={{
              width:5, height:5, borderRadius:"50%",
              background:status.color, display:"inline-block",
            }} />
            <span style={{ fontFamily:T.F.mono, fontSize:9,
              color:T.muted, letterSpacing:"0.12em" }}>
              {status.label}
            </span>
          </div>

          {/* description */}
          <div>
            <PanelLabel>Overview</PanelLabel>
            <p style={{ fontFamily:T.F.sans, fontSize:13.5,
              color:"rgba(14,14,13,0.62)", lineHeight:1.82, fontWeight:300 }}>
              {project.description}
            </p>
          </div>

          <div style={{ height:1, background:T.faint }} />

          {/* challenge */}
          <div style={{ borderLeft:`2px solid ${T.orange1}`, paddingLeft:14 }}>
            <PanelLabel orange>Challenge</PanelLabel>
            <p style={{ fontFamily:T.F.sans, fontSize:13,
              color:T.muted, lineHeight:1.8, fontWeight:300 }}>
              {project.challenge}
            </p>
          </div>

          {/* stack — purple tags */}
          <div>
            <PanelLabel>Stack</PanelLabel>
            <div className="flex flex-wrap gap-2">
              {project.stack.map(t => (
                <span key={t} style={{
                  fontFamily:T.F.mono, fontSize:9,
                  color:T.purple5, letterSpacing:"0.08em",
                  border:`1px solid rgba(157,78,221,0.28)`,
                  background:`rgba(36,0,70,0.04)`,
                  padding:"3px 10px",
                }}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* cta */}
          {project.liveUrl && <PanelCTA href={project.liveUrl} />}
        </div>
      </motion.div>
    </motion.div>
  );
}

function PanelLabel({ children, orange }) {
  return (
    <p style={{
      fontFamily:T.F.mono, fontSize:8,
      color: orange ? T.orange1 : T.faint,
      letterSpacing:"0.28em", textTransform:"uppercase", marginBottom:8,
    }}>
      {children}
    </p>
  );
}

function PanelCTA({ href }) {
  const [h, setH] = useState(false);
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        alignSelf:"flex-start",
        fontFamily:T.F.mono, fontSize:10,
        letterSpacing:"0.14em", textDecoration:"none",
        color:"#fff",
        background: h ? T.orangeD : T.orange1,
        padding:"10px 20px",
        display:"inline-flex", alignItems:"center", gap:8,
        transition:"all 0.22s",
        boxShadow: h
          ? "0 6px 20px rgba(255,109,0,0.36)"
          : "0 2px 10px rgba(255,109,0,0.18)",
      }}
    >
      View Live
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
        <path d="M1 9L9 1M9 1H4M9 1v5" stroke="#fff" strokeWidth="1.4"
          strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </a>
  );
}

/* ── Single project row ───────────────────── */
function ProjectRow({ project, index, onOpen, isTouch }) {
  const [hovered, setHovered] = useState(false);
  const [cursor, setCursor] = useState({ x:0, y:0 });
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-30px" });

  const onMouseMove = useCallback((e) => {
    setCursor({ x:e.clientX, y:e.clientY });
  }, []);

  // Purple hover color cycles through config scale
  const purpleHoverColors = [T.purple3, T.purple4, T.purple5, T.purple2, T.purple4];
  const hoverPurple = purpleHoverColors[index % purpleHoverColors.length];

  return (
    <>
      {/* floating thumb — desktop only */}
      {!isTouch && (
        <FloatingThumb
          index={index}
          visible={hovered}
          x={cursor.x}
          y={cursor.y}
        />
      )}

      <motion.div
        ref={ref}
        initial={{ opacity:0, y:12 }}
        animate={inView ? { opacity:1, y:0 } : {}}
        transition={{ duration:0.5, delay:index * 0.07, ease:[0.22,1,0.36,1] }}
        style={{ borderTop:`1px solid ${T.faint}` }}
      >
        <div
          onMouseEnter={() => !isTouch && setHovered(true)}
          onMouseLeave={() => !isTouch && setHovered(false)}
          onMouseMove={!isTouch ? onMouseMove : undefined}
          onClick={() => onOpen(index)}
          style={{
            display:"flex",
            alignItems:"center",
            justifyContent:"space-between",
            gap:"clamp(12px, 2vw, 28px)",
            padding:"clamp(16px, 2.5vh, 24px) 0",  // Increased padding for more space
            cursor:"pointer",
            position:"relative",
          }}
        >
          {/* orange underline on hover */}
          <motion.div
            animate={{ scaleX: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
            transition={{ duration:0.28, ease:[0.22,1,0.36,1] }}
            style={{
              position:"absolute",
              bottom:"clamp(12px, 1.8vh, 16px)",
              left:0, right:0,
              height:1.5,
              background:`linear-gradient(90deg, ${T.orange1}, ${hoverPurple})`,
              transformOrigin:"left",
              pointerEvents:"none",
            }}
          />

          {/* index */}
          <span style={{
            fontFamily:T.F.mono, fontSize:10,
            color: hovered ? T.orange1 : T.faint,
            letterSpacing:"0.2em", flexShrink:0,
            transition:"color 0.22s",
            width:24,
          }}>
            {String(index + 1).padStart(2,"0")}
          </span>

          {/* title — uniform size */}
          <h3 style={{
            fontFamily:T.F.display,
            fontSize:"clamp(18px, 2.2vw, 26px)",
            fontWeight:700,
            fontStyle: hovered ? "italic" : "normal",
            letterSpacing:"-0.02em",
            lineHeight:1,
            color: hovered ? hoverPurple : "rgba(14,14,13,0.78)",
            transition:"color 0.22s, font-style 0.22s",
            flex:1, minWidth:0,
            whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis",
          }}>
            {project.title}
          </h3>

          {/* right meta — hidden on mobile */}
          <div className="hidden sm:flex items-center gap-5 flex-shrink-0">
            <span style={{
              fontFamily:T.F.mono, fontSize:9,
              color: hovered ? hoverPurple : T.muted,
              letterSpacing:"0.14em", textTransform:"uppercase",
              transition:"color 0.22s",
            }}>
              {project.category}
            </span>
            <span style={{
              fontFamily:T.F.mono, fontSize:9,
              color:T.faint, letterSpacing:"0.12em",
            }}>
              {project.year}
            </span>
            {/* status dot */}
            <span style={{
              width:5, height:5, borderRadius:"50%", flexShrink:0,
              background:(STATUS[project.status]||{}).color || T.muted,
              display:"inline-block",
              boxShadow: hovered
                ? `0 0 5px ${(STATUS[project.status]||{}).color || T.muted}`
                : "none",
              transition:"box-shadow 0.22s",
            }} />
          </div>

          {/* arrow */}
          <motion.span
            animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -5 }}
            transition={{ duration:0.18 }}
            className="hidden sm:inline-flex flex-shrink-0"
          >
            <svg width="13" height="9" viewBox="0 0 13 9" fill="none">
              <path d="M0 4.5h12M8 1l4 3.5L8 8"
                stroke={hoverPurple} strokeWidth="1.3"
                strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.span>
        </div>
      </motion.div>
    </>
  );
}

/* ── Main export ──────────────────────────── */
export default function FeaturedProjects() {
  const [openIndex, setOpenIndex] = useState(null);
  const projects = projectsData.featuredProjects;
  const isTouch = useIsTouch();

  return (
    <section
      id="projects"
      style={{
        background: "linear-gradient(135deg, #fffaf5 0%, #fff5ea 25%, #fffaf0 50%, #fff5ea 75%, #fffaf5 100%)",
        
        position:"relative",
        overflow:"hidden",
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

      {/* Floating orbs - subtle */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-retro-orange-1/5 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-retro-purple-5/5 blur-3xl" />
      </div>


        {/* TerminalHeading */}
        <div className="relative z-10 mr-2 md:ml-8 lg:ml-4 mr-8">
          <TerminalHeading title="featured_projects" delay={0} darkBg={false} />
        </div>

      <div style={{ maxWidth:860, margin:"0 auto", position:"relative" }}>


        {/* project list */}
        <div>
          {projects.map((p, i) => (
            <ProjectRow
              key={p.id}
              project={p}
              index={i}
              onOpen={setOpenIndex}
              isTouch={isTouch}
            />
          ))}
          {/* closing rule */}
          <div style={{ height:1, background:T.faint, marginTop:8 }} />
        </div>

        {/* footnote hint */}
        <motion.p
          initial={{ opacity:0 }}
          animate={{ opacity:1 }}
          transition={{ delay:0.9, duration:0.5 }}
          style={{
            fontFamily:T.F.mono, fontSize:8,
            color:T.faint, letterSpacing:"0.22em",
            textTransform:"uppercase",
            textAlign:"right", marginTop:24,
          }}
        >
          {isTouch ? "Tap to explore" : "Hover to preview · Click to explore"}
        </motion.p>
      </div>

      {/* side panel */}
      <AnimatePresence>
        {openIndex !== null && (
          <SidePanel
            project={projects[openIndex]}
            index={openIndex}
            onClose={() => setOpenIndex(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}