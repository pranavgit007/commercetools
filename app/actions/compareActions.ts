"use client";

import { getCompareItems, setCompareItems } from "@/lib/compareClient";
import { CompareItem } from "@/types/compare";
import Swal from "sweetalert2";

export function addToCompare(product: CompareItem) {
  const items = getCompareItems();

  // Same category check
  if (items.length && items[0].categoryId !== product.categoryId) {
    Swal.fire({
      icon: "info",
      text: "Please Clear compare list first,Only products from same category allowed!",
    });
    return;
  }

  // Max 4
  if (items.length >= 4) {
    Swal.fire({
      icon: "info",
      text: "Max 4 products allowed!",
    });
    return;
  }

  // Avoid duplicate
  if (items.find((i) => i.id === product.id)) {
    return;
  }

  setCompareItems([...items, product]);
}
export function clearCompare() {
  setCompareItems([]);
}
