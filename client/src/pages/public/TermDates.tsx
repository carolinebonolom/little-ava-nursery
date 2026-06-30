import PublicLayout from "@/components/PublicLayout";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Info } from "lucide-react";

export default function TermDates() {
  return (
    <PublicLayout>
      <PageHeader
        title="Term Dates & Closures"
        subtitle="Our nursery calendar including term dates, bank holidays, and planned closures."
        breadcrumb="Home / Parents / Term Dates & Closures"
      />

      <section className="section-padding">
        <div className="container max-w-3xl">
          <Card className="border-0 shadow-sm mb-8">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-lg">2025/2026 Academic Year</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-6">
                Little Ava Nursery is open 51 weeks per year. We close for one week between Christmas and New Year, and on all Bank Holidays.
              </p>
              <div className="space-y-4">
                {[
                  { term: "Autumn Term", dates: "September 2025 - December 2025" },
                  { term: "Spring Term", dates: "January 2026 - March 2026" },
                  { term: "Summer Term", dates: "April 2026 - July 2026" },
                ].map((item) => (
                  <div key={item.term} className="flex justify-between items-center py-2 border-b last:border-0">
                    <span className="font-medium">{item.term}</span>
                    <span className="text-sm text-muted-foreground">{item.dates}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm mb-8">
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-4">Bank Holiday Closures 2025/2026</h3>
              <div className="grid sm:grid-cols-2 gap-2 text-sm">
                {[
                  "Good Friday - 18 April 2025",
                  "Easter Monday - 21 April 2025",
                  "Early May Bank Holiday - 5 May 2025",
                  "Spring Bank Holiday - 26 May 2025",
                  "Summer Bank Holiday - 25 August 2025",
                  "Christmas Day - 25 December 2025",
                  "Boxing Day - 26 December 2025",
                  "New Year's Day - 1 January 2026",
                ].map((date) => (
                  <div key={date} className="flex items-center gap-2 py-1">
                    <div className="h-2 w-2 rounded-full bg-primary shrink-0" />
                    <span className="text-muted-foreground">{date}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-[oklch(0.97_0.01_200)]">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  <strong>Please note:</strong> Fees are charged for 51 weeks of the year. No fees are charged during our Christmas closure week. Bank holidays are included in the fee structure. We will notify parents of any additional closure days with at least 4 weeks' notice.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </PublicLayout>
  );
}
