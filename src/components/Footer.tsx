"use client";

import Link from "next/link";
import { ANDROID_LINK, IPHONE_LINK } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-black px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-black text-white sm:text-4xl">
            a trading app for{" "}
            <span className="text-yellow-400">the rest of us</span>
          </h2>
          <p className="mb-8 text-zinc-400">
            Join thousands of traders making their name on ChadWallet
          </p>
          <div className="flex items-center justify-center gap-4">
            <a
              href={ANDROID_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-yellow-400 px-6 py-3 text-sm font-bold text-black transition hover:bg-yellow-300"
            >
              Download Android
            </a>
            <a
              href={IPHONE_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-zinc-700 px-6 py-3 text-sm font-medium text-white transition hover:bg-zinc-900"
            >
              Download iOS
            </a>
          </div>
        </div>

        <div className="grid gap-8 border-t border-zinc-800 pt-8 sm:grid-cols-3">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-400 font-black text-black">
                C
              </div>
              <span className="font-bold text-white">
                Chad<span className="text-yellow-400">Wallet</span>
              </span>
            </div>
            <p className="text-sm text-zinc-500">Trade like a chad.</p>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-zinc-300">Product</h4>
            <div className="flex flex-col gap-2">
              <Link href="/" className="text-sm text-zinc-500 hover:text-white">Home</Link>
              <Link href="/trade/So11111111111111111111111111111111111111112" className="text-sm text-zinc-500 hover:text-white">Trade</Link>
              <a href={ANDROID_LINK} target="_blank" rel="noopener noreferrer" className="text-sm text-zinc-500 hover:text-white">Android App</a>
              <a href={IPHONE_LINK} target="_blank" rel="noopener noreferrer" className="text-sm text-zinc-500 hover:text-white">iOS App</a>
            </div>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-zinc-300">Powered By</h4>
            <div className="flex flex-col gap-2">
              <a href="https://solana.com" target="_blank" rel="noopener noreferrer" className="text-sm text-zinc-500 hover:text-white">Solana</a>
              <a href="https://jup.ag" target="_blank" rel="noopener noreferrer" className="text-sm text-zinc-500 hover:text-white">Jupiter</a>
              <a href="https://privy.io" target="_blank" rel="noopener noreferrer" className="text-sm text-zinc-500 hover:text-white">Privy</a>
              <a href="https://codex.io" target="_blank" rel="noopener noreferrer" className="text-sm text-zinc-500 hover:text-white">Codex</a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-zinc-800 pt-8 text-center text-xs text-zinc-600">
          © {new Date().getFullYear()} ChadWallet. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
