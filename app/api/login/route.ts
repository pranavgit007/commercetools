import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const response = await fetch(
    `${process.env.CTP_AUTH_URL}/oauth/${process.env.CTP_PROJECT_KEY}/customers/token`,
    {
      method: "POST",
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(
            `${process.env.CTP_CLIENT_ID}:${process.env.CTP_CLIENT_SECRET}`
          ).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "password",
        username: email,
        password: password,
        scope: process.env.CTP_SCOPES!,
      }),
    }
  );

  if (!response.ok) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const data = await response.json();

  const res = NextResponse.json({ success: true });

  res.cookies.set("ct_customer_token", data.access_token, {
    httpOnly: true,
    path: "/",
    secure: false,          // 🔥 MUST be false on localhost
    sameSite: 'lax',        // 🔥 important
    maxAge: 60 * 60 * 24,
  });

  return res;
}
