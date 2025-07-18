// src/components/Dashboard.tsx
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { SectionCards } from "@/components/section-cards";
import { ProdlogsTable } from "./ProdlogsTable";

export function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-6 max-w-8xl">
        <div className="space-y-6">
          <SectionCards />
          <ChartAreaInteractive />
          <ProdlogsTable />
        </div>
      </div>
    </div>
  );
}
