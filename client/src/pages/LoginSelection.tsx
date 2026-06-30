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

          <Card className="mb-4">
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

          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Staff Login</CardTitle>
                <CardDescription>For room staff and daily activity updates.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" size="lg" className="w-full">
                  <Link href="/login/staff">Go to Staff Login</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Parent Portal</CardTitle>
                <CardDescription>For families to view updates and manage requests.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" size="lg" className="w-full">
                  <Link href="/login/parent">Go to Parent Login</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}