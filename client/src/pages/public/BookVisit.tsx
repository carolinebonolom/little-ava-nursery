import { useState } from "react";
import PublicLayout from "@/components/PublicLayout";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { NURSERY_INFO } from "@shared/nurseryInfo";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";

export default function BookVisit() {
  const [submitted, setSubmitted] = useState(false);
  const bookVisit = trpc.visits.book.useMutation();

  const [form, setForm] = useState({ parentName: "", parentEmail: "", parentPhone: "", childAge: "", preferredDate: "", preferredTime: "", message: "" });

  const fallbackSubmit = async () => {
    const response = await fetch(`https://formsubmit.co/ajax/${NURSERY_INFO.email}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        parentName: form.parentName,
        parentEmail: form.parentEmail,
        parentPhone: form.parentPhone || "",
        childAge: form.childAge || "",
        preferredDate: form.preferredDate || "",
        preferredTime: form.preferredTime || "",
        message: form.message || "",
        _subject: `Little Ava Book Visit: ${form.parentName}`,
      }),
    });

    if (!response.ok) {
      throw new Error("Unable to submit visit booking right now. Please try again shortly.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await bookVisit.mutateAsync(form);
      setSubmitted(true);
      toast.success("Visit booked!");
      return;
    } catch {
      // Fallback for static deployments where API routes are unavailable.
      try {
        await fallbackSubmit();
        setSubmitted(true);
        toast.success("Visit booked!");
      } catch (fallbackError: any) {
        toast.error(fallbackError?.message || "Unable to submit visit booking right now.");
      }
    }
  };

  if (submitted) {
    return (
      <PublicLayout>
        <PageHeader title="Book a Visit" breadcrumb="Home / Book a Visit" />
        <section className="section-padding">
          <div className="container max-w-lg text-center">
            <CheckCircle2 className="h-16 w-16 text-primary mx-auto mb-4" />
            <h2 className="heading-3 mb-3">Visit Booked!</h2>
            <p className="text-muted-foreground">Thank you! We'll confirm your visit within 24 hours. We look forward to meeting you and showing you around our nursery.</p>
          </div>
        </section>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <PageHeader
        title="Book a Visit"
        subtitle="Come and see our nursery in person. We'd love to show you around and answer any questions."
        breadcrumb="Home / Book a Visit"
      />

      <section className="section-padding">
        <div className="container max-w-2xl">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="parentName">Your Name *</Label>
                    <Input id="parentName" required value={form.parentName} onChange={(e) => setForm({ ...form, parentName: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="parentEmail">Email Address *</Label>
                    <Input id="parentEmail" type="email" required value={form.parentEmail} onChange={(e) => setForm({ ...form, parentEmail: e.target.value })} />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="parentPhone">Phone Number</Label>
                    <Input id="parentPhone" value={form.parentPhone} onChange={(e) => setForm({ ...form, parentPhone: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="childAge">Child's Age</Label>
                    <Input id="childAge" placeholder="e.g. 18 months" value={form.childAge} onChange={(e) => setForm({ ...form, childAge: e.target.value })} />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="preferredDate">Preferred Date</Label>
                    <Input id="preferredDate" type="date" value={form.preferredDate} onChange={(e) => setForm({ ...form, preferredDate: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="preferredTime">Preferred Time</Label>
                    <Input id="preferredTime" placeholder="e.g. 10:00am" value={form.preferredTime} onChange={(e) => setForm({ ...form, preferredTime: e.target.value })} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Any Questions or Notes</Label>
                  <Textarea id="message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                </div>
                <Button type="submit" className="w-full" disabled={bookVisit.isPending}>
                  {bookVisit.isPending ? "Booking..." : "Book Your Visit"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </PublicLayout>
  );
}
