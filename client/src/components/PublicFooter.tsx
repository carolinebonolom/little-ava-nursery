import { Link } from "wouter";
import { NURSERY_INFO } from "@shared/nurseryInfo";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const subscribe = trpc.newsletter.subscribe.useMutation({
    onSuccess: () => {
      toast.success("Subscribed! You'll receive our newsletter updates.");
      setEmail("");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to subscribe. Please try again.");
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (email) subscribe.mutate({ email });
      }}
      className="flex gap-2 mt-3"
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email"
        className="flex-1 px-3 py-2 rounded-md bg-white/10 border border-white/20 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-white/30"
        required
      />
      <button
        type="submit"
        disabled={subscribe.isPending}
        className="px-4 py-2 bg-[oklch(0.65_0.15_175)] hover:bg-[oklch(0.60_0.15_175)] text-white text-sm font-medium rounded-md transition-colors disabled:opacity-50"
      >
        {subscribe.isPending ? "..." : "Subscribe"}
      </button>
    </form>
  );
}

export default function PublicFooter() {
  const whatsappLink = `https://wa.me/${NURSERY_INFO.whatsapp.replace("+", "")}`;

  return (
    <footer className="bg-[oklch(0.25_0.02_200)] text-white">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand & Newsletter */}
          <div className="space-y-4">
            <img
              src={NURSERY_INFO.logo}
              alt={NURSERY_INFO.name}
              className="h-16 w-auto bg-white rounded-lg p-2"
            />
            <p className="text-sm text-white/70 leading-relaxed">
              {NURSERY_INFO.description}
            </p>
            <div>
              <h5 className="text-sm font-medium text-white/90">Subscribe to our Newsletter</h5>
              <p className="text-xs text-white/50 mt-1">Stay updated with nursery news and events.</p>
              <NewsletterForm />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-base mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/rooms" className="hover:text-white transition-colors">Our Rooms</Link></li>
              <li><Link href="/fees-funding" className="hover:text-white transition-colors">Fees & Funding</Link></li>
              <li><Link href="/admissions" className="hover:text-white transition-colors">Admissions</Link></li>
              <li><Link href="/waiting-list" className="hover:text-white transition-colors">Waiting List</Link></li>
              <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/login/staff" className="hover:text-white transition-colors">Staff Login</Link></li>
              <li><Link href="/login/admin" className="hover:text-white transition-colors">Management Login</Link></li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h4 className="font-semibold text-base mb-4">Information</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link href="/safeguarding" className="hover:text-white transition-colors">Safeguarding</Link></li>
              <li><Link href="/send" className="hover:text-white transition-colors">SEND</Link></li>
              <li><Link href="/policies" className="hover:text-white transition-colors">Policies & Documents</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/cookie-policy" className="hover:text-white transition-colors">Cookie Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-base mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>{NURSERY_INFO.location}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" />
                <a href={`tel:${NURSERY_INFO.phone}`} className="hover:text-white transition-colors">
                  {NURSERY_INFO.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 shrink-0" />
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  WhatsApp Us
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" />
                <a href={`mailto:${NURSERY_INFO.email}`} className="hover:text-white transition-colors">
                  {NURSERY_INFO.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 shrink-0" />
                <span>Mon-Fri: {NURSERY_INFO.openingHours.weekdays}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/50">
          <p>&copy; {new Date().getFullYear()} {NURSERY_INFO.name}. All rights reserved.</p>
          <p>Company No. {NURSERY_INFO.companyNumber} | Ofsted Registered | DBS Checked Staff | GDPR Compliant</p>
        </div>
      </div>
    </footer>
  );
}
