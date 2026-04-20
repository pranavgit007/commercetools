// components/CompareBar.tsx
"use client";

import Link from "next/link";
import { useCompare } from "@/hooks/useCompare";

export default function CompareBar() {
    const { items, remove, clear } = useCompare();

    if (!items.length) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 flex items-center justify-between z-50">
            {/* Left */}
            <div className="flex items-center gap-3">
                <span className="font-semibold">
                    Compare ({items.length}/4)
                </span>

                {items.map((item) => (
                    <div key={item.id} className="border px-2 py-1 flex items-center gap-2">
                        <span className="text-sm">{item.id}</span>

                        <button
                            onClick={() => remove(item.id)}
                            className="text-red-500"
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </div>

            {/* Right */}
            <div className="flex gap-2">
                <button onClick={clear} className="border px-3 py-1">
                    Clear
                </button>

                <Link
                    href="/compare"
                    className="bg-black text-white px-4 py-2"
                >
                    Compare Now
                </Link>
            </div>
        </div>
    );
}