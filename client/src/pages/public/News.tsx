import PublicLayout from "@/components/PublicLayout";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { Calendar } from "lucide-react";

export default function News() {
  return (
    <PublicLayout>
      <PageHeader
        title="News & Events"
        subtitle="Stay up to date with the latest news, events, and announcements from Little Ava Nursery."
        breadcrumb="Home / Information / News & Events"
      />

      <section className="section-padding">
        <div className="container max-w-4xl">
          <div className="bg-[oklch(0.97_0.01_200)] rounded-xl p-8 text-center">
            <Calendar className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Coming Soon</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              News and events will be posted here once Little Ava Nursery opens. Check back soon for updates on our opening date, events, and community activities.
            </p>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
