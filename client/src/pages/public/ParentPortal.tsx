import { useAuth } from "@/_core/hooks/useAuth";
import PublicLayout from "@/components/PublicLayout";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { useLocation } from "wouter";
import { useEffect } from "react";
import { LogIn, Shield, Bell, Calendar, FileText, Baby } from "lucide-react";

export default function ParentPortal() {
  const { user, isAuthenticated, loading } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!loading) {
      if (isAuthenticated && user) {
        setLocation("/dashboard/parent");
      } else {
        setLocation("/login/parent");
      }
    }
  }, [isAuthenticated, user, loading, setLocation]);

  if (loading) {
    return (
      <PublicLayout>
        <PageHeader title="Parent Portal" breadcrumb="Home / Parent Portal" />
        <section className="section-padding">
          <div className="container text-center">
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </section>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <PageHeader
        title="Parent Portal"
        subtitle="Access your child's daily updates, book sessions, and manage your account."
        breadcrumb="Home / Parent Portal"
      />

      <section className="section-padding">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <Button size="lg" onClick={() => setLocation("/login/parent")}>
              <LogIn className="mr-2 h-5 w-5" />
              Log In to Parent Portal
            </Button>
            <p className="text-sm text-muted-foreground mt-3">
              New parent? You'll receive login details when your child is registered.
            </p>
          </div>

          <h3 className="heading-3 text-center mb-8">What You Can Do</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Baby, title: "Activity Feed", desc: "See real-time updates on meals, naps, nappy changes, and activities." },
              { icon: Bell, title: "Notifications", desc: "Receive instant alerts about your child's day and nursery announcements." },
              { icon: Calendar, title: "Book Sessions", desc: "Request additional sessions or make changes to your schedule." },
              { icon: FileText, title: "Report Absence", desc: "Quickly notify us if your child won't be attending." },
              { icon: Shield, title: "Secure Access", desc: "Your data is protected with enterprise-grade security." },
              { icon: LogIn, title: "Easy Login", desc: "Simple, secure login with your registered email." },
            ].map((item) => (
              <Card key={item.title} className="border-0 shadow-sm">
                <CardContent className="p-5 text-center">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h4 className="font-semibold text-sm mb-1">{item.title}</h4>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
