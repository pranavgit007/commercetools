// lib/compareClient.ts
export type CompareItem = {
  id: string;
  categoryId: string;
};

const KEY = "compare_items";

export function getCompareItems(): CompareItem[] {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(KEY) || "[]");
}

export function setCompareItems(items: CompareItem[]) {
  localStorage.setItem(KEY, JSON.stringify(items));

  // 🔥 notify all components
  window.dispatchEvent(new Event("compare-updated"));
}