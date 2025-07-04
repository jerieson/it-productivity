// src/types/prodlog.ts
export type Prodlog = {
  id: number;
  month: string; // e.g., "07_Jul"
  weekNo: string; // e.g., "Week 1"
  plannedHours: number | ""; // Numeric input, can be empty string for blank
  actualHours: number | ""; // Numeric input, can be empty string for blank
  planned: "Planned" | "Unplanned" | ""; // Dropdown
  category: string; // Dropdown: "Project" | "Others"
  project: string; // Dropdown: e.g., "SFA", "Admin Work", etc.
  activity: string; // Dropdown: e.g., "Testing: Performance Testing"
  reason: string; // Dropdown: e.g., "SFA Support", can be empty
  remarks: string; // Free text, optional
};
