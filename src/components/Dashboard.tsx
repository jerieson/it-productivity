// src/components/Dashboard.tsx
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { SectionCards } from "@/components/section-cards";
import { ProdlogsTable } from "./ProdlogsTable";

export function Dashboard() {
  return (
    <>
      <div className="space-y-2">
        <SectionCards />
        <ChartAreaInteractive />
        <ProdlogsTable />
      </div>
    </>
  );
}
