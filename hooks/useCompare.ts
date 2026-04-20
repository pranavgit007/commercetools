// hooks/useCompare.ts
"use client";

import { useEffect, useState } from "react";
import {
  getCompareItems,
  setCompareItems,
  CompareItem,
} from "@/lib/compareClient";
import Swal from "sweetalert2";

export function useCompare() {
  const [items, setItems] = useState<CompareItem[]>([]);

  useEffect(() => {
    setItems(getCompareItems());

    const handler = () => setItems(getCompareItems());

    window.addEventListener("compare-updated", handler);
    return () => window.removeEventListener("compare-updated", handler);
  }, []);

  function add(item: CompareItem) {
    const current = getCompareItems();

    // same category rule
    if (current.length && current[0].categoryId !== item.categoryId) {
      Swal.fire({
            icon: "info",
            text: "Please Clear compare list first,Only products from same category allowed!",
          });
      return;
    }

    if (current.length >= 4) {
      alert("Max 4 products allowed");
      return;
    }

    if (current.some((i) => i.id === item.id)) return;

    setCompareItems([...current, item]);
  }

  function remove(id: string) {
    const updated = getCompareItems().filter((i) => i.id !== id);
    setCompareItems(updated);
  }

  function clear() {
    setCompareItems([]);
  }

  return { items, add, remove, clear };
}
