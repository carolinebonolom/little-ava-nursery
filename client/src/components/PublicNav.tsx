import { useState } from "react";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";
import { NURSERY_INFO } from "@shared/nurseryInfo";
import { PUBLIC_TABS } from "./publicTabs";

const navLinks = PUBLIC_TABS.filter((tab) => tab.showInNav !== false);

export default function PublicNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b bg-white/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <img src={NURSERY_INFO.logo} alt={NURSERY_INFO.name} className="h-9 w-auto" />
          <span className="text-sm font-semibold text-foreground">{NURSERY_INFO.name}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-5">
          {navLinks.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-foreground/85 hover:text-primary transition-colors">
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t bg-white">
          <div className="container py-3 flex flex-col gap-2">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm text-foreground/85 hover:bg-muted"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}