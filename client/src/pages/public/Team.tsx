import PublicLayout from "@/components/PublicLayout";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";

export default function Team() {
  return (
    <PublicLayout>
      <PageHeader
        title="Meet the Team"
        subtitle="Our dedicated, qualified team of early years professionals."
        breadcrumb="Home / About / Meet the Team"
      />

      <section className="section-padding">
        <div className="container max-w-4xl">
          <div className="space-y-6 mb-12">
            <p className="text-muted-foreground leading-relaxed">
              Our team is our greatest asset. Every member of staff at Little Ava Nursery is carefully selected for their qualifications, experience, and genuine passion for working with young children. All staff hold a minimum Level 3 qualification in Early Years and undergo enhanced DBS checks.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We invest in continuous professional development to ensure our team stays up to date with the latest research and best practice in early years education. Our staff-to-child ratios meet or exceed Ofsted requirements.
            </p>
          </div>

          <Card className="border-0 shadow-sm mb-8">
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-4">Our Staff Ratios</h3>
              <div className="space-y-3">
                {[
                  { room: "Baby Room (3-12 months)", ratio: "1 adult to 3 children" },
                  { room: "Toddler Room (1-2 years)", ratio: "1 adult to 3 children" },
                  { room: "Pre-School Room (2-3 years)", ratio: "1 adult to 4 children" },
                  { room: "School Readiness (3-5 years)", ratio: "1 adult to 8 children" },
                ].map((item) => (
                  <div key={item.room} className="flex justify-between items-center py-2 border-b last:border-0">
                    <span className="text-sm font-medium">{item.room}</span>
                    <span className="text-sm text-primary">{item.ratio}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="bg-[oklch(0.97_0.01_200)] rounded-xl p-8 text-center">
            <Users className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Team Profiles Coming Soon</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              We're currently building our team. Individual staff profiles with photos, qualifications, and specialisms will be available here once we open.
            </p>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
