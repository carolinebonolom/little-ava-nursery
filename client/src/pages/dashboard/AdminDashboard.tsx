import { useAuth } from "@/_core/hooks/useAuth";
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

import { useState } from "react";
import { toast } from "sonner";
import {
  Baby, Users, Clock, Mail, LogOut, ArrowLeft, CheckCircle2, XCircle,
  Plus, UtensilsCrossed, Droplets, Moon, Activity, MessageSquare,
  Bell, Send, Newspaper, UserPlus, BarChart3, Shield, Pill,
  ClipboardList, DoorOpen, Flame, GraduationCap, FileSignature, BookOpen,
  Star, Phone, Building2,
} from "lucide-react";

function LogActivityForm({ children: childList, onSuccess }: { children: { id: number; firstName: string; lastName: string }[]; onSuccess: () => void }) {
  const [formData, setFormData] = useState({ childId: "", type: "" as "" | "meal" | "drink" | "nappy" | "nap" | "activity" | "milestone" | "note", description: "" });
  const logActivity = trpc.activities.log.useMutation({
    onSuccess: () => { toast.success("Activity logged!"); onSuccess(); },
    onError: (err) => toast.error(err.message),
  });

  return (
    <form onSubmit={(e) => { e.preventDefault(); logActivity.mutate({ childId: Number(formData.childId), type: formData.type as "meal" | "drink" | "nappy" | "nap" | "activity" | "milestone" | "note", description: formData.description || undefined }); }} className="space-y-4">
      <div>
        <Label>Child *</Label>
        <Select value={formData.childId} onValueChange={(v) => setFormData(p => ({ ...p, childId: v }))}>
          <SelectTrigger><SelectValue placeholder="Select child" /></SelectTrigger>
          <SelectContent>{childList.map(c => <SelectItem key={c.id} value={String(c.id)}>{c.firstName} {c.lastName}</SelectItem>)}</SelectContent>
        </Select>
      </div>
      <div>
        <Label>Activity Type *</Label>
        <Select value={formData.type} onValueChange={(v) => setFormData(p => ({ ...p, type: v as "meal" | "drink" | "nappy" | "nap" | "activity" | "milestone" | "note" }))}>
          <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="meal">Meal</SelectItem>
            <SelectItem value="drink">Drink</SelectItem>
            <SelectItem value="nappy">Nappy Change</SelectItem>
            <SelectItem value="nap">Nap/Sleep</SelectItem>
            <SelectItem value="activity">Activity</SelectItem>
            <SelectItem value="milestone">Milestone</SelectItem>
            <SelectItem value="note">Note</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Description</Label>
        <Textarea value={formData.description} onChange={(e) => setFormData(p => ({ ...p, description: e.target.value }))} placeholder="e.g., Ate all lunch - pasta with vegetables" />
      </div>
      <Button type="submit" className="w-full" disabled={logActivity.isPending}>
        {logActivity.isPending ? "Logging..." : "Log Activity"}
      </Button>
    </form>
  );
}

function BroadcastNotificationForm({ onSuccess }: { onSuccess: () => void }) {
  const [formData, setFormData] = useState({ title: "", message: "", type: "announcement" as "activity" | "session" | "absence" | "news" | "announcement" | "general" });
  const broadcast = trpc.admin.broadcastNotification.useMutation({
    onSuccess: (data) => { toast.success(`Notification sent to ${data.count} parents!`); onSuccess(); },
    onError: (err) => toast.error(err.message),
  });

  return (
    <form onSubmit={(e) => { e.preventDefault(); broadcast.mutate(formData); }} className="space-y-4">
      <div>
        <Label>Title *</Label>
        <Input required value={formData.title} onChange={(e) => setFormData(p => ({ ...p, title: e.target.value }))} placeholder="Notification title" />
      </div>
      <div>
        <Label>Type</Label>
        <Select value={formData.type} onValueChange={(v) => setFormData(p => ({ ...p, type: v as typeof formData.type }))}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="announcement">Announcement</SelectItem>
            <SelectItem value="news">News</SelectItem>
            <SelectItem value="general">General</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Message *</Label>
        <Textarea required value={formData.message} onChange={(e) => setFormData(p => ({ ...p, message: e.target.value }))} placeholder="Write your message to all parents..." rows={4} />
      </div>
      <Button type="submit" className="w-full" disabled={broadcast.isPending}>
        {broadcast.isPending ? "Sending..." : "Send to All Parents"}
      </Button>
    </form>
  );
}

function CreateNewsForm({ onSuccess }: { onSuccess: () => void }) {
  const [formData, setFormData] = useState({ title: "", content: "", type: "news" as "news" | "event" | "announcement", eventDate: "" });
  const createNews = trpc.news.create.useMutation({
    onSuccess: () => { toast.success("News/Event published!"); onSuccess(); },
    onError: (err) => toast.error(err.message),
  });

  return (
    <form onSubmit={(e) => { e.preventDefault(); createNews.mutate({ ...formData, eventDate: formData.eventDate || undefined }); }} className="space-y-4">
      <div>
        <Label>Title *</Label>
        <Input required value={formData.title} onChange={(e) => setFormData(p => ({ ...p, title: e.target.value }))} placeholder="News/Event title" />
      </div>
      <div>
        <Label>Type</Label>
        <Select value={formData.type} onValueChange={(v) => setFormData(p => ({ ...p, type: v as typeof formData.type }))}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="news">News</SelectItem>
            <SelectItem value="event">Event</SelectItem>
            <SelectItem value="announcement">Announcement</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {formData.type === "event" && (
        <div>
          <Label>Event Date</Label>
          <Input type="date" value={formData.eventDate} onChange={(e) => setFormData(p => ({ ...p, eventDate: e.target.value }))} />
        </div>
      )}
      <div>
        <Label>Content *</Label>
        <Textarea required value={formData.content} onChange={(e) => setFormData(p => ({ ...p, content: e.target.value }))} placeholder="Write the full content..." rows={6} />
      </div>
      <Button type="submit" className="w-full" disabled={createNews.isPending}>
        {createNews.isPending ? "Publishing..." : "Publish"}
      </Button>
    </form>
  );
}

