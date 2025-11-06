import * as React from "react";
import type { Prodlog } from "@/types/prodlog";
import { storageUtils } from "@/lib/storage";
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
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus, Minus, Save, RotateCcw, ChevronRight, ChevronLeft } from "lucide-react";
import { toast } from "sonner";
import { ConfirmDialog } from "@/components/ConfirmDialog";

export function ProdlogsTable() {
  // Initialize from localStorage, fallback to empty array
  const [data, setData] = React.useState<Prodlog[]>(() => {
    return storageUtils.getProdlogs();
  });

  const [hasUnsavedChanges, setHasUnsavedChanges] = React.useState(false);
  const [showClearDialog, setShowClearDialog] = React.useState(false);
  const [showSaveDialog, setShowSaveDialog] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;

  // Calculate pagination
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  // Reset to page 1 if current page exceeds total pages
  React.useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  // Auto-save changes to localStorage whenever data changes
  React.useEffect(() => {
    if (hasUnsavedChanges) {
      storageUtils.saveProdlogs(data);
      setHasUnsavedChanges(false);
    }
  }, [data, hasUnsavedChanges]);

  // Handle select and input changes
  const handleChange = (id: number, field: keyof Prodlog, value: string) => {
    setData((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
    setHasUnsavedChanges(true);
  };

  // Add a new row
  const handleAddRow = () => {
    const newId = data.length > 0 ? Math.max(...data.map((d) => d.id)) + 1 : 1;
    const newRow: Prodlog = {
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
    };
    setData([...data, newRow]);
    setHasUnsavedChanges(true);

    // Navigate to the page where the new entry will appear
    const newTotalPages = Math.ceil((data.length + 1) / itemsPerPage);
    setCurrentPage(newTotalPages);
  };

  // Remove a row
  const handleRemoveRow = (id: number) => {
    setData((prev) => prev.filter((row) => row.id !== id));
    setHasUnsavedChanges(true);
  };

  // Manual save function
  const handleSaveAll = () => {
    const success = storageUtils.saveProdlogs(data);
    if (success) {
      setHasUnsavedChanges(false);
      toast.success("Changes saved successfully!");
    } else {
      toast.error("Failed to save changes");
    }
  };

  // Clear all data
  const handleClearAll = () => {
    storageUtils.clearProdlogs();
    setData([]);
    setHasUnsavedChanges(false);
    setCurrentPage(1);
    toast.success("All data cleared");
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  // Generate smart pagination numbers
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5; // Show max 5 page numbers

    if (totalPages <= maxVisible) {
      // Show all pages if total is less than max
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Always show first page
    pages.push(1);

    if (currentPage > 3) {
      pages.push("...");
    }

    // Show pages around current page
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    // Always show last page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  // Mobile card view for each entry
  const MobileCard = ({ row }: { row: Prodlog }) => (
    <Card className="mb-3 shadow-sm">
      <CardHeader className="pb-2 pt-3 px-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">Entry #{row.id}</CardTitle>
          <ButtonDefault
            size="xs"
            className="h-7 w-7 p-0 hover:bg-destructive/100"
            onClick={() => handleRemoveRow(row.id)}
          >
            <Minus className="h-4 w-4 text-muted-foreground hover:text-destructive transition-colors" />
          </ButtonDefault>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 px-3 pb-3">
        {/* Time Period */}
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">
              Month
            </label>
            <SelectDefault
              options={monthOptions}
              value={row.month}
              onChange={(v) => handleChange(row.id, "month", v)}
              placeholder="Month"
              size="xs"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">
              Week
            </label>
            <SelectDefault
              options={weekOptions}
              value={row.weekNo}
              onChange={(v) => handleChange(row.id, "weekNo", v)}
              placeholder="Week"
              size="xs"
            />
          </div>
        </div>

        {/* Hours */}
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">
              Planned Hrs
            </label>
            <InputDefault
              type="number"
              className="no-spinner"
              value={row.plannedHours}
              onChange={(e) =>
                handleChange(row.id, "plannedHours", e.target.value)
              }
              placeholder="0.00"
              size="sm"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">
              Actual Hrs
            </label>
            <InputDefault
              type="number"
              className="no-spinner"
              value={row.actualHours}
              onChange={(e) =>
                handleChange(row.id, "actualHours", e.target.value)
              }
              placeholder="0.00"
              size="sm"
            />
          </div>
        </div>

        {/* Type & Category */}
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">
              Type
            </label>
            <SelectDefault
              options={plannedOptions}
              value={row.planned}
              onChange={(v) => handleChange(row.id, "planned", v)}
              placeholder="Type"
              size="xs"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">
              Category
            </label>
            <SelectDefault
              options={categoryOptions}
              value={row.category}
              onChange={(v) => handleChange(row.id, "category", v)}
              placeholder="Category"
              size="xs"
            />
          </div>
        </div>

        {/* Project & Activity */}
        <div className="space-y-2">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">
              Project
            </label>
            <SelectDefault
              options={projectOptions}
              value={row.project}
              onChange={(v) => handleChange(row.id, "project", v)}
              placeholder="Project"
              size="xs"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">
              Activity
            </label>
            <SelectDefault
              options={activityOptions}
              value={row.activity}
              onChange={(v) => handleChange(row.id, "activity", v)}
              placeholder="Activity"
              size="xs"
            />
          </div>
        </div>

        {/* Reason & Remarks */}
        <div className="space-y-2">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">
              Reason
            </label>
            <SelectDefault
              options={reasonOptions}
              value={row.reason}
              onChange={(v) => handleChange(row.id, "reason", v)}
              placeholder="Reason (if any)"
              size="xs"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">
              Remarks
            </label>
            <InputDefault
              value={row.remarks}
              onChange={(e) => handleChange(row.id, "remarks", e.target.value)}
              placeholder="Notes..."
              size="sm"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="@container/prodlogs w-full">
      {/* Combined Header + Table Card */}
      <Card className="shadow-sm">
        {/* Header */}
        <CardHeader className="border-b px-4">
          <div className="flex flex-col @[540px]/prodlogs:flex-row @[540px]/prodlogs:items-center @[540px]/prodlogs:justify-between gap-3">
            <div>
              <CardTitle className="text-base @[540px]/prodlogs:text-lg">
                Productivity Logs
              </CardTitle>
              <CardDescription className="text-xs mt-0.5">
                <span className="hidden @[540px]/prodlogs:inline">
                  Track and manage your productivity entries
                </span>
                <span className="@[540px]/prodlogs:hidden">
                  {data.length} {data.length === 1 ? "entry" : "entries"}
                </span>
              </CardDescription>
            </div>
            <div className="flex gap-2 flex-wrap">
              <ButtonDefault
                onClick={handleAddRow}
                className="flex-1 @[540px]/prodlogs:flex-initial"
                size="sm"
              >
                <Plus className="h-3.5 w-3.5 mr-1.5" />
                Add Entry
              </ButtonDefault>
              {data.length > 0 && (
                <>
                  <ButtonDefault
                    onClick={() => setShowSaveDialog(true)}
                    className="flex-1 @[540px]/prodlogs:flex-initial bg-sky-200 dark:bg-sky-800 hover:bg-sky-300 dark:hover:bg-sky-700 dark:hover:text-gray-50"
                    size="sm"
                  >
                    <Save className="h-3.5 w-3.5 mr-1.5" />
                    Save All
                  </ButtonDefault>
                  <ButtonDefault
                    onClick={() => setShowClearDialog(true)}
                    className="flex-1 @[540px]/prodlogs:flex-initial bg-rose-200 dark:bg-rose-800 hover:bg-rose-300 dark:hover:bg-rose-700 dark:hover:text-gray-50"
                    size="sm"
                  >
                    <RotateCcw className="h-3.5 w-3.5 mr-1.5" />
                    Clear All
                  </ButtonDefault>
                </>
              )}
            </div>
          </div>
        </CardHeader>

        {/* Mobile View */}
        <CardContent className="@[900px]/prodlogs:hidden p-3">
          {data.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <h3 className="font-semibold text-sm mb-1">No entries yet</h3>
              <p className="text-xs text-muted-foreground mb-4 max-w-[240px]">
                Start tracking your productivity by adding your first entry.
              </p>
              <ButtonDefault onClick={handleAddRow} size="sm">
                <Plus className="h-3.5 w-3.5 mr-1.5" />
                Add Entry
              </ButtonDefault>
            </div>
          ) : (
            <>
              {currentData.map((row) => (
                <MobileCard key={row.id} row={row} />
              ))}

              {/* Mobile Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between pt-3 border-t mt-3">
                  <span className="text-xs text-muted-foreground">
                    Page {currentPage} of {totalPages}
                  </span>
                  <div className="flex gap-2">
                    <ButtonDefault
                      size="xs"
                      onClick={handlePreviousPage}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </ButtonDefault>
                    <ButtonDefault
                      size="xs"
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </ButtonDefault>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>

        {/* Desktop View */}
        <CardContent className="hidden @[900px]/prodlogs:block p-0">
          <ScrollArea className="w-full">
            <div className="min-w-full">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="h-10 px-3 text-left align-middle font-medium text-muted-foreground text-xs whitespace-nowrap">
                      Month
                    </th>
                    <th className="h-10 px-3 text-left align-middle font-medium text-muted-foreground text-xs whitespace-nowrap">
                      Week
                    </th>
                    <th className="h-10 px-3 text-left align-middle font-medium text-muted-foreground text-xs whitespace-nowrap">
                      Planned
                    </th>
                    <th className="h-10 px-3 text-left align-middle font-medium text-muted-foreground text-xs whitespace-nowrap">
                      Actual
                    </th>
                    <th className="h-10 px-3 text-left align-middle font-medium text-muted-foreground text-xs whitespace-nowrap">
                      Type
                    </th>
                    <th className="h-10 px-3 text-left align-middle font-medium text-muted-foreground text-xs whitespace-nowrap">
                      Category
                    </th>
                    <th className="h-10 px-3 text-left align-middle font-medium text-muted-foreground text-xs whitespace-nowrap">
                      Project
                    </th>
                    <th className="h-10 px-3 text-left align-middle font-medium text-muted-foreground text-xs whitespace-nowrap">
                      Activity
                    </th>
                    <th className="h-10 px-3 text-left align-middle font-medium text-muted-foreground text-xs whitespace-nowrap">
                      Reason
                    </th>
                    <th className="h-10 px-3 text-left align-middle font-medium text-muted-foreground text-xs whitespace-nowrap">
                      Remarks
                    </th>
                    <th className="h-10 px-3 text-center align-middle font-medium text-muted-foreground text-xs whitespace-nowrap w-16">
                      Remove
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.length === 0 ? (
                    <tr>
                      {/* Empty State */}
                      <td colSpan={11} className="h-32 text-center">
                        <div className="flex flex-col items-center justify-center py-8">
                          <div className="rounded-full bg-muted p-3 mb-3"></div>
                          <h3 className="font-semibold text-sm mb-1">
                            No entries yet
                          </h3>
                          <p className="text-xs text-muted-foreground mb-4">
                            Start tracking your productivity by adding your
                            first entry.
                          </p>
                          <ButtonDefault onClick={handleAddRow} size="sm">
                            <Plus className="h-3.5 w-3.5 mr-1.5" />
                            Add Entry
                          </ButtonDefault>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    currentData.map((row) => (
                      <tr
                        key={row.id}
                        className="border-b hover:bg-muted/30 transition-colors"
                      >
                        <td className="h-12 px-3 align-middle">
                          <SelectDefault
                            options={monthOptions}
                            value={row.month}
                            onChange={(v) => handleChange(row.id, "month", v)}
                            placeholder="Month"
                            size="sm"
                          />
                        </td>
                        <td className="h-12 px-3 align-middle">
                          <SelectDefault
                            options={weekOptions}
                            value={row.weekNo}
                            onChange={(v) => handleChange(row.id, "weekNo", v)}
                            placeholder="Week"
                            size="sm"
                          />
                        </td>
                        <td className="h-12 px-3 align-middle">
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
                            size="sm"
                          />
                        </td>
                        <td className="h-12 px-3 align-middle">
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
                            size="sm"
                          />
                        </td>
                        <td className="h-12 px-3 align-middle">
                          <SelectDefault
                            options={plannedOptions}
                            value={row.planned}
                            onChange={(v) => handleChange(row.id, "planned", v)}
                            placeholder="Type"
                            size="sm"
                          />
                        </td>
                        <td className="h-12 px-3 align-middle">
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
                        <td className="h-12 px-3 align-middle">
                          <SelectDefault
                            options={projectOptions}
                            value={row.project}
                            onChange={(v) => handleChange(row.id, "project", v)}
                            placeholder="Project"
                            size="sm"
                          />
                        </td>
                        <td className="h-12 px-3 align-middle">
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
                        <td className="h-12 px-3 align-middle">
                          <SelectDefault
                            options={reasonOptions}
                            value={row.reason}
                            onChange={(v) => handleChange(row.id, "reason", v)}
                            placeholder="Reason"
                            size="sm"
                          />
                        </td>
                        <td className="h-12 px-3 align-middle">
                          <InputDefault
                            value={row.remarks}
                            onChange={(e) =>
                              handleChange(row.id, "remarks", e.target.value)
                            }
                            placeholder="Notes..."
                            className="min-w-[120px]"
                            size="sm"
                          />
                        </td>
                        <td className="h-12 px-2 align-middle text-center">
                          <ButtonDefault
                            size="xs"
                            className="h-7 w-7 p-0 hover:bg-destructive/20 dark:hover:bg-destructive/40"
                            onClick={() => handleRemoveRow(row.id)}
                          >
                            <Minus className="h-4 w-4 text-rose-600 hover:text-destructive transition-colors" />
                          </ButtonDefault>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>

          {/* Footer with pagination */}
          {data.length > 0 && (
            <div className="flex items-center justify-between px-4 pt-5 border-t">
              {/* Left: Showing text */}
              <span className="text-xs text-muted-foreground">
                Showing {startIndex + 1} to {Math.min(endIndex, data.length)} of{" "}
                {data.length} entries
              </span>

              {/* Center: Pagination controls */}
              <div className="flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
                <ButtonDefault
                  size="xs"
                  variant="outline"
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className="hover:bg-muted"
                >
                  <ChevronLeft className="h-4 w-4" />
                </ButtonDefault>

                {/* Smart page numbers */}
                <div className="flex gap-1">
                  {getPageNumbers().map((page, index) =>
                    page === "..." ? (
                      <span
                        key={`ellipsis-${index}`}
                        className="px-2 py-1 text-xs text-muted-foreground flex items-center"
                      >
                        ...
                      </span>
                    ) : (
                      <ButtonDefault
                        key={page}
                        size="xs"
                        variant="ghost"
                        onClick={() => handlePageClick(page as number)}
                        className={
                          currentPage === page
                            ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-gray-50"
                            : "hover:bg-muted dark:bg-accent-foreground"
                        }
                      >
                        {page}
                      </ButtonDefault>
                    )
                  )}
                </div>

                <ButtonDefault
                  size="xs"
                  variant="outline"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="hover:bg-muted"
                >
                  <ChevronRight className="h-4 w-4" />
                </ButtonDefault>
              </div>

              {/* Right: Empty space for balance */}
              <div className="w-[1px]"></div>
            </div>
          )}
        </CardContent>
      </Card>

      <ConfirmDialog
        open={showClearDialog}
        onOpenChange={setShowClearDialog}
        onConfirm={handleClearAll}
        title="Clear All Data?"
        description="This will permanently delete all your productivity log entries. This action cannot be undone."
        confirmText="Yes, clear all"
        cancelText="Cancel"
        variant="destructive"
      />
      <ConfirmDialog
        open={showSaveDialog}
        onOpenChange={setShowSaveDialog}
        onConfirm={handleSaveAll}
        title="Save All Data?"
        description="This will permanently save all your productivity log entries. This action cannot be undone."
        confirmText="Yes, save all"
        cancelText="Cancel"
      />
    </div>
  );
}
