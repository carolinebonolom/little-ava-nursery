import { Link } from "wouter";
import PublicLayout from "@/components/PublicLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function LoginSelection() {
  return (
    <PublicLayout>
      <section className="section-padding">
        <div className="container max-w-3xl">
          <div className="text-center mb-8">
            <h1 className="heading-2">Management Login</h1>
            <p className="text-muted-foreground mt-2">Secure access for nursery management.</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Admin Dashboard</CardTitle>
              <CardDescription>Use your management credentials to continue.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/login/admin">Go to Management Login</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </PublicLayout>
  );
}