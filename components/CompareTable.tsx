"use client";

import { useState } from "react";

export default function CompareTable({ products }: { products: any[] }) {
    const [showDiff, setShowDiff] = useState(false);
    const highLightColor = "bg-yellow-100";
    function resolveAttributeValue(value: any, locale = "en-US"): string {
        if (value == null) return "-";

        // 🔹 primitive
        if (typeof value === "string" || typeof value === "number") {
            return String(value);
        }

        // 🔹 LocalizedString
        if (value[locale]) {
            return value[locale];
        }

        // 🔹 Enum (label)
        if (value.label) {
            return value.label[locale] || value.key;
        }

        // 🔹 Set (array)
        if (Array.isArray(value)) {
            return value
                .map((v) => resolveAttributeValue(v, locale))
                .join(", ");
        }

        // 🔹 fallback
        return JSON.stringify(value);
    }
    function getAttributes(product: any) {
        const attrs: Record<string, string> = {};

        product.masterVariant.attributes?.forEach((a: any) => {
            attrs[a.name] = resolveAttributeValue(a.value);
        });

        return attrs;
    }
    // 🔹 Normalize attributes
    const productAttrs = products.map((p) => getAttributes(p));

    // 🔹 Collect all attribute keys
    const allKeys = Array.from(
        new Set(productAttrs.flatMap((a) => Object.keys(a)))
    );

    return (
        <div className="p-4">
            {/* Toggle */}
            <div className="mb-4">
                <label>
                    <input
                        type="checkbox"
                        checked={showDiff}
                        onChange={(e) => setShowDiff(e.target.checked)}
                    />
                    <span className="ml-2">Highlight Differences</span>
                </label>
            </div>

            <div className="overflow-x-auto">
                <table className="border w-full">
                    <thead>
                        <tr>
                            <th className="border p-2">Feature</th>

                            {products.map((p) => (
                                <th key={p.id} className="border p-2 text-center">
                                    <img
                                        src={p.masterVariant.images?.[0]?.url}
                                        alt={p.name["en-US"]}
                                        className="h-24 mx-auto mb-2"
                                    />
                                    <div>{p.name["en-US"]}</div>
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {/* Price Row */}
                        <tr>
                            <td className="border p-2 font-semibold">Price</td>
                            {products.map((p) => {
                                const values = products.map((a) => a.masterVariant.prices?.[0]?.value?.centAmount || "-");
                                const isSame = new Set(values).size === 1;
                                return (
                                    <td key={p.id} className={`border p-2 text-center ${showDiff && !isSame ? highLightColor : ""
                                        }`}>
                                        {p.masterVariant.prices?.[0]?.value?.centAmount / 100}
                                    </td>
                                );
                            })}
                        </tr>

                        {/* Attributes */}
                        {allKeys.map((key) => {
                            const values = productAttrs.map((a) => a[key] || "-");

                            const isSame = new Set(values).size === 1;

                            //if (showDiff && isSame) return null;

                            return (
                                <tr key={key}>
                                    <td className="border p-2 font-medium">{key}</td>

                                    {values.map((v, i) => (
                                        <td
                                            key={i}
                                            className={`border p-2 text-center ${showDiff && !isSame ? highLightColor : ""
                                                }`}
                                        >
                                            {v}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}