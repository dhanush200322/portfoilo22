import { Routes, Route } from "react-router-dom";
import Hero from "./pages/Hero";
import Contact from "./pages/Contact";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";
import Resume from "./pages/Resume";
import NotFound from "./pages/NotFound";
import Navigation from "@/components/Navigation";
import NeonCursor from "@/components/NeonCursor";
import About from "./pages/About";

// 👈 Add this import

export default function App() {
  return (
    <>
      {/* 👇 Add the NeonCursor component here so it's global */}
      <NeonCursor />

      <Navigation />

      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/about" element={<About />} />

        <Route path="/projects" element={<Projects />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
