import { cookies } from "next/headers";
import { getApiRoot } from "@/lib/commercetools";

export default async function CartPage() {
  const cookieStore = await cookies();
  const cartId = cookieStore.get("ct_cart_id")?.value;

  if (!cartId) {
    return <p>Your cart is empty</p>;
  }

  const apiRoot = getApiRoot();

  const cart = await apiRoot.carts().withId({ ID: cartId }).get().execute();

  return (
    <div className="p-10">
      <h1 className="text-2xl mb-6">Cart</h1>

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
