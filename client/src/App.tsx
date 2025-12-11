import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import Contact from "@/pages/contact";
import PropertyDetails from "@/pages/property-details";
import NotFound from "@/pages/not-found";
import PrivacyPolicy from "@/pages/privacy-policy";
import PropertiesPage from "@/pages/properties";

// Admin Pages
import AdminDashboard from "@/pages/admin/dashboard";
import AdminProperties from "@/pages/admin/properties";
import AdminPropertyForm from "@/pages/admin/property-form";
import AdminLocations from "@/pages/admin/locations";
import AdminMessages from "@/pages/admin/messages";
import AdminSettings from "@/pages/admin/settings";
import AdminLogin from "@/pages/admin/login";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/contact" component={Contact} />
      <Route path="/properties" component={PropertiesPage} />
      <Route path="/property/:id" component={PropertyDetails} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      
      {/* Admin Routes */}
      <Route path="/admin" component={AdminLogin} />
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin/dashboard" component={AdminDashboard} />
      <Route path="/admin/properties" component={AdminProperties} />
      <Route path="/admin/properties/new" component={AdminPropertyForm} />
      <Route path="/admin/locations" component={AdminLocations} />
      <Route path="/admin/messages" component={AdminMessages} />
      <Route path="/admin/settings" component={AdminSettings} />
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