export default function AdminDashboard() {
  const { user, isAuthenticated, loading, logout } = useAuth();
  const [, setLocation] = useLocation();
  const [showLogActivity, setShowLogActivity] = useState(false);
  const [showBroadcast, setShowBroadcast] = useState(false);
  const [showCreateNews, setShowCreateNews] = useState(false);

  const utils = trpc.useUtils();
  const { data: stats } = trpc.admin.stats.useQuery(undefined, { enabled: isAuthenticated && user?.role === "admin" });
  const { data: waitingListEntries } = trpc.waitingList.list.useQuery(undefined, { enabled: isAuthenticated && user?.role === "admin" });
  const { data: visitBookingsList } = trpc.visits.list.useQuery(undefined, { enabled: isAuthenticated && user?.role === "admin" });
  const { data: contactMsgs } = trpc.contact.list.useQuery(undefined, { enabled: isAuthenticated && user?.role === "admin" });
  const { data: allChildren } = trpc.children.listAll.useQuery(undefined, { enabled: isAuthenticated && user?.role === "admin" });
  const { data: allSessions } = trpc.sessions.listAll.useQuery(undefined, { enabled: isAuthenticated && user?.role === "admin" });
  const { data: allAbsences } = trpc.absences.listAll.useQuery(undefined, { enabled: isAuthenticated && user?.role === "admin" });
  const { data: recentActivities } = trpc.activities.getRecent.useQuery({ limit: 30 }, { enabled: isAuthenticated && user?.role === "admin" });
  const { data: todayAttendance } = trpc.attendance.todayList.useQuery(undefined, { enabled: isAuthenticated && user?.role === "admin" });
  const { data: staffList } = trpc.staff.list.useQuery(undefined, { enabled: isAuthenticated && user?.role === "admin" });
  const { data: newsList } = trpc.news.list.useQuery(undefined, { enabled: isAuthenticated && user?.role === "admin" });

  const updateVisitStatus = trpc.visits.updateStatus.useMutation({ onSuccess: () => { toast.success("Updated!"); utils.visits.list.invalidate(); } });
  const updateWaitingStatus = trpc.waitingList.updateStatus.useMutation({ onSuccess: () => { toast.success("Updated!"); utils.waitingList.list.invalidate(); } });
  const updateSessionStatus = trpc.sessions.updateStatus.useMutation({ onSuccess: () => { toast.success("Updated!"); utils.sessions.listAll.invalidate(); } });
  const acknowledgeAbsence = trpc.absences.acknowledge.useMutation({ onSuccess: () => { toast.success("Acknowledged!"); utils.absences.listAll.invalidate(); } });
  const checkInChild = trpc.attendance.checkIn.useMutation({ onSuccess: () => { toast.success("Checked in!"); utils.attendance.todayList.invalidate(); } });
  const checkOutChild = trpc.attendance.checkOut.useMutation({ onSuccess: () => { toast.success("Checked out!"); utils.attendance.todayList.invalidate(); } });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center">
            <h2 className="heading-3 mb-4">Admin Dashboard</h2>
            <p className="text-muted-foreground mb-6">Please log in to access the admin dashboard.</p>
            <Button asChild><Link href="/login/admin">Log In</Link></Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (user?.role !== "admin" && user?.role !== "staff") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center">
            <h2 className="heading-3 mb-4">Access Denied</h2>
            <p className="text-muted-foreground mb-6">You don't have permission to access the staff dashboard.</p>
            <Button asChild><Link href="/">Go Home</Link></Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const childList = (allChildren || []).map(c => ({ id: c.id, firstName: c.firstName, lastName: c.lastName }));
  const isAdmin = user?.role === "admin";

  return (
    <div className="min-h-screen bg-[oklch(0.97_0.01_200)]">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <Link href="/">
              <img src={NURSERY_INFO.logo} alt={NURSERY_INFO.name} className="h-8 w-auto" />
            </Link>
            <span className="text-sm font-medium text-muted-foreground">{isAdmin ? "Admin" : "Staff"} Dashboard</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm">{user?.name || "Staff"}</span>
            <Badge>{isAdmin ? "Admin" : "Staff"}</Badge>
            <Button variant="ghost" size="sm" onClick={() => { logout(); setLocation("/"); }}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container py-6">
        <div className="flex items-center gap-2 mb-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/"><ArrowLeft className="h-4 w-4 mr-1" /> Back to Website</Link>
          </Button>
        </div>

        <div className="flex items-center justify-between mb-6">
          <h1 className="heading-3">{isAdmin ? "Admin" : "Staff"} Dashboard</h1>
          <div className="flex gap-2">
            <Dialog open={showLogActivity} onOpenChange={setShowLogActivity}>
              <DialogTrigger asChild>
                <Button size="sm"><Plus className="h-4 w-4 mr-1" /> Log Activity</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>Log Child Activity</DialogTitle></DialogHeader>
                {childList.length > 0 ? (
                  <LogActivityForm children={childList} onSuccess={() => { setShowLogActivity(false); utils.activities.getRecent.invalidate(); }} />
                ) : (
                  <p className="text-muted-foreground text-center py-4">No children registered yet.</p>
                )}
              </DialogContent>
            </Dialog>
            {isAdmin && (
              <>
                <Dialog open={showBroadcast} onOpenChange={setShowBroadcast}>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline"><Bell className="h-4 w-4 mr-1" /> Notify Parents</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader><DialogTitle>Broadcast Notification</DialogTitle></DialogHeader>
                    <BroadcastNotificationForm onSuccess={() => setShowBroadcast(false)} />
                  </DialogContent>
                </Dialog>
                <Dialog open={showCreateNews} onOpenChange={setShowCreateNews}>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline"><Newspaper className="h-4 w-4 mr-1" /> Post News</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-lg">
                    <DialogHeader><DialogTitle>Create News/Event</DialogTitle></DialogHeader>
                    <CreateNewsForm onSuccess={() => { setShowCreateNews(false); utils.news.list.invalidate(); }} />
                  </DialogContent>
                </Dialog>
              </>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Active Children", value: stats?.children || 0, icon: Baby, color: "text-teal-600" },
            { label: "Waiting List", value: stats?.waitingList || 0, icon: Clock, color: "text-amber-600" },
            { label: "Staff Members", value: stats?.staff || 0, icon: Users, color: "text-blue-600" },
            { label: "Pending Visits", value: stats?.pendingVisits || 0, icon: Mail, color: "text-purple-600" },
          ].map((stat) => (
            <Card key={stat.label} className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="activities" className="space-y-6">
          <TabsList className="flex-wrap">
            <TabsTrigger value="activities">Activity Log</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="visits">Visits</TabsTrigger>
            <TabsTrigger value="waiting">Waiting List</TabsTrigger>
            <TabsTrigger value="children">Children</TabsTrigger>
            <TabsTrigger value="sessions">Sessions</TabsTrigger>
            <TabsTrigger value="absences">Absences</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            {isAdmin && <TabsTrigger value="staff">Staff</TabsTrigger>}
            {isAdmin && <TabsTrigger value="news">News</TabsTrigger>}
            <TabsTrigger value="incidents">Incidents</TabsTrigger>
            <TabsTrigger value="medication">Medication</TabsTrigger>
            <TabsTrigger value="visitors">Visitors</TabsTrigger>
            {isAdmin && <TabsTrigger value="training">Training</TabsTrigger>}
            {isAdmin && <TabsTrigger value="newsletter">Newsletter</TabsTrigger>}
            {isAdmin && <TabsTrigger value="documents">Documents</TabsTrigger>}
            <TabsTrigger value="firedrills">Fire Drills</TabsTrigger>
            <TabsTrigger value="milestones">Milestones</TabsTrigger>
            {isAdmin && <TabsTrigger value="shifts">Shifts</TabsTrigger>}
            {isAdmin && <TabsTrigger value="surveys">Surveys</TabsTrigger>}
            {isAdmin && <TabsTrigger value="enquiries">Enquiries</TabsTrigger>}
            <TabsTrigger value="emergency">Emergency</TabsTrigger>
            {isAdmin && <TabsTrigger value="occupancy">Occupancy</TabsTrigger>}
            {isAdmin && <TabsTrigger value="settings">Settings</TabsTrigger>}
          </TabsList>

          {/* Activity Log */}
          <TabsContent value="activities">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Recent Activity Log</CardTitle>
                <Button size="sm" variant="outline" onClick={() => setShowLogActivity(true)}>
                  <Plus className="h-4 w-4 mr-1" /> Log Activity
                </Button>
              </CardHeader>
              <CardContent>
                {recentActivities && recentActivities.length > 0 ? (
                  <div className="space-y-2">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-center gap-3 p-2 rounded bg-muted/50 text-sm">
                        <Badge variant="outline" className="text-xs capitalize w-20 justify-center">{activity.type}</Badge>
                        <span className="flex-1">{activity.description || `${activity.type} logged`}</span>
                        <span className="text-xs text-muted-foreground">{new Date(activity.loggedAt).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-8">No activities logged yet.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Attendance */}
          <TabsContent value="attendance">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Today's Attendance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-2">Quick Check-In</h4>
                  <div className="flex flex-wrap gap-2">
                    {childList.map(child => (
                      <Button key={child.id} size="sm" variant="outline" onClick={() => checkInChild.mutate({ childId: child.id })}>
                        <CheckCircle2 className="h-3 w-3 mr-1" /> {child.firstName}
                      </Button>
                    ))}
                  </div>
                </div>
                {todayAttendance && todayAttendance.length > 0 ? (
                  <div className="space-y-2 mt-4">
                    {todayAttendance.map((record) => (
                      <div key={record.id} className="flex items-center justify-between p-2 rounded bg-muted/50 text-sm">
                        <div>
                          <span className="font-medium">Child #{record.childId}</span>
                          <span className="text-muted-foreground ml-2">
                            In: {record.checkInTime ? new Date(record.checkInTime).toLocaleTimeString() : "N/A"}
                          </span>
                          {record.checkOutTime && (
                            <span className="text-muted-foreground ml-2">
                              Out: {new Date(record.checkOutTime).toLocaleTimeString()}
                            </span>
                          )}
                        </div>
                        {!record.checkOutTime && (
                          <Button size="sm" variant="outline" onClick={() => checkOutChild.mutate({ attendanceId: record.id })}>
                            Check Out
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-4 mt-4">No attendance records for today.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Visit Bookings */}
          <TabsContent value="visits">
            <Card>
              <CardHeader><CardTitle className="text-lg">Visit Bookings</CardTitle></CardHeader>
              <CardContent>
                {visitBookingsList && visitBookingsList.length > 0 ? (
                  <div className="space-y-3">
                    {visitBookingsList.map((visit) => (
                      <div key={visit.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <div>
                          <p className="font-medium text-sm">{visit.parentName}</p>
                          <p className="text-xs text-muted-foreground">{visit.parentEmail} | Child age: {visit.childAge || "N/A"}</p>
                          <p className="text-xs text-muted-foreground">
                            Preferred: {visit.preferredDate ? new Date(visit.preferredDate).toLocaleDateString() : "Flexible"} {visit.preferredTime || ""}
                          </p>
                          {visit.message && <p className="text-xs mt-1 italic">"{visit.message}"</p>}
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="capitalize">{visit.status}</Badge>
                          {visit.status === "pending" && (
                            <>
                              <Button size="sm" variant="outline" onClick={() => updateVisitStatus.mutate({ id: visit.id, status: "confirmed" })}>
                                <CheckCircle2 className="h-3 w-3" />
                              </Button>
                              <Button size="sm" variant="ghost" onClick={() => updateVisitStatus.mutate({ id: visit.id, status: "cancelled" })}>
                                <XCircle className="h-3 w-3" />
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-8">No visit bookings yet.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Waiting List */}
          <TabsContent value="waiting">
            <Card>
              <CardHeader><CardTitle className="text-lg">Waiting List</CardTitle></CardHeader>
              <CardContent>
                {waitingListEntries && waitingListEntries.length > 0 ? (
                  <div className="space-y-3">
                    {waitingListEntries.map((entry) => (
                      <div key={entry.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <div>
                          <p className="font-medium text-sm">{entry.parentName} — Child: {entry.childName}</p>
                          <p className="text-xs text-muted-foreground">
                            DOB: {new Date(entry.childDob).toLocaleDateString()} | Sessions: {entry.preferredSessions || "Flexible"}
                          </p>
                          <p className="text-xs text-muted-foreground">{entry.parentEmail} {entry.parentPhone ? `| ${entry.parentPhone}` : ""}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="capitalize">{entry.status}</Badge>
                          {entry.status === "waiting" && (
                            <Button size="sm" variant="outline" onClick={() => updateWaitingStatus.mutate({ id: entry.id, status: "offered" })}>
                              Offer Place
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-8">No waiting list entries.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Children */}
          <TabsContent value="children">
            <ChildrenManagementTab />
          </TabsContent>

          {/* Sessions */}
          <TabsContent value="sessions">
            <Card>
              <CardHeader><CardTitle className="text-lg">Session Requests</CardTitle></CardHeader>
              <CardContent>
                {allSessions && allSessions.length > 0 ? (
                  <div className="space-y-3">
                    {allSessions.map((session) => (
                      <div key={session.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <div>
                          <p className="font-medium text-sm">
                            {new Date(session.sessionDate).toLocaleDateString()} — {session.sessionType.replace("_", " ")}
                          </p>
                          {session.notes && <p className="text-xs text-muted-foreground">{session.notes}</p>}
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="capitalize">{session.status}</Badge>
                          {session.status === "pending" && (
                            <>
                              <Button size="sm" variant="outline" onClick={() => updateSessionStatus.mutate({ id: session.id, status: "confirmed" })}>
                                <CheckCircle2 className="h-3 w-3" />
                              </Button>
                              <Button size="sm" variant="ghost" onClick={() => updateSessionStatus.mutate({ id: session.id, status: "cancelled" })}>
                                <XCircle className="h-3 w-3" />
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-8">No session requests yet.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Absences */}
          <TabsContent value="absences">
            <Card>
              <CardHeader><CardTitle className="text-lg">Reported Absences</CardTitle></CardHeader>
              <CardContent>
                {allAbsences && allAbsences.length > 0 ? (
                  <div className="space-y-3">
                    {allAbsences.map((absence) => (
                      <div key={absence.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <div>
                          <p className="font-medium text-sm">
                            Child #{absence.childId} — {new Date(absence.absenceDate).toLocaleDateString()}
                          </p>
                          <p className="text-xs text-muted-foreground capitalize">Reason: {absence.reason}</p>
                          {absence.details && <p className="text-xs text-muted-foreground">{absence.details}</p>}
                        </div>
                        <div className="flex items-center gap-2">
                          {absence.acknowledged ? (
                            <Badge>Acknowledged</Badge>
                          ) : (
                            <Button size="sm" variant="outline" onClick={() => acknowledgeAbsence.mutate({ id: absence.id })}>
                              Acknowledge
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-8">No absences reported.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Messages */}
          <TabsContent value="messages">
            <Card>
              <CardHeader><CardTitle className="text-lg">Contact Messages</CardTitle></CardHeader>
              <CardContent>
                {contactMsgs && contactMsgs.length > 0 ? (
                  <div className="space-y-3">
                    {contactMsgs.map((msg) => (
                      <div key={msg.id} className={`p-3 rounded-lg ${msg.isRead ? "bg-muted/30" : "bg-primary/5 border border-primary/20"}`}>
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-sm">{msg.name} — {msg.subject || "No subject"}</p>
                          <span className="text-xs text-muted-foreground">{new Date(msg.createdAt).toLocaleDateString()}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{msg.email} {msg.phone ? `| ${msg.phone}` : ""}</p>
                        <p className="text-sm mt-2">{msg.message}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-8">No messages yet.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Staff Management (Admin only) */}
          {isAdmin && (
            <TabsContent value="staff">
              <StaffManagementTab />
            </TabsContent>
          )}

          {/* News Management (Admin only) */}
          {isAdmin && (
            <TabsContent value="news">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">News & Events</CardTitle>
                  <Button size="sm" variant="outline" onClick={() => setShowCreateNews(true)}>
                    <Plus className="h-4 w-4 mr-1" /> Create
                  </Button>
                </CardHeader>
                <CardContent>
                  {newsList && newsList.length > 0 ? (
                    <div className="space-y-3">
                      {newsList.map((item) => (
                        <div key={item.id} className="p-3 rounded-lg bg-muted/50">
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-sm">{item.title}</p>
                            <Badge variant="outline" className="capitalize">{item.type}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{item.content}</p>
                          <p className="text-xs text-muted-foreground mt-2">{new Date(item.createdAt).toLocaleDateString()}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Newspaper className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
                      <p className="text-muted-foreground">No news or events published yet.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {/* Incidents Tab */}
          <TabsContent value="incidents">
            <IncidentsTab />
          </TabsContent>

          {/* Medication Tab */}
          <TabsContent value="medication">
            <MedicationTab />
          </TabsContent>

          {/* Visitors Tab */}
          <TabsContent value="visitors">
            <VisitorsTab />
          </TabsContent>

          {/* Training Tab (Admin) */}
          {isAdmin && (
            <TabsContent value="training">
              <TrainingTab />
            </TabsContent>
          )}

          {/* Newsletter Tab (Admin) */}
          {isAdmin && (
            <TabsContent value="newsletter">
              <NewsletterTab />
            </TabsContent>
          )}

          {/* Documents Tab (Admin) */}
          {isAdmin && (
            <TabsContent value="documents">
              <DocumentsTab />
            </TabsContent>
          )}

          {/* Fire Drills Tab */}
          <TabsContent value="firedrills">
            <FireDrillsTab />
          </TabsContent>

          {/* Milestones Tab */}
          <TabsContent value="milestones">
            <MilestonesStaffTab />
          </TabsContent>
          {isAdmin && <TabsContent value="shifts"><ShiftsTab /></TabsContent>}
          {isAdmin && <TabsContent value="surveys"><SurveysTab /></TabsContent>}
          {isAdmin && <TabsContent value="enquiries"><EnquiriesTab /></TabsContent>}
          <TabsContent value="emergency"><EmergencyContactsTab /></TabsContent>
          {isAdmin && <TabsContent value="occupancy"><OccupancyTab /></TabsContent>}
          {isAdmin && <TabsContent value="settings"><SettingsTab /></TabsContent>}
        </Tabs>
      </div>
    </div>
  );
}

// ==================== INCIDENTS TAB ====================
function IncidentsTab() {
  const { data: incidentsList } = trpc.incidents.list.useQuery();
  const { data: childList } = trpc.children.listAll.useQuery();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ childId: "", type: "" as "" | "accident" | "incident" | "near_miss" | "concern", date: new Date().toISOString().split("T")[0], time: "", location: "", description: "", actionTaken: "", injuries: "", witnessName: "" });
  const utils = trpc.useUtils();
  const report = trpc.incidents.report.useMutation({
    onSuccess: () => { toast.success("Incident reported"); setShowForm(false); utils.incidents.list.invalidate(); },
    onError: (e) => toast.error(e.message),
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2"><Shield className="h-5 w-5" /> Incident & Accident Log</CardTitle>
        <Button size="sm" onClick={() => setShowForm(!showForm)}><Plus className="h-4 w-4 mr-1" /> Report</Button>
      </CardHeader>
      <CardContent>
        {showForm && (
          <form onSubmit={(e) => { e.preventDefault(); report.mutate({ childId: Number(form.childId), type: form.type as "accident" | "incident" | "near_miss" | "concern", date: form.date, time: form.time || undefined, location: form.location || undefined, description: form.description, actionTaken: form.actionTaken || undefined, injuries: form.injuries || undefined, witnessName: form.witnessName || undefined }); }} className="space-y-3 mb-6 p-4 border rounded-lg bg-muted/30">
            <div className="grid sm:grid-cols-3 gap-3">
              <div><Label>Child *</Label><Select value={form.childId} onValueChange={(v) => setForm(p => ({ ...p, childId: v }))}><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger><SelectContent>{(childList || []).map(c => <SelectItem key={c.id} value={String(c.id)}>{c.firstName} {c.lastName}</SelectItem>)}</SelectContent></Select></div>
              <div><Label>Type *</Label><Select value={form.type} onValueChange={(v) => setForm(p => ({ ...p, type: v as any }))}><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger><SelectContent><SelectItem value="accident">Accident</SelectItem><SelectItem value="incident">Incident</SelectItem><SelectItem value="near_miss">Near Miss</SelectItem><SelectItem value="concern">Concern</SelectItem></SelectContent></Select></div>
              <div><Label>Date *</Label><Input type="date" value={form.date} onChange={(e) => setForm(p => ({ ...p, date: e.target.value }))} /></div>
            </div>
            <div className="grid sm:grid-cols-3 gap-3">
              <div><Label>Time</Label><Input type="time" value={form.time} onChange={(e) => setForm(p => ({ ...p, time: e.target.value }))} /></div>
              <div><Label>Location</Label><Input value={form.location} onChange={(e) => setForm(p => ({ ...p, location: e.target.value }))} placeholder="e.g. Outdoor area" /></div>
              <div><Label>Witness</Label><Input value={form.witnessName} onChange={(e) => setForm(p => ({ ...p, witnessName: e.target.value }))} /></div>
            </div>
            <div><Label>Description *</Label><Textarea value={form.description} onChange={(e) => setForm(p => ({ ...p, description: e.target.value }))} rows={3} required /></div>
            <div className="grid sm:grid-cols-2 gap-3">
              <div><Label>Injuries</Label><Input value={form.injuries} onChange={(e) => setForm(p => ({ ...p, injuries: e.target.value }))} /></div>
              <div><Label>Action Taken</Label><Input value={form.actionTaken} onChange={(e) => setForm(p => ({ ...p, actionTaken: e.target.value }))} /></div>
            </div>
            <Button type="submit" disabled={report.isPending}>{report.isPending ? "Submitting..." : "Submit Report"}</Button>
          </form>
        )}
        {incidentsList && incidentsList.length > 0 ? (
          <div className="space-y-3">
            {incidentsList.map((item) => (
              <div key={item.id} className="p-3 border rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant={item.type === "accident" ? "destructive" : item.type === "concern" ? "secondary" : "outline"} className="capitalize">{item.type.replace("_", " ")}</Badge>
                  <span className="text-xs text-muted-foreground">{new Date(item.date).toLocaleDateString()}{item.time ? ` at ${item.time}` : ""}</span>
                </div>
                <p className="text-sm">{item.description}</p>
                {item.actionTaken && <p className="text-xs text-muted-foreground mt-1">Action: {item.actionTaken}</p>}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8"><Shield className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" /><p className="text-muted-foreground">No incidents reported.</p></div>
        )}
      </CardContent>
    </Card>
  );
}

// ==================== MEDICATION TAB ====================
function MedicationTab() {
  const { data: meds } = trpc.medication.list.useQuery();
  const { data: childList } = trpc.children.listAll.useQuery();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ childId: "", medicationName: "", dosage: "", frequency: "", reason: "", startDate: new Date().toISOString().split("T")[0], parentConsentGiven: false });
  const utils = trpc.useUtils();
  const addMed = trpc.medication.add.useMutation({
    onSuccess: () => { toast.success("Medication logged"); setShowForm(false); utils.medication.list.invalidate(); },
    onError: (e) => toast.error(e.message),
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2"><Pill className="h-5 w-5" /> Medication Administration</CardTitle>
        <Button size="sm" onClick={() => setShowForm(!showForm)}><Plus className="h-4 w-4 mr-1" /> Log Medication</Button>
      </CardHeader>
      <CardContent>
        {showForm && (
          <form onSubmit={(e) => { e.preventDefault(); addMed.mutate({ childId: Number(form.childId), medicationName: form.medicationName, dosage: form.dosage, frequency: form.frequency || undefined, reason: form.reason || undefined, startDate: form.startDate, parentConsentGiven: form.parentConsentGiven }); }} className="space-y-3 mb-6 p-4 border rounded-lg bg-muted/30">
            <div className="grid sm:grid-cols-2 gap-3">
              <div><Label>Child *</Label><Select value={form.childId} onValueChange={(v) => setForm(p => ({ ...p, childId: v }))}><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger><SelectContent>{(childList || []).map(c => <SelectItem key={c.id} value={String(c.id)}>{c.firstName} {c.lastName}</SelectItem>)}</SelectContent></Select></div>
              <div><Label>Medication Name *</Label><Input value={form.medicationName} onChange={(e) => setForm(p => ({ ...p, medicationName: e.target.value }))} required /></div>
            </div>
            <div className="grid sm:grid-cols-3 gap-3">
              <div><Label>Dosage *</Label><Input value={form.dosage} onChange={(e) => setForm(p => ({ ...p, dosage: e.target.value }))} required placeholder="e.g. 5ml" /></div>
              <div><Label>Frequency</Label><Input value={form.frequency} onChange={(e) => setForm(p => ({ ...p, frequency: e.target.value }))} placeholder="e.g. Every 4 hours" /></div>
              <div><Label>Start Date</Label><Input type="date" value={form.startDate} onChange={(e) => setForm(p => ({ ...p, startDate: e.target.value }))} /></div>
            </div>
            <div><Label>Reason</Label><Input value={form.reason} onChange={(e) => setForm(p => ({ ...p, reason: e.target.value }))} /></div>
            <div className="flex items-center gap-2"><input type="checkbox" checked={form.parentConsentGiven} onChange={(e) => setForm(p => ({ ...p, parentConsentGiven: e.target.checked }))} /><Label>Parent consent given</Label></div>
            <Button type="submit" disabled={addMed.isPending}>{addMed.isPending ? "Saving..." : "Log Medication"}</Button>
          </form>
        )}
        {meds && meds.length > 0 ? (
          <div className="space-y-3">
            {meds.map((m) => (
              <div key={m.id} className="p-3 border rounded-lg">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-sm">{m.medicationName} - {m.dosage}</p>
                  <Badge variant={m.parentConsentGiven ? "default" : "destructive"}>{m.parentConsentGiven ? "Consent Given" : "No Consent"}</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{m.frequency}{m.reason ? ` | Reason: ${m.reason}` : ""}</p>
                <p className="text-xs text-muted-foreground">Started: {new Date(m.startDate).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8"><Pill className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" /><p className="text-muted-foreground">No medication records.</p></div>
        )}
      </CardContent>
    </Card>
  );
}

// ==================== VISITORS TAB ====================
function VisitorsTab() {
  const { data: visitors } = trpc.visitors.today.useQuery();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ visitorName: "", organisation: "", purpose: "", personVisiting: "", dbsChecked: false, badgeIssued: false });
  const utils = trpc.useUtils();
  const signIn = trpc.visitors.signIn.useMutation({
    onSuccess: () => { toast.success("Visitor signed in"); setShowForm(false); utils.visitors.today.invalidate(); },
    onError: (e) => toast.error(e.message),
  });
  const signOut = trpc.visitors.signOut.useMutation({
    onSuccess: () => { toast.success("Visitor signed out"); utils.visitors.today.invalidate(); },
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2"><DoorOpen className="h-5 w-5" /> Visitor Sign-In Book</CardTitle>
        <Button size="sm" onClick={() => setShowForm(!showForm)}><Plus className="h-4 w-4 mr-1" /> Sign In Visitor</Button>
      </CardHeader>
      <CardContent>
        {showForm && (
          <form onSubmit={(e) => { e.preventDefault(); signIn.mutate(form); }} className="space-y-3 mb-6 p-4 border rounded-lg bg-muted/30">
            <div className="grid sm:grid-cols-2 gap-3">
              <div><Label>Visitor Name *</Label><Input value={form.visitorName} onChange={(e) => setForm(p => ({ ...p, visitorName: e.target.value }))} required /></div>
              <div><Label>Organisation</Label><Input value={form.organisation} onChange={(e) => setForm(p => ({ ...p, organisation: e.target.value }))} /></div>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <div><Label>Purpose of Visit *</Label><Input value={form.purpose} onChange={(e) => setForm(p => ({ ...p, purpose: e.target.value }))} required /></div>
              <div><Label>Person Visiting</Label><Input value={form.personVisiting} onChange={(e) => setForm(p => ({ ...p, personVisiting: e.target.value }))} /></div>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2"><input type="checkbox" checked={form.dbsChecked} onChange={(e) => setForm(p => ({ ...p, dbsChecked: e.target.checked }))} /><Label>DBS Checked</Label></div>
              <div className="flex items-center gap-2"><input type="checkbox" checked={form.badgeIssued} onChange={(e) => setForm(p => ({ ...p, badgeIssued: e.target.checked }))} /><Label>Badge Issued</Label></div>
            </div>
            <Button type="submit" disabled={signIn.isPending}>{signIn.isPending ? "Signing in..." : "Sign In"}</Button>
          </form>
        )}
        {visitors && visitors.length > 0 ? (
          <div className="space-y-3">
            {visitors.map((v) => (
              <div key={v.id} className="p-3 border rounded-lg flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{v.visitorName}{v.organisation ? ` (${v.organisation})` : ""}</p>
                  <p className="text-xs text-muted-foreground">{v.purpose}</p>
                  <p className="text-xs text-muted-foreground">In: {new Date(v.signInTime).toLocaleTimeString()}{v.signOutTime ? ` | Out: ${new Date(v.signOutTime).toLocaleTimeString()}` : ""}</p>
                </div>
                {!v.signOutTime && <Button size="sm" variant="outline" onClick={() => signOut.mutate({ id: v.id })}>Sign Out</Button>}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8"><DoorOpen className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" /><p className="text-muted-foreground">No visitors today.</p></div>
        )}
      </CardContent>
    </Card>
  );
}

// ==================== TRAINING TAB ====================
function TrainingTab() {
  const { data: trainingList } = trpc.training.list.useQuery();
  const { data: expiring } = trpc.training.getExpiring.useQuery();
  const { data: staffList } = trpc.staff.list.useQuery();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ staffId: "", trainingType: "" as any, title: "", provider: "", completedDate: "", expiryDate: "" });
  const utils = trpc.useUtils();
  const addTraining = trpc.training.add.useMutation({
    onSuccess: () => { toast.success("Training record added"); setShowForm(false); utils.training.list.invalidate(); utils.training.getExpiring.invalidate(); },
    onError: (e) => toast.error(e.message),
  });

  const trainingTypes = [
    { value: "dbs_check", label: "DBS Check" },
    { value: "first_aid", label: "First Aid" },
    { value: "paediatric_first_aid", label: "Paediatric First Aid" },
    { value: "safeguarding", label: "Safeguarding" },
    { value: "food_hygiene", label: "Food Hygiene" },
    { value: "fire_safety", label: "Fire Safety" },
    { value: "manual_handling", label: "Manual Handling" },
    { value: "prevent_duty", label: "Prevent Duty" },
    { value: "health_safety", label: "Health & Safety" },
    { value: "gdpr", label: "GDPR" },
    { value: "sen_awareness", label: "SEN Awareness" },
    { value: "behaviour_management", label: "Behaviour Management" },
    { value: "other", label: "Other" },
  ];

  // Count up-to-date vs expired
  const validCount = trainingList?.filter(t => t.status === "valid").length || 0;
  const expiringCount = trainingList?.filter(t => t.status === "expiring_soon").length || 0;
  const expiredCount = trainingList?.filter(t => t.status === "expired").length || 0;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2"><GraduationCap className="h-5 w-5" /> Staff Training & Compliance</CardTitle>
        <Button size="sm" onClick={() => setShowForm(!showForm)}><Plus className="h-4 w-4 mr-1" /> Add Record</Button>
      </CardHeader>
      <CardContent>
        {/* Summary */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="p-3 rounded-lg bg-green-50 border border-green-200 text-center">
            <p className="text-2xl font-bold text-green-700">{validCount}</p>
            <p className="text-xs text-green-600 font-medium">Up to Date</p>
          </div>
          <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-center">
            <p className="text-2xl font-bold text-amber-700">{expiringCount}</p>
            <p className="text-xs text-amber-600 font-medium">Expiring Soon</p>
          </div>
          <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-center">
            <p className="text-2xl font-bold text-red-700">{expiredCount}</p>
            <p className="text-xs text-red-600 font-medium">Expired</p>
          </div>
        </div>

        {expiring && expiring.length > 0 && (
          <div className="mb-6 p-4 border border-orange-200 bg-orange-50 rounded-lg">
            <h4 className="font-semibold text-sm text-orange-800 mb-2 flex items-center gap-2"><Bell className="h-4 w-4" /> Expiring Soon ({expiring.length})</h4>
            <div className="space-y-2">
              {expiring.slice(0, 5).map((t) => (
                <div key={t.id} className="flex items-center justify-between text-sm">
                  <span>{t.title}</span>
                  <Badge variant="destructive">{t.expiryDate ? new Date(t.expiryDate).toLocaleDateString() : ""}</Badge>
                </div>
              ))}
            </div>
          </div>
        )}
        {showForm && (
          <form onSubmit={(e) => { e.preventDefault(); addTraining.mutate({ staffId: Number(form.staffId), trainingType: form.trainingType, title: form.title, provider: form.provider || undefined, completedDate: form.completedDate, expiryDate: form.expiryDate || undefined }); }} className="space-y-3 mb-6 p-4 border rounded-lg bg-muted/30">
            <div className="grid sm:grid-cols-2 gap-3">
              <div><Label>Staff Member *</Label><Select value={form.staffId} onValueChange={(v) => setForm(p => ({ ...p, staffId: v }))}><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger><SelectContent>{(staffList || []).map((s: any) => <SelectItem key={s.id} value={String(s.id)}>{s.title || `Staff #${s.id}`}</SelectItem>)}</SelectContent></Select></div>
              <div><Label>Training Type *</Label><Select value={form.trainingType} onValueChange={(v) => setForm(p => ({ ...p, trainingType: v }))}><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger><SelectContent>{trainingTypes.map(t => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}</SelectContent></Select></div>
            </div>
            <div><Label>Title/Course Name *</Label><Input value={form.title} onChange={(e) => setForm(p => ({ ...p, title: e.target.value }))} required /></div>
            <div className="grid sm:grid-cols-3 gap-3">
              <div><Label>Provider</Label><Input value={form.provider} onChange={(e) => setForm(p => ({ ...p, provider: e.target.value }))} /></div>
              <div><Label>Completed Date *</Label><Input type="date" value={form.completedDate} onChange={(e) => setForm(p => ({ ...p, completedDate: e.target.value }))} required /></div>
              <div><Label>Expiry Date</Label><Input type="date" value={form.expiryDate} onChange={(e) => setForm(p => ({ ...p, expiryDate: e.target.value }))} /></div>
            </div>
            <Button type="submit" disabled={addTraining.isPending}>{addTraining.isPending ? "Saving..." : "Add Training Record"}</Button>
          </form>
        )}
        {trainingList && trainingList.length > 0 ? (
          <div className="space-y-3">
            {trainingList.map((t) => (
              <div key={t.id} className="p-3 border rounded-lg">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-sm">{t.title}</p>
                  <Badge variant={t.status === "valid" ? "default" : t.status === "expiring_soon" ? "secondary" : "destructive"} className="capitalize">{t.status === "valid" ? "Up to Date" : t.status === "expiring_soon" ? "Expiring Soon" : "Expired"}</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Type: {t.trainingType.replace(/_/g, " ")}{t.provider ? ` | Provider: ${t.provider}` : ""}</p>
                <p className="text-xs text-muted-foreground">Completed: {new Date(t.completedDate).toLocaleDateString()}{t.expiryDate ? ` | Expires: ${new Date(t.expiryDate).toLocaleDateString()}` : ""}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8"><GraduationCap className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" /><p className="text-muted-foreground">No training records yet.</p></div>
        )}
      </CardContent>
    </Card>
  );
}

// ==================== DOCUMENTS TAB ====================
function DocumentsTab() {
  const { data: docs } = trpc.documents.list.useQuery();
  const { data: allUsers } = trpc.admin.listUsers.useQuery();
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", documentType: "" as any });
  const [sendDocId, setSendDocId] = useState<number | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [recipientFilter, setRecipientFilter] = useState<"all" | "parent" | "staff">("all");
  const utils = trpc.useUtils();
  const createDoc = trpc.documents.create.useMutation({
    onSuccess: () => { toast.success("Document created"); setShowCreate(false); setForm({ title: "", description: "", documentType: "" }); utils.documents.list.invalidate(); },
    onError: (e) => toast.error(e.message),
  });
  const sendForSigning = trpc.documents.sendForSigning.useMutation({
    onSuccess: (data) => { toast.success(`Sent to ${data.count} users for signing`); setSendDocId(null); setSelectedUsers([]); },
    onError: (e) => toast.error(e.message),
  });

  const docTypes = [
    { value: "consent_form", label: "Consent Form" },
    { value: "contract", label: "Contract" },
    { value: "policy", label: "Policy" },
    { value: "medical_form", label: "Medical Form" },
    { value: "photo_permission", label: "Photo Permission" },
    { value: "trip_permission", label: "Trip Permission" },
    { value: "employment", label: "Employment Document" },
    { value: "other", label: "Other" },
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2"><FileSignature className="h-5 w-5" /> Document Management</CardTitle>
        <Button size="sm" onClick={() => setShowCreate(!showCreate)}><Plus className="h-4 w-4 mr-1" /> Create Document</Button>
      </CardHeader>
      <CardContent>
        {showCreate && (
          <form onSubmit={(e) => { e.preventDefault(); createDoc.mutate(form); }} className="space-y-3 mb-6 p-4 border rounded-lg bg-muted/30">
            <div><Label>Title *</Label><Input value={form.title} onChange={(e) => setForm(p => ({ ...p, title: e.target.value }))} required placeholder="e.g. Photo Consent Form 2025" /></div>
            <div><Label>Description</Label><Textarea value={form.description} onChange={(e) => setForm(p => ({ ...p, description: e.target.value }))} placeholder="Brief description of the document..." /></div>
            <div><Label>Document Type *</Label><Select value={form.documentType} onValueChange={(v) => setForm(p => ({ ...p, documentType: v }))}><SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger><SelectContent>{docTypes.map(t => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}</SelectContent></Select></div>
            <Button type="submit" disabled={createDoc.isPending}>{createDoc.isPending ? "Creating..." : "Create Document"}</Button>
          </form>
        )}

        {sendDocId && (
          <div className="mb-6 p-4 border border-blue-200 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Send for Signing</h4>
            <p className="text-xs text-muted-foreground mb-3">Select recipients to send this document to:</p>
            <div className="flex gap-2 mb-3">
              <Button size="sm" variant={recipientFilter === "all" ? "default" : "outline"} onClick={() => setRecipientFilter("all")}>All</Button>
              <Button size="sm" variant={recipientFilter === "parent" ? "default" : "outline"} onClick={() => setRecipientFilter("parent")}>Parents</Button>
              <Button size="sm" variant={recipientFilter === "staff" ? "default" : "outline"} onClick={() => setRecipientFilter("staff")}>Staff</Button>
            </div>
            <div className="space-y-2 max-h-40 overflow-y-auto mb-3">
              {(allUsers || []).filter(u => recipientFilter === "all" || u.role === recipientFilter || (recipientFilter === "parent" && u.role === "user")).map(u => (
                <label key={u.id} className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={selectedUsers.includes(u.id)} onChange={(e) => {
                    if (e.target.checked) setSelectedUsers(p => [...p, u.id]);
                    else setSelectedUsers(p => p.filter(id => id !== u.id));
                  }} />
                  <span>{u.name || u.email || `User #${u.id}`}</span>
                  <span className="text-xs text-muted-foreground ml-auto capitalize">({u.role})</span>
                </label>
              ))}
            </div>
            <div className="flex gap-2">
              <Button size="sm" onClick={() => sendForSigning.mutate({ documentId: sendDocId, userIds: selectedUsers })} disabled={selectedUsers.length === 0 || sendForSigning.isPending}>
                <Send className="h-4 w-4 mr-1" /> Send to {selectedUsers.length} users
              </Button>
              <Button size="sm" variant="outline" onClick={() => setSendDocId(null)}>Cancel</Button>
            </div>
          </div>
        )}

        {docs && docs.length > 0 ? (
          <div className="space-y-3">
            {docs.map((doc) => (
              <div key={doc.id} className="p-3 border rounded-lg flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{doc.title}</p>
                  <p className="text-xs text-muted-foreground">{doc.documentType.replace(/_/g, " ")} | Created: {new Date(doc.createdAt).toLocaleDateString()}</p>
                  {doc.description && <p className="text-xs text-muted-foreground mt-1">{doc.description}</p>}
                </div>
                <Button size="sm" variant="outline" onClick={() => setSendDocId(doc.id)}><Send className="h-4 w-4 mr-1" /> Send</Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8"><FileSignature className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" /><p className="text-muted-foreground">No documents created yet.</p></div>
        )}
      </CardContent>
    </Card>
  );
}

// ==================== FIRE DRILLS TAB ====================
function FireDrillsTab() {
  const { data: drills } = trpc.fireDrills.list.useQuery();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ date: new Date().toISOString().split("T")[0], time: "", evacuationTime: "", childrenPresent: "", staffPresent: "", visitorsPresent: "", issues: "", actionRequired: "" });
  const utils = trpc.useUtils();
  const logDrill = trpc.fireDrills.log.useMutation({
    onSuccess: () => { toast.success("Fire drill logged"); setShowForm(false); utils.fireDrills.list.invalidate(); },
    onError: (e) => toast.error(e.message),
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2"><Flame className="h-5 w-5" /> Fire Drill Log</CardTitle>
        <Button size="sm" onClick={() => setShowForm(!showForm)}><Plus className="h-4 w-4 mr-1" /> Log Drill</Button>
      </CardHeader>
      <CardContent>
        {showForm && (
          <form onSubmit={(e) => { e.preventDefault(); logDrill.mutate({ date: form.date, time: form.time || undefined, evacuationTime: form.evacuationTime || undefined, childrenPresent: form.childrenPresent ? Number(form.childrenPresent) : undefined, staffPresent: form.staffPresent ? Number(form.staffPresent) : undefined, visitorsPresent: form.visitorsPresent ? Number(form.visitorsPresent) : undefined, issues: form.issues || undefined, actionRequired: form.actionRequired || undefined }); }} className="space-y-3 mb-6 p-4 border rounded-lg bg-muted/30">
            <div className="grid sm:grid-cols-3 gap-3">
              <div><Label>Date *</Label><Input type="date" value={form.date} onChange={(e) => setForm(p => ({ ...p, date: e.target.value }))} required /></div>
              <div><Label>Time</Label><Input type="time" value={form.time} onChange={(e) => setForm(p => ({ ...p, time: e.target.value }))} /></div>
              <div><Label>Evacuation Time</Label><Input value={form.evacuationTime} onChange={(e) => setForm(p => ({ ...p, evacuationTime: e.target.value }))} placeholder="e.g. 2 min 30 sec" /></div>
            </div>
            <div className="grid sm:grid-cols-3 gap-3">
              <div><Label>Children Present</Label><Input type="number" value={form.childrenPresent} onChange={(e) => setForm(p => ({ ...p, childrenPresent: e.target.value }))} /></div>
              <div><Label>Staff Present</Label><Input type="number" value={form.staffPresent} onChange={(e) => setForm(p => ({ ...p, staffPresent: e.target.value }))} /></div>
              <div><Label>Visitors Present</Label><Input type="number" value={form.visitorsPresent} onChange={(e) => setForm(p => ({ ...p, visitorsPresent: e.target.value }))} /></div>
            </div>
            <div><Label>Issues Noted</Label><Textarea value={form.issues} onChange={(e) => setForm(p => ({ ...p, issues: e.target.value }))} placeholder="Any issues during the drill..." /></div>
            <div><Label>Action Required</Label><Textarea value={form.actionRequired} onChange={(e) => setForm(p => ({ ...p, actionRequired: e.target.value }))} placeholder="Follow-up actions needed..." /></div>
            <Button type="submit" disabled={logDrill.isPending}>{logDrill.isPending ? "Logging..." : "Log Fire Drill"}</Button>
          </form>
        )}
        {drills && drills.length > 0 ? (
          <div className="space-y-3">
            {drills.map((drill) => (
              <div key={drill.id} className="p-3 border rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Flame className="h-4 w-4 text-orange-500" />
                  <span className="font-medium text-sm">{new Date(drill.date).toLocaleDateString()}{drill.time ? ` at ${drill.time}` : ""}</span>
                  {drill.evacuationTime && <Badge variant="outline">Evacuation: {drill.evacuationTime}</Badge>}
                </div>
                <p className="text-xs text-muted-foreground">Children: {drill.childrenPresent || "N/A"} | Staff: {drill.staffPresent || "N/A"} | Visitors: {drill.visitorsPresent || "N/A"}</p>
                {drill.issues && <p className="text-xs text-red-600 mt-1">Issues: {drill.issues}</p>}
                {drill.actionRequired && <p className="text-xs text-orange-600 mt-1">Action: {drill.actionRequired}</p>}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8"><Flame className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" /><p className="text-muted-foreground">No fire drills recorded yet.</p></div>
        )}
      </CardContent>
    </Card>
  );
}

// ==================== MILESTONES STAFF TAB ====================
function MilestonesStaffTab() {
  const { data: childList } = trpc.children.listAll.useQuery();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ childId: "", area: "" as any, milestone: "", observedDate: new Date().toISOString().split("T")[0], notes: "" });
  const [selectedChildId, setSelectedChildId] = useState<number | null>(null);
  const { data: milestones } = trpc.milestones.getByChild.useQuery({ childId: selectedChildId || 0 }, { enabled: !!selectedChildId });
  const utils = trpc.useUtils();
  const addMilestone = trpc.milestones.add.useMutation({
    onSuccess: () => { toast.success("Milestone recorded"); setShowForm(false); if (selectedChildId) utils.milestones.getByChild.invalidate({ childId: selectedChildId }); },
    onError: (e) => toast.error(e.message),
  });

  const areas = [
    { value: "communication_language", label: "Communication & Language" },
    { value: "physical_development", label: "Physical Development" },
    { value: "personal_social_emotional", label: "Personal, Social & Emotional" },
    { value: "literacy", label: "Literacy" },
    { value: "mathematics", label: "Mathematics" },
    { value: "understanding_world", label: "Understanding the World" },
    { value: "expressive_arts", label: "Expressive Arts & Design" },
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2"><BookOpen className="h-5 w-5" /> EYFS Milestones & Observations</CardTitle>
        <Button size="sm" onClick={() => setShowForm(!showForm)}><Plus className="h-4 w-4 mr-1" /> Record Milestone</Button>
      </CardHeader>
      <CardContent>
        {showForm && (
          <form onSubmit={(e) => { e.preventDefault(); addMilestone.mutate({ childId: Number(form.childId), area: form.area, milestone: form.milestone, observedDate: form.observedDate, notes: form.notes || undefined }); }} className="space-y-3 mb-6 p-4 border rounded-lg bg-muted/30">
            <div className="grid sm:grid-cols-2 gap-3">
              <div><Label>Child *</Label><Select value={form.childId} onValueChange={(v) => setForm(p => ({ ...p, childId: v }))}><SelectTrigger><SelectValue placeholder="Select child" /></SelectTrigger><SelectContent>{(childList || []).map(c => <SelectItem key={c.id} value={String(c.id)}>{c.firstName} {c.lastName}</SelectItem>)}</SelectContent></Select></div>
              <div><Label>EYFS Area *</Label><Select value={form.area} onValueChange={(v) => setForm(p => ({ ...p, area: v }))}><SelectTrigger><SelectValue placeholder="Select area" /></SelectTrigger><SelectContent>{areas.map(a => <SelectItem key={a.value} value={a.value}>{a.label}</SelectItem>)}</SelectContent></Select></div>
            </div>
            <div><Label>Milestone / Observation *</Label><Input value={form.milestone} onChange={(e) => setForm(p => ({ ...p, milestone: e.target.value }))} required placeholder="e.g. Can count to 10 independently" /></div>
            <div className="grid sm:grid-cols-2 gap-3">
              <div><Label>Date Observed *</Label><Input type="date" value={form.observedDate} onChange={(e) => setForm(p => ({ ...p, observedDate: e.target.value }))} required /></div>
              <div><Label>Notes</Label><Input value={form.notes} onChange={(e) => setForm(p => ({ ...p, notes: e.target.value }))} placeholder="Additional observations..." /></div>
            </div>
            <Button type="submit" disabled={addMilestone.isPending}>{addMilestone.isPending ? "Recording..." : "Record Milestone"}</Button>
          </form>
        )}

        <div className="mb-4">
          <Label>View Milestones for:</Label>
          <Select value={selectedChildId ? String(selectedChildId) : ""} onValueChange={(v) => setSelectedChildId(Number(v))}>
            <SelectTrigger><SelectValue placeholder="Select a child" /></SelectTrigger>
            <SelectContent>{(childList || []).map(c => <SelectItem key={c.id} value={String(c.id)}>{c.firstName} {c.lastName}</SelectItem>)}</SelectContent>
          </Select>
        </div>

        {selectedChildId && milestones && milestones.length > 0 ? (
          <div className="space-y-3">
            {milestones.map((m) => (
              <div key={m.id} className="p-3 border rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="capitalize">{m.area.replace(/_/g, " ")}</Badge>
                  <span className="text-xs text-muted-foreground">{new Date(m.observedDate).toLocaleDateString()}</span>
                </div>
                <p className="text-sm font-medium">{m.milestone}</p>
                {m.notes && <p className="text-xs text-muted-foreground mt-1">{m.notes}</p>}
              </div>
            ))}
          </div>
        ) : selectedChildId ? (
          <div className="text-center py-8"><BookOpen className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" /><p className="text-muted-foreground">No milestones recorded for this child yet.</p></div>
        ) : null}
      </CardContent>
    </Card>
  );
}

// ==================== NEWSLETTER TAB ====================
function NewsletterTab() {
  const { data: subscribers } = trpc.newsletter.list.useQuery();
  const [form, setForm] = useState({ subject: "", content: "" });
  const sendNewsletter = trpc.newsletter.send.useMutation({
    onSuccess: (data) => { toast.success(`Newsletter sent to ${data.recipientCount} subscribers!`); setForm({ subject: "", content: "" }); },
    onError: (e) => toast.error(e.message),
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Mail className="h-5 w-5" /> Newsletter Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 p-4 border rounded-lg bg-muted/30">
          <h4 className="font-semibold text-sm mb-1">Subscribers: {subscribers?.length || 0}</h4>
          <p className="text-xs text-muted-foreground">People who have subscribed via the website footer.</p>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); sendNewsletter.mutate(form); }} className="space-y-4">
          <div><Label>Subject *</Label><Input value={form.subject} onChange={(e) => setForm(p => ({ ...p, subject: e.target.value }))} required placeholder="e.g. Little Ava Nursery - June Newsletter" /></div>
          <div><Label>Content *</Label><Textarea value={form.content} onChange={(e) => setForm(p => ({ ...p, content: e.target.value }))} rows={8} required placeholder="Write your newsletter content here..." /></div>
          <p className="text-xs text-muted-foreground bg-blue-50 p-2 rounded">An unsubscribe link ({window.location.origin}/unsubscribe) will be automatically included at the bottom of every newsletter sent.</p>
          <Button type="submit" disabled={sendNewsletter.isPending}><Send className="h-4 w-4 mr-2" />{sendNewsletter.isPending ? "Sending..." : "Send Newsletter"}</Button>
        </form>
        {subscribers && subscribers.length > 0 && (
          <div className="mt-6">
            <h4 className="font-semibold text-sm mb-3">Subscriber List</h4>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {subscribers.map((s) => (
                <div key={s.id} className="flex items-center justify-between p-2 border rounded text-sm">
                  <span>{s.email}</span>
                  <span className="text-xs text-muted-foreground">{new Date(s.subscribedAt).toLocaleDateString()}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ==================== SHIFTS TAB ====================
function ShiftsTab() {
  const { data: shiftsList } = trpc.shifts.list.useQuery();
  const { data: staffList } = trpc.staff.list.useQuery();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ staffId: "", date: "", startTime: "07:30", endTime: "18:00", notes: "" });
  const utils = trpc.useUtils();
  const create = trpc.shifts.create.useMutation({
    onSuccess: () => { toast.success("Shift created"); setShowForm(false); setForm({ staffId: "", date: "", startTime: "07:30", endTime: "18:00", notes: "" }); utils.shifts.list.invalidate(); },
    onError: (e) => toast.error(e.message),
  });
  const deleteShift = trpc.shifts.delete.useMutation({
    onSuccess: () => { toast.success("Shift deleted"); utils.shifts.list.invalidate(); },
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2"><Clock className="h-5 w-5" /> Staff Shift Schedule</CardTitle>
        <Button size="sm" onClick={() => setShowForm(!showForm)}><Plus className="h-4 w-4 mr-1" /> Add Shift</Button>
      </CardHeader>
      <CardContent>
        {showForm && (
          <form onSubmit={(e) => { e.preventDefault(); create.mutate({ staffId: Number(form.staffId), date: form.date, startTime: form.startTime, endTime: form.endTime, notes: form.notes || undefined }); }} className="space-y-3 mb-6 p-4 border rounded-lg bg-muted/30">
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Staff Member *</Label><Select value={form.staffId} onValueChange={(v) => setForm(p => ({ ...p, staffId: v }))}><SelectTrigger><SelectValue placeholder="Select staff" /></SelectTrigger><SelectContent>{(staffList || []).map(s => <SelectItem key={s.id} value={String(s.id)}>{s.title}</SelectItem>)}</SelectContent></Select></div>
              <div><Label>Date *</Label><Input type="date" value={form.date} onChange={(e) => setForm(p => ({ ...p, date: e.target.value }))} required /></div>
              <div><Label>Start Time *</Label><Input type="time" value={form.startTime} onChange={(e) => setForm(p => ({ ...p, startTime: e.target.value }))} required /></div>
              <div><Label>End Time *</Label><Input type="time" value={form.endTime} onChange={(e) => setForm(p => ({ ...p, endTime: e.target.value }))} required /></div>
            </div>
            <div><Label>Notes</Label><Input value={form.notes} onChange={(e) => setForm(p => ({ ...p, notes: e.target.value }))} placeholder="Optional notes..." /></div>
            <Button type="submit" disabled={create.isPending}>{create.isPending ? "Creating..." : "Create Shift"}</Button>
          </form>
        )}
        {shiftsList && shiftsList.length > 0 ? (
          <div className="space-y-2">
            {shiftsList.map((shift) => (
              <div key={shift.id} className="p-3 border rounded-lg flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Staff #{shift.staffId} | {new Date(shift.date).toLocaleDateString()}</p>
                  <p className="text-xs text-muted-foreground">{shift.startTime} - {shift.endTime} {shift.notes && `| ${shift.notes}`}</p>
                </div>
                <Button size="sm" variant="ghost" className="text-red-500" onClick={() => deleteShift.mutate({ id: shift.id })}>Delete</Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8"><Clock className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" /><p className="text-muted-foreground">No shifts scheduled yet.</p></div>
        )}
      </CardContent>
    </Card>
  );
}

// ==================== SURVEYS TAB ====================
function SurveysTab() {
  const { data: surveysList } = trpc.surveys.list.useQuery();
  const avgRating = surveysList?.length ? (surveysList.reduce((sum, s) => sum + s.rating, 0) / surveysList.length).toFixed(1) : "N/A";

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Star className="h-5 w-5" /> Parent Satisfaction Surveys</CardTitle>
        <p className="text-sm text-muted-foreground">Average Rating: <span className="font-bold text-primary">{avgRating}/5</span> ({surveysList?.length || 0} responses)</p>
      </CardHeader>
      <CardContent>
        {surveysList && surveysList.length > 0 ? (
          <div className="space-y-3">
            {surveysList.map((survey) => (
              <div key={survey.id} className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium capitalize">{survey.category}</span>
                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map(i => <Star key={i} className={`h-3 w-3 ${i <= survey.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />)}
                  </div>
                </div>
                {survey.comments && <p className="text-xs text-muted-foreground">{survey.comments}</p>}
                <p className="text-xs text-muted-foreground mt-1">{new Date(survey.submittedAt).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8"><Star className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" /><p className="text-muted-foreground">No survey responses yet.</p></div>
        )}
      </CardContent>
    </Card>
  );
}

// ==================== ENQUIRIES TAB ====================
function EnquiriesTab() {
  const { data: enquiriesList } = trpc.enquiries.list.useQuery();
  const utils = trpc.useUtils();
  const updateStatus = trpc.enquiries.updateStatus.useMutation({
    onSuccess: () => { toast.success("Status updated"); utils.enquiries.list.invalidate(); },
    onError: (e) => toast.error(e.message),
  });

  const statusColors: Record<string, string> = {
    new: "bg-blue-100 text-blue-700",
    contacted: "bg-yellow-100 text-yellow-700",
    interested: "bg-green-100 text-green-700",
    registered: "bg-emerald-100 text-emerald-700",
    not_interested: "bg-red-100 text-red-700",
    closed: "bg-gray-100 text-gray-700",
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5" /> Enquiry Pipeline</CardTitle>
        <p className="text-sm text-muted-foreground">{enquiriesList?.filter(e => e.status === "new").length || 0} new enquiries</p>
      </CardHeader>
      <CardContent>
        {enquiriesList && enquiriesList.length > 0 ? (
          <div className="space-y-3">
            {enquiriesList.map((enq) => (
              <div key={enq.id} className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-medium text-sm">{enq.name}</p>
                    <p className="text-xs text-muted-foreground">{enq.email} {enq.phone && `| ${enq.phone}`}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full capitalize ${statusColors[enq.status] || "bg-gray-100"}`}>{enq.status.replace(/_/g, " ")}</span>
                </div>
                {enq.childAge && <p className="text-xs text-muted-foreground">Child age: {enq.childAge}</p>}
                {enq.message && <p className="text-xs text-muted-foreground mt-1">{enq.message}</p>}
                <div className="flex gap-1 mt-2 flex-wrap">
                  {["contacted", "interested", "registered", "not_interested", "closed"].map(s => (
                    <Button key={s} size="sm" variant="outline" className="text-xs h-6 px-2" onClick={() => updateStatus.mutate({ id: enq.id, status: s as any })} disabled={enq.status === s}>
                      {s.replace(/_/g, " ")}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8"><Users className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" /><p className="text-muted-foreground">No enquiries yet.</p></div>
        )}
      </CardContent>
    </Card>
  );
}

// ==================== EMERGENCY CONTACTS TAB ====================
function EmergencyContactsTab() {
  const { data: contacts } = trpc.emergencyContacts.listAll.useQuery();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Phone className="h-5 w-5" /> Emergency Contacts Quick Access</CardTitle>
        <p className="text-sm text-muted-foreground">Quick reference for all children's emergency contacts</p>
      </CardHeader>
      <CardContent>
        {contacts && contacts.length > 0 ? (
          <div className="space-y-3">
            {contacts.map((c) => (
              <div key={c.id} className="p-3 border rounded-lg flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{c.childFirstName} {c.childLastName}</p>
                  <p className="text-xs text-muted-foreground">{c.name} ({c.relationship}) - Priority {c.priority}</p>
                </div>
                <a href={`tel:${c.phone}`} className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
                  <Phone className="h-3 w-3" /> {c.phone}
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8"><Phone className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" /><p className="text-muted-foreground">No emergency contacts registered yet. Parents can add these when registering their children.</p></div>
        )}
      </CardContent>
    </Card>
  );
}

// ==================== OCCUPANCY TAB ====================
function OccupancyTab() {
  const { data: occupancyData, isLoading } = trpc.occupancy.getOccupancy.useQuery();

  if (isLoading) return <div className="text-center py-8 text-muted-foreground">Loading occupancy data...</div>;

  const totalCapacity = occupancyData?.reduce((sum, r) => sum + r.capacity, 0) || 0;
  const totalOccupied = occupancyData?.reduce((sum, r) => sum + r.currentOccupancy, 0) || 0;
  const overallPercentage = totalCapacity > 0 ? Math.round((totalOccupied / totalCapacity) * 100) : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Building2 className="h-5 w-5" /> Room Occupancy Planner
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Overall Summary */}
        <div className="mb-6 p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Overall Nursery Occupancy</span>
            <span className="text-sm font-bold">{totalOccupied} / {totalCapacity} places</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                overallPercentage >= 90 ? 'bg-red-500' :
                overallPercentage >= 70 ? 'bg-amber-500' :
                'bg-emerald-500'
              }`}
              style={{ width: `${Math.min(overallPercentage, 100)}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {overallPercentage}% occupied — {totalCapacity - totalOccupied} places available
          </p>
        </div>

        {/* Room Cards */}
        {occupancyData && occupancyData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {occupancyData.map((room) => {
              const percentage = room.occupancyPercentage;
              const statusColor = percentage >= 90 ? 'border-red-300 bg-red-50' :
                                  percentage >= 70 ? 'border-amber-300 bg-amber-50' :
                                  'border-emerald-300 bg-emerald-50';
              const barColor = percentage >= 90 ? 'bg-red-500' :
                               percentage >= 70 ? 'bg-amber-500' :
                               'bg-emerald-500';
              const statusLabel = percentage >= 100 ? 'Full' :
                                  percentage >= 90 ? 'Near Full' :
                                  percentage >= 70 ? 'Filling Up' :
                                  'Available';
              const ageMin = room.ageRangeMin;
              const ageMax = room.ageRangeMax;
              const ageLabel = ageMin < 12
                ? `${ageMin} months - ${ageMax >= 12 ? `${Math.floor(ageMax / 12)} years` : `${ageMax} months`}`
                : `${Math.floor(ageMin / 12)} - ${Math.floor(ageMax / 12)} years`;

              return (
                <div key={room.id} className={`border rounded-lg p-4 ${statusColor}`}>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-sm">{room.name}</h4>
                    <Badge variant={percentage >= 90 ? 'destructive' : percentage >= 70 ? 'secondary' : 'default'} className="text-xs">
                      {statusLabel}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{ageLabel} • Ratio {room.staffRatio}</p>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex-1 bg-gray-200 rounded-full h-2.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${barColor}`}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium whitespace-nowrap">
                      {room.currentOccupancy}/{room.capacity}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-muted-foreground">
                      {room.capacity - room.currentOccupancy} {room.capacity - room.currentOccupancy === 1 ? 'place' : 'places'} remaining
                    </span>
                    <span className="text-xs font-medium">{percentage}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <Building2 className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-muted-foreground">No rooms configured yet.</p>
            <p className="text-xs text-muted-foreground mt-1">Rooms will appear here once they are set up in the system.</p>
          </div>
        )}

        {/* Capacity Legend */}
        <div className="mt-6 flex items-center gap-4 text-xs text-muted-foreground border-t pt-4">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <span>Available (&lt;70%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <span>Filling Up (70-89%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span>Near Full / Full (90%+)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}


// ==================== SETTINGS TAB ====================
function SettingsTab() {
  const { user } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [emailPassword, setEmailPassword] = useState("");
  const utils = trpc.useUtils();

  const changePassword = trpc.auth.changePassword.useMutation({
    onSuccess: () => { toast.success("Password changed successfully!"); setCurrentPassword(""); setNewPassword(""); setConfirmPassword(""); },
    onError: (e) => toast.error(e.message),
  });

  const changeEmail = trpc.auth.changeEmail.useMutation({
    onSuccess: () => { toast.success("Email changed successfully!"); setNewEmail(""); setEmailPassword(""); utils.auth.me.invalidate(); },
    onError: (e) => toast.error(e.message),
  });

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) { toast.error("Passwords don't match"); return; }
    if (newPassword.length < 6) { toast.error("Password must be at least 6 characters"); return; }
    changePassword.mutate({ currentPassword, newPassword });
  };

  const handleEmailChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail || !emailPassword) { toast.error("Please fill in all fields"); return; }
    changeEmail.mutate({ newEmail, password: emailPassword });
  };

  return (
    <div className="space-y-6">
      {/* Account Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">Account Settings</CardTitle>
          <p className="text-sm text-muted-foreground">Current email: <strong>{user?.email || "Not set"}</strong></p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Change Email */}
          <form onSubmit={handleEmailChange} className="space-y-3 p-4 border rounded-lg">
            <h4 className="font-semibold text-sm">Change Login Email</h4>
            <div className="grid sm:grid-cols-2 gap-3">
              <div><Label>New Email</Label><Input type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} placeholder="new@email.com" required /></div>
              <div><Label>Current Password (to confirm)</Label><Input type="password" value={emailPassword} onChange={(e) => setEmailPassword(e.target.value)} placeholder="Enter current password" required /></div>
            </div>
            <Button type="submit" size="sm" disabled={changeEmail.isPending}>{changeEmail.isPending ? "Updating..." : "Update Email"}</Button>
          </form>

          {/* Change Password */}
          <form onSubmit={handlePasswordChange} className="space-y-3 p-4 border rounded-lg">
            <h4 className="font-semibold text-sm">Change Password</h4>
            <div className="grid sm:grid-cols-3 gap-3">
              <div><Label>Current Password</Label><Input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required /></div>
              <div><Label>New Password</Label><Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Min 6 characters" required /></div>
              <div><Label>Confirm New Password</Label><Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required /></div>
            </div>
            <Button type="submit" size="sm" disabled={changePassword.isPending}>{changePassword.isPending ? "Updating..." : "Change Password"}</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}


// ==================== CHILDREN MANAGEMENT TAB ====================
function ChildrenManagementTab() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingChild, setEditingChild] = useState<number | null>(null);
  const [filterRoom, setFilterRoom] = useState<number | "all">("all");
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", dateOfBirth: "", roomId: 0,
    gender: "" as "" | "male" | "female" | "other",
    allergies: "", medicalInfo: "", dietaryRequirements: "",
    emergencyContact: "", emergencyPhone: "", parentEmail: "", notes: "",
  });
  const utils = trpc.useUtils();

  const { data: allChildren } = trpc.children.listAll.useQuery();
  const { data: roomsList } = trpc.children.rooms.useQuery();

  const addChild = trpc.children.adminAdd.useMutation({
    onSuccess: () => {
      toast.success("Child added successfully!");
      setShowAddForm(false);
      setFormData({ firstName: "", lastName: "", dateOfBirth: "", roomId: 0, gender: "", allergies: "", medicalInfo: "", dietaryRequirements: "", emergencyContact: "", emergencyPhone: "", parentEmail: "", notes: "" });
      utils.children.listAll.invalidate();
    },
    onError: (e: any) => toast.error(e.message),
  });

  const updateChild = trpc.children.adminUpdate.useMutation({
    onSuccess: () => {
      toast.success("Child updated!");
      setEditingChild(null);
      utils.children.listAll.invalidate();
    },
    onError: (e: any) => toast.error(e.message),
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.dateOfBirth || !formData.roomId) {
      toast.error("Please fill in required fields (name, DOB, room)");
      return;
    }
    addChild.mutate({
      firstName: formData.firstName,
      lastName: formData.lastName,
      dateOfBirth: formData.dateOfBirth,
      roomId: formData.roomId,
      gender: formData.gender || undefined,
      allergies: formData.allergies || undefined,
      medicalInfo: formData.medicalInfo || undefined,
      dietaryRequirements: formData.dietaryRequirements || undefined,
      emergencyContact: formData.emergencyContact || undefined,
      emergencyPhone: formData.emergencyPhone || undefined,
      parentEmail: formData.parentEmail || undefined,
      notes: formData.notes || undefined,
    });
  };

  const handleMoveRoom = (childId: number, newRoomId: number) => {
    updateChild.mutate({ id: childId, roomId: newRoomId });
  };

  const filteredChildren = allChildren?.filter((c) => filterRoom === "all" || c.roomId === filterRoom) || [];

  return (
    <div className="space-y-4">
      {/* Header with Add button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h3 className="font-semibold">Children ({allChildren?.length || 0})</h3>
          <select
            className="h-8 rounded-md border border-input bg-background px-2 text-xs"
            value={filterRoom}
            onChange={(e) => setFilterRoom(e.target.value === "all" ? "all" : Number(e.target.value))}
          >
            <option value="all">All Rooms</option>
            {roomsList?.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}
          </select>
        </div>
        <Button size="sm" onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? "Cancel" : "+ Add Child"}
        </Button>
      </div>

      {/* Add Child Form */}
      {showAddForm && (
        <Card>
          <CardHeader><CardTitle className="text-base">Add New Child</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={handleAdd} className="space-y-4">
              <div className="grid sm:grid-cols-3 gap-3">
                <div><Label>First Name *</Label><Input value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} required /></div>
                <div><Label>Last Name *</Label><Input value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} required /></div>
                <div><Label>Date of Birth *</Label><Input type="date" value={formData.dateOfBirth} onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})} required /></div>
              </div>
              <div className="grid sm:grid-cols-3 gap-3">
                <div>
                  <Label>Room *</Label>
                  <select className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm" value={formData.roomId} onChange={(e) => setFormData({...formData, roomId: Number(e.target.value)})} required>
                    <option value={0}>Select room...</option>
                    {roomsList?.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}
                  </select>
                </div>
                <div>
                  <Label>Gender</Label>
                  <select className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm" value={formData.gender} onChange={(e) => setFormData({...formData, gender: e.target.value as any})}>
                    <option value="">Not specified</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div><Label>Parent Email (optional)</Label><Input type="email" value={formData.parentEmail} onChange={(e) => setFormData({...formData, parentEmail: e.target.value})} placeholder="parent@email.com" /></div>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <div><Label>Allergies</Label><Input value={formData.allergies} onChange={(e) => setFormData({...formData, allergies: e.target.value})} placeholder="None" /></div>
                <div><Label>Dietary Requirements</Label><Input value={formData.dietaryRequirements} onChange={(e) => setFormData({...formData, dietaryRequirements: e.target.value})} placeholder="None" /></div>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <div><Label>Emergency Contact</Label><Input value={formData.emergencyContact} onChange={(e) => setFormData({...formData, emergencyContact: e.target.value})} /></div>
                <div><Label>Emergency Phone</Label><Input value={formData.emergencyPhone} onChange={(e) => setFormData({...formData, emergencyPhone: e.target.value})} /></div>
              </div>
              <div><Label>Medical Info</Label><Input value={formData.medicalInfo} onChange={(e) => setFormData({...formData, medicalInfo: e.target.value})} /></div>
              <div><Label>Notes</Label><Input value={formData.notes} onChange={(e) => setFormData({...formData, notes: e.target.value})} /></div>
              <Button type="submit" disabled={addChild.isPending}>{addChild.isPending ? "Adding..." : "Add Child"}</Button>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Children List */}
      <Card>
        <CardContent className="pt-4">
          {filteredChildren.length > 0 ? (
            <div className="space-y-3">
              {filteredChildren.map((child) => {
                const room = roomsList?.find((r) => r.id === child.roomId);
                return (
                  <div key={child.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-sm">{child.firstName} {child.lastName}</p>
                        {room && <Badge variant="outline" className="text-xs">{room.name}</Badge>}
                        <Badge className="capitalize text-xs">{child.status}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        DOB: {new Date(child.dateOfBirth).toLocaleDateString()}
                        {child.allergies && ` | Allergies: ${child.allergies}`}
                        {child.dietaryRequirements && ` | Diet: ${child.dietaryRequirements}`}
                      </p>
                      {child.emergencyContact && <p className="text-xs text-muted-foreground">Emergency: {child.emergencyContact} ({child.emergencyPhone})</p>}
                    </div>
                    <div className="flex items-center gap-2">
                      {/* Move Room dropdown */}
                      <select
                        className="h-7 rounded border border-input bg-background px-2 text-xs"
                        value={child.roomId || ""}
                        onChange={(e) => handleMoveRoom(child.id, Number(e.target.value))}
                      >
                        <option value="" disabled>Move to...</option>
                        {roomsList?.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}
                      </select>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">
              {filterRoom === "all" ? "No children registered yet. Click '+ Add Child' to get started." : "No children in this room."}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}


// ==================== STAFF MANAGEMENT TAB ====================
function StaffManagementTab() {
  const { data: allStaff } = trpc.staff.listAll.useQuery();
  const { data: trainingList } = trpc.training.list.useQuery();
  const { data: roomsList } = trpc.children.rooms.useQuery();
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ title: "", bio: "", qualifications: "", roomId: "", startDate: "" });
  const utils = trpc.useUtils();

  const addStaff = trpc.staff.add.useMutation({
    onSuccess: () => { toast.success("Staff member added"); setShowAdd(false); setForm({ title: "", bio: "", qualifications: "", roomId: "", startDate: "" }); utils.staff.listAll.invalidate(); },
    onError: (e: any) => toast.error(e.message),
  });
  const removeStaff = trpc.staff.remove.useMutation({
    onSuccess: () => { toast.success("Staff member deactivated"); utils.staff.listAll.invalidate(); },
    onError: (e: any) => toast.error(e.message),
  });

  // Get compliance status per staff member
  const getComplianceForStaff = (staffId: number) => {
    const required = ["dbs_check", "first_aid", "paediatric_first_aid", "safeguarding", "food_hygiene"];
    const staffRecords = trainingList?.filter(t => t.staffId === staffId) || [];
    return required.map(type => {
      const record = staffRecords.find(r => r.trainingType === type);
      return {
        type,
        label: type.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase()),
        status: record ? record.status : "missing",
        expiryDate: record?.expiryDate,
      };
    });
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2"><Users className="h-5 w-5" /> Staff Members</CardTitle>
          <Button size="sm" onClick={() => setShowAdd(!showAdd)}><Plus className="h-4 w-4 mr-1" /> Add Staff</Button>
        </CardHeader>
        <CardContent>
          {showAdd && (
            <form onSubmit={(e) => { e.preventDefault(); addStaff.mutate({ title: form.title, bio: form.bio || undefined, qualifications: form.qualifications || undefined, roomId: form.roomId ? Number(form.roomId) : undefined, startDate: form.startDate || undefined }); }} className="space-y-3 mb-6 p-4 border rounded-lg bg-muted/30">
              <h4 className="font-semibold text-sm">Add New Staff Member</h4>
              <div className="grid sm:grid-cols-2 gap-3">
                <div><Label>Full Name / Job Title *</Label><Input value={form.title} onChange={(e) => setForm(p => ({ ...p, title: e.target.value }))} placeholder="e.g. Sarah Johnson - Room Leader" required /></div>
                <div><Label>Assigned Room</Label>
                  <select className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm" value={form.roomId} onChange={(e) => setForm(p => ({ ...p, roomId: e.target.value }))}>
                    <option value="">No specific room</option>
                    {roomsList?.map((r: any) => <option key={r.id} value={r.id}>{r.name}</option>)}
                  </select>
                </div>
              </div>
              <div><Label>Qualifications</Label><Input value={form.qualifications} onChange={(e) => setForm(p => ({ ...p, qualifications: e.target.value }))} placeholder="e.g. Level 3 Childcare, EYFS Lead" /></div>
              <div><Label>Bio / Notes</Label><Textarea value={form.bio} onChange={(e) => setForm(p => ({ ...p, bio: e.target.value }))} placeholder="Brief description, role, responsibilities..." rows={2} /></div>
              <div className="grid sm:grid-cols-2 gap-3">
                <div><Label>Start Date</Label><Input type="date" value={form.startDate} onChange={(e) => setForm(p => ({ ...p, startDate: e.target.value }))} /></div>
              </div>
              <div className="flex gap-2">
                <Button type="submit" disabled={addStaff.isPending}>{addStaff.isPending ? "Adding..." : "Add Staff Member"}</Button>
                <Button type="button" variant="outline" onClick={() => setShowAdd(false)}>Cancel</Button>
              </div>
            </form>
          )}

          {allStaff && allStaff.length > 0 ? (
            <div className="space-y-4">
              {allStaff.map((staff) => {
                const compliance = getComplianceForStaff(staff.id);
                const upToDate = compliance.filter(c => c.status === "valid").length;
                const total = compliance.length;
                return (
                  <div key={staff.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-medium">{staff.title || "Staff Member"}</p>
                        <p className="text-xs text-muted-foreground">{staff.qualifications || "No qualifications listed"}</p>
                        {staff.bio && <p className="text-xs text-muted-foreground mt-1">{staff.bio}</p>}
                        {staff.startDate && <p className="text-xs text-muted-foreground">Started: {new Date(staff.startDate).toLocaleDateString()}</p>}
                        {staff.roomId && roomsList && <p className="text-xs text-muted-foreground">Room: {roomsList.find((r: any) => r.id === staff.roomId)?.name || "Unknown"}</p>}
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={staff.isActive ? "default" : "outline"}>{staff.isActive ? "Active" : "Inactive"}</Badge>
                        {staff.isActive && <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700 h-7 px-2" onClick={() => { if (confirm("Deactivate this staff member?")) removeStaff.mutate({ id: staff.id }); }}>Remove</Button>}
                      </div>
                    </div>
                    {/* Compliance Checklist */}
                    <div className="mt-3 pt-3 border-t">
                      <p className="text-xs font-semibold mb-2 flex items-center gap-1">
                        <GraduationCap className="h-3 w-3" /> Compliance ({upToDate}/{total} up to date)
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                        {compliance.map(c => (
                          <div key={c.type} className={`text-center p-2 rounded text-xs border ${c.status === "valid" ? "bg-green-50 border-green-200 text-green-700" : c.status === "expiring_soon" ? "bg-amber-50 border-amber-200 text-amber-700" : c.status === "expired" ? "bg-red-50 border-red-200 text-red-700" : "bg-gray-50 border-gray-200 text-gray-500"}`}>
                            <p className="font-medium truncate">{c.label}</p>
                            <p className="mt-0.5">{c.status === "valid" ? "✓ Valid" : c.status === "expiring_soon" ? "⚠ Expiring" : c.status === "expired" ? "✗ Expired" : "— Missing"}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-muted-foreground">No staff members added yet.</p>
              <p className="text-xs text-muted-foreground mt-1">Click '+ Add Staff' to add your nursery team members with their details and compliance status.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
