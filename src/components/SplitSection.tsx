"use client";

import Link from "next/link";
import Image from "next/image";

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

        {/* Right: Real flow image */}
        <div className="relative flex items-center justify-center">
          <Image
            src="/Assets/flow/buy-sell-4.png"
            alt="ChadWallet buy and sell flow"
            width={600}
            height={340}
            className="w-full max-w-xl rounded-2xl"
          />
        </div>
      </div>
    </section>
  );
}
