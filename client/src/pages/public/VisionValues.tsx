import PublicLayout from "@/components/PublicLayout";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, Heart, Sparkles, HandHeart, Lightbulb, TreePine } from "lucide-react";

const values = [
  { icon: Heart, title: "Love & Care", description: "We create a warm, loving atmosphere where every child feels secure and cherished." },
  { icon: Sparkles, title: "Curiosity & Wonder", description: "We nurture children's natural curiosity, encouraging them to explore and discover the world around them." },
  { icon: HandHeart, title: "Respect & Inclusion", description: "We celebrate diversity and ensure every child and family feels welcomed, valued, and respected." },
  { icon: Lightbulb, title: "Excellence & Growth", description: "We strive for the highest standards in everything we do, continuously learning and improving." },
  { icon: TreePine, title: "Sustainability", description: "We teach children to care for our planet through eco-friendly practices and outdoor learning." },
  { icon: Eye, title: "Transparency", description: "We maintain open, honest communication with families, building trust through partnership." },
];

export default function VisionValues() {
  return (
    <PublicLayout>
      <PageHeader
        title="Our Vision & Values"
        subtitle="The principles that guide everything we do at Little Ava Nursery."
        breadcrumb="Home / About / Vision & Values"
      />

      <section className="section-padding">
        <div className="container max-w-4xl">
          <div className="text-center space-y-6 mb-16">
            <h2 className="heading-3">Our Vision</h2>
            <p className="body-large text-muted-foreground">
              To be a leading nursery in the West Midlands, recognised for providing outstanding early years education and care that empowers every child to become a confident, creative, and compassionate learner.
            </p>
          </div>

          <div className="text-center space-y-6 mb-16">
            <h2 className="heading-3">Our Mission</h2>
            <p className="body-large text-muted-foreground">
              To provide a safe, stimulating, and inclusive environment where children aged 3 months to 5 years can thrive. We deliver high-quality, play-based learning experiences that support each child's individual development and prepare them for the next stage of their educational journey.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-[oklch(0.97_0.01_200)]">
        <div className="container">
          <h2 className="heading-3 text-center mb-10">Our Core Values</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value) => (
              <Card key={value.title} className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
