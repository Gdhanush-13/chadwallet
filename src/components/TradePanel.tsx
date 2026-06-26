"use client";

import { useState } from "react";
import { usePrivySafe as usePrivy } from "@/lib/usePrivySafe";
import { ArrowDownUp, Wallet } from "lucide-react";

interface TradePanelProps {
  tokenAddress: string;
  tokenSymbol: string;
  tokenPrice: number;
}

export default function TradePanel({ tokenAddress, tokenSymbol, tokenPrice }: TradePanelProps) {
  const { authenticated, login, user } = usePrivy();
  const [mode, setMode] = useState<"buy" | "sell">("buy");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [slippage, setSlippage] = useState("1");

  const SOL_MINT = "So11111111111111111111111111111111111111112";
  const estimatedTokens = amount && tokenPrice > 0
    ? (parseFloat(amount) * (mode === "buy" ? 1 : tokenPrice)).toFixed(4)
    : "0";

  const handleSwap = async () => {
    if (!authenticated) { login(); return; }
    if (!amount || parseFloat(amount) <= 0) return;
    setLoading(true);
    try {
      const inputMint = mode === "buy" ? SOL_MINT : tokenAddress;
      const outputMint = mode === "buy" ? tokenAddress : SOL_MINT;
      const lamports = Math.floor(parseFloat(amount) * 1e9).toString();

      const res = await fetch(
        `/api/quote?inputMint=${inputMint}&outputMint=${outputMint}&amount=${lamports}&slippageBps=${parseInt(slippage) * 100}`
      );
      const quote = await res.json();
      if (quote.error) {
        alert(`Quote error: ${quote.error}`);
      } else {
        alert(`Quote received! Output: ${(parseInt(quote.outAmount) / 1e9).toFixed(6)} tokens. Swap execution requires wallet signing (coming soon).`);
      }
    } catch (err) {
      alert("Failed to get quote. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col rounded-xl border border-zinc-800 bg-zinc-900/50">
      {/* Buy/Sell Toggle */}
      <div className="flex border-b border-zinc-800">
        <button
          onClick={() => setMode("buy")}
          className={`flex-1 py-3 text-sm font-bold transition ${
            mode === "buy"
              ? "bg-green-500/10 text-green-400 border-b-2 border-green-400"
              : "text-zinc-500 hover:text-zinc-300"
          }`}
        >
          Buy
        </button>
        <button
          onClick={() => setMode("sell")}
          className={`flex-1 py-3 text-sm font-bold transition ${
            mode === "sell"
              ? "bg-red-500/10 text-red-400 border-b-2 border-red-400"
              : "text-zinc-500 hover:text-zinc-300"
          }`}
        >
          Sell
        </button>
      </div>

      <div className="flex flex-col gap-4 p-4">
        {/* Amount Input */}
        <div>
          <label className="mb-1.5 block text-xs text-zinc-500">
            {mode === "buy" ? "You Pay (SOL)" : `You Sell (${tokenSymbol})`}
          </label>
          <div className="flex items-center rounded-lg border border-zinc-700 bg-zinc-800/50 px-3 py-2.5">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="flex-1 bg-transparent text-lg font-mono text-white outline-none placeholder:text-zinc-600"
            />
            <span className="ml-2 rounded bg-zinc-700 px-2 py-0.5 text-xs font-bold text-zinc-300">
              {mode === "buy" ? "SOL" : tokenSymbol}
            </span>
          </div>
          <div className="mt-1 flex gap-2">
            {["0.1", "0.5", "1", "5"].map((v) => (
              <button
                key={v}
                onClick={() => setAmount(v)}
                className="rounded bg-zinc-800 px-2 py-1 text-xs text-zinc-400 transition hover:bg-zinc-700 hover:text-white"
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        {/* Arrow */}
        <div className="flex justify-center">
          <div className="rounded-full border border-zinc-700 bg-zinc-800 p-2">
            <ArrowDownUp className="h-4 w-4 text-yellow-400" />
          </div>
        </div>

        {/* Estimated Output */}
        <div>
          <label className="mb-1.5 block text-xs text-zinc-500">
            {mode === "buy" ? `You Receive (${tokenSymbol})` : "You Receive (SOL)"}
          </label>
          <div className="flex items-center rounded-lg border border-zinc-700 bg-zinc-800/30 px-3 py-2.5">
            <span className="flex-1 text-lg font-mono text-zinc-400">
              ~{estimatedTokens}
            </span>
            <span className="ml-2 rounded bg-zinc-700 px-2 py-0.5 text-xs font-bold text-zinc-300">
              {mode === "buy" ? tokenSymbol : "SOL"}
            </span>
          </div>
        </div>

        {/* Slippage */}
        <div>
          <label className="mb-1.5 block text-xs text-zinc-500">Slippage (%)</label>
          <div className="flex gap-2">
            {["0.5", "1", "2", "5"].map((s) => (
              <button
                key={s}
                onClick={() => setSlippage(s)}
                className={`flex-1 rounded py-1.5 text-xs font-medium transition ${
                  slippage === s
                    ? "bg-yellow-400 text-black"
                    : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                }`}
              >
                {s}%
              </button>
            ))}
          </div>
        </div>

        {/* Price Info */}
        <div className="rounded-lg bg-zinc-800/50 p-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-zinc-500">Price</span>
            <span className="font-mono text-zinc-300">
              ${tokenPrice < 0.01 ? tokenPrice.toExponential(2) : tokenPrice.toLocaleString(undefined, { maximumFractionDigits: 6 })}
            </span>
          </div>
          <div className="mt-1.5 flex items-center justify-between text-xs">
            <span className="text-zinc-500">Slippage</span>
            <span className="font-mono text-zinc-300">{slippage}%</span>
          </div>
          <div className="mt-1.5 flex items-center justify-between text-xs">
            <span className="text-zinc-500">Network</span>
            <span className="font-mono text-yellow-400">Solana</span>
          </div>
        </div>

        {/* Action Button */}
        {authenticated ? (
          <button
            onClick={handleSwap}
            disabled={loading || !amount}
            className={`w-full rounded-xl py-3.5 text-sm font-bold transition disabled:opacity-50 ${
              mode === "buy"
                ? "bg-green-500 text-white hover:bg-green-400"
                : "bg-red-500 text-white hover:bg-red-400"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Getting Quote...
              </span>
            ) : (
              `${mode === "buy" ? "Buy" : "Sell"} ${tokenSymbol}`
            )}
          </button>
        ) : (
          <button
            onClick={login}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-yellow-400 py-3.5 text-sm font-bold text-black transition hover:bg-yellow-300"
          >
            <Wallet className="h-4 w-4" />
            Connect Wallet to Trade
          </button>
        )}

        {/* User Position */}
        {authenticated && user?.wallet?.address && (
          <div className="rounded-lg border border-zinc-800 p-3">
            <div className="mb-2 flex items-center gap-2">
              <Wallet className="h-3.5 w-3.5 text-yellow-400" />
              <span className="text-xs font-bold text-zinc-300">Your Wallet</span>
            </div>
            <div className="text-xs font-mono text-zinc-500 truncate">
              {user.wallet.address}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
