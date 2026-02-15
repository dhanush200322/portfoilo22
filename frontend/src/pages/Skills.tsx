import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Code, Server, Palette, Wrench } from "lucide-react";

const skills = {
  frontend: [
    { label: "React", value: 80 },
    { label: "HTML", value: 90 },
    { label: "Tailwind CSS", value: 80 },
    { label: "JAVA SCRIPT", value: 85},
     { label: "BOOTSTRAP",value:90},
     { label: "React Native",value:75},
  ],
  backend: [
    { label: "Node.js", value: 88 },
    { label: "Express.js", value: 85 },
    { label: "SQL", value: 82 },
    { label: "REST APIs", value: 90 },
    {label: "MongoDB",value:75},
  ],
  design: [
    { label: "Canva",value:85},
    { label: "Framer",value:95},
    { label: "lovable dev",value:90},
     { label: "Bolt.new",value:90},
  ],
  tools: [
    { label: "Git", value: 92 },
    { label: "vercel",value:95},
    {label:"github",value:90},
    {label:"netlify",value:95},
    { label: "VS Code", value: 95 },
  ],
};

const categoryIcon = {
  frontend: Code,
  backend: Server,
  design: Palette,
  tools: Wrench,
};

const aiTools = [
  { label: "n8n", img: "/n8n-color.png", initials: "n8n" },
  { label: "GHL", img: "/ghl logo.jpeg", initials: "GHL" },
];

const SkillBar = ({ label, value }: { label: string; value: number }) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between mb-1">
        <span className="text-lg">{label}</span>
        <span className="text-sky-400 font-semibold">{value}%</span>
      </div>

      {/* Background */}
      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
        {/* Animated gradient bar */}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          transition={{ duration: 1.3, ease: "easeOut" }}
          className="h-full skill-bar-gradient"
        />
      </div>
    </div>
  );
};

