import PublicLayout from "@/components/PublicLayout";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, BookOpen, Target } from "lucide-react";

export default function SEND() {
  return (
    <PublicLayout>
      <PageHeader
        title="Special Educational Needs & Disabilities (SEND)"
        subtitle="Every child is unique and we are committed to providing inclusive, high-quality care for all."
        breadcrumb="Home / Information / SEND"
      />

      <section className="section-padding">
        <div className="container max-w-4xl">
          <div className="space-y-6 mb-12">
            <p className="text-muted-foreground leading-relaxed">
              At Little Ava Nursery, we believe every child deserves the best possible start in life. We welcome children with special educational needs and disabilities and work closely with families and external professionals to ensure every child can access our curriculum and thrive.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our Special Educational Needs Coordinator (SENCO) oversees the identification and support of children with additional needs. We follow the graduated approach of Assess, Plan, Do, Review to ensure children receive the right support at the right time.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 mb-12">
            {[
              { icon: Heart, title: "Inclusive Environment", desc: "Our setting is adapted to meet the needs of all children, with resources and activities accessible to everyone." },
              { icon: Users, title: "Partnership Working", desc: "We work closely with parents, health visitors, speech therapists, and other professionals." },
              { icon: BookOpen, title: "Individual Plans", desc: "Children with identified needs have Individual Education Plans (IEPs) with specific, achievable targets." },
              { icon: Target, title: "Early Identification", desc: "Our trained staff observe and assess children regularly to identify any emerging needs early." },
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
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-4">Our SEND Offer</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Designated SENCO with specialist training</li>
                <li>• Differentiated activities to meet individual needs</li>
                <li>• Visual timetables and communication aids</li>
                <li>• Sensory resources and quiet spaces</li>
                <li>• Regular progress reviews with parents</li>
                <li>• Links with local authority SEND services</li>
                <li>• Support with Education, Health and Care Plan (EHCP) applications</li>
                <li>• Staff training in specific needs (autism, speech & language, etc.)</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
    </PublicLayout>
  );
}
