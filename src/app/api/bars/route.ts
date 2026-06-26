import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const address = searchParams.get("address") || "";
  const from = parseInt(searchParams.get("from") || "0");
  const to = parseInt(searchParams.get("to") || "0");
  const resolution = searchParams.get("resolution") || "60";

  const CODEX_API_KEY = process.env.CODEX_API_KEY || "";

  // Try Codex API first
  if (CODEX_API_KEY) {
    try {
      const symbol = `${address}:1399811149`;
      const query = `query { getBars(symbol: "${symbol}", from: ${from}, to: ${to}, resolution: "${resolution}") { o h l c v t } }`;
      const res = await fetch("https://graph.codex.io/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: CODEX_API_KEY },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      if (data?.data?.getBars) {
        return NextResponse.json({ bars: data.data.getBars });
      }
    } catch {}
  }

  // Generate realistic mock OHLCV data
  const bars: { o: number[]; h: number[]; l: number[]; c: number[]; v: number[]; t: number[] } = {
    o: [], h: [], l: [], c: [], v: [], t: [],
  };

  const interval = resolution === "15" ? 900 : resolution === "D" ? 86400 : 3600;
  const numBars = Math.min(Math.floor((to - from) / interval), 200);
  let price = address.startsWith("So1") ? 145 : address.startsWith("EP") ? 1 : 2 + Math.random() * 8;

  for (let i = 0; i < numBars; i++) {
    const t = from + i * interval;
    const open = price;
    const change = (Math.random() - 0.48) * price * 0.03;
    const close = open + change;
    const high = Math.max(open, close) * (1 + Math.random() * 0.015);
    const low = Math.min(open, close) * (1 - Math.random() * 0.015);
    const vol = Math.floor(Math.random() * 10000000) + 100000;

    bars.o.push(parseFloat(open.toFixed(6)));
    bars.h.push(parseFloat(high.toFixed(6)));
    bars.l.push(parseFloat(low.toFixed(6)));
    bars.c.push(parseFloat(close.toFixed(6)));
    bars.v.push(vol);
    bars.t.push(t);
    price = close;
  }

  return NextResponse.json({ bars });
}
