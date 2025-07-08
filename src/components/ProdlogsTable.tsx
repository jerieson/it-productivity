// src/components/ProdlogsTable.tsx
import * as React from "react";
import type { Prodlog } from "@/types/prodlog";
import dummyData from "@/data/data.json";
import {
  monthOptions,
  weekOptions,
  plannedOptions,
  categoryOptions,
  projectOptions,
  activityOptions,
  reasonOptions,
} from "@/data/options";
import { InputDefault } from "@/components/InputDefault";
import { SelectDefault } from "@/components/SelectDefault";
import { ButtonDefault } from "@/components/ButtonDefault";

export function ProdlogsTable() {
  const [data, setData] = React.useState<Prodlog[]>(dummyData as Prodlog[]);

  // Handle select and input changes
  const handleChange = (id: number, field: keyof Prodlog, value: string) => {
    setData((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  // Add a new row
  const handleAddRow = () => {
    const newId = data.length > 0 ? Math.max(...data.map((d) => d.id)) + 1 : 1;
    setData([
      ...data,
      {
        id: newId,
        month: "",
        weekNo: "",
        plannedHours: "",
        actualHours: "",
        planned: "",
        category: "",
        project: "",
        activity: "",
        reason: "",
        remarks: "",
      },
    ]);
  };

  // Remove a row
  const handleRemoveRow = (id: number) => {
    setData((prev) => prev.filter((row) => row.id !== id));
  };

  return (
    <div className="w-full max-w-full px-2 py-3 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-sidebar-foreground">
          Productivity Logs
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {data.length} entries
          </span>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-card border border-border rounded-lg shadow-sm overflow-x-auto">
        <table className="w-full min-w-[600px] text-xs">
          <thead>
            <tr className="bg-muted/50 border-b border-border">
              <th className="p-2 text-left font-medium text-muted-foreground">
                Month
              </th>
              <th className="p-2 text-left font-medium text-muted-foreground">
                Week
              </th>
              <th className="p-2 text-left font-medium text-muted-foreground">
                Planned
              </th>
              <th className="p-2 text-left font-medium text-muted-foreground">
                Actual
              </th>
              <th className="p-2 text-left font-medium text-muted-foreground">
                Type
              </th>
              <th className="p-2 text-left font-medium text-muted-foreground">
                Category
              </th>
              <th className="p-2 text-left font-medium text-muted-foreground">
                Project
              </th>
              <th className="p-2 text-left font-medium text-muted-foreground">
                Activity
              </th>
              <th className="p-2 text-left font-medium text-muted-foreground">
                Reason
              </th>
              <th className="p-2 text-left font-medium text-muted-foreground">
                Remarks
              </th>
              <th className="p-2 text-left font-medium text-muted-foreground">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {data.map((row) => (
              <tr key={row.id} className="hover:bg-muted/30 transition-colors">
                <td className="p-2 min-w-[80px]">
                  <SelectDefault
                    options={monthOptions}
                    value={row.month}
                    onChange={(v) => handleChange(row.id, "month", v)}
                    placeholder="Month"
                    size="sm"
                  />
                </td>
                <td className="p-2 min-w-[80px]">
                  <SelectDefault
                    options={weekOptions}
                    value={row.weekNo}
                    onChange={(v) => handleChange(row.id, "weekNo", v)}
                    placeholder="Week"
                    size="sm"
                  />
                </td>
                <td className="p-2 min-w-[80px]">
                  <InputDefault
                    type="number"
                    className="no-spinner w-20"
                    value={row.plannedHours}
                    onChange={(e) =>
                      handleChange(row.id, "plannedHours", e.target.value)
                    }
                    placeholder="hh.mm"
                  />
                </td>
                <td className="p-2 min-w-[80px]">
                  <InputDefault
                    type="number"
                    className="no-spinner w-20"
                    value={row.actualHours}
                    onChange={(e) =>
                      handleChange(row.id, "actualHours", e.target.value)
                    }
                    placeholder="hh.mm"
                  />
                </td>
                <td className="p-2 min-w-[80px]">
                  <SelectDefault
                    options={plannedOptions}
                    value={row.planned}
                    onChange={(v) => handleChange(row.id, "planned", v)}
                    placeholder="Type"
                    size="sm"
                  />
                </td>
                <td className="p-2 min-w-[80px]">
                  <SelectDefault
                    options={categoryOptions}
                    value={row.category}
                    onChange={(v) => handleChange(row.id, "category", v)}
                    placeholder="Category"
                    size="sm"
                  />
                </td>
                <td className="p-2 min-w-[80px]">
                  <SelectDefault
                    options={projectOptions}
                    value={row.project}
                    onChange={(v) => handleChange(row.id, "project", v)}
                    placeholder="Project"
                    size="sm"
                  />
                </td>
                <td className="p-2 min-w-[80px]">
                  <SelectDefault
                    options={activityOptions}
                    value={row.activity}
                    onChange={(v) => handleChange(row.id, "activity", v)}
                    placeholder="Activity"
                    size="sm"
                  />
                </td>
                <td className="p-2 min-w-[80px]">
                  <SelectDefault
                    options={reasonOptions}
                    value={row.reason}
                    onChange={(v) => handleChange(row.id, "reason", v)}
                    placeholder="Reason"
                    size="sm"
                  />
                </td>
                <td className="p-2 min-w-[80px]">
                  <InputDefault
                    value={row.remarks}
                    onChange={(e) =>
                      handleChange(row.id, "remarks", e.target.value)
                    }
                    placeholder="Notes"
                    className="min-w-[120px]"
                  />
                </td>
                <td className="p-2 min-w-[60px]">
                  <ButtonDefault
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive/80"
                    onClick={() => handleRemoveRow(row.id)}
                  >
                    Remove
                  </ButtonDefault>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Add Row Button */}
        <div className="p-4 border-t border-border bg-muted/20">
          <ButtonDefault
            onClick={handleAddRow}
            className="w-full sm:w-auto"
            variant="outline"
          >
            Add New Entry
          </ButtonDefault>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground px-2 py-2">
          <span>
            Showing {data.length} of {data.length} entries
          </span>
          <div className="flex items-center gap-1">
            <ButtonDefault size="xs" className="px-2 py-1" variant="outline">
              Previous
            </ButtonDefault>
            <span className="px-2 py-1">Page 1 of 1</span>
            <ButtonDefault size="xs" className="px-2 py-1" variant="outline">
              Next
            </ButtonDefault>
          </div>
        </div>
      </div>
    </div>
  );
}
