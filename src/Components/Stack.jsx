import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import TerminalHeading from "./TerminalHeading";

export default function Stack() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  // Technology logos - using reliable CDN sources
  const belt1Items = [
    { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
    { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
    { name: "Tailwind", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
    { name: "Framer Motion", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/framermotion/framermotion-original.svg" },
    { name: "Figma", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
    { name: "Photoshop", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg" },
    { name: "Illustrator", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg" },
    // Duplicate for seamless loop
    { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
    { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
    { name: "Tailwind", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
    { name: "Framer Motion", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/framermotion/framermotion-original.svg" },
    { name: "Figma", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
    { name: "Photoshop", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg" },
    { name: "Illustrator", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg" },
  ];

  const belt2Items = [
    { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "Express", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
    { name: "GraphQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg" },
    { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
    { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
    { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
    { name: "AWS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
    { name: "Vercel", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg" },
    { name: "Cloudinary", logo: "https://cdn.worldvectorlogo.com/logos/cloudinary-2.svg" },
    { name: "Firebase", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
    // Duplicate for seamless loop
    { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "Express", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
    { name: "GraphQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg" },
    { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
    { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
    { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
    { name: "AWS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
    { name: "Vercel", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg" },
    { name: "Cloudinary", logo: "https://cdn.worldvectorlogo.com/logos/cloudinary-2.svg" },
    { name: "Firebase", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-16 overflow-hidden"
      style={{
        background: "#0a0a0f",
      }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.08]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="gridBelt" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#ff9e00" strokeWidth="0.5" />
              <circle cx="30" cy="30" r="1" fill="#ff9e00" opacity="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#gridBelt)" />
        </svg>
      </div>

      {/* Floating orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-retro-orange-1/10 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-retro-purple-5/10 blur-3xl" />
      </div>


      <div className="relative z-10 md:ml-8 lg:ml-4 mr-8">
  <TerminalHeading title="my_tech_stack" delay={0} darkBg={true} />
</div>

      {/* Main Content - Full width belts */}
      <div className="relative z-10">
        
        {/* Belt 1 */}
        <div className="mb-8 w-full">
          <div 
            className="relative w-full overflow-hidden" 
            style={{ 
              transform: "rotate(-2deg)",
              transformOrigin: "center center",
            }}
          >
            <div
              className="absolute inset-0 w-full"
              style={{
                background: "#ffffff",
              }}
            />
            
            <motion.div
              className="flex gap-6 py-3 px-4"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              style={{ display: "inline-flex" }}
            >
              {belt1Items.map((tech, idx) => (
                <div
                  key={`${tech.name}-${idx}`}
                  className="flex-shrink-0 flex items-center justify-center w-12 h-12"
                >
                  <img
                    src={tech.logo}
                    alt={tech.name}
                    className="w-8 h-8 object-contain"
                    style={{ filter: "brightness(0) saturate(100%) invert(15%) sepia(89%) saturate(5000%) hue-rotate(268deg) brightness(70%) contrast(120%)" }}
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Belt 2 */}
        <div className="w-full">
          <div 
            className="relative w-full overflow-hidden" 
            style={{ 
              transform: "rotate(-2deg)",
              transformOrigin: "center center",
            }}
          >
            <div
              className="absolute inset-0 w-full"
              style={{
                background: "#ffffff",
              }}
            />
            
            <motion.div
              className="flex gap-6 py-3 px-4"
              animate={{ x: ["-50%", "0%"] }}
              transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
              style={{ display: "inline-flex" }}
            >
              {belt2Items.map((tech, idx) => (
                <div
                  key={`${tech.name}-${idx}`}
                  className="flex-shrink-0 flex items-center justify-center w-12 h-12"
                >
                  <img
                    src={tech.logo}
                    alt={tech.name}
                    className="w-8 h-8 object-contain"
                    style={{ filter: "brightness(0) saturate(100%) invert(15%) sepia(89%) saturate(5000%) hue-rotate(268deg) brightness(70%) contrast(120%)" }}
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}