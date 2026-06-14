import PublicLayout from "@/components/PublicLayout";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutUs() {
  return (
    <PublicLayout>
      <PageHeader
        title="About Us"
        subtitle="A warm, caring nursery where children feel safe, inspired, and ready to learn."
        breadcrumb="Home / About"
      />

      <section className="section-padding">
        <div className="container max-w-5xl space-y-8">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-8 space-y-4">
              <h2 className="heading-3">Our story</h2>
              <p className="text-muted-foreground leading-relaxed">
                Little Ava Nursery is built around the belief that every child deserves a secure,
                nurturing start to life. We combinecareful routines, play-based learning, and strong
                partnerships with families to help children flourish from the earliest years.
              </p>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-8 space-y-3">
                <h3 className="text-xl font-semibold">Why families choose us</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We provide a calm environment, experienced practitioners, and a curriculum that is both
                  joyful and developmentally rich.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-8 space-y-3">
                <h3 className="text-xl font-semibold">What we offer</h3>
                <p className="text-muted-foreground leading-relaxed">
                  From settling-in support and healthy meals to outdoor exploration and EYFS learning,
                  every day is designed to help children grow in confidence and curiosity.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
