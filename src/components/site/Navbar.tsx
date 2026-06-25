import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Flame, Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "@/lib/theme";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Exclusive", to: "/exclusive-videos" },
];

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-transparent bg-transparent">
      <div className="w-full px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex shrink-0 items-center gap-2" onClick={() => setOpen(false)}>
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-primary text-primary-foreground shadow-glow">
            <Flame className="h-5 w-5" />
          </span>
          <span className="font-display text-xl font-bold uppercase tracking-wide">
            FightCam <span className="text-gradient">Hub</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end
              className={({ isActive }) =>
                isActive
                  ? "rounded-lg px-3 py-2 text-sm font-semibold text-primary bg-secondary"
                  : "rounded-lg px-3 py-2 text-sm font-semibold text-muted-foreground transition hover:bg-secondary hover:text-foreground"
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="grid h-8 w-8 sm:h-9 sm:w-9 place-items-center rounded-lg border border-border bg-secondary text-foreground transition hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <a
            href="https://consciousdunkvastly.com/hu3d2ui1?key=c6dfa5e4b94e4987e31e7c7c7502de12"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-lg bg-gradient-primary px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm font-bold text-primary-foreground shadow-glow transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            Watch Live
          </a>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
            className="grid h-8 w-8 sm:h-9 sm:w-9 place-items-center rounded-lg border border-border bg-secondary md:hidden focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-transparent md:hidden">
          <nav className="container-site flex flex-col gap-1 py-3">
            {navLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? "rounded-lg px-3 py-2.5 text-sm font-semibold text-primary bg-secondary"
                    : "rounded-lg px-3 py-2.5 text-sm font-semibold text-muted-foreground transition hover:bg-secondary hover:text-foreground"
                }
              >
                {l.label}
              </NavLink>
            ))}
            {/* Watch Live is always visible in the header on all screen sizes so
                we don't duplicate it inside the mobile menu. */}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
