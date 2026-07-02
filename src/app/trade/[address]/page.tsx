"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft, ExternalLink, Copy, Check, Star } from "lucide-react";
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
  volume24?: number;
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
          setToken({ address, symbol: address.slice(0, 4).toUpperCase(), name: "Unknown Token", price: 0, priceChange24: 0 });
        }
      } catch {
        setToken({ address, symbol: "TOKEN", name: "Token", price: 0, priceChange24: 0 });
      }
    }
    fetchToken();
    const iv = setInterval(fetchToken, 15000);
    return () => clearInterval(iv);
  }, [address]);

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const fmtPrice = (p: number) =>
    p === 0 ? "—" : p < 0.01 ? `$${p.toExponential(2)}` : `$${p.toLocaleString(undefined, { maximumFractionDigits: 6 })}`;

  const fmtVol = (v?: number) => {
    if (!v) return "—";
    if (v >= 1e9) return `$${(v / 1e9).toFixed(1)}B`;
    if (v >= 1e6) return `$${(v / 1e6).toFixed(1)}M`;
    return `$${(v / 1e3).toFixed(0)}K`;
  };

  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-yellow-400 border-t-transparent" />
      </div>
    );
  }

  const isUp = token.priceChange24 >= 0;

  return (
    <div className="flex h-screen flex-col bg-black overflow-hidden">
      <Navbar />
      <TokenBanner position="top" />

      {/* ── Token header bar ── */}
      <div className="shrink-0 border-b border-zinc-800/80 bg-zinc-950 px-4 py-3">
        <div className="mx-auto flex max-w-[1600px] items-center gap-3 flex-wrap">
          <Link href="/" className="rounded-lg p-1.5 text-zinc-500 transition hover:bg-zinc-800 hover:text-white">
            <ArrowLeft className="h-4 w-4" />
          </Link>

          {/* Token identity */}
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-yellow-400/15 text-xs font-black text-yellow-400">
            {token.symbol.slice(0, 2)}
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-base font-black text-white">{token.symbol}</span>
            <span className="text-sm text-zinc-500">{token.name}</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 ml-2">
            <span className="text-xl font-black font-mono text-white">{fmtPrice(token.price)}</span>
            <span className={`text-sm font-bold ${isUp ? "text-green-400" : "text-red-400"}`}>
              {isUp ? "▲" : "▼"} {Math.abs(token.priceChange24).toFixed(2)}%
            </span>
          </div>

          {/* Stats row */}
          <div className="hidden xl:flex items-center gap-6 ml-4 border-l border-zinc-800 pl-4">
            <div>
              <div className="text-[10px] text-zinc-600 uppercase tracking-wide">24h Vol</div>
              <div className="text-xs font-bold text-zinc-300">{fmtVol(token.volume24)}</div>
            </div>
            <div>
              <div className="text-[10px] text-zinc-600 uppercase tracking-wide">Network</div>
              <div className="text-xs font-bold text-yellow-400">Solana</div>
            </div>
          </div>

          {/* Right actions */}
          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="hidden sm:flex items-center gap-1.5 rounded-lg border border-zinc-800 px-2.5 py-1.5 text-xs font-mono text-zinc-500 transition hover:border-zinc-600 hover:text-zinc-300"
            >
              {copied ? <Check className="h-3 w-3 text-green-400" /> : <Copy className="h-3 w-3" />}
              {address.slice(0, 6)}…{address.slice(-4)}
            </button>
            <a
              href={`https://solscan.io/token/${address}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 rounded-lg border border-zinc-800 px-2.5 py-1.5 text-xs text-zinc-500 transition hover:border-zinc-600 hover:text-zinc-300"
            >
              <ExternalLink className="h-3 w-3" />
              Solscan
            </a>
            <button className="rounded-lg border border-zinc-800 p-1.5 text-zinc-600 transition hover:border-yellow-500/40 hover:text-yellow-400">
              <Star className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Main trading layout ── */}
      <div className="flex flex-1 overflow-hidden max-w-[1600px] mx-auto w-full">

        {/* Left: Trending tokens */}
        <div className="hidden lg:flex w-56 xl:w-64 shrink-0 flex-col border-r border-zinc-800/60 overflow-y-auto">
          <TrendingList activeAddress={address} />
        </div>

        {/* Center: Chart + Live trades */}
        <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
          <div className="flex-1 min-h-0 p-3">
            <PriceChart address={address} />
          </div>
          <div className="h-56 shrink-0 border-t border-zinc-800/60 overflow-hidden">
            <LiveTrades tokenSymbol={token.symbol} />
          </div>
        </div>

        {/* Right: Trade panel */}
        <div className="hidden md:flex w-72 xl:w-80 shrink-0 flex-col border-l border-zinc-800/60 overflow-y-auto">
          <TradePanel tokenAddress={address} tokenSymbol={token.symbol} tokenPrice={token.price} />
        </div>
      </div>

      {/* Mobile: Trade panel below */}
      <div className="shrink-0 border-t border-zinc-800 md:hidden overflow-y-auto max-h-96">
        <TradePanel tokenAddress={address} tokenSymbol={token.symbol} tokenPrice={token.price} />
      </div>

      <TokenBanner position="bottom" />
    </div>
  );
}
