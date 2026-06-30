import PublicLayout from "@/components/PublicLayout";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Download, Printer } from "lucide-react";

export default function PrivacyPolicy() {
  const handleDownload = () => {
    const content = document.querySelector(".policy-content")?.textContent || "";
    const blob = new Blob([`LITTLE AVA NURSERY - PRIVACY POLICY\n${"=".repeat(50)}\n\n${content}`], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Little_Ava_Nursery_Privacy_Policy.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <PublicLayout>
      <PageHeader title="Privacy Policy" breadcrumb="Home / Privacy Policy" />
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
            <p className="text-muted-foreground mb-4 font-medium">Last updated: June 2026 | Company No. 17116408</p>
            
            <div>
              <h3 className="font-semibold text-foreground text-base mb-2">1. Introduction</h3>
              <p>Little Ava Nursery ("we", "our", "us") is committed to protecting the privacy and security of personal information. This policy explains how we collect, use, and safeguard your data in compliance with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-base mb-2">2. Information We Collect</h3>
              <p>We collect personal information including: parent/guardian names, addresses, contact details; child's name, date of birth, medical information, dietary requirements; emergency contact details; payment information; photographs and videos (with consent).</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-base mb-2">3. How We Use Your Information</h3>
              <p>We use personal data to: provide childcare services; communicate with parents; manage bookings and payments; meet legal and regulatory requirements (Ofsted, DfE); ensure child safety and welfare; share developmental progress.</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-base mb-2">4. Legal Basis for Processing</h3>
              <p>We process data under: contractual necessity (providing childcare); legal obligation (Ofsted requirements); legitimate interests (nursery administration); consent (photographs, marketing).</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-base mb-2">5. Data Sharing</h3>
              <p>We may share information with: Ofsted (regulatory inspections); local authority (funded places); other professionals involved in your child's care (with consent); emergency services (if required).</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-base mb-2">6. Data Retention</h3>
              <p>We retain children's records for a reasonable period after they leave the nursery, in line with statutory requirements. Financial records are kept for 7 years.</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-base mb-2">7. Your Rights</h3>
              <p>You have the right to: access your personal data; rectify inaccurate data; request erasure; restrict processing; data portability; object to processing; withdraw consent.</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-base mb-2">8. Contact Us</h3>
              <p>For any privacy-related queries, please contact our Data Protection Officer at info@littleavanursery.co.uk or call +44 7386 096634.</p>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
