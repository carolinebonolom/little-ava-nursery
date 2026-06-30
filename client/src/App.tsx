import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";

// Public pages
import AboutUs from "@/pages/public/AboutUs";
import VisionValues from "@/pages/public/VisionValues";
import Team from "@/pages/public/Team";
import Rooms from "@/pages/public/Rooms";
import Curriculum from "@/pages/public/Curriculum";
import DailyRoutine from "@/pages/public/DailyRoutine";
import MealsNutrition from "@/pages/public/MealsNutrition";
import FeesFunding from "@/pages/public/FeesFunding";
import OpeningHours from "@/pages/public/OpeningHours";
import Admissions from "@/pages/public/Admissions";
import WaitingList from "@/pages/public/WaitingList";
import TermDates from "@/pages/public/TermDates";
import Safeguarding from "@/pages/public/Safeguarding";
import News from "@/pages/public/News";
import Gallery from "@/pages/public/Gallery";
import Testimonials from "@/pages/public/Testimonials";
import Careers from "@/pages/public/Careers";
import Contact from "@/pages/public/Contact";
import FAQ from "@/pages/public/FAQ";
import BookVisit from "@/pages/public/BookVisit";
import Policies from "@/pages/public/Policies";
import PrivacyPolicy from "@/pages/public/PrivacyPolicy";
import CookiePolicy from "@/pages/public/CookiePolicy";
import Terms from "@/pages/public/Terms";
import AdmissionsForm from "@/pages/public/AdmissionsForm";
import Unsubscribe from "@/pages/public/Unsubscribe";

// Dashboard pages
import AdminDashboard from "@/pages/dashboard/AdminDashboard";
import ParentDashboard from "@/pages/dashboard/ParentDashboard";
import StaffDashboard from "@/pages/dashboard/StaffDashboard";

// Login pages
import LoginSelection from "./pages/LoginSelection";
import LoginAdmin from "./pages/LoginAdmin";
import LoginParent from "./pages/LoginParent";
import LoginStaff from "./pages/LoginStaff";

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
      {/* Login pages */}
      <Route path="/login" component={LoginSelection} />
      <Route path="/login/admin" component={LoginAdmin} />
      <Route path="/login/parent" component={LoginParent} />
      <Route path="/login/staff" component={LoginStaff} />

      {/* Dashboard pages */}
      <Route path="/dashboard/admin" component={AdminDashboard} />
      <Route path="/dashboard/parent" component={ParentDashboard} />
      <Route path="/dashboard/staff" component={StaffDashboard} />

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
