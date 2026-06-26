import { NextRequest, NextResponse } from "next/server";
import { JUPITER_QUOTE_API } from "@/lib/constants";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const inputMint = searchParams.get("inputMint") || "";
  const outputMint = searchParams.get("outputMint") || "";
  const amount = searchParams.get("amount") || "0";
  const slippageBps = searchParams.get("slippageBps") || "50";

  try {
    const params = new URLSearchParams({ inputMint, outputMint, amount, slippageBps });
    const res = await fetch(`${JUPITER_QUOTE_API}?${params}`);
    if (!res.ok) throw new Error(`Jupiter quote error: ${res.status}`);
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch quote" },
      { status: 500 }
    );
  }
}
