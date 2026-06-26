import { SOLANA_NETWORK_ID } from "./constants";

const CODEX_API_URL = "https://graph.codex.io/graphql";
const CODEX_API_KEY = process.env.CODEX_API_KEY || "";

export async function codexQuery(query: string, variables?: Record<string, unknown>) {
  const res = await fetch(CODEX_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: CODEX_API_KEY,
    },
    body: JSON.stringify({ query, variables }),
  });
  if (!res.ok) throw new Error(`Codex API error: ${res.status}`);
  return res.json();
}

export async function getTrendingTokens(limit = 20) {
  const query = `
    query GetTrendingTokens($limit: Int, $networkFilter: [Int!]) {
      listTopTokens(limit: $limit, networkFilter: $networkFilter) {
        address
        name
        symbol
        imageUrl
        price
        priceChange24
        volume24
        liquidity
        networkId
      }
    }
  `;
  const data = await codexQuery(query, {
    limit,
    networkFilter: [SOLANA_NETWORK_ID],
  });
  return data?.data?.listTopTokens || [];
}

export async function getTokenInfo(address: string) {
  const query = `
    query GetToken($address: String!, $networkId: Int!) {
      token(input: { address: $address, networkId: $networkId }) {
        address
        name
        symbol
        decimals
        imageUrl
        totalSupply
        info {
          circulatingSupply
          imageThumbUrl
          imageLargeUrl
          description
        }
      }
    }
  `;
  const data = await codexQuery(query, {
    address,
    networkId: SOLANA_NETWORK_ID,
  });
  return data?.data?.token || null;
}

export async function getTokenBars(address: string, from: number, to: number, resolution = "60") {
  const query = `
    query GetBars($symbol: String!, $from: Int!, $to: Int!, $resolution: String!) {
      getBars(symbol: $symbol, from: $from, to: $to, resolution: $resolution) {
        o
        h
        l
        c
        v
        t
      }
    }
  `;
  const symbol = `${address}:${SOLANA_NETWORK_ID}`;
  const data = await codexQuery(query, { symbol, from, to, resolution });
  return data?.data?.getBars || null;
}
