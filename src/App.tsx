import * as React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "./components/ui/sidebar1";
import { AppSidebar } from "./components/Sidebar";
import { ProdlogsTable } from "./components/ProdlogsTable";
import { Dashboard } from "./components/Dashboard";
import { PanelLeft } from "lucide-react";
import { storageUtils } from "@/lib/storage";
import { Toaster } from "@/components/ui/sonner";

function Layout() {
  // Initialize sidebar state from localStorage
  const [sidebarOpen, setSidebarOpen] = React.useState(() =>
    storageUtils.getSidebarState()
  );

  // Save to localStorage whenever it changes
  React.useEffect(() => {
    storageUtils.saveSidebarState(sidebarOpen);
  }, [sidebarOpen]);

  return (
    <SidebarProvider open={sidebarOpen} onOpenChange={setSidebarOpen}>
      <AppSidebar />
      <SidebarInset>
        {/* Header that works on both mobile and desktop */}
        <header className="flex h-14 shrink-0 items-center gap-2 px-4 border-b bg-[#13294b]">
          <SidebarTrigger className="hover:bg-white/10 dark:hover:bg-white/10 text-white hover:text-gray-50">
            <PanelLeft className="h-4 w-4" />
            <span className="sr-only">Toggle sidebar</span>
          </SidebarTrigger>
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
      <Toaster position="bottom-left"/>
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
