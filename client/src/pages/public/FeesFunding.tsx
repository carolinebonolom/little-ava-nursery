import PublicLayout from "@/components/PublicLayout";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function FeesFunding() {
  return (
    <PublicLayout>
      <PageHeader
        title="Fees & Funding"
        subtitle="Transparent pricing and information about government-funded childcare places."
        breadcrumb="Home / Parents / Fees & Funding"
      />

      <section className="section-padding">
        <div className="container max-w-4xl">
          <div className="space-y-6 mb-12">
            <h2 className="heading-3">Session Fees</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our fees reflect the high quality of care and education we provide. We aim to be competitive while ensuring we can maintain excellent staff ratios and resources.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            {[
              { session: "Full Day", time: "6:30am - 6:00pm", price: "Contact us" },
              { session: "Morning", time: "6:30am - 1:00pm", price: "Contact us" },
              { session: "Afternoon", time: "1:00pm - 6:00pm", price: "Contact us" },
            ].map((item) => (
              <Card key={item.session} className="border-0 shadow-sm text-center">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg">{item.session}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{item.time}</p>
                  <p className="text-2xl font-bold text-primary mt-3">{item.price}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-0 shadow-sm mb-12">
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-4">Government Funded Places</h3>
              <p className="text-muted-foreground mb-4">
                We accept all government-funded childcare entitlements. You may be eligible for:
              </p>
              <div className="space-y-3">
                {[
                  { title: "15 Hours Free (Universal)", desc: "Available for all 3 and 4 year olds from the term after their 3rd birthday." },
                  { title: "30 Hours Free (Extended)", desc: "Available for working parents of 3 and 4 year olds who meet eligibility criteria." },
                  { title: "15 Hours Free (2 Year Olds)", desc: "Available for eligible 2 year olds based on family circumstances." },
                  { title: "15 Hours Free (9 Months+)", desc: "Working parents of children from 9 months may be eligible for funded hours." },
                  { title: "Tax-Free Childcare", desc: "The government tops up your childcare payments by 25%, up to £2,000 per child per year." },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <p className="text-muted-foreground mb-4">For detailed fee information, please get in touch.</p>
            <Button asChild>
              <Link href="/contact">
                Contact Us for Fees <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
