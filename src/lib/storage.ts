// src/lib/storage.ts
import type { Prodlog } from "@/types/prodlog";

const STORAGE_KEYS = {
  PRODLOGS: "felco_prodlogs",
  THEME: "felco_theme",
  SIDEBAR: "felco_sidebar_open",
} as const;

// Prodlogs Storage
export const storageUtils = {
  // Get prodlogs from localStorage
  getProdlogs: (): Prodlog[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PRODLOGS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Error reading prodlogs from localStorage:", error);
      return [];
    }
  },

  // Save prodlogs to localStorage
  saveProdlogs: (data: Prodlog[]): boolean => {
    try {
      localStorage.setItem(STORAGE_KEYS.PRODLOGS, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error("Error saving prodlogs to localStorage:", error);
      return false;
    }
  },

  // Clear all prodlogs
  clearProdlogs: (): boolean => {
    try {
      localStorage.removeItem(STORAGE_KEYS.PRODLOGS);
      return true;
    } catch (error) {
      console.error("Error clearing prodlogs:", error);
      return false;
    }
  },

  // Theme Storage
  getTheme: (): "light" | "dark" => {
    try {
      const theme = localStorage.getItem(STORAGE_KEYS.THEME);
      return theme === "dark" ? "dark" : "light";
    } catch (error) {
      console.error("Error reading theme from localStorage:", error);
      return "light";
    }
  },

  saveTheme: (theme: "light" | "dark"): boolean => {
    try {
      localStorage.setItem(STORAGE_KEYS.THEME, theme);
      return true;
    } catch (error) {
      console.error("Error saving theme to localStorage:", error);
      return false;
    }
  },

  // Sidebar Storage
  getSidebarState: (): boolean => {
    try {
      const state = localStorage.getItem(STORAGE_KEYS.SIDEBAR);
      return state === "true";
    } catch (error) {
      console.error("Error reading sidebar state from localStorage:", error);
      return true; // Default to open
    }
  },

  saveSidebarState: (isOpen: boolean): boolean => {
    try {
      localStorage.setItem(STORAGE_KEYS.SIDEBAR, String(isOpen));
      return true;
    } catch (error) {
      console.error("Error saving sidebar state to localStorage:", error);
      return false;
    }
  },
};
