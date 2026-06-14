import PublicLayout from "@/components/PublicLayout";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Download, Printer } from "lucide-react";

export default function Terms() {
  const handleDownload = () => {
    const content = document.querySelector(".policy-content")?.textContent || "";
    const blob = new Blob([`LITTLE AVA NURSERY - TERMS & CONDITIONS\n${"=".repeat(50)}\n\n${content}`], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Little_Ava_Nursery_Terms_and_Conditions.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <PublicLayout>
      <PageHeader title="Terms & Conditions" breadcrumb="Home / Terms & Conditions" />
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
              <h3 className="font-semibold text-foreground text-base mb-2">1. Registration & Fees</h3>
              <p>A non-refundable registration fee is required to secure your child's place. Monthly fees are payable in advance by the 1st of each month. A full month's notice is required for any changes to sessions or withdrawal.</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-base mb-2">2. Attendance & Absences</h3>
              <p>Parents must notify the nursery of any absences by 9:00am. Fees are still payable for absences, holidays, and sickness. Extended absences may result in loss of place.</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-base mb-2">3. Collection & Late Fees</h3>
              <p>Children must be collected by their agreed time. A late collection fee will be charged for pickups after 6:00pm. Only authorised persons may collect children.</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-base mb-2">4. Health & Medication</h3>
              <p>Children who are unwell must not attend nursery. We follow NHS guidelines on exclusion periods for infectious illnesses. Medication can only be administered with written parental consent and a doctor's prescription.</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-base mb-2">5. Safeguarding</h3>
              <p>Little Ava Nursery has a duty of care to all children. We follow local safeguarding procedures and will report any concerns to the appropriate authorities.</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-base mb-2">6. Liability</h3>
              <p>While we take every precaution to ensure children's safety, Little Ava Nursery cannot be held liable for minor bumps and scrapes that occur during normal play activities.</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-base mb-2">7. Changes to Terms</h3>
              <p>We reserve the right to update these terms with reasonable notice. Parents will be informed of any significant changes in writing.</p>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
