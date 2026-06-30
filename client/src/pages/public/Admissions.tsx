import PublicLayout from "@/components/PublicLayout";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

const steps = [
  { step: "1", title: "Enquire", description: "Contact us or complete our online enquiry form to express your interest." },
  { step: "2", title: "Book a Visit", description: "Come and see our nursery, meet the team, and ask any questions." },
  { step: "3", title: "Register", description: "Complete our registration form and provide required documentation." },
  { step: "4", title: "Settle In", description: "We arrange settling-in sessions to help your child feel comfortable." },
  { step: "5", title: "Start", description: "Your child begins their exciting journey at Little Ava Nursery!" },
];

export default function Admissions() {
  return (
    <PublicLayout>
      <PageHeader
        title="Admissions & Registration"
        subtitle="Everything you need to know about enrolling your child at Little Ava Nursery."
        breadcrumb="Home / Parents / Admissions & Registration"
      />

      <section className="section-padding">
        <div className="container max-w-4xl">
          <div className="space-y-6 mb-12">
            <p className="text-muted-foreground leading-relaxed">
              We welcome children from 3 months to 5 years of age. Our admissions process is designed to be straightforward and supportive, ensuring a smooth transition for both children and families.
            </p>
          </div>

          <h2 className="heading-3 mb-8">How to Join Us</h2>
          <div className="space-y-4 mb-12">
            {steps.map((item) => (
              <Card key={item.step} className="border-0 shadow-sm">
                <CardContent className="p-5 flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center font-bold shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-0 shadow-sm mb-8">
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-4">What You'll Need</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Child's birth certificate</li>
                <li>• Proof of address</li>
                <li>• Immunisation records (Red Book)</li>
                <li>• Emergency contact details</li>
                <li>• Details of any allergies or medical conditions</li>
                <li>• Funding eligibility code (if applicable)</li>
                <li>• Signed consent forms</li>
              </ul>
            </CardContent>
          </Card>

          <div className="flex flex-wrap gap-4">
            <Button asChild>
              <Link href="/book-visit">Book a Visit <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/waiting-list">Join Waiting List</Link>
            </Button>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
