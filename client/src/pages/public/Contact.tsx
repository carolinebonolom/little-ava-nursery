import { useState } from "react";
import PublicLayout from "@/components/PublicLayout";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { NURSERY_INFO } from "@shared/nurseryInfo";
import { toast } from "sonner";
import { MapPin, Mail, Clock, CheckCircle2, Phone, MessageCircle } from "lucide-react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const whatsappUrl = `https://wa.me/${NURSERY_INFO.whatsapp.replace("+", "")}?text=Hi%20Little%20Ava%20Nursery%2C%20I%27d%20like%20to%20enquire%20about%20your%20services.`;

  const fallbackSubmit = async () => {
    const response = await fetch(`https://formsubmit.co/ajax/${NURSERY_INFO.email}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        phone: form.phone || "",
        subject: form.subject || "Contact Form Submission",
        message: form.message,
        _subject: `Little Ava Contact: ${form.subject || "General Enquiry"}`,
      }),
    });

    if (!response.ok) {
      throw new Error("Unable to submit message right now. Please try again shortly.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      await fallbackSubmit();
      setSubmitted(true);
      toast.success("Message sent!");
    } catch (fallbackError: any) {
      toast.error(fallbackError?.message || "Unable to send message right now.");
    } finally {
      setSending(false);
    }
  };

  if (submitted) {
    return (
      <PublicLayout>
        <PageHeader title="Contact Us" breadcrumb="Home / Contact Us" />
        <section className="section-padding">
          <div className="container max-w-lg text-center">
            <CheckCircle2 className="h-16 w-16 text-primary mx-auto mb-4" />
            <h2 className="heading-3 mb-3">Message Sent!</h2>
            <p className="text-muted-foreground">Thank you for getting in touch. We'll respond within 24-48 hours.</p>
          </div>
        </section>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <PageHeader
        title="Contact Us"
        subtitle="We'd love to hear from you. Get in touch with any questions about Little Ava Nursery."
        breadcrumb="Home / Contact Us"
      />

      <section className="section-padding">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4">Send Us a Message</h3>
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
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input id="subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
                      </div>
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

            <div className="space-y-6">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 space-y-4">
                  <h4 className="font-semibold text-base">Get in Touch</h4>
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Phone</p>
                      <a href={`tel:${NURSERY_INFO.phone}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        {NURSERY_INFO.phone}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MessageCircle className="h-5 w-5 text-[#25D366] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">WhatsApp</p>
                      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-[#25D366] transition-colors">
                        Chat with us on WhatsApp
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Email</p>
                      <a href={`mailto:${NURSERY_INFO.email}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        {NURSERY_INFO.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Location</p>
                      <p className="text-sm text-muted-foreground">{NURSERY_INFO.location}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Opening Hours</p>
                      <p className="text-sm text-muted-foreground">Mon-Fri: {NURSERY_INFO.openingHours.weekdays}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm bg-[#25D366]/5">
                <CardContent className="p-6 text-center">
                  <MessageCircle className="h-10 w-10 text-[#25D366] mx-auto mb-3" />
                  <h4 className="font-semibold text-base mb-2">Prefer WhatsApp?</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Send us a message on WhatsApp for quick enquiries. We typically respond within a few hours.
                  </p>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white px-5 py-2.5 rounded-lg font-medium text-sm transition-colors"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Open WhatsApp
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
