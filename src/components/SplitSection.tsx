"use client";

import Link from "next/link";

export default function SplitSection() {
  return (
    <section className="border-t border-zinc-900 px-6 py-24">
      <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-2 lg:items-center">
        {/* Left: Text */}
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-yellow-400">
            cross-platform
          </p>
          <h2 className="mb-6 text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
            trade from anywhere.{" "}
            <span className="text-zinc-500">never lose a beat.</span>
          </h2>
          <p className="mb-8 max-w-md text-lg text-zinc-400 leading-relaxed">
            Open a trade on your phone, close it on your desktop — all in one app. Your positions follow you everywhere.
          </p>
          <Link
            href="/trade/So11111111111111111111111111111111111111112"
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-black transition hover:bg-zinc-200"
          >
            Launch Web App →
          </Link>
        </div>

        {/* Right: Split device visual */}
        <div className="relative flex items-center justify-center gap-4">
          {/* Desktop */}
          <div className="hidden sm:block">
            <div className="rounded-2xl border border-zinc-700 bg-zinc-900 p-3 w-72 shadow-xl">
              <div className="rounded-xl bg-black overflow-hidden">
                <div className="flex items-center gap-2 border-b border-zinc-800 px-3 py-2">
                  <div className="flex gap-1">
                    <div className="h-2 w-2 rounded-full bg-zinc-700" />
                    <div className="h-2 w-2 rounded-full bg-zinc-700" />
                    <div className="h-2 w-2 rounded-full bg-zinc-700" />
                  </div>
                  <div className="flex-1 mx-2 h-4 rounded bg-zinc-800 text-[8px] text-zinc-500 flex items-center px-2">
                    chadwallet.app/trade
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-0 h-40">
                  <div className="border-r border-zinc-800 p-2">
                    {["SOL","WIF","BONK","JUP","POPCAT"].map(t => (
                      <div key={t} className="flex items-center justify-between py-1">
                        <span className="text-[8px] font-bold text-white">{t}</span>
                        <span className="text-[7px] text-green-400">+{(Math.random()*5+1).toFixed(1)}%</span>
                      </div>
                    ))}
                  </div>
                  <div className="col-span-2 p-2 flex flex-col">
                    <div className="text-[8px] font-bold text-white mb-1">SOL/USD $145.23</div>
                    <div className="flex-1 flex items-end gap-px">
                      {[30,45,35,55,40,65,50,75,60,80,70,85,65,90,80].map((h,i) => (
                        <div key={i} className="flex-1 rounded-sm" style={{height:`${h}%`, background: h>60?'#22c55e':'#ef4444', opacity: 0.8}} />
                      ))}
                    </div>
                    <div className="flex gap-1 mt-2">
                      <div className="flex-1 rounded bg-green-500/20 py-1 text-center text-[8px] font-bold text-green-400">BUY</div>
                      <div className="flex-1 rounded bg-red-500/20 py-1 text-center text-[8px] font-bold text-red-400">SELL</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Arrow */}
          <div className="hidden sm:flex flex-col items-center gap-1 text-zinc-600">
            <div className="h-12 w-px bg-zinc-800" />
            <span className="text-xs">⟷</span>
            <div className="h-12 w-px bg-zinc-800" />
          </div>

          {/* Phone */}
          <div className="relative">
            <div className="rounded-[2rem] border-2 border-zinc-700 bg-zinc-900 p-2.5 w-[140px] shadow-xl shadow-yellow-400/5">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 h-4 w-16 rounded-b-lg bg-zinc-800" />
              <div className="rounded-[1.5rem] bg-black overflow-hidden h-[260px] flex flex-col">
                <div className="flex items-center gap-1.5 border-b border-zinc-800 px-3 py-2.5">
                  <div className="h-4 w-4 rounded-full bg-yellow-400/20 flex items-center justify-center">
                    <span className="text-[6px] font-black text-yellow-400">C</span>
                  </div>
                  <span className="text-[8px] font-bold text-white">ChadWallet</span>
                </div>
                <div className="px-3 py-2 border-b border-zinc-800">
                  <div className="text-[7px] text-zinc-500">SOL/USD</div>
                  <div className="text-sm font-black text-white">$145.23</div>
                  <div className="text-[7px] font-bold text-green-400">+3.45%</div>
                </div>
                <div className="flex-1 px-2 py-1.5">
                  <div className="flex items-end gap-px h-16 w-full">
                    {[40,55,45,65,50,70,60,80,65,90,75,85].map((h,i) => (
                      <div key={i} className="flex-1 rounded-sm" style={{height:`${h}%`, background: h>60?'#22c55e':'#ef4444', opacity:0.75}} />
                    ))}
                  </div>
                </div>
                <div className="px-2 pb-3 flex gap-1.5">
                  <button className="flex-1 rounded-lg bg-green-500 py-1.5 text-[8px] font-black text-white">BUY</button>
                  <button className="flex-1 rounded-lg bg-red-500 py-1.5 text-[8px] font-black text-white">SELL</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
