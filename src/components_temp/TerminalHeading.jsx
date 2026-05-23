import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function TerminalHeading({ title, delay = 0, darkBg = false }) {
  const [displayText, setDisplayText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  // Colors based on background
  const colors = darkBg ? {
    prompt: "#ffffff",
    path: "#ff9e00",
    text: "#ffffff",
    cursor: "#ff6d00",
    output: "#ffffff",
    outputLine: "#ff9e00",
    dotRed: "rgba(255,109,0,0.4)",
    dotYellow: "rgba(255,158,0,0.4)",
    dotGreen: "rgba(157,78,221,0.4)",
  } : {
    prompt: "#240046",
    path: "#ff6d00",
    text: "#240046",
    cursor: "#ff6d00",
    output: "#240046",
    outputLine: "#ff6d00",
    dotRed: "rgba(255,109,0,0.5)",
    dotYellow: "rgba(255,158,0,0.5)",
    dotGreen: "rgba(157,78,221,0.5)",
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      let i = 0;
      const typeInterval = setInterval(() => {
        if (i <= title.length) {
          setDisplayText(title.slice(0, i));
          i++;
        } else {
          clearInterval(typeInterval);
          setIsTypingComplete(true);
        }
      }, 80);
      return () => clearInterval(typeInterval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [title, delay]);

  useEffect(() => {
    if (isTypingComplete) {
      const cursorInterval = setInterval(() => {
        setShowCursor(prev => !prev);
      }, 500);
      return () => clearInterval(cursorInterval);
    }
  }, [isTypingComplete]);

  return (
    <div className="relative z-10 mb-12 md:ml-16 lg:ml-24 ml-4">
      {/* Terminal prompt line */}
      <div className="flex items-center gap-2 mb-2">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: colors.dotRed }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: colors.dotYellow }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: colors.dotGreen }} />
        </div>
        <div className="flex-1" />
        <span 
          className="text-[10px] font-mono"
          style={{ fontFamily: "'Space Mono', monospace", color: colors.outputLine }}
        >
          zsh
        </span>
      </div>

      {/* Command line */}
      <div className="flex items-center flex-wrap gap-1">
        <span 
          className="font-mono text-sm"
          style={{ fontFamily: "'Space Mono', monospace", color: colors.prompt }}
        >
          $ cat
        </span>
        <span 
          className="font-mono text-sm"
          style={{ fontFamily: "'Space Mono', monospace", color: colors.path }}
        >
          ~/sections/
        </span>
        <div className="relative">
          <span 
            className="font-mono text-sm font-semibold"
            style={{ fontFamily: "'Space Mono', monospace", color: colors.text }}
          >
            {displayText}
          </span>
          {(!isTypingComplete || showCursor) && (
            <span 
              className="inline-block w-2 h-4 ml-0.5 animate-pulse"
              style={{ verticalAlign: "middle", background: colors.cursor }}
            />
          )}
        </div>
      </div>

{/* Output indicator */}
{isTypingComplete && (
  <motion.div
    initial={{ opacity: 0, y: -5 }}
    animate={{ opacity: 1, y: 0 }}
    className="mt-3"
  >
    <div className="flex items-center gap-2 flex-nowrap">
      <div className="w-12 h-px flex-shrink-0" style={{ background: colors.outputLine }} />
      <span 
        className="text-[9px] font-mono tracking-wider whitespace-nowrap"
        style={{ fontFamily: "'Space Mono', monospace", color: colors.output }}
      >
        OUTPUT // {title.toUpperCase().replace(/\s/g, "_")}
      </span>
      <div className="flex-1 h-px" style={{ background: colors.outputLine }} />
    </div>
  </motion.div>
)}
    </div>
  );
}