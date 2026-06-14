import { useState } from "react";
import PublicLayout from "@/components/PublicLayout";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { MailX, CheckCircle2 } from "lucide-react";

export default function Unsubscribe() {
  const [email, setEmail] = useState("");
  const [unsubscribed, setUnsubscribed] = useState(false);

  const unsubscribe = trpc.newsletter.unsubscribe.useMutation({
    onSuccess: () => {
      setUnsubscribed(true);
      toast.success("You have been unsubscribed successfully.");
    },
    onError: (e) => toast.error(e.message || "Could not unsubscribe. Please try again."),
  });

  return (
    <PublicLayout>
      <PageHeader title="Unsubscribe from Newsletter" breadcrumb="Unsubscribe" />
      <section className="py-16">
        <div className="container max-w-md mx-auto">
          <Card>
            <CardContent className="pt-6">
              {unsubscribed ? (
                <div className="text-center py-8">
                  <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Successfully Unsubscribed</h3>
                  <p className="text-muted-foreground">
                    You have been removed from our mailing list. You will no longer receive newsletters from Little Ava Nursery.
                  </p>
                  <p className="text-sm text-muted-foreground mt-4">
                    If you change your mind, you can always re-subscribe through our website.
                  </p>
                </div>
              ) : (
                <div className="text-center">
                  <MailX className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Unsubscribe from our Newsletter</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Enter your email address below to unsubscribe from Little Ava Nursery newsletters.
                  </p>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (email) unsubscribe.mutate({ email });
                    }}
                    className="space-y-4"
                  >
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <Button type="submit" variant="destructive" className="w-full" disabled={unsubscribe.isPending}>
                      {unsubscribe.isPending ? "Processing..." : "Unsubscribe"}
                    </Button>
                  </form>
                  <p className="text-xs text-muted-foreground mt-4">
                    We're sorry to see you go. If you have any feedback about our communications, please <a href="/contact" className="text-primary hover:underline">contact us</a>.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </PublicLayout>
  );
}
