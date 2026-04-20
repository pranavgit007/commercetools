import { NextResponse } from "next/server";
import { getApiRoot } from "@/lib/commercetools";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const ids = searchParams.get("ids");

    if (!ids) {
      return NextResponse.json([]);
    }

    const idArray = ids.split(",");

    const apiRoot = getApiRoot();

    const res = await apiRoot
      .productProjections()
      .get({
        queryArgs: {
          where: `id in ("${idArray.join('","')}")`,
          staged: false, // published products only
          expand: "productType", // optional expansion
        },
      })
      .execute();

    return NextResponse.json(res.body.results);
  } catch (error) {
    console.error("Compare API error:", error);

    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
