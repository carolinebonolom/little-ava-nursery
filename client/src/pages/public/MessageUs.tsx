import { useState } from "react";
import PublicLayout from "@/components/PublicLayout";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { NURSERY_INFO } from "@shared/nurseryInfo";
import { CheckCircle2, Mail, MessageCircle, Phone } from "lucide-react";
import { toast } from "sonner";

export default function MessageUs() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const whatsappUrl = `https://wa.me/${NURSERY_INFO.whatsapp.replace("+", "")}?text=Hi%20Little%20Ava%20Nursery%2C%20I%27d%20like%20to%20enquire.`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${NURSERY_INFO.email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: form.subject || "Website Message",
          message: form.message,
          _subject: `Little Ava Message Us: ${form.subject || "General Enquiry"}`,
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to send your message right now. Please try again shortly.");
      }

      setSubmitted(true);
      toast.success("Message sent!");
    } catch (error: any) {
      toast.error(error?.message || "Unable to send your message right now.");
    } finally {
      setSending(false);
    }
  };

  if (submitted) {
    return (
      <PublicLayout>
        <PageHeader title="Message Us" breadcrumb="Home / Message Us" />
        <section className="section-padding">
          <div className="container max-w-lg text-center">
            <CheckCircle2 className="h-16 w-16 text-primary mx-auto mb-4" />
            <h2 className="heading-3 mb-3">Message Sent</h2>
            <p className="text-muted-foreground">Thank you for contacting us. We will reply as soon as possible.</p>
          </div>
        </section>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <PageHeader
        title="Message Us"
        subtitle="Send us a message, chat on WhatsApp, call, or email."
        breadcrumb="Home / Message Us"
      />

      <section className="section-padding">
        <div className="container grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name *</Label>
                      <Input id="name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input id="email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea id="message" rows={5} required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                  </div>
                  <Button type="submit" disabled={sending}>
                    {sending ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6 space-y-4">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm hover:text-primary transition-colors">
                  <MessageCircle className="h-5 w-5 text-[#25D366]" />
                  Chat on WhatsApp
                </a>
                <a href={`tel:${NURSERY_INFO.phone}`} className="flex items-center gap-3 text-sm hover:text-primary transition-colors">
                  <Phone className="h-5 w-5 text-primary" />
                  {NURSERY_INFO.phone}
                </a>
                <a href={`mailto:${NURSERY_INFO.email}`} className="flex items-center gap-3 text-sm hover:text-primary transition-colors">
                  <Mail className="h-5 w-5 text-primary" />
                  {NURSERY_INFO.email}
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}