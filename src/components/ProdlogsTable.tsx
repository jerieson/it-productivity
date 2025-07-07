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
    <div className="p-4">
      <h2
        className="text-xl font-bold mb-4"
        style={{ color: "var(--color-brand-blue)" }}
      >
        Productivity Log
      </h2>
      <div className="bg-white dark:bg-[var(--background)] rounded-2xl shadow-lg border border-[var(--border)]">
        <table className="min-w-full rounded-xl overflow-hidden divide-y divide-[var(--border)]">
          <thead>
            <tr className="bg-[var(--muted)] text-[var(--foreground)]">
              <th className="p-4 font-semibold text-left text-sm">Month</th>
              <th className="p-4 font-semibold text-left text-sm">Week No</th>
              <th className="p-4 font-semibold text-left text-sm">
                Planned Hours
              </th>
              <th className="p-2 font-semibold text-left text-sm">
                Actual Consumed
              </th>
              <th className="p-2 font-semibold text-left text-sm">
                Planned or Unplanned
              </th>
              <th className="p-2 font-semibold text-left text-sm">Category</th>
              <th className="p-2 font-semibold text-left text-sm">Project</th>
              <th className="p-2 font-semibold text-left text-sm">
                Activity or Task
              </th>
              <th className="p-2 font-semibold text-left text-sm">
                Reason for Deviation
              </th>
              <th className="p-3 font-semibold text-left text-sm">Remarks</th>
              <th className="p-3 font-semibold text-left text-sm">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr
                key={row.id}
                className="even:bg-[var(--color-brand-orange)]/10 dark:even:bg-[var(--color-brand-blue)]/10 rounded-lg hover:bg-[var(--muted)] transition-colors"
              >
                <td className="p-3 align-middle">
                  <SelectDefault
                    options={monthOptions}
                    value={row.month}
                    onChange={(v) => handleChange(row.id, "month", v)}
                    placeholder="Select month"
                  />
                </td>
                <td className="p-3 align-middle">
                  <SelectDefault
                    options={weekOptions}
                    value={row.weekNo}
                    onChange={(v) => handleChange(row.id, "weekNo", v)}
                    placeholder="Select week"
                  />
                </td>
                <td className="p-3 align-middle">
                  <InputDefault
                    type="number"
                    value={row.plannedHours}
                    onChange={(e) =>
                      handleChange(row.id, "plannedHours", e.target.value)
                    }
                  />
                </td>
                <td className="p-3 align-middle">
                  <InputDefault
                    type="number"
                    value={row.actualHours}
                    onChange={(e) =>
                      handleChange(row.id, "actualHours", e.target.value)
                    }
                  />
                </td>
                <td className="p-3 align-middle">
                  <SelectDefault
                    options={plannedOptions}
                    value={row.planned}
                    onChange={(v) => handleChange(row.id, "planned", v)}
                    placeholder="Planned/Unplanned"
                  />
                </td>
                <td className="p-3 align-middle">
                  <SelectDefault
                    options={categoryOptions}
                    value={row.category}
                    onChange={(v) => handleChange(row.id, "category", v)}
                    placeholder="Select category"
                  />
                </td>
                <td className="p-3 align-middle">
                  <SelectDefault
                    options={projectOptions}
                    value={row.project}
                    onChange={(v) => handleChange(row.id, "project", v)}
                    placeholder="Select project"
                  />
                </td>
                <td className="p-3 align-middle">
                  <SelectDefault
                    options={activityOptions}
                    value={row.activity}
                    onChange={(v) => handleChange(row.id, "activity", v)}
                    placeholder="Select activity"
                  />
                </td>
                <td className="p-3 align-middle">
                  <SelectDefault
                    options={reasonOptions}
                    value={row.reason}
                    onChange={(v) => handleChange(row.id, "reason", v)}
                    placeholder="Select reason(if any)"
                  />
                </td>
                <td className="p-3 align-middle">
                  <InputDefault
                    value={row.remarks}
                    onChange={(e) =>
                      handleChange(row.id, "remarks", e.target.value)
                    }
                  />
                </td>
                <td className="p-3 align-middle">
                  <ButtonDefault
                    className="bg-red-200 hover:bg-red-400 dark:bg-red-800 dark:hover:bg-red-600 dark:text-gray-100"
                    onClick={() => handleRemoveRow(row.id)}
                  >
                    Remove
                  </ButtonDefault>
                </td>
              </tr>
            ))}
            <tr>
              <td>
                <ButtonDefault className="m-4" onClick={handleAddRow}>
                  Add Row
                </ButtonDefault>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="flex items-center justify-between mt-4 p-4">
          <span className="text-sm text-muted-foreground">
            0 of 68 row(s) selected.
          </span>
          <div className="flex items-center gap-2">
            <button className="px-2 py-1 rounded bg-[var(--muted)]">
              {"<"}
            </button>
            <span className="text-sm">Page 1 of 7</span>
            <button className="px-2 py-1 rounded bg-[var(--muted)]">
              {">"}
            </button>
            <select className="ml-2 border rounded px-2 py-1 text-sm">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
            <span className="ml-1 text-sm">Rows per page</span>
          </div>
        </div>
      </div>
    </div>
  );
}
