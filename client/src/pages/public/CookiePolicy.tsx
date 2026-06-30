import PublicLayout from "@/components/PublicLayout";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Download, Printer } from "lucide-react";

export default function CookiePolicy() {
  const handleDownload = () => {
    const content = document.querySelector(".policy-content")?.textContent || "";
    const blob = new Blob([`LITTLE AVA NURSERY - COOKIE POLICY\n${"=".repeat(50)}\n\n${content}`], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Little_Ava_Nursery_Cookie_Policy.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <PublicLayout>
      <PageHeader title="Cookie Policy" breadcrumb="Home / Cookie Policy" />
      <section className="section-padding">
        <div className="container max-w-3xl">
          <div className="flex gap-2 mb-6">
            <Button variant="outline" size="sm" onClick={handleDownload} className="gap-2">
              <Download className="h-4 w-4" /> Download
            </Button>
            <Button variant="outline" size="sm" onClick={() => window.print()} className="gap-2">
              <Printer className="h-4 w-4" /> Print
            </Button>
          </div>

          <div className="policy-content space-y-6 text-sm text-muted-foreground leading-relaxed">
            <p className="text-muted-foreground mb-4 font-medium">Last updated: June 2026 | Little Ava Nursery | Company No. 17116408</p>
            <div>
              <h3 className="font-semibold text-foreground text-base mb-2">What Are Cookies?</h3>
              <p>Cookies are small text files stored on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our site.</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-base mb-2">Cookies We Use</h3>
              <p className="mb-2"><strong>Essential Cookies:</strong> Required for the website to function (login sessions, security). Cannot be disabled.</p>
              <p className="mb-2"><strong>Analytics Cookies:</strong> Help us understand how visitors use our site so we can improve it. Data is anonymised.</p>
              <p><strong>Preference Cookies:</strong> Remember your settings and choices for a better experience.</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-base mb-2">Managing Cookies</h3>
              <p>You can control cookies through your browser settings. Disabling certain cookies may affect your experience on our website.</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-base mb-2">Contact</h3>
              <p>
                If you have questions about our use of cookies, please contact us at{" "}
                <a href="mailto:info@littleavanursery.co.uk" className="text-primary hover:underline">
                  info@littleavanursery.co.uk
                </a>{" "}
                or call +44 7386 096634.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
