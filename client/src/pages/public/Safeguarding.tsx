import PublicLayout from "@/components/PublicLayout";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Phone, AlertTriangle } from "lucide-react";

export default function Safeguarding() {
  return (
    <PublicLayout>
      <PageHeader
        title="Safeguarding"
        subtitle="The safety and welfare of every child is our absolute priority."
        breadcrumb="Home / Information / Safeguarding"
      />

      <section className="section-padding">
        <div className="container max-w-4xl">
          <div className="space-y-6 mb-12">
            <p className="text-muted-foreground leading-relaxed">
              At Little Ava Nursery, safeguarding children is everyone's responsibility. We are committed to creating a safe environment where children are protected from harm, abuse, and neglect. All our staff are trained in safeguarding and child protection procedures.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 mb-12">
            {[
              { title: "DBS Checked Staff", desc: "All staff undergo enhanced DBS checks before starting work with children." },
              { title: "Safeguarding Training", desc: "Regular safeguarding training for all staff, updated annually." },
              { title: "Designated Safeguarding Lead", desc: "A trained DSL oversees all safeguarding matters and concerns." },
              { title: "Safer Recruitment", desc: "Rigorous recruitment procedures including references and identity checks." },
              { title: "Secure Premises", desc: "CCTV, secure entry systems, and visitor sign-in procedures." },
              { title: "Whistleblowing Policy", desc: "Clear procedures for staff to raise concerns confidentially." },
            ].map((item) => (
              <Card key={item.title} className="border-0 shadow-sm">
                <CardContent className="p-5">
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-0 shadow-sm border-l-4 border-l-destructive mb-8">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold mb-2">If You Have a Concern</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    If you have any concerns about a child's safety or welfare, please speak to our Designated Safeguarding Lead immediately, or contact:
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Local Authority Children's Services</li>
                    <li>• NSPCC Helpline: 0808 800 5000</li>
                    <li>• Childline: 0800 1111</li>
                    <li>• In an emergency, call 999</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </PublicLayout>
  );
}
