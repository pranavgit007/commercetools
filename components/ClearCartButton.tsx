"use client"

import { clearCart } from "@/app/actions/cartActions"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function ClearCartButton() {
    const router = useRouter()

    async function handleClear() {
        await clearCart()

        toast.success("Cart cleared 🧹")

        router.refresh()
    }

    return (
        <button
            onClick={handleClear}
            className="bg-red-600 text-white px-4 py-2 mt-6 cursor-pointer"
        >
            Empty Cart
        </button>
    )
}