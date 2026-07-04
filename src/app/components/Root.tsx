import { useEffect, useRef, useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";

type NavLink =
  | { label: string; kind: "section"; id: string }
  | { label: string; kind: "page"; to: string };

const navLinks: NavLink[] = [
  { label: "About Me", kind: "section", id: "about" },
  { label: "My Work", kind: "page", to: "/work" },
  { label: "Contact Me", kind: "page", to: "/contact" },
];

export default function Root() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const mainRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;
    const onScroll = () => setScrolled(el.scrollTop > 60);
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    mainRef.current?.scrollTo({ top: 0 });
  }, [location.pathname]);

  const goToSection = (id: string) => {
    setMobileOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 150);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const isActive = (link: NavLink) => {
    if (link.kind === "page") return location.pathname === link.to;
    return location.pathname === "/" ;
  };

  const linkStyle = (active: boolean) => ({
    fontSize: "0.875rem",
    letterSpacing: "-0.015em",
    color: active ? "var(--primary)" : "var(--foreground)",
    fontWeight: active ? 600 : 400,
  } as React.CSSProperties);

  return (
    <div className="flex flex-col h-full">
      <header
        className="shrink-0 sticky top-0 z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? "color-mix(in oklch, var(--background) 94%, transparent)"
            : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity shrink-0">
            <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
              <div className="w-2 h-2 rounded-sm bg-white/80" />
            </div>
            <span
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                fontSize: "1.05rem",
              }}
            >
              Zynk
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5 flex-1 justify-center">
            {navLinks.map((link) => {
              const active = isActive(link);
              return link.kind === "section" ? (
                <button
                  key={link.label}
                  onClick={() => goToSection(link.id)}
                  className="px-4 py-2 rounded-md hover:text-primary hover:bg-accent/60 transition-colors"
                  style={linkStyle(active)}
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  key={link.label}
                  to={link.to}
                  className="px-4 py-2 rounded-md hover:text-primary hover:bg-accent/60 transition-colors"
                  style={linkStyle(active)}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-2 shrink-0">
            <Link to="/contact" className="hidden md:inline-flex">
              <Button size="sm" style={{ letterSpacing: "-0.02em" }}>
                Hire Me
              </Button>
            </Link>
            <button
              className="md:hidden p-2 rounded-md hover:bg-accent/60 transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div
            className="md:hidden border-t border-border"
            style={{
              background: "color-mix(in oklch, var(--background) 97%, transparent)",
              backdropFilter: "blur(12px)",
            }}
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {navLinks.map((link) => {
                const active = isActive(link);
                return link.kind === "section" ? (
                  <button
                    key={link.label}
                    onClick={() => goToSection(link.id)}
                    className="text-left py-3 px-3 rounded-md hover:bg-accent/60 hover:text-primary transition-colors"
                    style={{ fontSize: "0.9375rem", letterSpacing: "-0.015em", fontWeight: active ? 600 : 400 }}
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    key={link.label}
                    to={link.to}
                    className="py-3 px-3 rounded-md hover:bg-accent/60 hover:text-primary transition-colors"
                    style={{
                      fontSize: "0.9375rem",
                      letterSpacing: "-0.015em",
                      fontWeight: active ? 600 : 400,
                      color: active ? "var(--primary)" : "var(--foreground)",
                    }}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <Link to="/contact" className="mt-2">
                <Button className="w-full" style={{ letterSpacing: "-0.02em" }}>
                  Hire Me
                </Button>
              </Link>
            </div>
          </div>
        )}
      </header>

      <main ref={mainRef} className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
