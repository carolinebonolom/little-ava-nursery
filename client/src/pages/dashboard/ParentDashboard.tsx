import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { NURSERY_INFO } from "@shared/nurseryInfo";
import { Link, useLocation } from "wouter";
// import { getLoginUrl } from "@/const";
import { useState } from "react";
import { toast } from "sonner";
import {
  Baby, Bell, Calendar, LogOut, UtensilsCrossed,
  Droplets, Moon, Activity, MessageSquare, ArrowLeft, Plus, AlertCircle,
  FileText, CheckCircle, Clock, Milestone, Download, Eye,
} from "lucide-react";

function ActivityIcon({ type }: { type: string }) {
  switch (type) {
    case "meal": return <UtensilsCrossed className="h-4 w-4 text-orange-500" />;
    case "drink": return <Droplets className="h-4 w-4 text-blue-500" />;
    case "nappy": return <Baby className="h-4 w-4 text-purple-500" />;
    case "nap": return <Moon className="h-4 w-4 text-indigo-500" />;
    case "activity": return <Activity className="h-4 w-4 text-green-500" />;
    default: return <MessageSquare className="h-4 w-4 text-gray-500" />;
  }
}

function RegisterChildForm({ onSuccess }: { onSuccess: () => void }) {
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", dateOfBirth: "", gender: "" as "" | "male" | "female" | "other",
    allergies: "", medicalInfo: "", dietaryRequirements: "", emergencyContact: "", emergencyPhone: "",
  });
  const registerChild = trpc.children.register.useMutation({
    onSuccess: () => { toast.success("Child registered successfully!"); onSuccess(); },
    onError: (err) => toast.error(err.message),
  });

  return (
    <form onSubmit={(e) => { e.preventDefault(); registerChild.mutate({ ...formData, gender: formData.gender || undefined }); }} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div><Label>First Name *</Label><Input required value={formData.firstName} onChange={(e) => setFormData(p => ({ ...p, firstName: e.target.value }))} /></div>
        <div><Label>Last Name *</Label><Input required value={formData.lastName} onChange={(e) => setFormData(p => ({ ...p, lastName: e.target.value }))} /></div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div><Label>Date of Birth *</Label><Input type="date" required value={formData.dateOfBirth} onChange={(e) => setFormData(p => ({ ...p, dateOfBirth: e.target.value }))} /></div>
        <div><Label>Gender</Label><Select value={formData.gender} onValueChange={(v) => setFormData(p => ({ ...p, gender: v as any }))}><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger><SelectContent><SelectItem value="male">Male</SelectItem><SelectItem value="female">Female</SelectItem><SelectItem value="other">Other</SelectItem></SelectContent></Select></div>
      </div>
      <div><Label>Allergies</Label><Textarea value={formData.allergies} onChange={(e) => setFormData(p => ({ ...p, allergies: e.target.value }))} placeholder="List any allergies..." /></div>
      <div><Label>Medical Information</Label><Textarea value={formData.medicalInfo} onChange={(e) => setFormData(p => ({ ...p, medicalInfo: e.target.value }))} placeholder="Any medical conditions..." /></div>
      <div><Label>Dietary Requirements</Label><Textarea value={formData.dietaryRequirements} onChange={(e) => setFormData(p => ({ ...p, dietaryRequirements: e.target.value }))} placeholder="Dietary restrictions..." /></div>
      <div className="grid grid-cols-2 gap-3">
        <div><Label>Emergency Contact Name</Label><Input value={formData.emergencyContact} onChange={(e) => setFormData(p => ({ ...p, emergencyContact: e.target.value }))} /></div>
        <div><Label>Emergency Phone</Label><Input value={formData.emergencyPhone} onChange={(e) => setFormData(p => ({ ...p, emergencyPhone: e.target.value }))} /></div>
      </div>
      <Button type="submit" disabled={registerChild.isPending} className="w-full">Register Child</Button>
    </form>
  );
}

