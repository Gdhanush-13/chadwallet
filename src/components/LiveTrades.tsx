"use client";

import { useEffect, useState } from "react";
import { Activity, ArrowUpRight, ArrowDownRight } from "lucide-react";

interface Trade {
  id: string;
  type: "buy" | "sell";
  amount: number;
  price: number;
  wallet: string;
  time: string;
}

export default function LiveTrades({ tokenSymbol }: { tokenSymbol: string }) {
  const [trades, setTrades] = useState<Trade[]>([]);

  useEffect(() => {
    // Generate realistic mock live trades
    const generateTrade = (): Trade => {
      const isBuy = Math.random() > 0.45;
      const basePrice = tokenSymbol === "SOL" ? 145 : tokenSymbol === "USDC" ? 1 : 2 + Math.random() * 8;
      const wallet = Array.from({ length: 44 }, () =>
        "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz123456789"[Math.floor(Math.random() * 58)]
      ).join("");

      return {
        id: Math.random().toString(36).slice(2),
        type: isBuy ? "buy" : "sell",
        amount: parseFloat((Math.random() * 100).toFixed(2)),
        price: parseFloat((basePrice * (1 + (Math.random() - 0.5) * 0.02)).toFixed(4)),
        wallet: `${wallet.slice(0, 4)}...${wallet.slice(-4)}`,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
      };
    };

    // Initial trades
    setTrades(Array.from({ length: 15 }, generateTrade));

    // Simulate live trades
    const interval = setInterval(() => {
      setTrades((prev) => [generateTrade(), ...prev.slice(0, 24)]);
    }, 3000 + Math.random() * 4000);

    return () => clearInterval(interval);
  }, [tokenSymbol]);

  return (
    <div className="flex flex-col rounded-xl border border-zinc-800 bg-zinc-900/50">
      <div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-3">
        <Activity className="h-4 w-4 text-yellow-400" />
        <span className="text-sm font-bold text-white">Live Trades</span>
        <span className="relative ml-auto flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
        </span>
      </div>

      <div className="overflow-hidden">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-zinc-800 text-zinc-500">
              <th className="px-4 py-2 text-left font-medium">Type</th>
              <th className="px-2 py-2 text-right font-medium">Price</th>
              <th className="px-2 py-2 text-right font-medium">Amount</th>
              <th className="px-4 py-2 text-right font-medium">Wallet</th>
            </tr>
          </thead>
          <tbody>
            {trades.slice(0, 12).map((trade) => (
              <tr
                key={trade.id}
                className="border-b border-zinc-800/30 transition hover:bg-zinc-800/30"
              >
                <td className="px-4 py-2">
                  <span className={`flex items-center gap-1 font-medium ${
                    trade.type === "buy" ? "text-green-400" : "text-red-400"
                  }`}>
                    {trade.type === "buy" ? (
                      <ArrowUpRight className="h-3 w-3" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3" />
                    )}
                    {trade.type.toUpperCase()}
                  </span>
                </td>
                <td className="px-2 py-2 text-right font-mono text-zinc-300">
                  ${trade.price}
                </td>
                <td className="px-2 py-2 text-right font-mono text-zinc-400">
                  {trade.amount}
                </td>
                <td className="px-4 py-2 text-right font-mono text-zinc-500">
                  {trade.wallet}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
