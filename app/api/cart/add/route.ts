import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getApiRoot } from "@/lib/commercetools";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const formData = await req.formData();
  const productId = formData.get("productId") as string;
  const variantId = Number(formData.get("variantId"));

  const cookieStore = await cookies();
  const existingCartId = cookieStore.get("cart_id")?.value;

  const apiRoot = getApiRoot();

  let cart;

  if (!existingCartId) {
    // Create new cart
    const response = await apiRoot
      .carts()
      .post({
        body: {
          currency: "USD",
          country: "US",
        },
      })
      .execute();

    cart = response.body;
  } else {
    const response = await apiRoot
      .carts()
      .withId({ ID: existingCartId })
      .get()
      .execute();

    cart = response.body;
  }

  // Add line item
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
    .execute();
  const res = NextResponse.redirect(
    new URL(
      "/",
      process.env.NEXT_PUBLIC_BASE_URL || "http://192.168.31.92:3000"
    )
  );
  //const res = NextResponse.redirect('/',new URL(process.env.NEXT_PUBLIC_URL, req.url));

  res.cookies.set("cart_id", updatedCart.body.id, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return res;
}
