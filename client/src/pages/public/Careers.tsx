import PublicLayout from "@/components/PublicLayout";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Briefcase, Heart, GraduationCap, Users } from "lucide-react";

export default function Careers() {
  return (
    <PublicLayout>
      <PageHeader
        title="Careers"
        subtitle="Join our team and help shape the future of early years education."
        breadcrumb="Home / Careers"
      />

      <section className="section-padding">
        <div className="container max-w-4xl">
          <div className="space-y-6 mb-12">
            <p className="text-muted-foreground leading-relaxed">
              At Little Ava Nursery, we're always looking for passionate, dedicated professionals to join our team. We offer a supportive working environment, competitive pay, and excellent opportunities for professional development.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 mb-12">
            {[
              { icon: Heart, title: "Supportive Environment", desc: "A friendly, collaborative team where your contributions are valued." },
              { icon: GraduationCap, title: "Professional Development", desc: "Ongoing training, qualifications support, and career progression." },
              { icon: Users, title: "Small Team", desc: "Work in a close-knit team where you can make a real difference." },
              { icon: Briefcase, title: "Competitive Benefits", desc: "Competitive salary, pension, childcare discount, and more." },
            ].map((item) => (
              <Card key={item.title} className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6 text-center">
              <Briefcase className="h-10 w-10 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-lg mb-2">Current Vacancies</h3>
              <p className="text-sm text-muted-foreground mb-4">
                We're building our team! If you're a qualified early years practitioner interested in joining Little Ava Nursery, we'd love to hear from you.
              </p>
              <Button asChild>
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </PublicLayout>
  );
}
