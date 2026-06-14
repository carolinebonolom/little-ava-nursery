import PublicLayout from "@/components/PublicLayout";
import PageHeader from "@/components/PageHeader";
import { Camera } from "lucide-react";

export default function Gallery() {
  return (
    <PublicLayout>
      <PageHeader
        title="Gallery"
        subtitle="A glimpse into life at Little Ava Nursery."
        breadcrumb="Home / Information / Gallery"
      />

      <section className="section-padding">
        <div className="container max-w-4xl">
          <div className="bg-[oklch(0.97_0.01_200)] rounded-xl p-8 text-center">
            <Camera className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Gallery Coming Soon</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Photos of our nursery environment, activities, and events will be shared here once we open. Parents will also have access to private photos of their children through the Parent Portal.
            </p>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
