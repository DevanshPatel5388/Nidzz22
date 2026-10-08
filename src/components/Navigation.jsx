import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { pages, site } from "../data/content";
import { Sunflower } from "./illustrations";
import PianoToggle from "./PianoToggle";
import ThemeToggle from "./ThemeToggle";

const tilts = [-1.1, 0.8, -0.5, 1, -0.7, 0.6, -0.4, 0.9];

export default function Navigation() {
  return (
    <motion.header
      className="sticky top-0 z-50 border-b border-[var(--line)] bg-cream/85 backdrop-blur-md"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35 }}
    >
      <div className="flex items-end gap-2 px-2 sm:px-4">
        <NavLink
          to="/home"
          className="mb-2 flex shrink-0 items-center gap-1.5 pl-1 font-hand text-2xl text-ink"
        >
          <Sunflower className="h-8 w-auto" />
          <span className="hidden md:inline">for {site.name}</span>
        </NavLink>
        <nav className="relative min-w-0 flex-1" aria-label="Birthday book">
          <div className="no-scrollbar flex items-end gap-1 overflow-x-auto pt-3">
            {pages.map((page, index) => (
              <NavLink
                key={page.to}
                to={page.to}
                style={{ "--tilt": `${tilts[index]}deg` }}
                className={({ isActive }) => `tab ${isActive ? "tab-active" : ""}`}
              >
                {page.label}
              </NavLink>
            ))}
          </div>
        </nav>
        <div className="mb-2 flex shrink-0 items-center gap-2 pr-1">
          <PianoToggle compact />
          <ThemeToggle />
        </div>
      </div>
    </motion.header>
  );
}
