import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import ParticlesBackground from "@/components/ParticlesBackground";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ParticlesBackground />

      <div className="container mx-auto px-6 pt-32 pb-20 relative z-10 flex flex-col md:flex-row items-center justify-between">

        {/* LEFT SIDE TEXT */}
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
              Hi, I'm <span className="text-gradient glow-text">DHANUSH AV</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-muted-foreground mb-8"
          >
            Full Stack Developer • AI Automation • Problem Solver
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-12"
          >
            <p className="text-xl text-foreground/80 max-w-2xl">
              Building full-stack architectures that merge efficient backend logic with modern UI frameworks
            </p>
          </motion.div>

          {/* ✅ BUTTONS FIXED WITH PROPER NEON COLOR */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap gap-4 mb-12"
          >
            {/* ✅ Neon Blue Filled Button */}
            <Link to="/contact">
              <button
                className="px-6 py-3 bg-[#00D4FF] text-black font-semibold rounded-xl hover:brightness-110 transition flex items-center"
              >
                Get In Touch
                <ArrowRight className="ml-2 transition-transform" />
              </button>
            </Link>

            {/* ✅ Neon Blue Outline Button */}
            <Link to="/projects">
              <button
                className="px-6 py-3 border border-[#00D4FF] text-white font-semibold rounded-xl hover:bg-[#00D4FF]/10 transition"
              >
                View Projects
              </button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex gap-6"
          >
            <a
              href="https://github.com/dhanush200322"
              target="_blank"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="w-6 h-6" />
            </a>

            <a
              href="https://www.linkedin.com/in/dhanush-av-618271378/"
              target="_blank"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Linkedin className="w-6 h-6" />
            </a>

            <a
              href="mailto:ro224313@gmail.com"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="w-6 h-6" />
            </a>
          </motion.div>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-16 md:mt-0 flex justify-center"
        >
          <motion.div
            animate={{
              y: [0, -8, 0],
              boxShadow: [
                "0 0 30px rgba(0, 200, 255, 0.4)",
                "0 0 55px rgba(150, 100, 255, 0.45)",
                "0 0 30px rgba(0, 200, 255, 0.4)"
              ]
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative w-[260px] md:w-[330px] aspect-square rounded-full"
          >
            <div className="absolute inset-0 rounded-full overflow-hidden animate-spin-slow
                            bg-gradient-to-r from-cyan-400 via-purple-500 to-blue-500
                            p-[6px] shadow-[0_0_60px_rgba(0,200,255,0.55)]">
              <div className="w-full h-full rounded-full bg-black/20 backdrop-blur" />
            </div>

            <img
              src="/dhanushpic.jpeg"
              alt="Dhanush AV"
              className="absolute inset-0 w-full h-full rounded-full object-cover"
            />
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
};

export default Hero;
