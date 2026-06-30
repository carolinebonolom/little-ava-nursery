import { useState } from "react";
import PublicLayout from "@/components/PublicLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";
import { toast } from "sonner";

export default function LoginStaff() {
  const [, setLocation] = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const staffLogin = trpc.auth.staffLogin.useMutation({
    onSuccess: () => {
      toast.success("Logged in successfully");
      setLocation("/dashboard/staff");
    },
    onError: (err: any) => toast.error(err.message || "Login failed"),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      toast.error("Please enter username and password");
      return;
    }
    staffLogin.mutate({ username: username.trim(), password });
  };

  return (
    <PublicLayout>
      <section className="section-padding">
        <div className="container max-w-md">
          <Card>
            <CardHeader>
              <CardTitle>Staff Login</CardTitle>
              <CardDescription>Access the staff dashboard for room updates and activity logging.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="e.g. Baby Room"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="submit" disabled={staffLogin.isPending} className="flex-1">
                    {staffLogin.isPending ? "Signing in..." : "Sign In"}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setLocation("/login")}>Back</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </PublicLayout>
  );
}
