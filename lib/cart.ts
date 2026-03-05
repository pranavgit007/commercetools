import { cookies } from "next/headers";
import { getApiRoot } from "@/lib/commercetools";

export async function getCart() {
  const apiRoot = getApiRoot();
  const cookieStore = await cookies();

  const cartId = cookieStore.get("ct_cart_id")?.value;

  if (!cartId) return null;

  try {
    const cart = await apiRoot.carts().withId({ ID: cartId }).get().execute();

    return cart.body;
  } catch {
    return null;
  }
}
