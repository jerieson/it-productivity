import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "./components/ui/sidebar1";
import { AppSidebar } from "./components/app-sidebar1";
import { ProdlogsTable } from "./components/ProdlogsTable";
import { Dashboard } from "./components/Dashboard";
import { Menu, PanelLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* Header that works on both mobile and desktop */}
        <header className="flex h-16 shrink-0 items-center gap-2 px-4 border-b bg-background">
          <SidebarTrigger className="-ml-1">
            <PanelLeft className="h-4 w-4" />
            <span className="sr-only">Toggle sidebar</span>
          </SidebarTrigger>
          <div className="flex items-center gap-2">
            <h1 className="font-semibold text-lg">FELCO</h1>
          </div>
        </header>

        {/* Main content area that adjusts with sidebar */}
        <div className="flex flex-1 flex-col gap-4 pt-0">
          <div className="min-h-screen flex-1 bg-muted/50">
            <Outlet />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/prodlog" element={<ProdlogsTable />} />
          <Route
            path="/dictionary"
            element={
              <div className="p-6">
                <h1>Data Dictionary</h1>
              </div>
            }
          />
          <Route
            path="/reports/weekly"
            element={
              <div className="p-6">
                <h1>Weekly Reports</h1>
              </div>
            }
          />
          <Route
            path="/reports/monthly"
            element={
              <div className="p-6">
                <h1>Monthly Reports</h1>
              </div>
            }
          />
          <Route
            path="/settings/user"
            element={
              <div className="p-6">
                <h1>User Settings</h1>
              </div>
            }
          />
          <Route
            path="/logout"
            element={
              <div className="p-6">
                <h1>Logout</h1>
              </div>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
