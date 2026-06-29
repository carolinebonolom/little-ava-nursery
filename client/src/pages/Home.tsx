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
  Calendar,
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
  "Opening April 2028",
  "Ages 3 months to 5 years",
  "Full day care, 6:30am - 6:00pm",
  "Freshly prepared meals",
  "Outdoor learning and play",
  "Government funded places accepted",
  "Warm, safe environment",
  "Caring, qualified team",
];

export default function Home() {
  return (
    <PublicLayout>
      <section className="relative overflow-hidden bg-gradient-to-br from-[oklch(0.97_0.02_200)] via-white to-[oklch(0.97_0.02_150)]">
        <div className="container py-10 md:py-12 lg:py-14">
          <div className="rounded-3xl border border-slate-200/80 bg-white/95 p-5 md:p-7 shadow-sm">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-5">
                <div className="inline-flex items-center gap-3 rounded-2xl bg-[oklch(0.96_0.02_190)] px-4 py-3 text-primary">
                  <Calendar className="h-5 w-5" />
                  <div className="leading-tight">
                    <p className="text-[1.7rem] font-semibold">Opening April 2028</p>
                    <p className="text-[1.55rem] text-foreground/85">Join Our Waiting List</p>
                  </div>
                  <ArrowRight className="h-4 w-4 ml-2" />
                </div>

                <h1 className="heading-1 text-foreground leading-tight">
                  A New Place for
                  <br />
                  Little Minds to <span className="text-primary">Grow</span>
                </h1>

                <p className="body-large text-muted-foreground max-w-xl">
                  Little Ava Nursery is preparing to open in the West Midlands in April 2028. We are creating a warm, safe and inspiring environment where children aged 3 months to 5 years will learn, play and thrive every day.
                </p>
                <p className="body-large text-muted-foreground max-w-xl">
                  Register your interest today to join our waiting list and receive updates as we prepare to welcome our first families.
                </p>

                <div className="flex flex-wrap gap-3 pt-1">
                  <Button size="lg" asChild>
                    <Link href="/waiting-list">
                      Join the Waiting List
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/vision-values">Our Vision</Link>
                  </Button>
                </div>
              </div>

              <div className="rounded-2xl bg-white p-4 md:p-6">
                <img
                  src={NURSERY_INFO.logo}
                  alt={NURSERY_INFO.name}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-6">
              {highlights.map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-[oklch(0.98_0.01_190)] p-5 md:p-6 grid md:grid-cols-[1fr_auto] items-center gap-5">
              <div>
                <h3 className="text-2xl font-semibold text-primary">Welcome to Little Ava Nursery</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  We are excited to bring a new nursery to the West Midlands where every child is encouraged to learn with confidence, curiosity and kindness. Although our doors will open in April 2028, our waiting list is now open. Register early to receive updates on our progress, opening events and enrolment opportunities.
                </p>
              </div>
              <img
                src="/hero-image.png"
                alt="Little Ava Nursery family icon"
                className="w-full max-w-[180px] md:max-w-[220px] h-auto justify-self-center"
              />
            </div>
          </div>
        </div>
      </section>

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
    </PublicLayout>
  );
}