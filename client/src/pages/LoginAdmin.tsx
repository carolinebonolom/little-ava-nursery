import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLocation } from "wouter";
import { ArrowLeft, Shield } from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { useEffect } from "react";

export default function LoginAdmin() {
  const [, navigate] = useLocation();
  const { user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user && user.role === "admin") {
      navigate("/dashboard/admin");
    }
  }, [user, navigate]);

  const adminLogin = trpc.auth.adminLogin.useMutation({
    onSuccess: () => {
      toast.success("Logged in successfully!");
      window.location.href = "/dashboard/admin";
    },
    onError: (err: any) => toast.error(err.message || "Login failed"),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }
    adminLogin.mutate({ email, password });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Button
          variant="ghost"
          onClick={() => navigate("/login")}
          className="mb-6 text-green-600 hover:text-green-700"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>

        <Card className="border-2 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-900 flex items-center gap-2">
              <Shield className="w-5 h-5" /> Management Login
            </CardTitle>
            <CardDescription>
              Full access to nursery management, staff records, analytics, and settings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button
                type="submit"
                disabled={adminLogin.isPending}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                {adminLogin.isPending ? "Signing in..." : "Sign in as Management"}
              </Button>
            </form>

            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg mt-4">
              <p className="text-xs text-amber-800">
                <strong>Access restricted:</strong> Only authorised management staff can access the admin dashboard. If you need access, contact the nursery owner.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
