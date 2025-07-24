import * as React from "react";
import { NavLink, useLocation } from "react-router-dom";
import felcoLogo from "../assets/felco2.png";
import {
  Home,
  ClipboardList,
  BookOpen,
  FileText,
  Calendar,
  Settings,
  LogOut,
  BarChart3,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar1";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

// Navigation items with icons
const navigationItems = {
  home: [
    {
      title: "Dashboard",
      url: "/",
      icon: Home,
      isExact: true,
    },
    {
      title: "Productivity Logs",
      url: "/prodlog",
      icon: ClipboardList,
      isExact: false,
    },
    {
      title: "Data Dictionary",
      url: "/dictionary",
      icon: BookOpen,
      isExact: false,
    },
  ],
  reports: [
    {
      title: "Weekly Reports",
      url: "/reports/weekly",
      icon: BarChart3,
      isExact: false,
    },
    {
      title: "Monthly Reports",
      url: "/reports/monthly",
      icon: Calendar,
      isExact: false,
    },
  ],
  settings: [
    {
      title: "User Settings",
      url: "/settings/user",
      icon: Settings,
      isExact: false,
    },
    {
      title: "Logout",
      url: "/logout",
      icon: LogOut,
      isExact: false,
    },
  ],
};

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation();

  const isActiveRoute = (url: string, isExact: boolean) => {
    if (isExact) {
      return location.pathname === url;
    }
    return location.pathname.startsWith(url);
  };

  return (
    <Sidebar variant="sidebar" side="left" {...props}>
      <SidebarHeader>
        <div className="flex h-16 shrink-0 items-center px-4 mx-auto">
          <img
            src={felcoLogo}
            alt="Felco Logo"
            className="h-8 w-auto object-contain"
          />
        </div>
      </SidebarHeader>

      <SidebarContent className="gap-0">
        {/* Home Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="px-2 text-xs font-medium text-sidebar-foreground/70">
            Home
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.home.map((item) => {
                const Icon = item.icon;
                const isActive = isActiveRoute(item.url, item.isExact);

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      className={cn(
                        "transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                        isActive &&
                          "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                      )}
                    >
                      <NavLink to={item.url} end={item.isExact}>
                        <Icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Reports Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="px-2 text-xs font-medium text-sidebar-foreground/70">
            Reports
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.reports.map((item) => {
                const Icon = item.icon;
                const isActive = isActiveRoute(item.url, item.isExact);

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      className={cn(
                        "transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                        isActive &&
                          "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                      )}
                    >
                      <NavLink to={item.url}>
                        <Icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Settings Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="px-2 text-xs font-medium text-sidebar-foreground/70">
            Settings
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.settings.map((item) => {
                const Icon = item.icon;
                const isActive = isActiveRoute(item.url, item.isExact);

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      className={cn(
                        "transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                        isActive &&
                          "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                      )}
                    >
                      <NavLink to={item.url}>
                        <Icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}

              {/* Theme Toggle */}
              <SidebarMenuItem>
                <div className="px-2 py-1.5">
                  <ThemeToggle />
                </div>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