function BookSessionForm({ onSuccess }: { onSuccess: () => void }) {
  const [formData, setFormData] = useState({
    childId: "", startDate: "", sessionType: "" as "" | "full_day" | "morning" | "afternoon" | "ad_hoc",
    notes: "",
  });
  const { data: myChildren } = trpc.children.myChildren.useQuery();
  const bookSession = trpc.sessions.request.useMutation({
    onSuccess: () => { toast.success("Session booked successfully!"); onSuccess(); setFormData({ childId: "", startDate: "", sessionType: "", notes: "" }); },
    onError: (err: any) => toast.error(err.message),
  });

  return (
    <form onSubmit={(e) => { e.preventDefault();     bookSession.mutate({ childId: Number(formData.childId), sessionDate: formData.startDate, sessionType: formData.sessionType as any, notes: formData.notes || undefined }); }} className="space-y-4">
      <div><Label>Child *</Label><Select value={formData.childId} onValueChange={(v) => setFormData(p => ({ ...p, childId: v }))}><SelectTrigger><SelectValue placeholder="Select child" /></SelectTrigger><SelectContent>{myChildren?.map(c => <SelectItem key={c.id} value={String(c.id)}>{c.firstName} {c.lastName}</SelectItem>)}</SelectContent></Select></div>
      <div><Label>Session Date *</Label><Input type="date" required value={formData.startDate} onChange={(e) => setFormData(p => ({ ...p, startDate: e.target.value }))} /></div>
      <div><Label>Session Type *</Label><Select value={formData.sessionType} onValueChange={(v) => setFormData(p => ({ ...p, sessionType: v as any }))}><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger><SelectContent><SelectItem value="full_day">Full Day (6:30 AM - 6:00 PM)</SelectItem><SelectItem value="morning">Morning (6:30 AM - 12:30 PM)</SelectItem><SelectItem value="afternoon">Afternoon (12:30 PM - 6:00 PM)</SelectItem><SelectItem value="ad_hoc">Ad Hoc</SelectItem></SelectContent></Select></div>
      <div><Label>Notes</Label><Textarea value={formData.notes} onChange={(e) => setFormData(p => ({ ...p, notes: e.target.value }))} placeholder="Any special requests..." /></div>
      <Button type="submit" disabled={bookSession.isPending} className="w-full">Book Session</Button>
    </form>
  );
}

function ReportAbsenceForm({ onSuccess }: { onSuccess: () => void }) {
  const [formData, setFormData] = useState({ childId: "", date: "", reason: "" as "" | "illness" | "holiday" | "appointment" | "family" | "other", notes: "" });
  const { data: myChildren } = trpc.children.myChildren.useQuery();
  const reportAbsence = trpc.absences.report.useMutation({
    onSuccess: () => { toast.success("Absence reported!"); onSuccess(); setFormData({ childId: "", date: "", reason: "" as any, notes: "" }); },
    onError: (err: any) => toast.error(err.message),
  });

  return (
    <form onSubmit={(e) => { e.preventDefault(); if (formData.reason) reportAbsence.mutate({ childId: Number(formData.childId), absenceDate: formData.date, reason: formData.reason as any, details: formData.notes || undefined }); }} className="space-y-4">
      <div><Label>Child *</Label><Select value={formData.childId} onValueChange={(v) => setFormData(p => ({ ...p, childId: v }))}><SelectTrigger><SelectValue placeholder="Select child" /></SelectTrigger><SelectContent>{myChildren?.map(c => <SelectItem key={c.id} value={String(c.id)}>{c.firstName} {c.lastName}</SelectItem>)}</SelectContent></Select></div>
      <div><Label>Date *</Label><Input type="date" required value={formData.date} onChange={(e) => setFormData(p => ({ ...p, date: e.target.value }))} /></div>
      <div><Label>Reason *</Label><Select value={formData.reason} onValueChange={(v) => setFormData(p => ({ ...p, reason: v as any }))}><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger><SelectContent><SelectItem value="illness">Illness</SelectItem><SelectItem value="appointment">Appointment</SelectItem><SelectItem value="holiday">Holiday</SelectItem><SelectItem value="family">Family Event</SelectItem><SelectItem value="other">Other</SelectItem></SelectContent></Select></div>
      <div><Label>Notes</Label><Textarea value={formData.notes} onChange={(e) => setFormData(p => ({ ...p, notes: e.target.value }))} placeholder="Additional details..." /></div>
      <Button type="submit" disabled={reportAbsence.isPending || !formData.reason} className="w-full">Report Absence</Button>
    </form>
  );
}

