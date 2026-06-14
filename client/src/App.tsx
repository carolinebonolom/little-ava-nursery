import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";

// Public pages
import AboutUs from "@/pages/AboutUs";
import VisionValues from "@/pages/VisionValues";
import Team from "@/pages/Team";
import Rooms from "@/pages/Rooms";
import Curriculum from "@/pages/Curriculum";
import DailyRoutine from "@/pages/DailyRoutine";
import MealsNutrition from "@/pages/MealsNutrition";
import FeesFunding from "@/pages/FeesFunding";
import OpeningHours from "@/pages/OpeningHours";
import Admissions from "@/pages/Admissions";
import WaitingList from "@/pages/WaitingList";
import TermDates from "@/pages/TermDates";
import Safeguarding from "@/pages/Safeguarding";
import SEND from "@/pages/SEND";
import News from "@/pages/News";
import Gallery from "@/pages/Gallery";
import Testimonials from "@/pages/Testimonials";
import Careers from "@/pages/Careers";
import Contact from "@/pages/Contact";
import FAQ from "@/pages/FAQ";
import BookVisit from "@/pages/BookVisit";
import Policies from "@/pages/Policies";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import CookiePolicy from "@/pages/CookiePolicy";
import Terms from "@/pages/Terms";
import ParentPortal from "@/pages/ParentPortal";
import AdmissionsForm from "@/pages/AdmissionsForm";
import Unsubscribe from "@/pages/Unsubscribe";

// Dashboard pages
import ParentDashboard from "@/pages/dashboard/ParentDashboard";
import StaffDashboard from "@/pages/dashboard/StaffDashboard";
import AdminDashboard from "@/pages/dashboard/AdminDashboard";

// Login pages
import LoginSelection from "./pages/LoginSelection";
import LoginParent from "./pages/LoginParent";
import LoginStaff from "./pages/LoginStaff";
import LoginAdmin from "./pages/LoginAdmin";

function Router() {
  return (
    <Switch>
      {/* Public pages */}
      <Route path="/" component={Home} />
      <Route path="/about" component={AboutUs} />
      <Route path="/vision-values" component={VisionValues} />
      <Route path="/team" component={Team} />
      <Route path="/rooms" component={Rooms} />
      <Route path="/curriculum" component={Curriculum} />
      <Route path="/daily-routine" component={DailyRoutine} />
      <Route path="/meals-nutrition" component={MealsNutrition} />
      <Route path="/fees-funding" component={FeesFunding} />
      <Route path="/opening-hours" component={OpeningHours} />
      <Route path="/admissions" component={Admissions} />
      <Route path="/admissions/register" component={AdmissionsForm} />
      <Route path="/waiting-list" component={WaitingList} />
      <Route path="/term-dates" component={TermDates} />
      <Route path="/safeguarding" component={Safeguarding} />
      <Route path="/send" component={SEND} />
      <Route path="/news" component={News} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/testimonials" component={Testimonials} />
      <Route path="/careers" component={Careers} />
      <Route path="/contact" component={Contact} />
      <Route path="/faq" component={FAQ} />
      <Route path="/book-visit" component={BookVisit} />
      <Route path="/policies" component={Policies} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/cookie-policy" component={CookiePolicy} />
      <Route path="/terms" component={Terms} />
      <Route path="/parent-portal" component={ParentPortal} />
      <Route path="/unsubscribe" component={Unsubscribe} />

      {/* Login pages */}
      <Route path="/login" component={LoginSelection} />
      <Route path="/login/parent" component={LoginParent} />
      <Route path="/login/staff" component={LoginStaff} />
      <Route path="/login/admin" component={LoginAdmin} />

      {/* Dashboard pages */}
      <Route path="/dashboard/parent" component={ParentDashboard} />
      <Route path="/dashboard/staff" component={StaffDashboard} />
      <Route path="/dashboard/admin" component={AdminDashboard} />

      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
