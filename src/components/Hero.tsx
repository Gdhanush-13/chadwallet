"use client";

import { usePrivySafe as usePrivy } from "@/lib/usePrivySafe";
import { ArrowRight, Download, Smartphone } from "lucide-react";
import Link from "next/link";
import { ANDROID_LINK, IPHONE_LINK } from "@/lib/constants";

export default function Hero() {
  const { login, ready, authenticated } = usePrivy();

  return (
    <section className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden px-4 py-24 text-center">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/4 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-yellow-400/10 blur-[120px]" />
        <div className="absolute right-1/4 bottom-1/4 h-[300px] w-[400px] rounded-full bg-yellow-600/5 blur-[80px]" />
      </div>

      <div className="relative z-10 max-w-4xl">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-1.5 text-sm text-yellow-400">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-yellow-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-yellow-400" />
          </span>
          Live on Solana
        </div>

        <h1 className="mb-6 text-5xl font-black leading-tight tracking-tight text-white sm:text-7xl">
          where chads{" "}
          <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
            trade.
          </span>
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-lg text-zinc-400 sm:text-xl">
          From memecoins to blue chips, trade any Solana token in seconds.
          One wallet. All chains. Zero friction.
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          {!authenticated ? (
            <button
              onClick={login}
              disabled={!ready}
              className="group flex items-center gap-2 rounded-full bg-yellow-400 px-8 py-3.5 text-lg font-bold text-black transition hover:bg-yellow-300 hover:shadow-lg hover:shadow-yellow-400/20 disabled:opacity-50"
            >
              Get Started
              <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
            </button>
          ) : (
            <Link
              href="/trade/So11111111111111111111111111111111111111112"
              className="group flex items-center gap-2 rounded-full bg-yellow-400 px-8 py-3.5 text-lg font-bold text-black transition hover:bg-yellow-300 hover:shadow-lg hover:shadow-yellow-400/20"
            >
              Start Trading
              <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
            </Link>
          )}

          <div className="flex items-center gap-3">
            <a
              href={ANDROID_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-yellow-400/30 bg-yellow-400/5 px-6 py-3.5 text-sm font-medium text-yellow-400 transition hover:border-yellow-400/50 hover:bg-yellow-400/10"
            >
              <Download className="h-4 w-4" />
              Android
            </a>
            <a
              href={IPHONE_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-yellow-400/30 bg-yellow-400/5 px-6 py-3.5 text-sm font-medium text-yellow-400 transition hover:border-yellow-400/50 hover:bg-yellow-400/10"
            >
              <Smartphone className="h-4 w-4" />
              iPhone
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
