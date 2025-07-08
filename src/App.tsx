import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { SidebarProvider } from "./components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";
import { ProdlogsTable } from "./components/ProdlogsTable";
// import { ThemeToggle } from "./components/ThemeToggle";

function Layout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-svh">
        <AppSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<h1>Dashboard</h1>} />
          <Route path="/prodlog" element={<ProdlogsTable />} />
          <Route path="/dictionary" element={<h1>Data Dictionary</h1>} />
          <Route path="/reports/weekly" element={<h1>Weekly Reports</h1>} />
          <Route path="/reports/monthly" element={<h1>Monthly Reports</h1>} />
          <Route path="/settings/user" element={<h1>User Settings</h1>} />
          <Route path="/logout" element={<h1>Logout</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
