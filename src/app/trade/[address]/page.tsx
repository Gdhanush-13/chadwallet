"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft, ExternalLink, Copy, Check } from "lucide-react";
import Link from "next/link";
import TokenBanner from "@/components/TokenBanner";
import TrendingList from "@/components/TrendingList";
import PriceChart from "@/components/PriceChart";
import TradePanel from "@/components/TradePanel";
import LiveTrades from "@/components/LiveTrades";
import Navbar from "@/components/Navbar";

interface TokenInfo {
  address: string;
  symbol: string;
  name: string;
  price: number;
  priceChange24: number;
}

export default function TradePage() {
  const params = useParams();
  const address = params.address as string;
  const [token, setToken] = useState<TokenInfo | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function fetchToken() {
      try {
        const res = await fetch("/api/tokens");
        const data = await res.json();
        const found = data.tokens?.find((t: TokenInfo) => t.address === address);
        if (found) {
          setToken(found);
        } else {
          setToken({
            address,
            symbol: address.slice(0, 4).toUpperCase(),
            name: "Unknown Token",
            price: 0,
            priceChange24: 0,
          });
        }
      } catch {
        setToken({
          address,
          symbol: "TOKEN",
          name: "Token",
          price: 0,
          priceChange24: 0,
        });
      }
    }
    fetchToken();
  }, [address]);

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-yellow-400 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-black">
      <Navbar />
      <TokenBanner position="top" />

      {/* Token Header */}
      <div className="border-b border-zinc-800 bg-zinc-950 px-4 py-4">
        <div className="mx-auto flex max-w-7xl items-center gap-4">
          <Link href="/" className="rounded-lg border border-zinc-800 p-2 transition hover:bg-zinc-800">
            <ArrowLeft className="h-4 w-4 text-zinc-400" />
          </Link>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400/10 text-sm font-bold text-yellow-400">
            {token.symbol.slice(0, 2)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-white">{token.name}</h1>
              <span className="rounded bg-zinc-800 px-2 py-0.5 text-xs font-bold text-yellow-400">
                {token.symbol}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-white font-mono">
                ${token.price < 0.01 ? token.price.toExponential(2) : token.price.toLocaleString(undefined, { maximumFractionDigits: 6 })}
              </span>
              <span className={`text-sm font-medium ${token.priceChange24 >= 0 ? "text-green-400" : "text-red-400"}`}>
                {token.priceChange24 >= 0 ? "+" : ""}{token.priceChange24.toFixed(2)}%
              </span>
            </div>
          </div>
          <div className="ml-auto hidden items-center gap-2 sm:flex">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 rounded-lg border border-zinc-800 px-3 py-1.5 text-xs text-zinc-400 transition hover:bg-zinc-800"
            >
              {copied ? <Check className="h-3 w-3 text-green-400" /> : <Copy className="h-3 w-3" />}
              {address.slice(0, 6)}...{address.slice(-4)}
            </button>
            <a
              href={`https://solscan.io/token/${address}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-lg border border-zinc-800 px-3 py-1.5 text-xs text-zinc-400 transition hover:bg-zinc-800"
            >
              <ExternalLink className="h-3 w-3" />
              Solscan
            </a>
          </div>
        </div>
      </div>

      {/* Trading Layout */}
      <div className="mx-auto flex w-full max-w-7xl flex-1 gap-4 p-4">
        {/* Left: Trending */}
        <div className="hidden w-64 shrink-0 lg:block">
          <TrendingList activeAddress={address} />
        </div>

        {/* Middle: Chart + Trades */}
        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <PriceChart address={address} />
          <LiveTrades tokenSymbol={token.symbol} />
        </div>

        {/* Right: Trade Panel */}
        <div className="hidden w-80 shrink-0 md:block">
          <TradePanel
            tokenAddress={address}
            tokenSymbol={token.symbol}
            tokenPrice={token.price}
          />
        </div>
      </div>

      {/* Mobile Trade Panel */}
      <div className="border-t border-zinc-800 p-4 md:hidden">
        <TradePanel
          tokenAddress={address}
          tokenSymbol={token.symbol}
          tokenPrice={token.price}
        />
      </div>

      <TokenBanner position="bottom" />
    </div>
  );
}
