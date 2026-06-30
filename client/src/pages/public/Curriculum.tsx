import PublicLayout from "@/components/PublicLayout";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Palette, MessageCircle, Calculator, Users, Dumbbell, Globe, Music } from "lucide-react";

const areas = [
  { icon: MessageCircle, title: "Communication & Language", description: "Developing listening, attention, understanding, and speaking skills through stories, songs, and conversations." },
  { icon: Dumbbell, title: "Physical Development", description: "Building gross and fine motor skills through active play, outdoor activities, and creative tasks." },
  { icon: Users, title: "Personal, Social & Emotional", description: "Developing confidence, self-awareness, relationships, and managing feelings." },
  { icon: Calculator, title: "Mathematics", description: "Exploring numbers, counting, shapes, space, and measures through play-based activities." },
  { icon: Globe, title: "Understanding the World", description: "Exploring people, communities, the natural world, and technology." },
  { icon: Palette, title: "Expressive Arts & Design", description: "Encouraging creativity through art, music, dance, role play, and imaginative activities." },
  { icon: Music, title: "Literacy", description: "Developing a love of reading and writing through phonics, stories, and mark-making." },
];

export default function Curriculum() {
  return (
    <PublicLayout>
      <PageHeader
        title="Curriculum & Learning"
        subtitle="Our play-based curriculum follows the Early Years Foundation Stage (EYFS) framework, supporting every area of your child's development."
        breadcrumb="Home / Our Nursery / Curriculum & Learning"
      />

      <section className="section-padding">
        <div className="container max-w-4xl">
          <div className="space-y-6">
            <h2 className="heading-3">Our Approach to Learning</h2>
            <p className="text-muted-foreground leading-relaxed">
              At Little Ava Nursery, we believe that children learn best through play. Our curriculum is carefully planned to provide a balance of child-initiated and adult-led activities that cover all seven areas of the EYFS framework.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Each child has a key person who observes their interests and development, planning next steps that are tailored to their individual needs. We use a combination of indoor and outdoor learning environments to provide rich, varied experiences.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our practitioners are skilled at recognising teachable moments and extending children's learning through thoughtful interactions and carefully resourced environments.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-[oklch(0.97_0.01_200)]">
        <div className="container">
          <h2 className="heading-3 text-center mb-10">The Seven Areas of Learning</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {areas.map((area) => (
              <Card key={area.title} className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                    <area.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{area.title}</h3>
                  <p className="text-sm text-muted-foreground">{area.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
