import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, ChevronDown } from "lucide-react";
import { NURSERY_INFO } from "@shared/nurseryInfo";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const navGroups = [
  {
    label: "About",
    items: [
      { href: "/about", label: "About Us" },
      { href: "/vision-values", label: "Vision & Values" },
      { href: "/team", label: "Meet the Team" },
    ],
  },
  {
    label: "Our Nursery",
    items: [
      { href: "/rooms", label: "Rooms & Age Groups" },
      { href: "/curriculum", label: "Curriculum & Learning" },
      { href: "/daily-routine", label: "Daily Routine" },
      { href: "/meals-nutrition", label: "Meals & Nutrition" },
    ],
  },
  {
    label: "Parents",
    items: [
      { href: "/fees-funding", label: "Fees & Funding" },
      { href: "/opening-hours", label: "Opening Hours" },
      { href: "/admissions", label: "Admissions & Registration" },
      { href: "/waiting-list", label: "Waiting List" },
      { href: "/term-dates", label: "Term Dates & Closures" },
    ],
  },
  {
    label: "Information",
    items: [
      { href: "/safeguarding", label: "Safeguarding" },
      { href: "/send", label: "SEND" },
      { href: "/news", label: "News & Events" },
      { href: "/gallery", label: "Gallery" },
      { href: "/faq", label: "FAQ" },
      { href: "/policies", label: "Policies & Documents" },
    ],
  },
];

export default function PublicNav() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <img
            src={NURSERY_INFO.logo}
            alt={NURSERY_INFO.name}
            className="h-12 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/"
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors hover:text-primary ${
                    location === "/" ? "text-primary" : "text-foreground"
                  }`}
                >
                  Home
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {navGroups.map((group) => (
              <NavigationMenuItem key={group.label}>
                <NavigationMenuTrigger className="text-sm font-medium">
                  {group.label}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[240px] gap-1 p-3">
                    {group.items.map((item) => (
                      <li key={item.href}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={item.href}
                            className="block select-none rounded-md p-2 text-sm leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            {item.label}
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/contact"
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors hover:text-primary ${
                    location === "/contact" ? "text-primary" : "text-foreground"
                  }`}
                >
                  Contact
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* CTA Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <Button variant="outline" size="sm" asChild>
            <Link href="/book-visit">Book a Visit</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/parent-portal">Parent Portal</Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] overflow-y-auto">
            <div className="flex flex-col gap-4 pt-6">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="text-base font-medium py-2 hover:text-primary"
              >
                Home
              </Link>
              {navGroups.map((group) => (
                <div key={group.label}>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    {group.label}
                  </p>
                  {group.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block py-1.5 pl-3 text-sm hover:text-primary"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              ))}
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="text-base font-medium py-2 hover:text-primary"
              >
                Contact Us
              </Link>
              <div className="flex flex-col gap-2 pt-4 border-t">
                <Button variant="outline" asChild>
                  <Link href="/book-visit" onClick={() => setMobileOpen(false)}>
                    Book a Visit
                  </Link>
                </Button>
                <Button asChild>
                  <Link href="/parent-portal" onClick={() => setMobileOpen(false)}>
                    Parent Portal
                  </Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
