"use client"

import { addToCart } from "@/app/actions/cartActions"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function AddToCartButton({
    productId,
    variantId,
}: {
    productId: string
    variantId: number
}) {
    const router = useRouter()

    const [loading, setLoading] = useState(false)

    async function handleAdd() {
        try {
            setLoading(true)

            await addToCart(productId, variantId)

            toast.success("Added to cart 🛒")

            router.refresh()
        } catch (e) {
            toast.error("Could not add item")
        } finally {
            setLoading(false)
        }
    }

    return (
        <button
            onClick={handleAdd}
            disabled={loading}
            className="bg-black text-white px-4 py-2 mt-4 disabled:opacity-50 cursor-pointer"
        >
            {loading ? "Adding..." : "Add To Cart"}
        </button>
    )
}