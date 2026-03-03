import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.redirect(
    new URL(
      "/",
      process.env.NEXT_PUBLIC_BASE_URL || "http://192.168.31.92:3000"
    )
  );

  res.cookies.set("ct_customer_token", "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });

  return res;
}
