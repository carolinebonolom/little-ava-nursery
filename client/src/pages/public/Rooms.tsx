import PublicLayout from "@/components/PublicLayout";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { NURSERY_INFO } from "@shared/nurseryInfo";
import { Baby, Heart, BookOpen, GraduationCap, ArrowRight } from "lucide-react";

const roomIcons = [Baby, Heart, BookOpen, GraduationCap];

const roomDetails = [
  {
    keyFeatures: ["Sensory exploration", "Tummy time areas", "Soft play", "Music and movement", "Messy play", "Story time"],
    learning: "In our Baby Room, we focus on building secure attachments and providing rich sensory experiences. Our practitioners respond to each baby's individual needs, creating a calm and nurturing space for the youngest members of our nursery family."
  },
  {
    keyFeatures: ["Outdoor exploration", "Creative arts", "Sand and water play", "Building blocks", "Role play", "Nature walks"],
    learning: "Our Toddler Room is designed for active little explorers. Children develop their independence, language skills, and social awareness through carefully planned activities that follow their interests and developmental needs."
  },
  {
    keyFeatures: ["Mark making", "Small world play", "Physical development", "Cooking activities", "Garden time", "Circle time"],
    learning: "The Pre-School Room builds on children's growing confidence and curiosity. We introduce more structured activities alongside free play, helping children develop the skills they need for the next stage of their learning journey."
  },
  {
    keyFeatures: ["Phonics & literacy", "Number work", "Science experiments", "ICT skills", "Forest school", "School transition"],
    learning: "Our School Readiness Room prepares children for their exciting move to primary school. We focus on developing independence, social skills, and early literacy and numeracy through engaging, purposeful activities."
  },
];

export default function Rooms() {
  return (
    <PublicLayout>
      <PageHeader
        title="Our Rooms & Age Groups"
        subtitle="Four carefully designed rooms, each tailored to support children at their specific stage of development."
        breadcrumb="Home / Our Nursery / Rooms & Age Groups"
      />

      <section className="section-padding">
        <div className="container space-y-16">
          {NURSERY_INFO.rooms.map((room, index) => {
            const Icon = roomIcons[index];
            const details = roomDetails[index];
            return (
              <div key={room.name} className={`grid lg:grid-cols-2 gap-10 items-start ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
                <div className={`space-y-4 ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: room.color }}>
                      <Icon className="h-6 w-6 text-foreground/70" />
                    </div>
                    <div>
                      <h2 className="heading-3">{room.name}</h2>
                      <p className="text-sm text-primary font-medium">{room.ageRange} | Staff Ratio {room.ratio}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{details.learning}</p>
                </div>
                <Card className={`border-0 shadow-sm ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  <CardContent className="p-6">
                    <h4 className="font-semibold mb-4">Key Activities & Features</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {details.keyFeatures.map((feature) => (
                        <div key={feature} className="flex items-center gap-2 text-sm">
                          <div className="h-2 w-2 rounded-full bg-primary shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </section>

      <section className="section-padding bg-primary text-white">
        <div className="container text-center">
          <h2 className="heading-3 text-white">Find the Right Room for Your Child</h2>
          <p className="text-white/80 mt-3 max-w-xl mx-auto">
            Book a visit to see our rooms in person and meet the team who will be caring for your child.
          </p>
          <Button size="lg" variant="secondary" className="mt-6" asChild>
            <Link href="/book-visit">
              Book a Visit <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </PublicLayout>
  );
}
