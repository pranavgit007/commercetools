"use client"

import { useState } from "react"
import { placeOrder } from "@/app/actions/orderActions"
import { useRouter } from "next/navigation"

export default function CheckoutForm({ cart }: any) {
    const router = useRouter()

    const [address, setAddress] = useState({
        firstName: "",
        lastName: "",
        streetName: "",
        city: "",
        postalCode: "",
        country: "US",
    })

    const [paymentMethod, setPaymentMethod] = useState("cod")

    async function handleSubmit(e: any) {
        e.preventDefault()

        const order = await placeOrder(cart.id, address)

        router.push(`/order-success/${order.id}`)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">

            <h2 className="text-lg font-semibold">Shipping Address</h2>

            <input
                placeholder="First Name"
                className="border p-2 w-full"
                onChange={(e) =>
                    setAddress({ ...address, firstName: e.target.value })
                }
            />

            <input
                placeholder="Last Name"
                className="border p-2 w-full"
                onChange={(e) =>
                    setAddress({ ...address, lastName: e.target.value })
                }
            />

            <input
                placeholder="Street"
                className="border p-2 w-full"
                onChange={(e) =>
                    setAddress({ ...address, streetName: e.target.value })
                }
            />

            <input
                placeholder="City"
                className="border p-2 w-full"
                onChange={(e) =>
                    setAddress({ ...address, city: e.target.value })
                }
            />

            <input
                placeholder="Postal Code"
                className="border p-2 w-full"
                onChange={(e) =>
                    setAddress({ ...address, postalCode: e.target.value })
                }
            />

            <h2 className="text-lg font-semibold">Payment</h2>

            <label>
                <input
                    type="radio"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                />
                Cash On Delivery
            </label>

            <label>
                <input
                    type="radio"
                    value="po"
                    checked={paymentMethod === "po"}
                    onChange={() => setPaymentMethod("po")}
                />
                Purchase Order
            </label>

            <button
                type="submit"
                className="bg-black text-white px-6 py-3"
            >
                Place Order
            </button>

        </form>
    )
}