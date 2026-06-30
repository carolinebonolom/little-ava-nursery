import PublicLayout from "@/components/PublicLayout";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { NURSERY_INFO } from "@shared/nurseryInfo";
import { Clock, Info } from "lucide-react";

export default function OpeningHours() {
  return (
    <PublicLayout>
      <PageHeader
        title="Opening Hours"
        subtitle="Our opening times and session options to suit your family's needs."
        breadcrumb="Home / Parents / Opening Hours"
      />

      <section className="section-padding">
        <div className="container max-w-3xl">
          <Card className="border-0 shadow-sm mb-8">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <h2 className="heading-3">Our Hours</h2>
              </div>
              <div className="space-y-3">
                {[
                  { day: "Monday", hours: NURSERY_INFO.openingHours.weekdays },
                  { day: "Tuesday", hours: NURSERY_INFO.openingHours.weekdays },
                  { day: "Wednesday", hours: NURSERY_INFO.openingHours.weekdays },
                  { day: "Thursday", hours: NURSERY_INFO.openingHours.weekdays },
                  { day: "Friday", hours: NURSERY_INFO.openingHours.weekdays },
                  { day: "Saturday", hours: "Closed" },
                  { day: "Sunday", hours: "Closed" },
                ].map((item) => (
                  <div key={item.day} className="flex justify-between items-center py-2 border-b last:border-0">
                    <span className="font-medium">{item.day}</span>
                    <span className={`text-sm ${item.hours === "Closed" ? "text-muted-foreground" : "text-primary font-medium"}`}>
                      {item.hours}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm mb-8">
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-4">Session Options</h3>
              <div className="space-y-3">
                {NURSERY_INFO.sessionTypes.map((session) => (
                  <div key={session.name} className="flex justify-between items-center py-2 border-b last:border-0">
                    <span className="font-medium">{session.name}</span>
                    <span className="text-sm text-primary">{session.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-[oklch(0.97_0.01_200)]">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div className="text-sm text-muted-foreground space-y-2">
                  <p><strong>Please note:</strong></p>
                  <p>We are open 51 weeks per year, closing for one week between Christmas and New Year and on all Bank Holidays.</p>
                  <p>A late collection fee may apply for pickups after 6:00 PM.</p>
                  <p>Please see our Term Dates page for specific closure dates.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </PublicLayout>
  );
}
