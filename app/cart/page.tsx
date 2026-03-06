import { cookies } from "next/headers";
import { getApiRoot } from "@/lib/commercetools";
import ClearCartButton from "@/components/ClearCartButton"
import Link from "next/link";

export default async function CartPage() {
  const cookieStore = await cookies();
  const cartId = cookieStore.get("ct_cart_id")?.value;

  if (!cartId) {
    return <p>Your cart is empty</p>;
  }

  const apiRoot = getApiRoot();

  const cart = await apiRoot.carts().withId({ ID: cartId }).get().execute();
   if (!cart.body.lineItems.length) {
      return <EmptyCart />
    }
  return (
    <div className="p-10">
      <div className="flex justify-between">
         <h1 className="text-2xl mb-6">Cart</h1>
        <ClearCartButton />
        </div>
        {cart.body.lineItems.map((item) => (
        <div key={item.id} className="border-b py-4">
          <p>{item.name["en-US"]}</p>
          <p>Qty: {item.quantity}</p>
          <p>
            {item.price.value.currencyCode} {item.price.value.centAmount / 100}
          </p>
        </div>
      ))}
    </div>
  );
}

function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-6">
      <h2 className="text-2xl font-semibold">Your cart is empty</h2>

      <p className="text-gray-500">
        Looks like you haven't added anything yet.
      </p>

      <Link
        href="/"
        className="bg-black text-white px-6 py-3"
      >
        Continue Shopping
      </Link>
    </div>
  )
}
