
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreatorProfile from "./pages/CreatorProfile";
import CreatorInbox from "./pages/CreatorInbox";
import CreatorContracts from "./pages/CreatorContracts";
import CreatorPayments from "./pages/CreatorPayments";
import CreatorPerformance from "./pages/CreatorPerformance";
import CreatorSummary from "./pages/CreatorSummary";
import Discover from "./pages/Discover";
import Campaigns from "./pages/Campaigns";
import CampaignDetail from "./pages/CampaignDetail";
import CRM from "./pages/CRM";
import Contracts from "./pages/Contracts";
import Payments from "./pages/Payments";
import Performance from "./pages/Performance";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          
          {/* Creator Dashboard Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/profile" element={<CreatorProfile />} />
          <Route path="/dashboard/crm" element={<CreatorInbox />} />
          <Route path="/dashboard/crm/:id" element={<CRM />} />
          <Route path="/dashboard/contracts" element={<CreatorContracts />} />
          <Route path="/dashboard/payments" element={<CreatorPayments />} />
          <Route path="/dashboard/performance" element={<CreatorPerformance />} />
          <Route path="/dashboard/summary" element={<CreatorSummary />} />
          
          {/* Brand/Agency Routes */}
          <Route path="/discover" element={<Discover />} />
          <Route path="/creator/:id" element={<CreatorProfile />} />
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/campaign/:id" element={<CampaignDetail />} />
          <Route path="/crm/:id" element={<CRM />} />
          <Route path="/contracts" element={<Contracts />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/performance" element={<Performance />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<Admin />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