export default function ParentDashboard() {
  const { data: user } = trpc.auth.me.useQuery();
  const { data: myChildren } = trpc.children.myChildren.useQuery();
  const { data: activities } = trpc.activities.getRecent.useQuery({ limit: 50 });
  const { data: notifications } = trpc.notifications.myNotifications.useQuery({ limit: 20 });
  const logout = trpc.auth.logout.useMutation();
  const [, navigate] = useLocation();
  const [unreadCount, setUnreadCount] = useState(0);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-blue-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Parent Portal</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">Please log in to access the parent portal.</p>
            <Button className="w-full" onClick={() => navigate("/login/parent")}>
              Sign In / Register
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50">
      <div className="container py-8 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 mb-4">
              <ArrowLeft className="h-4 w-4" /> Back to Website
            </Link>
            <h1 className="text-4xl font-bold text-gray-900">Welcome, {user.name}!</h1>
            <p className="text-gray-600 mt-1">Manage your child's nursery journey</p>
          </div>
          <Button variant="outline" onClick={() => { logout.mutate(); navigate("/"); }} className="gap-2">
            <LogOut className="h-4 w-4" /> Sign Out
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-white border-teal-200">
            <CardContent className="pt-6">
              <div className="text-center">
                <Baby className="h-8 w-8 text-teal-600 mx-auto mb-2" />
                <p className="text-3xl font-bold">{myChildren?.length || 0}</p>
                <p className="text-sm text-muted-foreground">Children Registered</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white border-blue-200">
            <CardContent className="pt-6">
              <div className="text-center">
                <Bell className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-3xl font-bold">{unreadCount}</p>
                <p className="text-sm text-muted-foreground">Unread Notifications</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white border-green-200">
            <CardContent className="pt-6">
              <div className="text-center">
                <Calendar className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-3xl font-bold">{activities?.length || 0}</p>
                <p className="text-sm text-muted-foreground">Activity Updates</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mb-8 bg-white border-teal-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5 text-teal-600" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="gap-2 h-auto py-3">
                    <AlertCircle className="h-4 w-4" />
                    <div className="text-left">
                      <p className="font-semibold text-sm">Report Sickness</p>
                      <p className="text-xs text-muted-foreground">Let us know your child is unwell</p>
                    </div>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Report Sickness</DialogTitle>
                  </DialogHeader>
                  <ReportAbsenceForm onSuccess={() => {}} />
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="gap-2 h-auto py-3">
                    <Calendar className="h-4 w-4" />
                    <div className="text-left">
                      <p className="font-semibold text-sm">Request Session</p>
                      <p className="text-xs text-muted-foreground">Request nursery time</p>
                    </div>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Request a Session</DialogTitle>
                  </DialogHeader>
                  <BookSessionForm onSuccess={() => {}} />
                </DialogContent>
              </Dialog>


            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="feed" className="space-y-6">
          <TabsList className="flex-wrap">
            <TabsTrigger value="feed">Activity Feed</TabsTrigger>
            <TabsTrigger value="children">My Children</TabsTrigger>
            <TabsTrigger value="absences">Sickness & Absences</TabsTrigger>
            <TabsTrigger value="notifications">
              Notifications {unreadCount && unreadCount > 0 ? `(${unreadCount})` : ""}
            </TabsTrigger>
          </TabsList>

          {/* Activity Feed */}
          <TabsContent value="feed">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Today's Activity Feed</CardTitle>
              </CardHeader>
              <CardContent>
                {activities && activities.length > 0 ? (
                  <div className="space-y-4">
                    {activities.map((activity: any) => (
                      <div key={activity.id} className="flex items-start gap-4 pb-4 border-b last:border-b-0">
                        <div className="flex-shrink-0 mt-1">
                          <ActivityIcon type={activity.type} />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">
                            {activity.childFirstName} {activity.childLastName} - {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                          </p>
                          {activity.description && <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>}
                          <p className="text-xs text-muted-foreground mt-2">
                            {new Date(activity.loggedAt).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Activity className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
                    <p className="text-muted-foreground">No activity updates yet today.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* My Children */}
          <TabsContent value="children">
            <div className="space-y-4">
              {myChildren && myChildren.length > 0 ? (
                myChildren.map((child: any) => (
                  <Card key={child.id} className="border-teal-200">
                    <CardHeader>
                      <CardTitle className="text-base">{child.firstName} {child.lastName}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      <p><span className="font-semibold">Date of Birth:</span> {new Date(child.dateOfBirth).toLocaleDateString()}</p>
                      {child.allergies && <p><span className="font-semibold">Allergies:</span> {child.allergies}</p>}
                      {child.medicalInfo && <p><span className="font-semibold">Medical Info:</span> {child.medicalInfo}</p>}
                      {child.dietaryRequirements && <p><span className="font-semibold">Dietary:</span> {child.dietaryRequirements}</p>}
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="pt-12 text-center">
                    <Baby className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
                    <p className="text-muted-foreground">No children registered yet.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Sickness & Absences */}
          <TabsContent value="absences">
            <Card>
              <CardHeader>
                <CardTitle>Sickness & Absence Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Use the "Report Sickness" button above to notify the nursery when your child is unwell or will be absent.</p>
                <p className="text-muted-foreground text-center py-8">Your sickness and absence reports will appear here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                {notifications && notifications.length > 0 ? (
                  <div className="space-y-3">
                    {notifications.map((notif: any) => (
                      <div key={notif.id} className="p-3 border rounded-lg bg-blue-50 border-blue-200">
                        <div className="flex items-start gap-3">
                          <Bell className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span className="font-semibold text-sm">{notif.title}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{notif.message}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Bell className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
                    <p className="text-muted-foreground">No notifications yet.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>


        </Tabs>
      </div>
    </div>
  );
}

// ==================== DOCUMENTS TAB ====================
function DocumentsTab() {
  const { data: pendingDocs } = trpc.documents.myPending.useQuery();
  const { data: myChildren } = trpc.children.myChildren.useQuery();
  const sign = trpc.documents.sign.useMutation({
    onSuccess: () => toast.success("Document signed successfully!"),
    onError: (err: any) => toast.error(err.message),
  });

  const handleSign = (signatureId: number) => {
    const canvas = document.getElementById(`canvas-${signatureId}`) as HTMLCanvasElement;
    if (canvas) {
      const signatureData = canvas.toDataURL();
      sign.mutate({ signatureId, signatureData });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Documents & Forms
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {pendingDocs && pendingDocs.length > 0 ? (
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-3">Pending Signatures</h3>
              {pendingDocs.map((item: any) => (
                <Card key={item.documentSignatures.id} className="mb-3 border-amber-200 bg-amber-50">
                  <CardHeader>
                    <CardTitle className="text-base flex items-center justify-between">
                      <span>{item.documents.title}</span>
                      <Badge variant="outline" className="bg-amber-100">Pending</Badge>
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{item.documents.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Label className="text-xs">Sign Below:</Label>
                      <canvas
                        id={`canvas-${item.documentSignatures.id}`}
                        className="border-2 border-dashed border-gray-300 rounded w-full h-24 cursor-crosshair bg-white"
                        onMouseDown={(e) => {
                          const canvas = e.currentTarget;
                          const ctx = canvas.getContext('2d');
                          if (!ctx) return;
                          const rect = canvas.getBoundingClientRect();
                          const startX = e.clientX - rect.left;
                          const startY = e.clientY - rect.top;
                          ctx.beginPath();
                          ctx.moveTo(startX, startY);

                          const handleMouseMove = (moveE: MouseEvent) => {
                            const x = moveE.clientX - rect.left;
                            const y = moveE.clientY - rect.top;
                            ctx.lineTo(x, y);
                            ctx.stroke();
                          };

                          const handleMouseUp = () => {
                            document.removeEventListener('mousemove', handleMouseMove);
                            document.removeEventListener('mouseup', handleMouseUp);
                          };

                          document.addEventListener('mousemove', handleMouseMove);
                          document.addEventListener('mouseup', handleMouseUp);
                        }}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleSign(item.documentSignatures.id)}
                        disabled={sign.isPending}
                        className="flex-1"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Sign Document
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-muted-foreground">No pending documents.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ==================== MILESTONES TAB ====================
function MilestonesTab() {
  const { data: myChildren } = trpc.children.myChildren.useQuery();
  const [selectedChildId, setSelectedChildId] = useState<number | null>(null);
  const { data: milestones } = trpc.milestones.getByChild.useQuery(
    { childId: selectedChildId || 0 },
    { enabled: !!selectedChildId }
  );

  const areaLabels: Record<string, string> = {
    communication_language: "Communication & Language",
    physical_development: "Physical Development",
    personal_social_emotional: "Personal, Social & Emotional",
    literacy: "Literacy",
    mathematics: "Mathematics",
    understanding_world: "Understanding the World",
    expressive_arts: "Expressive Arts & Design",
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Milestone className="h-5 w-5" />
          Child Development Milestones (EYFS)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {myChildren && myChildren.length > 0 ? (
          <>
            <div>
              <Label>Select Child</Label>
              <Select value={selectedChildId ? String(selectedChildId) : ""} onValueChange={(v) => setSelectedChildId(Number(v))}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a child" />
                </SelectTrigger>
                <SelectContent>
                  {myChildren.map((child: any) => (
                    <SelectItem key={child.id} value={String(child.id)}>
                      {child.firstName} {child.lastName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedChildId && milestones && milestones.length > 0 ? (
              <div className="space-y-4">
                {Object.entries(
                  milestones.reduce((acc: Record<string, any[]>, m: any) => {
                    if (!acc[m.area]) acc[m.area] = [];
                    acc[m.area].push(m);
                    return acc;
                  }, {})
                ).map(([area, items]) => (
                  <Card key={area} className="border-teal-200 bg-teal-50">
                    <CardHeader>
                      <CardTitle className="text-base">{areaLabels[area] || area}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {(items as any[]).map((m: any) => (
                        <div key={m.id} className="flex items-start gap-3 pb-2 border-b last:border-b-0">
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <div className="flex-1">
                            <p className="font-medium text-sm">{m.milestone}</p>
                            {m.notes && <p className="text-xs text-muted-foreground mt-1">{m.notes}</p>}
                            <p className="text-xs text-muted-foreground mt-1">
                              {new Date(m.observedDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : selectedChildId ? (
              <div className="text-center py-12">
                <Milestone className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-muted-foreground">No milestones recorded yet.</p>
              </div>
            ) : null}
          </>
        ) : (
          <div className="text-center py-12">
            <Baby className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-muted-foreground">No children registered yet.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}


// ==================== SURVEY TAB ====================
function SurveyTab() {
  const [form, setForm] = useState({ category: "" as "" | "communication" | "activities" | "meals" | "cleanliness" | "staff" | "overall", rating: 0, comments: "" });
  const [submitted, setSubmitted] = useState(false);
  const submit = trpc.surveys.submit.useMutation({
    onSuccess: () => { setSubmitted(true); toast.success("Thank you for your feedback!"); },
    onError: (e: any) => toast.error(e.message),
  });

  if (submitted) {
    return (
      <Card>
        <CardContent className="pt-6 text-center py-12">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
          <p className="text-muted-foreground">Your feedback has been submitted. We really appreciate you taking the time to help us improve.</p>
          <Button className="mt-4" onClick={() => { setSubmitted(false); setForm({ category: "", rating: 0, comments: "" }); }}>Submit Another</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Share Your Feedback</CardTitle>
        <p className="text-sm text-muted-foreground">Help us improve by rating your experience with Little Ava Nursery.</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={(e) => { e.preventDefault(); if (form.category && form.rating > 0) submit.mutate({ category: form.category as any, rating: form.rating, comments: form.comments || undefined }); }} className="space-y-4">
          <div>
            <Label>Category *</Label>
            <Select value={form.category} onValueChange={(v) => setForm(p => ({ ...p, category: v as any }))}>
              <SelectTrigger><SelectValue placeholder="What would you like to rate?" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="overall">Overall Experience</SelectItem>
                <SelectItem value="communication">Communication</SelectItem>
                <SelectItem value="activities">Activities & Learning</SelectItem>
                <SelectItem value="meals">Meals & Nutrition</SelectItem>
                <SelectItem value="cleanliness">Cleanliness & Hygiene</SelectItem>
                <SelectItem value="staff">Staff & Care</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Rating *</Label>
            <div className="flex gap-2 mt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} type="button" onClick={() => setForm(p => ({ ...p, rating: star }))} className={`text-2xl transition-colors ${star <= form.rating ? "text-yellow-400" : "text-gray-300"}`}>
                  ★
                </button>
              ))}
            </div>
          </div>
          <div>
            <Label>Comments (optional)</Label>
            <Textarea value={form.comments} onChange={(e) => setForm(p => ({ ...p, comments: e.target.value }))} placeholder="Tell us more about your experience..." rows={4} />
          </div>
          <Button type="submit" disabled={submit.isPending || !form.category || form.rating === 0}>
            {submit.isPending ? "Submitting..." : "Submit Feedback"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
