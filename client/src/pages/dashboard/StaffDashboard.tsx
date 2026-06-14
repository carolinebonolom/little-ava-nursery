import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";
import { LogOut, AlertCircle, Users, ClipboardList } from "lucide-react";

export default function StaffDashboard() {
  const { user, loading, logout } = useAuth();
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState("children");

  const canAccess = !!user && (user.role === "staff" || user.role === "admin");

  // Fetch children in this staff's room only
  const { data: roomChildren } = trpc.children.byRoom.useQuery(undefined, {
    enabled: !!user && (user.role === "staff" || user.role === "admin"),
  });

  // Mutations
  const logActivity = trpc.activities.log.useMutation({
    onSuccess: () => {
      toast.success("Activity logged successfully! Parent has been notified.");
      setActivityForm({ childId: "", type: "meal", description: "", details: "" });
    },
    onError: (err: any) => toast.error(err.message),
  });

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const [activityForm, setActivityForm] = useState({
    childId: "",
    type: "meal" as "meal" | "drink" | "nappy" | "nap" | "activity" | "milestone" | "note",
    description: "",
    details: "",
  });

  const handleLogActivitySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activityForm.childId || !activityForm.type) {
      toast.error("Please select a child and activity type");
      return;
    }
    logActivity.mutate({
      childId: Number(activityForm.childId),
      type: activityForm.type,
      description: activityForm.description || undefined,
      details: activityForm.details ? JSON.parse(activityForm.details) : undefined,
    });
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!canAccess) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <AlertCircle /> Access Denied
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>You do not have access to the staff dashboard. Please log in as staff.</p>
            <Button onClick={() => navigate("/login/staff")} className="mt-4 w-full">
              Go to Staff Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b border-teal-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-teal-900">Staff Dashboard</h1>
            <p className="text-sm text-gray-600">Welcome, {user?.name || "Staff Member"}</p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="gap-2">
            <LogOut className="w-4 h-4" /> Sign Out
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Tabs - Only Room Children and Log Activity */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="children" className="gap-2">
              <Users className="w-4 h-4" /> Room Children
            </TabsTrigger>
            <TabsTrigger value="activities" className="gap-2">
              <ClipboardList className="w-4 h-4" /> Log Activity
            </TabsTrigger>
          </TabsList>

          {/* Room Children Tab */}
          <TabsContent value="children" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Children in Your Room</CardTitle>
              </CardHeader>
              <CardContent>
                {roomChildren && roomChildren.length > 0 ? (
                  <div className="space-y-3">
                    {roomChildren.map((child: any) => (
                      <div key={child.id} className="p-4 border rounded-lg bg-white">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-gray-900">{child.firstName} {child.lastName}</p>
                            <p className="text-xs text-muted-foreground">DOB: {new Date(child.dateOfBirth).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {child.allergies && (
                            <span className="text-xs bg-red-50 text-red-700 px-2 py-1 rounded-full">
                              Allergies: {child.allergies}
                            </span>
                          )}
                          {child.medicalInfo && (
                            <span className="text-xs bg-amber-50 text-amber-700 px-2 py-1 rounded-full">
                              Medical: {child.medicalInfo}
                            </span>
                          )}
                          {child.dietaryRequirements && (
                            <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                              Dietary: {child.dietaryRequirements}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-8">No children assigned to your room yet.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Log Activity Tab */}
          <TabsContent value="activities" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Log Child Activity</CardTitle>
                <p className="text-sm text-muted-foreground">Record meals, drinks, nappy changes, naps, and activities. Parents will be notified automatically.</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogActivitySubmit} className="space-y-4">
                  <div>
                    <Label>Child *</Label>
                    <Select value={activityForm.childId} onValueChange={(v) => setActivityForm(p => ({ ...p, childId: v }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select child" />
                      </SelectTrigger>
                      <SelectContent>
                        {roomChildren?.map((c: any) => (
                          <SelectItem key={c.id} value={String(c.id)}>
                            {c.firstName} {c.lastName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Activity Type *</Label>
                    <Select value={activityForm.type} onValueChange={(v) => setActivityForm(p => ({ ...p, type: v as any }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select activity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="meal">Meal</SelectItem>
                        <SelectItem value="drink">Drink / Snack</SelectItem>
                        <SelectItem value="nappy">Nappy Change</SelectItem>
                        <SelectItem value="nap">Nap / Sleep</SelectItem>
                        <SelectItem value="activity">Activity / Play</SelectItem>
                        <SelectItem value="milestone">Milestone Achieved</SelectItem>
                        <SelectItem value="note">Note for Parent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Description</Label>
                    <Input
                      placeholder="e.g., Had breakfast - porridge and fruit"
                      value={activityForm.description}
                      onChange={(e) => setActivityForm(p => ({ ...p, description: e.target.value }))}
                    />
                  </div>

                  <div>
                    <Label>Additional Details (optional)</Label>
                    <Textarea
                      placeholder="Any extra information for the parent..."
                      value={activityForm.details}
                      onChange={(e) => setActivityForm(p => ({ ...p, details: e.target.value }))}
                    />
                  </div>

                  <Button type="submit" disabled={logActivity.isPending} className="w-full bg-teal-600 hover:bg-teal-700">
                    {logActivity.isPending ? "Logging..." : "Log Activity"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
