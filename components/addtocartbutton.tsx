"use client"

import { addToCart } from "@/app/actions/cartActions"

export default function AddToCartButton({
    productId,
    variantId,
}: {
    productId: string
    variantId: number
}) {
    return (
        <button
            onClick={async () => {
                await addToCart(productId, variantId)
                alert("Added to cart")
                location.reload()
            }}
            className="bg-black text-white px-4 py-2 mt-4 cursor-pointer"
        >
            Add To Cart
        </button>
    )
}