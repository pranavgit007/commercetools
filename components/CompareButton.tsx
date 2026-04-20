"use client";

import { useCompare } from "@/hooks/useCompare";

export function CompareButton({ product }: any) {
    const { add, items } = useCompare();

    const isAdded = items.some((i) => i.id === product.id);

    return (
        <button
            onClick={() =>
                add({
                    id: product.id,
                    categoryId: product.categories?.[0]?.id,
                })
            }
            disabled={isAdded}
            className="bg-black text-white px-4 py-2 mt-4 disabled:opacity-50 cursor-pointer float-right"
        >
            {isAdded ? "Added" : "Add to Compare"}
        </button>
    );
}