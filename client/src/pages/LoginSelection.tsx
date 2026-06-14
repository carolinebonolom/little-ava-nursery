import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation } from "wouter";
import { Users, Shield, Briefcase } from "lucide-react";


export default function LoginSelection() {
  const [, navigate] = useLocation();

  // Don't auto-redirect - let users choose their login type
  // This allows admin to test other login flows

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-teal-900 mb-2">Little Ava Nursery</h1>
          <p className="text-gray-600">Select your login type to continue</p>
        </div>

        {/* Login Options */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Parent Login */}
          <Card className="border-2 border-teal-200 hover:border-teal-400 transition-colors cursor-pointer" onClick={() => navigate("/login/parent")}>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-teal-100 rounded-full">
                  <Users className="w-8 h-8 text-teal-600" />
                </div>
              </div>
              <CardTitle className="text-teal-900">Parent Login</CardTitle>
              <CardDescription>Access your child's activities and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-teal-600 hover:bg-teal-700">
                Parent Portal
              </Button>
            </CardContent>
          </Card>

          {/* Staff Login */}
          <Card className="border-2 border-blue-200 hover:border-blue-400 transition-colors cursor-pointer" onClick={() => navigate("/login/staff")}>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <Briefcase className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <CardTitle className="text-blue-900">Staff Login</CardTitle>
              <CardDescription>Log activities and manage your schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Staff Dashboard
              </Button>
            </CardContent>
          </Card>

          {/* Admin Login */}
          <Card className="border-2 border-green-200 hover:border-green-400 transition-colors cursor-pointer" onClick={() => navigate("/login/admin")}>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <CardTitle className="text-green-900">Management Login</CardTitle>
              <CardDescription>Full access to nursery management</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                Admin Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-sm text-gray-600">
            <Button variant="link" onClick={() => navigate("/")} className="text-teal-600 hover:text-teal-700">
              Back to Home
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
}
