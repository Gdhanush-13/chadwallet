import { JUPITER_PRICE_API, JUPITER_QUOTE_API } from "./constants";

export async function getTokenPrices(addresses: string[]) {
  const ids = addresses.join(",");
  const res = await fetch(`${JUPITER_PRICE_API}?ids=${ids}`, { next: { revalidate: 30 } });
  if (!res.ok) throw new Error(`Jupiter price API error: ${res.status}`);
  const data = await res.json();
  return data?.data || {};
}

export async function getQuote(inputMint: string, outputMint: string, amount: string, slippageBps = 50) {
  const params = new URLSearchParams({
    inputMint,
    outputMint,
    amount,
    slippageBps: slippageBps.toString(),
  });
  const res = await fetch(`${JUPITER_QUOTE_API}?${params}`);
  if (!res.ok) throw new Error(`Jupiter quote API error: ${res.status}`);
  return res.json();
}
