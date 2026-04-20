"use client";

import { useEffect, useState } from "react";
import { getCompareItems } from "@/lib/compareClient";
import CompareTable from '../../components/CompareTable';


export default function ComparePage() {
    const [products, setProducts] = useState<any[]>([]);

    async function loadProducts() {
        const items = getCompareItems();

        if (!items.length) {
            setProducts([]);
            return;
        }

        const ids = items.map((i) => i.id).join(",");

        const res = await fetch(`/api/products?ids=${ids}`);
        const data = await res.json();

        setProducts(data);
    }

    useEffect(() => {
        loadProducts();

        // 🔥 listen for updates
        window.addEventListener("compare-updated", loadProducts);

        return () =>
            window.removeEventListener("compare-updated", loadProducts);
    }, []);

    if (!products.length) {
        return <p>No products to compare</p>;
    }

    return (
        <div>
            <h1 className="text-xl mb-4">Compare Products</h1>
            <CompareTable products={products} />
        </div>
    );
}