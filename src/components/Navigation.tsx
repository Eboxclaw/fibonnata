import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: ".natech", to: "/natech" },
  { label: "SDK", to: "/sdk" },
  { label: "Bonnata Stack", to: "/stack" },
  { label: "Lazy Memory", to: "/lazy-memory" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export function Navigation() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 right-0 left-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-sm">
      <nav className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-4 sm:px-6 lg:flex lg:justify-between">
        <Link
          to="/"
          onClick={() => setOpen(false)}
          className="min-w-0 truncate font-display text-lg font-semibold tracking-tight text-foreground sm:text-xl"
        >
          Fibonnata
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeProps={{ className: "text-foreground" }}
              className="shrink-0 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button
          type="button"
          className="-mr-2 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-foreground lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border/50 bg-background px-5 py-2 sm:px-6 lg:hidden">
          <div className="flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                activeProps={{ className: "text-foreground" }}
                className="border-b border-border/40 py-3 text-base font-medium text-muted-foreground last:border-0 hover:text-foreground"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
