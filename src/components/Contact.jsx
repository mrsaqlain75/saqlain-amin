import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import TerminalHeading from "./TerminalHeading";

const contactMeta = [
  { label: "Email", value: "saqlainamin646@gmail.com", href: "mailto:saqlainamin646@gmail.com" },
  { label: "Phone", value: "+92 327 585 7692", href: "tel:+923275857692" },
  { label: "Location", value: "Drosh, Chitral, Pakistan", href: null },
];

const socials = [
  { name: "GitHub", url: "https://github.com/mrsaqlain75", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
  { name: "LinkedIn", url: "https://linkedin.com/in/saqlain-amin-99206b260", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" },
  { name: "Twitter", url: "https://x.com/x_saqlain", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/twitter/twitter-original.svg" },
  { name: "Instagram", url: "https://instagram.com/saqlainsta", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/instagram.svg" },
  { name: "Facebook", url: "https://facebook.com/fb.saqlain.75", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/facebook.svg" },
  { name: "TikTok", url: "https://tiktok.com/@saqlain_amin_sadevs", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/tiktok.svg" },
  { name: "YouTube", url: "https://youtube.com/@saqlain_amin", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/youtube.svg" },
  { name: "Medium", url: "https://medium.com/@saqlain9696382", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/medium.svg" },
  { name: "Stack Overflow", url: "https://stackoverflow.com/users/20660180/saqlain-amin?tab=profile", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/stackoverflow/stackoverflow-original.svg" },
];

function Field({ label, name, type = "text", value, onChange, onFocus, onBlur, focused, rows }) {
  const isActive = focused === name;
  const Tag = rows ? "textarea" : "input";

  return (
    <div className="relative group">
      <label
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: 10,
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: isActive ? "#ff6d00" : "rgba(36,0,70,0.45)",
          display: "block",
          marginBottom: 8,
          transition: "color 0.25s",
        }}
      >
        {label}
      </label>
      <Tag
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => onFocus(name)}
        onBlur={() => onBlur(null)}
        rows={rows}
        style={{
          width: "100%",
          background: "transparent",
          border: "none",
          borderBottom: `1px solid ${isActive ? "#ff6d00" : "rgba(157,78,221,0.2)"}`,
          outline: "none",
          padding: "6px 0 10px",
          fontFamily: "'Space Mono', monospace",
          fontSize: 14,
          color: "#240046",
          resize: "none",
          transition: "border-color 0.25s",
          display: "block",
        }}
      />
      <motion.div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: 2,
          background: "#ff6d00",
          originX: 0,
        }}
        animate={{ scaleX: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="w-full"
      />
    </div>
  );
}

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [focused, setFocused] = useState(null);
  const [status, setStatus] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) {
      setStatus("error"); setTimeout(() => setStatus(null), 3000);
      return;
    }
    if (!form.email.includes("@")) {
      setStatus("error"); setTimeout(() => setStatus(null), 3000);
      return;
    }
    const subject = `Portfolio: ${form.subject}`;
    const body = `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`;
    window.location.href = `mailto:saqlainamin646@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus("success"); setTimeout(() => setStatus(null), 3000);
  };

  const stagger = (i) => ({ 
    initial: { opacity: 0, y: 16 }, 
    animate: inView ? { opacity: 1, y: 0 } : {}, 
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] } 
  });

  return (
    <section
      ref={ref}
      id="contact"
      className="relative py-20 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #fffaf5 0%, #fff5ea 25%, #fffaf0 50%, #fff5ea 75%, #fffaf5 100%)",
      }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.08]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="gridContact" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#ff9e00" strokeWidth="0.5" />
              <circle cx="30" cy="30" r="1" fill="#9d4edd" opacity="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#gridContact)" />
        </svg>
      </div>

      {/* Floating orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-retro-orange-1/5 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-retro-purple-5/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full bg-retro-orange-1/8 blur-3xl" />
      </div>

          {/* Header */}
<div className="relative z-10 mr-2 md:ml-8 lg:ml-4 mr-8">
  <TerminalHeading title="connect" delay={0} darkBg={false} />
</div>

      {/* Two Column Layout */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-8 md:ml-16 lg:ml-24">
        


        {/* Two Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* LEFT COLUMN - Contact Info & Form */}
          <div>
            {/* Meta row */}
            <motion.div
              {...stagger(1)}
              className="flex flex-col sm:flex-row justify-between gap-6 mb-10 pb-6"
              style={{ borderBottom: "1px solid rgba(157,78,221,0.12)" }}
            >
              {contactMeta.map((m) => (
                <div key={m.label} className="flex flex-col gap-1">
                  <span
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: 9,
                      letterSpacing: "0.28em",
                      textTransform: "uppercase",
                      color: "rgba(36,0,70,0.4)",
                    }}
                  >
                    {m.label}
                  </span>
                  {m.href ? (
                    <a
                      href={m.href}
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: 13,
                        color: "#240046",
                        textDecoration: "none",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) => (e.target.style.color = "#ff6d00")}
                      onMouseLeave={(e) => (e.target.style.color = "#240046")}
                    >
                      {m.value}
                    </a>
                  ) : (
                    <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, color: "#240046" }}>
                      {m.value}
                    </span>
                  )}
                </div>
              ))}
            </motion.div>

            {/* Form */}
            <motion.form {...stagger(2)} onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Field label="Name" name="name" value={form.name}
                  onChange={handleChange} onFocus={setFocused} onBlur={setFocused} focused={focused} />
                <Field label="Email" name="email" type="email" value={form.email}
                  onChange={handleChange} onFocus={setFocused} onBlur={setFocused} focused={focused} />
              </div>

              <Field label="Subject" name="subject" value={form.subject}
                onChange={handleChange} onFocus={setFocused} onBlur={setFocused} focused={focused} />

              <Field label="Message" name="message" value={form.message} rows={4}
                onChange={handleChange} onFocus={setFocused} onBlur={setFocused} focused={focused} />

              {/* Feedback */}
              <AnimatePresence>
                {status === "error" && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                    style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#dc2626" }}
                  >
                    <AlertCircle size={11} /> All fields are required · valid email needed
                  </motion.p>
                )}
                {status === "success" && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                    style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#16a34a" }}
                  >
                    <CheckCircle size={11} /> Opening your email client...
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Submit Button - Retro Purple-1 */}
              <div className="pt-4">
                <motion.button
                  type="submit"
                  className="relative group overflow-hidden rounded-full px-8 py-3 flex items-center gap-3"
                  style={{
                    background: "linear-gradient(135deg, #3c096c, #240046)",
                    cursor: "pointer",
                    fontFamily: "'Space Mono', monospace",
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    color: "#fff",
                    border: "none",
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  animate={{
                    boxShadow: [
                      "0 0 0px rgba(60,9,108,0)",
                      "0 0 20px rgba(60,9,108,0.5)",
                      "0 0 0px rgba(60,9,108,0)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <motion.span
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
                    }}
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  />
                  <span className="relative z-10">Send Message</span>
                  <motion.span
                    className="relative z-10"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <Send size={14} />
                  </motion.span>
                </motion.button>
              </div>
            </motion.form>
          </div>

          {/* RIGHT COLUMN - Social Links */}
          <div>
            <motion.div
              {...stagger(3)}
              className="sticky top-28"
            >
              <div
                className="mb-6 pb-3"
                style={{ borderBottom: "1px solid rgba(157,78,221,0.12)" }}
              >
                <span
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: 9,
                    letterSpacing: "0.28em",
                    textTransform: "uppercase",
                    color: "rgba(36,0,70,0.4)",
                  }}
                >
                  Find me
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {socials.map((social, idx) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4 + idx * 0.03 }}
                    whileHover={{ y: -3, scale: 1.02 }}
                    className="flex items-center gap-3 p-3 rounded-lg transition-all"
                    style={{
                      background: "rgba(255,255,255,0.5)",
                      border: "1px solid rgba(157,78,221,0.12)",
                      textDecoration: "none",
                    }}
                  >
                    <img 
                      src={social.logo} 
                      alt={social.name}
                      className="w-5 h-5 object-contain"
                    />
                    <span
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: 12,
                        color: "#240046",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) => (e.target.style.color = "#ff6d00")}
                      onMouseLeave={(e) => (e.target.style.color = "#240046")}
                    >
                      {social.name}
                    </span>
                  </motion.a>
                ))}
              </div>

              {/* Available badge */}
              <div className="mt-8 flex items-center gap-2">
                <motion.div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "#22c55e" }}
                  animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: 9,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "rgba(36,0,70,0.4)",
                  }}
                >
                  Available for work
                </span>
              </div>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}