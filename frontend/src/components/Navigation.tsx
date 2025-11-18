import { NavLink } from "react-router-dom";
import { Home, User, Briefcase, Code, FileText, Mail } from "lucide-react";
import "./Navigation.css";

export default function Navigation() {
  return (
    <nav className="nav-container">
      <div className="nav-content">
        {/* Glass Neon Logo */}
        <div className="logo">
          <span className="logo-text">D</span>
        </div>

        <ul className="nav-links">
          <li>
            <NavLink to="/" className="nav-item">
              <Home size={18} />
              <span>Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className="nav-item">
              <User size={18} />
              <span>About</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/projects" className="nav-item">
              <Briefcase size={18} />
              <span>Projects</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/skills" className="nav-item">
              <Code size={18} />
              <span>Skills</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/resume" className="nav-item">
              <FileText size={18} />
              <span>Resume</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className="nav-item neon-contact">
              <Mail size={18} />
              <span>Contact</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
