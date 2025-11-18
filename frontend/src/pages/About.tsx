import { motion } from "framer-motion";
import "./About.css";

export default function About() {
  return (
    <div className="about-container">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="about-title"
      >
        About <span>Me</span>
      </motion.h1>

      <motion.div
        className="about-content"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 0.3 }}
      >
        <motion.p
          className="about-text"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          I’m a passionate <span>Full-Stack Developer</span> and <span>Businessman</span> with a vision to create digital
  experiences that blend <span>innovation, design, and strategy</span>.  
  I specialize in building high-performance web applications and transforming ideas into scalable digital products.  
  My entrepreneurial mindset drives me to not only code — but to <span>build brands, lead teams, and grow businesses</span>.  
  Every project I take on is crafted with purpose, precision, and a deep passion for excellence.  
  From startups to enterprise solutions, I aim to design technology that doesn’t just work — it inspires.
        </motion.p>

        <motion.div
          className="about-floating-box"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 2, -2, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <h3>✨ Passion • Design • Innovation</h3>
        </motion.div>
      </motion.div>
    </div>
  );
}
