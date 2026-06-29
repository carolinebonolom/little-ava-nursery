import { Link } from "wouter";
import { NURSERY_INFO } from "@shared/nurseryInfo";

const quickLinks = [
  { href: "/about", label: "About Us" },
  { href: "/rooms", label: "Rooms" },
  { href: "/curriculum", label: "Curriculum" },
  { href: "/admissions", label: "Admissions" },
  { href: "/waiting-list", label: "Waiting List" },
  { href: "/contact", label: "Contact" },
];

const legalLinks = [
  { href: "/policies", label: "Policies & Documents" },
  { href: "/safeguarding", label: "Safeguarding" },
  { href: "/term-dates", label: "Term Dates" },
  { href: "/fees-funding", label: "Fees & Funding" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/cookie-policy", label: "Cookie Policy" },
  { href: "/terms", label: "Terms" },
];

export default function PublicFooter() {
  return (
    <footer className="border-t bg-white">
      <div className="container py-12 grid gap-8 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <img src={NURSERY_INFO.logo} alt={NURSERY_INFO.name} className="h-10 w-auto" />
            <p className="font-semibold">{NURSERY_INFO.name}</p>
          </div>
          <p className="text-sm text-muted-foreground">{NURSERY_INFO.description}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-3">Quick Links</h3>
          <div className="grid grid-cols-2 gap-2">
            {quickLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm text-muted-foreground hover:text-primary">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-3">Legal</h3>
          <div className="flex flex-col gap-2">
            {legalLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm text-muted-foreground hover:text-primary">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}