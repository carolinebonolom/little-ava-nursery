import PublicLayout from "@/components/PublicLayout";
import PageHeader from "@/components/PageHeader";
import { MessageSquare } from "lucide-react";

export default function Testimonials() {
  return (
    <PublicLayout>
      <PageHeader
        title="Testimonials"
        subtitle="What our families say about Little Ava Nursery."
        breadcrumb="Home / Testimonials"
      />

      <section className="section-padding">
        <div className="container max-w-4xl">
          <div className="bg-[oklch(0.97_0.01_200)] rounded-xl p-8 text-center">
            <MessageSquare className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Testimonials Coming Soon</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Once we open and families experience our nursery, their feedback and testimonials will be shared here. We look forward to building a community of happy families.
            </p>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
