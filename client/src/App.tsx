import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Products from "@/pages/Products";
import OnlineBanking from "@/pages/OnlineBanking";
import Branches from "@/pages/Branches";
import Contact from "@/pages/Contact";
import AccountOpening from "@/pages/AccountOpening";
import LoanApplication from "@/pages/LoanApplication";
import News from "@/pages/News";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/products" component={Products} />
        <Route path="/banking" component={OnlineBanking} />
        <Route path="/branches" component={Branches} />
        <Route path="/contact" component={Contact} />
        <Route path="/account-opening" component={AccountOpening} />
        <Route path="/loan-application" component={LoanApplication} />
        <Route path="/news" component={News} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
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
