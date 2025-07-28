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
import { useIsMobile } from "@/hooks/use-mobile";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";

export function ProdlogsTable() {
  const [data, setData] = React.useState<Prodlog[]>(dummyData as Prodlog[]);
  const isMobile = useIsMobile();

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

  // Mobile card view for each entry
  const MobileCard = ({ row }: { row: Prodlog }) => (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">Entry #{row.id}</CardTitle>
          <ButtonDefault
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-card-foreground hover:text-destructive/80"
            onClick={() => handleRemoveRow(row.id)}
          >
            <Trash2 className="h-4 w-4" />
          </ButtonDefault>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Time Period */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
              Month
            </label>
            <SelectDefault
              options={monthOptions}
              value={row.month}
              onChange={(v) => handleChange(row.id, "month", v)}
              placeholder="Select month"
              size="sm"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">
              Week
            </label>
            <SelectDefault
              options={weekOptions}
              value={row.weekNo}
              onChange={(v) => handleChange(row.id, "weekNo", v)}
              placeholder="Week #"
              size="sm"
            />
          </div>
        </div>

        {/* Hours */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
              Planned
            </label>
            <InputDefault
              type="number"
              className="no-spinner"
              value={row.plannedHours}
              onChange={(e) =>
                handleChange(row.id, "plannedHours", e.target.value)
              }
              placeholder="0.00"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
              Actual
            </label>
            <InputDefault
              type="number"
              className="no-spinner"
              value={row.actualHours}
              onChange={(e) =>
                handleChange(row.id, "actualHours", e.target.value)
              }
              placeholder="0.00"
            />
          </div>
        </div>

        {/* Type & Category */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">
              Type
            </label>
            <SelectDefault
              options={plannedOptions}
              value={row.planned}
              onChange={(v) => handleChange(row.id, "planned", v)}
              placeholder="Select type"
              size="sm"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">
              Category
            </label>
            <SelectDefault
              options={categoryOptions}
              value={row.category}
              onChange={(v) => handleChange(row.id, "category", v)}
              placeholder="Select category"
              size="sm"
            />
          </div>
        </div>

        {/* Project & Activity */}
        <div className="space-y-3">
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
              Project
            </label>
            <SelectDefault
              options={projectOptions}
              value={row.project}
              onChange={(v) => handleChange(row.id, "project", v)}
              placeholder="Select project"
              size="sm"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
              Activity
            </label>
            <SelectDefault
              options={activityOptions}
              value={row.activity}
              onChange={(v) => handleChange(row.id, "activity", v)}
              placeholder="Select activity"
              size="sm"
            />
          </div>
        </div>

        {/* Reason & Remarks */}
        <div className="space-y-3">
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">
              Reason
            </label>
            <SelectDefault
              options={reasonOptions}
              value={row.reason}
              onChange={(v) => handleChange(row.id, "reason", v)}
              placeholder="Reason (if any)"
              size="sm"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
              Remarks
            </label>
            <InputDefault
              value={row.remarks}
              onChange={(e) => handleChange(row.id, "remarks", e.target.value)}
              placeholder="Additional notes..."
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="@container/prodlogs w-full min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      {/* Header */}
      <CardHeader className="rounded-xl border bg-card py-4 pt-6 shadow-sm mb-2">
        <div className="flex flex-col @[540px]/prodlogs:flex-row @[540px]/prodlogs:items-center @[540px]/prodlogs:justify-between gap-4 ">
          <div>
            <CardTitle className="@[540px]/prodlogs:text-md">
              Productivity Logs
            </CardTitle>
            <CardDescription>
              <span className="hidden @[540px]/prodlogs:inline">
                Track and manage your productivity entries
              </span>
              <span className="@[540px]/prodlogs:hidden">Manage entries</span>
            </CardDescription>
          </div>
          <ButtonDefault
            onClick={handleAddRow}
            className="w-full @[540px]/prodlogs:w-auto"
            size={isMobile ? "xs" : "sm"}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Entry
          </ButtonDefault>
        </div>
      </CardHeader>

      {/* Mobile View */}
      <div className="@[900px]/prodlogs:hidden space-y-4">
        {data.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-muted p-3 mb-4"></div>
              <h3 className="font-semibold text-sm mb-2">No entries yet</h3>
              <p className="text-xs text-muted-foreground mb-4">
                Start tracking your productivity by adding your first entry.
              </p>
              <ButtonDefault onClick={handleAddRow} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Entry
              </ButtonDefault>
            </CardContent>
          </Card>
        ) : (
          data.map((row) => <MobileCard key={row.id} row={row} />)
        )}
      </div>

      {/* Desktop View */}
      <div className="hidden @[900px]/prodlogs:block shadow-sm rounded-xl">
        <ScrollArea className="w-full border bg-card whitespace-nowrap text-card-foreground rounded-t-xl">
          <CardContent className="p-0 pb-2">
            <div className="relative">
              <table className="w-full">
                <thead className="sticky top-0 z-10">
                  <tr className="border-b bg-muted/50">
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground text-xs bg-muted/50">
                      <div className="flex items-center">Month</div>
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground text-xs bg-muted/50">
                      Week
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground text-xs bg-muted/50">
                      <div className="flex items-center">Planned</div>
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground text-xs bg-muted/50">
                      <div className="flex items-center">Actual</div>
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground text-xs bg-muted/50">
                      Type
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground text-xs bg-muted/50">
                      Category
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground text-xs bg-muted/50">
                      <div className="flex items-center">Project</div>
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground text-xs bg-muted/50">
                      <div className="flex items-center">Activity</div>
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground text-xs bg-muted/50">
                      Reason
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground text-xs bg-muted/50">
                      <div className="flex items-center">Remarks</div>
                    </th>
                    <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground text-xs bg-muted/50">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {data.length === 0 ? (
                    <tr>
                      <td colSpan={11} className="h-32 text-center">
                        <div className="flex flex-col items-center justify-center py-8 text-center">
                          <div className="rounded-full bg-muted p-3 mb-4"></div>
                          <h3 className="font-semibold text-sm mb-2">
                            No entries yet
                          </h3>
                          <p className="text-xs text-muted-foreground mb-4">
                            Start tracking your productivity by adding your
                            first entry.
                          </p>
                          <ButtonDefault onClick={handleAddRow} size="sm">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Entry
                          </ButtonDefault>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    data.map((row) => (
                      <tr
                        key={row.id}
                        className="hover:bg-muted/30 transition-colors"
                      >
                        <td className="h-14 px-4 align-middle">
                          <SelectDefault
                            options={monthOptions}
                            value={row.month}
                            onChange={(v) => handleChange(row.id, "month", v)}
                            placeholder="Month"
                            size="sm"
                          />
                        </td>
                        <td className="h-14 px-4 align-middle">
                          <SelectDefault
                            options={weekOptions}
                            value={row.weekNo}
                            onChange={(v) => handleChange(row.id, "weekNo", v)}
                            placeholder="Week"
                            size="sm"
                          />
                        </td>
                        <td className="h-14 px-4 align-middle">
                          <InputDefault
                            type="number"
                            className="no-spinner w-20"
                            value={row.plannedHours}
                            onChange={(e) =>
                              handleChange(
                                row.id,
                                "plannedHours",
                                e.target.value
                              )
                            }
                            placeholder="0.00"
                          />
                        </td>
                        <td className="h-14 px-4 align-middle">
                          <InputDefault
                            type="number"
                            className="no-spinner w-20"
                            value={row.actualHours}
                            onChange={(e) =>
                              handleChange(
                                row.id,
                                "actualHours",
                                e.target.value
                              )
                            }
                            placeholder="0.00"
                          />
                        </td>
                        <td className="h-14 px-4 align-middle">
                          <SelectDefault
                            options={plannedOptions}
                            value={row.planned}
                            onChange={(v) => handleChange(row.id, "planned", v)}
                            placeholder="Type"
                            size="sm"
                          />
                        </td>
                        <td className="h-14 px-4 align-middle">
                          <SelectDefault
                            options={categoryOptions}
                            value={row.category}
                            onChange={(v) =>
                              handleChange(row.id, "category", v)
                            }
                            placeholder="Category"
                            size="sm"
                          />
                        </td>
                        <td className="h-14 px-4 align-middle">
                          <SelectDefault
                            options={projectOptions}
                            value={row.project}
                            onChange={(v) => handleChange(row.id, "project", v)}
                            placeholder="Project"
                            size="sm"
                          />
                        </td>
                        <td className="h-14 px-4 align-middle">
                          <SelectDefault
                            options={activityOptions}
                            value={row.activity}
                            onChange={(v) =>
                              handleChange(row.id, "activity", v)
                            }
                            placeholder="Activity"
                            size="sm"
                          />
                        </td>
                        <td className="h-14 px-4 align-middle">
                          <SelectDefault
                            options={reasonOptions}
                            value={row.reason}
                            onChange={(v) => handleChange(row.id, "reason", v)}
                            placeholder="Reason"
                            size="sm"
                          />
                        </td>
                        <td className="h-14 px-4 align-middle">
                          <InputDefault
                            value={row.remarks}
                            onChange={(e) =>
                              handleChange(row.id, "remarks", e.target.value)
                            }
                            placeholder="Notes..."
                            className="min-w-[120px]"
                          />
                        </td>
                        <td className="">
                          <ButtonDefault
                            size="xs"
                            onClick={() => handleRemoveRow(row.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </ButtonDefault>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        {/* Pagination */}
        {data.length > 0 && (
          <CardContent className="px-4 py-2 border rounded-b-xl bg-card border-t-0">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>
                Showing {data.length} of {data.length} entries
              </span>
              <div className="flex items-center gap-2">
                <ButtonDefault size="sm" variant="outline" disabled>
                  Previous
                </ButtonDefault>
                <span className="px-3 py-1 text-xs">Page 1 of 1</span>
                <ButtonDefault size="sm" variant="outline" disabled>
                  Next
                </ButtonDefault>
              </div>
            </div>
          </CardContent>
        )}
      </div>
    </div>
  );
}
