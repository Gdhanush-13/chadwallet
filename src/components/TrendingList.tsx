"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { TrendingUp, Flame } from "lucide-react";

interface TrendingToken {
  address: string;
  symbol: string;
  name: string;
  price: number;
  priceChange24: number;
  volume24: number;
  imageUrl?: string;
}

export default function TrendingList({ activeAddress }: { activeAddress?: string }) {
  const [tokens, setTokens] = useState<TrendingToken[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTrending() {
      try {
        const res = await fetch("/api/tokens");
        const data = await res.json();
        if (data.tokens) setTokens(data.tokens);
      } catch {
        // Fallback
        setTokens([
          { address: "So11111111111111111111111111111111111111112", symbol: "SOL", name: "Solana", price: 145.23, priceChange24: 3.45, volume24: 2400000000 },
          { address: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263", symbol: "BONK", name: "Bonk", price: 0.0000234, priceChange24: -2.1, volume24: 89000000 },
          { address: "EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm", symbol: "WIF", name: "dogwifhat", price: 1.78, priceChange24: 5.2, volume24: 156000000 },
          { address: "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN", symbol: "JUP", name: "Jupiter", price: 0.87, priceChange24: -1.3, volume24: 67000000 },
          { address: "7GCihgDB8fe6KNjn2MYtkzZcRjQy3t9GHdC8uHYmW2hr", symbol: "POPCAT", name: "Popcat", price: 0.42, priceChange24: 8.7, volume24: 34000000 },
          { address: "mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So", symbol: "mSOL", name: "Marinade SOL", price: 167.5, priceChange24: 3.1, volume24: 12000000 },
          { address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", symbol: "USDC", name: "USD Coin", price: 1.0, priceChange24: 0.01, volume24: 5800000000 },
          { address: "7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs", symbol: "RAY", name: "Raydium", price: 3.21, priceChange24: -0.5, volume24: 45000000 },
        ]);
      }
      setLoading(false);
    }
    fetchTrending();
    const interval = setInterval(fetchTrending, 30000);
    return () => clearInterval(interval);
  }, []);

  const formatVolume = (v: number) => {
    if (v >= 1e9) return `$${(v / 1e9).toFixed(1)}B`;
    if (v >= 1e6) return `$${(v / 1e6).toFixed(1)}M`;
    if (v >= 1e3) return `$${(v / 1e3).toFixed(1)}K`;
    return `$${v.toFixed(0)}`;
  };

  return (
    <div className="flex h-full flex-col rounded-xl border border-zinc-800 bg-zinc-900/50">
      <div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-3">
        <Flame className="h-4 w-4 text-yellow-400" />
        <span className="text-sm font-bold text-white">Trending</span>
        <TrendingUp className="ml-auto h-3.5 w-3.5 text-zinc-500" />
      </div>

      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-yellow-400 border-t-transparent" />
          </div>
        ) : (
          <div className="divide-y divide-zinc-800/50">
            {tokens.map((token, i) => (
              <Link
                key={token.address}
                href={`/trade/${token.address}`}
                className={`flex items-center gap-3 px-4 py-3 transition hover:bg-zinc-800/50 ${
                  activeAddress === token.address ? "bg-yellow-400/5 border-l-2 border-l-yellow-400" : ""
                }`}
              >
                <span className="w-5 text-xs text-zinc-600 font-mono">{i + 1}</span>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800 text-xs font-bold text-yellow-400">
                  {token.symbol.slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-bold text-white truncate">{token.symbol}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-zinc-500 truncate">{token.name}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-mono text-zinc-300">
                    ${token.price < 0.01 ? token.price.toExponential(2) : token.price.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                  </div>
                  <div className={`text-xs font-medium ${token.priceChange24 >= 0 ? "text-green-400" : "text-red-400"}`}>
                    {token.priceChange24 >= 0 ? "+" : ""}{token.priceChange24.toFixed(2)}%
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
