"use server"

import { cookies } from "next/headers"
import { getApiRoot } from "@/lib/commercetools"

export async function addToCart(productId: string, variantId: number) {
  const apiRoot = getApiRoot()

  const cookieStore = await cookies()
  let cartId = cookieStore.get("ct_cart_id")?.value

  let cart

  // create cart if missing
  if (!cartId) {
    const newCart = await apiRoot
      .carts()
      .post({
        body: {
          currency: "USD",
          country: "US",
        },
      })
      .execute()

    cartId = newCart.body.id
    cart = newCart.body

    cookieStore.set("ct_cart_id", cartId, {
      path: "/",
      httpOnly: true,
    })
  } else {
    const existingCart = await apiRoot
      .carts()
      .withId({ ID: cartId })
      .get()
      .execute()

    cart = existingCart.body
  }

  // add line item
  const updatedCart = await apiRoot
    .carts()
    .withId({ ID: cart.id })
    .post({
      body: {
        version: cart.version,
        actions: [
          {
            action: "addLineItem",
            productId,
            variantId,
            quantity: 1,
          },
        ],
      },
    })
    .execute()

  return updatedCart.body
}