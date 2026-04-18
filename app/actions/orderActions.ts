"use server";

import { getApiRoot } from "@/lib/commercetools";
import { cookies } from "next/headers";

export async function placeOrder(cartId: string, address: any) {
  const apiRoot = getApiRoot();
  const cart = await apiRoot.carts().withId({ ID: cartId }).get().execute();
  const cookieStore = await cookies();
  // set shipping address
  const updatedCart = await apiRoot
    .carts()
    .withId({ ID: cartId })
    .post({
      body: {
        version: cart.body.version,
        actions: [
          {
            action: "setShippingAddress",
            address,
          },
        ],
      },
    })
    .execute();

  // convert cart to order
  const order = await apiRoot
    .orders()
    .post({
      body: {
        id: updatedCart.body.id,
        version: updatedCart.body.version,
      },
    })
    .execute();
  // ✅ 4. Clear cart cookie
  cookieStore.delete("ct_cart_id");

  return order.body;
}
