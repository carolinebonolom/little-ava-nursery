import PublicLayout from "@/components/PublicLayout";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";

const routine = [
  { time: "6:30 - 8:30", activity: "Arrival & Free Play", description: "Children arrive and settle into their rooms with free play activities." },
  { time: "8:30 - 9:00", activity: "Breakfast", description: "A healthy breakfast is served for children who haven't eaten at home." },
  { time: "9:00 - 9:30", activity: "Circle Time", description: "Group time with songs, stories, and discussion of the day's activities." },
  { time: "9:30 - 11:00", activity: "Focused Learning", description: "Adult-led activities and child-initiated play across all learning areas." },
  { time: "11:00 - 11:30", activity: "Outdoor Play", description: "Fresh air and physical activity in our secure outdoor areas." },
  { time: "11:30 - 12:00", activity: "Tidy Up & Wash Hands", description: "Children help tidy away and prepare for lunch." },
  { time: "12:00 - 12:45", activity: "Lunch", description: "Freshly prepared, nutritious hot lunch served family-style." },
  { time: "12:45 - 2:00", activity: "Rest & Quiet Time", description: "Nap time for younger children, quiet activities for older ones." },
  { time: "2:00 - 3:00", activity: "Afternoon Activities", description: "Creative play, sensory activities, and outdoor exploration." },
  { time: "3:00 - 3:30", activity: "Afternoon Snack", description: "Healthy snack and drink to refuel for the afternoon." },
  { time: "3:30 - 5:00", activity: "Free Play & Exploration", description: "Child-led activities, outdoor play, and small group work." },
  { time: "5:00 - 5:30", activity: "Tea Time", description: "Light tea served for children staying for the full day." },
  { time: "5:30 - 6:00", activity: "Wind Down & Collection", description: "Calm activities, story time, and parent collection." },
];

export default function DailyRoutine() {
  return (
    <PublicLayout>
      <PageHeader
        title="Daily Routine"
        subtitle="A structured yet flexible day that balances learning, play, rest, and mealtimes."
        breadcrumb="Home / Our Nursery / Daily Routine"
      />

      <section className="section-padding">
        <div className="container max-w-3xl">
          <p className="text-muted-foreground leading-relaxed mb-10">
            Our daily routine provides a reassuring structure that helps children feel secure while allowing flexibility to follow their interests and needs. Younger children have adapted routines with more sleep and feeding times.
          </p>

          <div className="space-y-3">
            {routine.map((item, index) => (
              <Card key={index} className="border-0 shadow-sm">
                <CardContent className="p-4 flex gap-4 items-start">
                  <div className="shrink-0 w-28 text-sm font-medium text-primary">{item.time}</div>
                  <div>
                    <h3 className="font-semibold text-sm">{item.activity}</h3>
                    <p className="text-sm text-muted-foreground mt-0.5">{item.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="text-sm text-muted-foreground mt-8 italic">
            Note: This is a general guide. Routines are adapted for each age group and individual children's needs. Nappy changes and personal care happen throughout the day as needed.
          </p>
        </div>
      </section>
    </PublicLayout>
  );
}
