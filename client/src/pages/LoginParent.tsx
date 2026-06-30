import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLocation } from "wouter";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

export default function LoginParent() {
  const [, navigate] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const parentLogin = trpc.auth.parentLogin.useMutation({
    onSuccess: () => {
      toast.success("Logged in successfully!");
      navigate("/dashboard/parent");
    },
    onError: (err: any) => toast.error(err.message || "Login failed"),
  });

  const parentSignUp = trpc.auth.parentSignUp.useMutation({
    onSuccess: () => {
      toast.success("Account created! Please log in.");
      setIsSignUp(false);
      setEmail("");
      setPassword("");
      setName("");
      setPhone("");
    },
    onError: (err: any) => toast.error(err.message || "Sign up failed"),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignUp) {
      if (!name || !email || !password) {
        toast.error("Please fill in all required fields");
        return;
      }
      parentSignUp.mutate({ name, email, password, phone: phone || undefined });
    } else {
      if (!email || !password) {
        toast.error("Please enter email and password");
        return;
      }
      parentLogin.mutate({ email, password });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Button
          variant="ghost"
          onClick={() => navigate("/login")}
          className="mb-6 text-teal-600 hover:text-teal-700"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>

        <Card className="border-2 border-teal-200">
          <CardHeader>
            <CardTitle className="text-teal-900">
              {isSignUp ? "Create Parent Account" : "Parent Login"}
            </CardTitle>
            <CardDescription>
              {isSignUp
                ? "Register to access your child's nursery updates"
                : "Log in to view your child's activities and updates"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <>
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Your phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </>
              )}

              <div>
                <Label htmlFor="email">Email Address *</Label>
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
                <Label htmlFor="password">Password *</Label>
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
                disabled={parentLogin.isPending || parentSignUp.isPending}
                className="w-full bg-teal-600 hover:bg-teal-700"
              >
                {parentLogin.isPending || parentSignUp.isPending ? "Please wait..." : isSignUp ? "Create Account" : "Log In"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
                <Button
                  variant="link"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-teal-600 hover:text-teal-700 p-0 h-auto"
                >
                  {isSignUp ? "Log in here" : "Sign up here"}
                </Button>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 p-4 bg-teal-50 rounded-lg border border-teal-200">
          <p className="text-xs text-gray-600">
            <strong>Note:</strong> Your account will be linked to your child once registered with the nursery. Contact the nursery if you need help accessing your account.
          </p>
        </div>
      </div>
    </div>
  );
}
