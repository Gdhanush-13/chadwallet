"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";

interface TokenTicker {
  address: string;
  symbol: string;
  name: string;
  price: number;
  priceChange24: number;
}

export default function TokenBanner({ position = "top" }: { position?: "top" | "bottom" }) {
  const [tokens, setTokens] = useState<TokenTicker[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchTokens() {
      try {
        const res = await fetch("/api/tokens");
        const data = await res.json();
        if (data.tokens) setTokens(data.tokens);
      } catch {
        // Fallback data
        setTokens([
          { address: "So11111111111111111111111111111111111111112", symbol: "SOL", name: "Solana", price: 145.23, priceChange24: 3.45 },
          { address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", symbol: "USDC", name: "USD Coin", price: 1.0, priceChange24: 0.01 },
          { address: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263", symbol: "BONK", name: "Bonk", price: 0.0000234, priceChange24: -2.1 },
          { address: "EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm", symbol: "WIF", name: "dogwifhat", price: 1.78, priceChange24: 5.2 },
          { address: "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN", symbol: "JUP", name: "Jupiter", price: 0.87, priceChange24: -1.3 },
          { address: "7GCihgDB8fe6KNjn2MYtkzZcRjQy3t9GHdC8uHYmW2hr", symbol: "POPCAT", name: "Popcat", price: 0.42, priceChange24: 8.7 },
          { address: "mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So", symbol: "mSOL", name: "Marinade SOL", price: 167.5, priceChange24: 3.1 },
          { address: "7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs", symbol: "RAY", name: "Raydium", price: 3.21, priceChange24: -0.5 },
        ]);
      }
    }
    fetchTokens();
    const interval = setInterval(fetchTokens, 30000);
    return () => clearInterval(interval);
  }, []);

  const direction = position === "top" ? "animate-scroll-left" : "animate-scroll-right";

  if (tokens.length === 0) return null;

  const duplicated = [...tokens, ...tokens, ...tokens];

  return (
    <div className="relative overflow-hidden bg-zinc-950 border-y border-yellow-500/10">
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-zinc-950 to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-zinc-950 to-transparent z-10" />
      <div ref={scrollRef} className={`flex gap-1 py-2 ${direction}`}>
        {duplicated.map((token, i) => (
          <Link
            key={`${token.address}-${i}`}
            href={`/trade/${token.address}`}
            className="flex shrink-0 items-center gap-2 rounded-lg px-4 py-1.5 transition hover:bg-zinc-800/50 cursor-pointer"
          >
            <span className="font-bold text-white text-sm">{token.symbol}</span>
            <span className="text-xs text-zinc-400">
              ${token.price < 0.01 ? token.price.toExponential(2) : token.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}
            </span>
            <span className={`text-xs font-medium ${token.priceChange24 >= 0 ? "text-green-400" : "text-red-400"}`}>
              {token.priceChange24 >= 0 ? "+" : ""}
              {token.priceChange24.toFixed(2)}%
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
