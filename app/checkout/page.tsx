import { getCart } from "@/app/actions/cartActions"
import CheckoutForm from "@/components/CheckoutForm"

export default async function CheckoutPage() {
    const cart = await getCart()

    if (!cart || cart.lineItems.length === 0) {
        return (
            <div className="p-10">
                <p>Your cart is empty</p>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto p-10">
            <h1 className="text-2xl mb-6">Checkout</h1>

            <CheckoutForm cart={cart} />
        </div>
    )
}