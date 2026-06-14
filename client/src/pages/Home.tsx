import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PublicLayout from "@/components/PublicLayout";
import { NURSERY_INFO } from "@shared/nurseryInfo";
import {
  Heart,
  BookOpen,
  Shield,
  Users,
  Star,
  Clock,
  Baby,
  GraduationCap,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const features = [
  {
    icon: Heart,
    title: "Nurturing Care",
    description: "Every child receives individual attention in a warm, loving environment that feels like a home away from home.",
  },
  {
    icon: BookOpen,
    title: "EYFS Curriculum",
    description: "Our play-based learning follows the Early Years Foundation Stage framework, preparing children for school and beyond.",
  },
  {
    icon: Shield,
    title: "Safe & Secure",
    description: "Ofsted registered with DBS-checked staff, CCTV, secure entry systems, and comprehensive safeguarding policies.",
  },
  {
    icon: Users,
    title: "Qualified Staff",
    description: "Our dedicated team holds Level 3+ qualifications with ongoing professional development and training.",
  },
  {
    icon: Star,
    title: "Outstanding Facilities",
    description: "Purpose-designed rooms for each age group with outdoor learning spaces and sensory areas.",
  },
  {
    icon: Clock,
    title: "Flexible Sessions",
    description: "Full day, morning, and afternoon sessions available to suit your family's needs.",
  },
];

const highlights = [
  "3 months to 5 years",
  "Open 7:30am - 6:00pm",
  "Government funded places",
  "Freshly prepared meals",
  "Outdoor learning areas",
  "Real-time parent updates",
];

export default function Home() {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[oklch(0.97_0.02_200)] via-white to-[oklch(0.97_0.02_150)]">
        <div className="container py-16 md:py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                <Baby className="h-4 w-4" />
                Now accepting registrations
              </div>
              <h1 className="heading-1 text-foreground">
                Where Little Minds{" "}
                <span className="text-primary">Grow Big</span>
              </h1>
              <p className="body-large text-muted-foreground max-w-lg">
                A warm, nurturing nursery in the West Midlands where children aged 3 months to 5 years learn, play, and thrive through our carefully crafted curriculum.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Button size="lg" asChild>
                  <Link href="/book-visit">
                    Book a Visit
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/admissions">Register Your Child</Link>
                </Button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-4">
                {highlights.map((item) => (
                  <div key={item} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={NURSERY_INFO.logo}
                  alt={NURSERY_INFO.name}
                  className="w-full h-auto bg-white p-12"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 border">
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <GraduationCap className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">EYFS Curriculum</p>
                    <p className="text-xs text-muted-foreground">Play-based learning</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="heading-2 text-foreground">Why Choose Little Ava Nursery?</h2>
            <p className="body-large text-muted-foreground mt-4">
              We provide a safe, stimulating, and caring environment where every child is valued and supported to reach their full potential.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <Card key={feature.title} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Rooms Preview */}
      <section className="section-padding bg-[oklch(0.97_0.01_200)]">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="heading-2 text-foreground">Our Rooms</h2>
            <p className="body-large text-muted-foreground mt-4">
              Age-appropriate environments designed to support each stage of your child's development.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {NURSERY_INFO.rooms.map((room) => (
              <Card key={room.name} className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                <div className="h-3" style={{ backgroundColor: room.color }} />
                <CardContent className="p-5">
                  <h3 className="font-semibold text-base mb-1">{room.name}</h3>
                  <p className="text-xs text-primary font-medium mb-2">{room.ageRange} | Ratio {room.ratio}</p>
                  <p className="text-sm text-muted-foreground">{room.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" asChild>
              <Link href="/rooms">
                Learn More About Our Rooms
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary text-white">
        <div className="container text-center">
          <h2 className="heading-2 text-white">Ready to Join Our Family?</h2>
          <p className="body-large text-white/80 mt-4 max-w-2xl mx-auto">
            We'd love to show you around our nursery. Book a visit today and see why families choose Little Ava Nursery for their children's early years journey.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/book-visit">Book a Visit</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
              <Link href="/waiting-list">Join Waiting List</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Parent Portal Promo */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="heading-2 text-foreground">Stay Connected with Your Child's Day</h2>
            <p className="body-large text-muted-foreground mt-4">
              Our Parent Portal keeps you updated in real-time with your child's activities, meals, naps, and milestones throughout the day.
            </p>
            <ul className="space-y-3 mt-6 text-left max-w-md mx-auto">
              {[
                "Real-time activity updates and notifications",
                "View meals, nappy changes, and nap times",
                "Book sessions and report absences online",
                "Access important documents",
                "Secure access to your child's information",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Button className="mt-8" size="lg" asChild>
              <Link href="/parent-portal">
                Access Parent Portal
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
