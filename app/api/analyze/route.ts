import { NextResponse } from "next/server";
import { SignatureV4 } from "@aws-sdk/signature-v4";
import { HttpRequest } from "@aws-sdk/protocol-http";
import { Sha256 } from "@aws-crypto/sha256-js";

export async function POST(request: Request) {
  try {
    // ✅ Parse incoming JSON (base64 image)
    const { image } = await request.json();

    if (!image) {
      return NextResponse.json({ error: "Image is required" }, { status: 400 });
    }

    // ✅ ENV variables (server-side only)
    const apiUrl = process.env.AWS_API_URL!;
    const region = process.env.AWS_REGION!;
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID!;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY!;

    if (!apiUrl || !region || !accessKeyId || !secretAccessKey) {
      return NextResponse.json(
        { error: "Missing AWS configuration" },
        { status: 500 }
      );
    }

    const url = new URL(apiUrl);

    // ✅ Create AWS request
    const awsRequest = new HttpRequest({
      protocol: url.protocol,
      hostname: url.hostname,
      path: url.pathname + url.search, // include query params if any
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        host: url.hostname,
      },
      body: JSON.stringify({ image }),
    });

    // ✅ Sign request (SigV4)
    const signer = new SignatureV4({
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
      region,
      service: "execute-api", // 🔥 required for API Gateway
      sha256: Sha256,
    });

    const signedRequest = await signer.sign(awsRequest);

    // ✅ Call AWS API Gateway
    const awsResponse = await fetch(apiUrl, {
      method: signedRequest.method,
      headers: signedRequest.headers as Record<string, string>,
      body: signedRequest.body,
    });

    const data = await awsResponse.json();
    if (!awsResponse.ok) {
      //const errorText = await awsResponse.text();
      return NextResponse.json(
        { error: "AWS API error", details: data },
        { status: awsResponse.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Image search error:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
