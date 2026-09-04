import { PROFILE } from "./data";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-border px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6">
        <div>
          <p className="font-display text-lg font-semibold">
            {PROFILE.name}
            <span className="text-accent">.</span>
          </p>
          <p className="mt-1 text-sm text-muted-foreground">Built with curiosity and code.</p>
        </div>
        <nav className="flex flex-wrap gap-5">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              {l.label}
            </a>
          ))}
        </nav>
        <p className="font-mono text-xs text-muted-foreground">© {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
