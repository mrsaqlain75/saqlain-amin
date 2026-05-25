import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import TerminalHeading from "./TerminalHeading";

const testimonials = [
  {
    id: 1,
    name: "Alison Zara Singh",
    feedback: "Saqlain trained me for 6 months and guess what, I got the Comptia ITF+ certification.",
    rating: 5,
    platform: "Fiverr"
  },
  {
    id: 2,
    name: "Arif Ullah",
    feedback: "Delivered the app weeks before the dealine and still maintains it perfectly.",
    rating: 5,
    platform: "local"
  },
  {
    id: 3,
    name: "Zubaida Khalid",
    feedback: "Well mannered, great communication and very responsive",
    rating: 5,
    platform: "fiverr"
  },
  {
    id: 4,
    name: "Karla Gomez",
    feedback: "His last minute session saved my automata exam. Cheers",
    rating: 5,
    platform: "upwork"
  },
  {
    id: 5,
    name: "Ahmad Khan",
    feedback: "As his 1st fiverr client, really tested him. He's great. ",
    rating: 5,
    platform: "fiverr"
  }
];

// Platform icon component
function PlatformIcon({ platform }) {
  if (platform === "fiverr") {
    return (
      <div className="w-6 h-6 rounded-full bg-[#1dbf73] flex items-center justify-center shadow-lg">
        <span className="text-white text-[10px] font-bold">F</span>
      </div>
    );
  }
  if (platform === "upwork") {
    return (
      <div className="w-6 h-6 rounded-full bg-[#6fda44] flex items-center justify-center shadow-lg">
        <span className="text-white text-[9px] font-bold">U</span>
      </div>
    );
  }
  return (
    <div className="w-6 h-6 rounded-full bg-retro-purple-5 flex items-center justify-center shadow-lg">
      <span className="text-white text-[10px] font-bold">L</span>
    </div>
  );
}

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const currentTestimonial = testimonials[currentIndex];

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <section
      className="relative py-20 overflow-hidden"
      style={{
        background: "#0a0a0f",
      }}
    >
      {/* Background pattern - retro-orange-5 color */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.08]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="gridTestimonials" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#ff9e00" strokeWidth="0.5" />
              <circle cx="30" cy="30" r="1" fill="#ff9e00" opacity="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#gridTestimonials)" />
        </svg>
      </div>

      {/* Floating orbs - adjusted for dark background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-retro-orange-1/10 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-retro-purple-5/10 blur-3xl" />
      </div>

          {/* Header */}
<div className="relative z-10 mr-2 md:ml-8 lg:ml-4 mr-8">
  <TerminalHeading title="testimonials" delay={0} darkBg={true} />
</div>

      {/* Main Carousel */}
      <div className="relative z-10 max-w-3xl mx-auto px-6">
        {/* Star Rating + Platform Icon */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={18}
                className="fill-current"
                style={{ color: "#ff9e00" }}
              />
            ))}
          </div>
          <PlatformIcon platform={currentTestimonial.platform} />
        </div>

        {/* Feedback Text with Animation */}
        <div className="relative min-h-[120px] flex items-center justify-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              initial={{ opacity: 0, x: direction * 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -50 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="text-center"
            >
              <p
                className="text-lg md:text-xl leading-relaxed"
                style={{ 
                  fontFamily: "'Playfair Display', serif",
                  color: "#e0d4ff"
                }}
              >
                "{currentTestimonial.feedback}"
              </p>
              <p
                className="mt-4 text-sm font-mono"
                style={{ 
                  fontFamily: "'Space Mono', monospace",
                  color: "#ff9e00"
                }}
              >
                — {currentTestimonial.name}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Arrows and Dots */}
        <div className="flex items-center justify-center gap-6 mt-8">
          <button
            onClick={prevTestimonial}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110"
            style={{
              border: "1px solid rgba(255,158,0,0.3)",
              background: "rgba(255,255,255,0.05)",
            }}
          >
            <ChevronLeft size={16} className="text-retro-orange-5" />
          </button>

          <div className="flex gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > currentIndex ? 1 : -1);
                  setCurrentIndex(idx);
                }}
                className="transition-all duration-300 rounded-full"
                style={{
                  width: currentIndex === idx ? 24 : 6,
                  height: 6,
                  background: currentIndex === idx ? "#ff9e00" : "rgba(255,158,0,0.3)",
                }}
              />
            ))}
          </div>

          <button
            onClick={nextTestimonial}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110"
            style={{
              border: "1px solid rgba(255,158,0,0.3)",
              background: "rgba(255,255,255,0.05)",
            }}
          >
            <ChevronRight size={16} className="text-retro-orange-5" />
          </button>
        </div>
      </div>

      {/* Footer Stats - adjusted for dark background */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="relative z-10 text-center mt-12"
      >
        <div className="inline-flex flex-wrap items-center justify-center gap-4 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-retro-orange-5/20">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-[#1dbf73] flex items-center justify-center">
              <span className="text-white text-[8px] font-bold">F</span>
            </div>
            <span className="text-[9px] font-mono text-gray-400">Fiverr</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-[#6fda44] flex items-center justify-center">
              <span className="text-white text-[8px] font-bold">U</span>
            </div>
            <span className="text-[9px] font-mono text-gray-400">Upwork</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-retro-purple-5 flex items-center justify-center">
              <span className="text-white text-[8px] font-bold">L</span>
            </div>
            <span className="text-[9px] font-mono text-gray-400">Local Clients</span>
          </div>

        </div>
      </motion.div>
    </section>
  );
}