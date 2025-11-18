import { motion } from "framer-motion";
import { Code, Server, Palette, Wrench } from "lucide-react";

const skills = {
  frontend: [
    { label: "React", value: 80 },
    { label: "HTML", value: 90 },
    { label: "Tailwind CSS", value: 80 },
    { label: "JAVA SCRIPT", value: 85},
     { label: "BOOTSTRAP",value:90},
     { label: "React Native",value:60},
  ],
  backend: [
    { label: "Node.js", value: 88 },
    { label: "Python", value: 85 },
    { label: "PostgreSQL", value: 82 },
    { label: "REST APIs", value: 90 },
    {label: "spring boot",value:75},
  ],
  design: [
    { label: "Canva",value:85},
    { label: "Framer",value:95},
    { label: "lovable dev",value:90},
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

      {/* GRID */}
      <div className="grid md:grid-cols-2 gap-12">
        {Object.entries(skills).map(([category, list]) => {
          const Icon = categoryIcon[category as keyof typeof categoryIcon];

          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gray-900/60 backdrop-blur-xl p-10 rounded-2xl border border-gray-800 shadow-xl"
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
