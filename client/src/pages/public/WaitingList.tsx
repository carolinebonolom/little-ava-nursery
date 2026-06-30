import { useState } from "react";
import PublicLayout from "@/components/PublicLayout";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { NURSERY_INFO } from "@shared/nurseryInfo";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";

export default function WaitingList() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const [form, setForm] = useState({
    parentName: "",
    parentEmail: "",
    parentPhone: "",
    childName: "",
    childDob: "",
    preferredStartDate: "",
    preferredSessions: "",
    notes: "",
  });

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
        childName: form.childName,
        childDob: form.childDob,
        preferredStartDate: form.preferredStartDate || "",
        preferredSessions: form.preferredSessions || "",
        notes: form.notes || "",
        _subject: `Little Ava Waiting List: ${form.childName}`,
      }),
    });

    if (!response.ok) {
      throw new Error("Unable to submit waiting list form right now. Please try again shortly.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      await fallbackSubmit();
      setSubmitted(true);
      toast.success("Successfully added to the waiting list!");
    } catch (fallbackError: any) {
      toast.error(fallbackError?.message || "Unable to submit waiting list form right now.");
    } finally {
      setSending(false);
    }
  };

  if (submitted) {
    return (
      <PublicLayout>
        <PageHeader title="Waiting List" breadcrumb="Home / Parents / Waiting List" />
        <section className="section-padding">
          <div className="container max-w-lg text-center">
            <CheckCircle2 className="h-16 w-16 text-primary mx-auto mb-4" />
            <h2 className="heading-3 mb-3">You're on the List!</h2>
            <p className="text-muted-foreground">
              Thank you for registering your interest. We'll be in touch as soon as a place becomes available. In the meantime, feel free to book a visit to see our nursery.
            </p>
          </div>
        </section>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <PageHeader
        title="Waiting List"
        subtitle="Register your interest and join our waiting list for a place at Little Ava Nursery."
        breadcrumb="Home / Parents / Waiting List"
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
                    <Label htmlFor="childName">Child's Name *</Label>
                    <Input id="childName" required value={form.childName} onChange={(e) => setForm({ ...form, childName: e.target.value })} />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="childDob">Child's Date of Birth *</Label>
                    <Input id="childDob" type="date" required value={form.childDob} onChange={(e) => setForm({ ...form, childDob: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="preferredStartDate">Preferred Start Date</Label>
                    <Input id="preferredStartDate" type="date" value={form.preferredStartDate} onChange={(e) => setForm({ ...form, preferredStartDate: e.target.value })} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="preferredSessions">Preferred Sessions</Label>
                  <Select onValueChange={(v) => setForm({ ...form, preferredSessions: v })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select preferred sessions" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full_day">Full Day (6:30am - 6:00pm)</SelectItem>
                      <SelectItem value="morning">Morning (6:30am - 1:00pm)</SelectItem>
                      <SelectItem value="afternoon">Afternoon (1:00pm - 6:00pm)</SelectItem>
                      <SelectItem value="flexible">Flexible / Unsure</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea id="notes" placeholder="Any additional information..." value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
                </div>
                <Button type="submit" className="w-full" disabled={sending}>
                  {sending ? "Submitting..." : "Join Waiting List"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </PublicLayout>
  );
}
