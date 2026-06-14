import PublicLayout from "@/components/PublicLayout";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Apple, Leaf, AlertTriangle, Heart } from "lucide-react";

export default function MealsNutrition() {
  return (
    <PublicLayout>
      <PageHeader
        title="Meals & Nutrition"
        subtitle="Freshly prepared, nutritious meals and snacks that fuel growing bodies and minds."
        breadcrumb="Home / Our Nursery / Meals & Nutrition"
      />

      <section className="section-padding">
        <div className="container max-w-4xl">
          <div className="space-y-6 mb-12">
            <p className="text-muted-foreground leading-relaxed">
              At Little Ava Nursery, we believe that good nutrition is fundamental to children's health, development, and ability to learn. All our meals and snacks are freshly prepared on-site using high-quality, locally sourced ingredients wherever possible.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our menus are carefully planned to provide balanced, varied meals that meet the nutritional needs of growing children. We follow government guidelines and work with families to accommodate allergies, dietary requirements, and cultural preferences.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 mb-12">
            {[
              { icon: Apple, title: "Fresh & Homemade", desc: "All meals cooked from scratch daily using fresh, seasonal ingredients." },
              { icon: Leaf, title: "Balanced Nutrition", desc: "Menus designed to provide all essential nutrients for growing children." },
              { icon: AlertTriangle, title: "Allergy Aware", desc: "Full allergy management with individual dietary plans for each child." },
              { icon: Heart, title: "Positive Mealtimes", desc: "Family-style dining that encourages social skills and healthy eating habits." },
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
              <h3 className="font-semibold text-lg mb-4">Daily Meal Schedule</h3>
              <div className="space-y-3">
                {[
                  { meal: "Breakfast", time: "8:30am", example: "Porridge with fruit, toast, cereal, yoghurt" },
                  { meal: "Morning Snack", time: "10:00am", example: "Fresh fruit, breadsticks, rice cakes" },
                  { meal: "Lunch", time: "12:00pm", example: "Hot meal e.g. pasta bake, shepherd's pie, fish fingers with vegetables" },
                  { meal: "Afternoon Snack", time: "3:00pm", example: "Crackers with cheese, vegetable sticks, fruit" },
                  { meal: "Tea", time: "5:00pm", example: "Light meal e.g. sandwiches, wraps, soup with bread" },
                ].map((item) => (
                  <div key={item.meal} className="flex items-start gap-4 py-2 border-b last:border-0">
                    <div className="shrink-0 w-20">
                      <p className="text-sm font-medium">{item.meal}</p>
                      <p className="text-xs text-muted-foreground">{item.time}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.example}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </PublicLayout>
  );
}
