export type PublicTab = {
  href: string;
  label: string;
  showInNav?: boolean;
  showInFooter?: boolean;
};

export const PUBLIC_TABS: PublicTab[] = [
  { href: "/", label: "Home", showInNav: true, showInFooter: false },
  { href: "/about", label: "About", showInNav: true, showInFooter: true },
  { href: "/rooms", label: "Rooms", showInNav: true, showInFooter: true },
  { href: "/curriculum", label: "Curriculum", showInNav: true, showInFooter: true },
  { href: "/admissions", label: "Admissions", showInNav: true, showInFooter: true },
  { href: "/waiting-list", label: "Waiting List", showInNav: true, showInFooter: true },
  { href: "/message-us", label: "Message Us", showInNav: true, showInFooter: true },
  { href: "/contact", label: "Contact Us", showInNav: true, showInFooter: true },
  { href: "/policies", label: "Policies & Docs", showInNav: true, showInFooter: true },
  { href: "/login", label: "Management Login", showInNav: true, showInFooter: false },
];