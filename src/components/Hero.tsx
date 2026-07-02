"use client";

import { usePrivySafe as usePrivy } from "@/lib/usePrivySafe";
import Link from "next/link";
import { ANDROID_LINK, IPHONE_LINK } from "@/lib/constants";

export default function Hero() {
  const { login, ready, authenticated } = usePrivy();

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-20 text-center">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[900px] rounded-full bg-yellow-400/8 blur-[140px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-5xl">
        <h1 className="mb-5 text-[clamp(3rem,9vw,7rem)] font-black leading-[0.92] tracking-tight text-white">
          where chads{" "}
          <span className="text-yellow-400">trade.</span>
        </h1>

        <p className="mb-10 max-w-lg text-lg text-zinc-400 leading-relaxed">
          From memecoins to viral tokens, trade any Solana crypto in seconds.
        </p>

        <div className="flex flex-col items-center gap-3 sm:flex-row">
          {authenticated ? (
            <Link
              href="/trade/So11111111111111111111111111111111111111112"
              className="rounded-full bg-yellow-400 px-8 py-3.5 text-base font-bold text-black transition hover:bg-yellow-300"
            >
              Start Trading
            </Link>
          ) : (
            <button
              onClick={login}
              disabled={!ready}
              className="rounded-full bg-yellow-400 px-8 py-3.5 text-base font-bold text-black transition hover:bg-yellow-300 disabled:opacity-50"
            >
              Get Started — it&apos;s free
            </button>
          )}
          <div className="flex items-center gap-2">
            <a
              href={IPHONE_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 rounded-full border border-zinc-700 px-5 py-3.5 text-sm font-medium text-white transition hover:border-zinc-500 hover:bg-zinc-900"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              App Store
            </a>
            <a
              href={ANDROID_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 rounded-full border border-zinc-700 px-5 py-3.5 text-sm font-medium text-white transition hover:border-zinc-500 hover:bg-zinc-900"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.523 15.341 14.58 10.8l2.916-5.01a.55.55 0 0 0-.952-.552L13.63 10.2H10.37L7.456 5.238a.55.55 0 1 0-.952.552L9.42 10.8l-2.943 4.541a.55.55 0 1 0 .929.594L9.88 11.3h4.24l2.474 4.635a.55.55 0 1 0 .929-.594zM8.1 17.5a.9.9 0 1 1 0-1.8.9.9 0 0 1 0 1.8zm7.8 0a.9.9 0 1 1 0-1.8.9.9 0 0 1 0 1.8z"/>
              </svg>
              Google Play
            </a>
          </div>
        </div>

        {/* Phone mockup visual */}
        <div className="relative mt-16 w-full max-w-sm mx-auto">
          <div className="relative mx-auto w-[220px]">
            <div className="relative rounded-[2.5rem] border-2 border-zinc-700 bg-zinc-900 p-3 shadow-2xl shadow-yellow-400/5">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 h-5 w-24 rounded-b-xl bg-zinc-800" />
              <div className="rounded-[2rem] bg-black overflow-hidden h-[400px] flex flex-col">
                {/* Mock trading UI inside phone */}
                <div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-3">
                  <div className="h-6 w-6 rounded-full bg-yellow-400/20 flex items-center justify-center">
                    <span className="text-[9px] font-black text-yellow-400">C</span>
                  </div>
                  <span className="text-xs font-bold text-white">ChadWallet</span>
                  <span className="ml-auto text-[10px] font-bold text-yellow-400">LIVE</span>
                </div>
                <div className="px-4 py-3 border-b border-zinc-800">
                  <div className="text-[10px] text-zinc-500">SOL/USD</div>
                  <div className="text-lg font-black text-white">$145.23</div>
                  <div className="text-[10px] font-bold text-green-400">+3.45%</div>
                </div>
                <div className="flex-1 px-2 py-2 overflow-hidden">
                  {/* Mini chart bars */}
                  <div className="flex items-end gap-0.5 h-24 w-full">
                    {[40,55,45,65,50,70,60,80,65,90,75,85,70,95,80,100,85,78,92,88].map((h,i) => (
                      <div key={i} className="flex-1 rounded-sm" style={{height:`${h}%`, background: h > 70 ? '#22c55e' : '#ef4444', opacity: 0.7}} />
                    ))}
                  </div>
                </div>
                <div className="px-3 pb-4 flex gap-2">
                  <button className="flex-1 rounded-xl bg-green-500 py-2.5 text-[11px] font-black text-white">BUY</button>
                  <button className="flex-1 rounded-xl bg-red-500 py-2.5 text-[11px] font-black text-white">SELL</button>
                </div>
              </div>
            </div>
            {/* Floating stats cards */}
            <div className="absolute -left-16 top-12 rounded-xl border border-zinc-700/50 bg-zinc-900/90 backdrop-blur-sm px-3 py-2 shadow-lg">
              <div className="text-[9px] text-zinc-500">24h Volume</div>
              <div className="text-xs font-black text-white">$2.4B</div>
            </div>
            <div className="absolute -right-14 top-1/3 rounded-xl border border-zinc-700/50 bg-zinc-900/90 backdrop-blur-sm px-3 py-2 shadow-lg">
              <div className="text-[9px] text-zinc-500">Traders</div>
              <div className="text-xs font-black text-yellow-400">10K+</div>
            </div>
            <div className="absolute -left-12 bottom-16 rounded-xl border border-green-500/20 bg-green-500/10 backdrop-blur-sm px-3 py-2 shadow-lg">
              <div className="text-[9px] text-green-400 font-bold">BUY WIF</div>
              <div className="text-xs font-black text-white">+8.7%</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