export default function Skills() {
  const entries = Object.entries(skills);
  const firstRow = entries.slice(0, 2);
  const secondRow = entries.slice(2);

  // create five visual slots (use aiTools images if present, otherwise empty placeholders)
  const displaySlots = Array.from({ length: 5 }).map((_, i) => aiTools[i] ?? { label: "", initials: "" });

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const pathIds = [0, 1, 2, 3, 4].map((i) => `conn-${i}`);

    const updatePaths = () => {
      const rect = container.getBoundingClientRect();

      // mapping: slot 0->frontend, 1->backend, 2->design, 3->tools, 4->always-learning
      const targets = ["frontend", "backend", "design", "tools", "always-learning"];

      pathIds.forEach((id, idx) => {
        const slot = container.querySelector(`[data-slot-index=\"${idx}\"]`) as HTMLElement | null;
        const target = document.querySelector(`[data-target=\"${targets[idx]}\"]`) as HTMLElement | null;
        const path = container.querySelector(`#${id}`) as SVGPathElement | null;
        if (!slot || !path) return;

        // start at center of slot
        const s = slot.getBoundingClientRect();
        const startX = s.left + s.width / 2 - rect.left;
        const startY = s.top + s.height - rect.top; // bottom of slot

        // if target exists, connect to near top of target; otherwise point down
        let endX = startX;
        let endY = startY + 80;
        if (target) {
          const t = target.getBoundingClientRect();
          endX = t.left + t.width / 2 - rect.left;
          endY = t.top + 8 - rect.top; // a bit above target top
        }

        const dx = Math.max(Math.abs(endX - startX) * 0.5, 40);
        const d = `M ${startX},${startY} C ${startX},${startY + dx} ${endX},${endY - dx} ${endX},${endY}`;
        path.setAttribute("d", d);
      });
    };

    updatePaths();
    const ro = new ResizeObserver(updatePaths);
    ro.observe(document.documentElement);
    window.addEventListener("resize", updatePaths);
    window.addEventListener("scroll", updatePaths, { passive: true });

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updatePaths);
      window.removeEventListener("scroll", updatePaths);
    };
  }, []);

  return (
    <div className="pt-32 px-6 max-w-7xl mx-auto text-white">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center text-7xl font-bold mb-4"
      >
        My <span className="text-gradient">Skills</span>
      </motion.h1>

      <p className="text-center text-gray-400 text-xl mb-20">
        Technologies and tools I use to bring ideas to life
      </p>

      {/* GRID - split into two rows so logos can sit between without overlapping */}
      <div>
        <div className="grid md:grid-cols-2 gap-12">
          {firstRow.map(([category, list]) => {
            const Icon = categoryIcon[category as keyof typeof categoryIcon];

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-gray-900/60 backdrop-blur-xl p-10 rounded-2xl border border-gray-800 shadow-xl"
                data-target={category.toLowerCase()}
              >
                <div className="flex items-center gap-4 mb-8">
                  <Icon className="w-10 h-10 text-sky-400" />
                  <h2 className="text-3xl font-bold capitalize">{category}</h2>
                </div>

                {list.map((skill) => (
                  <SkillBar key={skill.label} label={skill.label} value={skill.value} />
                ))}
              </motion.div>
            );
          })}
        </div>

        {/* Centered logos card (styled like other skill cards) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl bg-gray-900/60 backdrop-blur-xl p-8 rounded-2xl border border-gray-800 shadow-xl my-6"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-3 h-3 rounded-full bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.5)]" />
            <span aria-hidden className="text-3xl">🤖</span>
            <h3 className="text-3xl font-bold">AI Automation Tools</h3>
          </div>

          <div className="relative">
            {/* SVG connector sits behind the icons */}
            <svg
              viewBox="0 0 100 24"
              preserveAspectRatio="none"
              className="pointer-events-none absolute left-0 right-0 top-8 h-20 w-full"
              aria-hidden
            >
              <defs>
                <linearGradient id="neonGrad" x1="0%" x2="100%" y1="0%" y2="0%">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="50%" stopColor="#7c3aed" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>

              {/* subtle background path */}
              <polyline points="8,12 28,12 48,12 68,12 92,12" stroke="rgba(255,255,255,0.03)" strokeWidth="2" fill="none" strokeLinecap="round" />

              {/* animated neon flow */}
              <polyline
                points="8,12 28,12 48,12 68,12 92,12"
                stroke="url(#neonGrad)"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
                className="nerve-line"
              />
            </svg>

            <div className="flex justify-center relative z-10">
              <div className="flex items-center gap-12 md:gap-16">
                {aiTools.map((tool) => (
                  <div key={tool.label} className="flex flex-col items-center group cursor-pointer">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center bg-transparent overflow-hidden p-1 transition-transform duration-200 ease-out group-hover:scale-110 group-hover:-translate-y-1 group-hover:shadow-[0_0_20px_rgba(124,58,237,0.18)]">
                      {tool.img ? (
                        <img
                          src={tool.img}
                          alt={tool.label}
                          className="w-16 h-16 object-contain transition-all duration-300 group-hover:animate-pulse"
                        />
                      ) : (
                        <span className="text-white font-bold text-lg">{tool.initials}</span>
                      )}
                    </div>
                    <span className="text-sm text-gray-300 font-medium mt-3 capitalize group-hover:text-sky-400">{tool.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {secondRow.map(([category, list]) => {
            const Icon = categoryIcon[category as keyof typeof categoryIcon];

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-gray-900/60 backdrop-blur-xl p-10 rounded-2xl border border-gray-800 shadow-xl"
                data-target={category.toLowerCase()}
              >
                <div className="flex items-center gap-4 mb-8">
                  <Icon className="w-10 h-10 text-sky-400" />
                  <h2 className="text-3xl font-bold capitalize">{category}</h2>
                </div>

                {list.map((skill) => (
                  <SkillBar key={skill.label} label={skill.label} value={skill.value} />
                ))}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* (Removed duplicate bottom AI grid — logos are shown only in the centered overlay above) */}

      {/* Bottom Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-gray-900/60 to-gray-800/60 backdrop-blur-xl border border-gray-800 rounded-2xl p-12 mt-20 text-center shadow-xl"
      >
        <h2 className="text-4xl font-bold mb-4">Always Learning</h2>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          Technology evolves rapidly, and so do I. I explore WebGL, AI integration,
          and advanced animation techniques to push the boundaries of what’s possible.
        </p>
      </motion.div>
    </div>
  );
}
