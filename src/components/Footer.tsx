"use client";

import Link from "next/link";
import Image from "next/image";
import { ANDROID_LINK, IPHONE_LINK } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-900 bg-black px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          {/* Brand */}
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Image src="/Assets/logo/dark.png" alt="ChadWallet" width={28} height={28} className="rounded-md" />
              <span className="font-black text-white">
                Chad<span className="text-yellow-400">Wallet</span>
              </span>
            </div>
            <p className="text-sm text-zinc-600">trade like a chad.</p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-x-10 gap-y-6">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-zinc-600">App</span>
              <Link href="/" className="text-sm text-zinc-400 transition hover:text-white">Home</Link>
              <Link href="/trade/So11111111111111111111111111111111111111112" className="text-sm text-zinc-400 transition hover:text-white">Trade</Link>
              <a href={ANDROID_LINK} target="_blank" rel="noopener noreferrer" className="text-sm text-zinc-400 transition hover:text-white">Android</a>
              <a href={IPHONE_LINK} target="_blank" rel="noopener noreferrer" className="text-sm text-zinc-400 transition hover:text-white">iOS</a>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-zinc-600">Built with</span>
              <a href="https://solana.com" target="_blank" rel="noopener noreferrer" className="text-sm text-zinc-400 transition hover:text-white">Solana</a>
              <a href="https://jup.ag" target="_blank" rel="noopener noreferrer" className="text-sm text-zinc-400 transition hover:text-white">Jupiter</a>
              <a href="https://privy.io" target="_blank" rel="noopener noreferrer" className="text-sm text-zinc-400 transition hover:text-white">Privy</a>
              <a href="https://codex.io" target="_blank" rel="noopener noreferrer" className="text-sm text-zinc-400 transition hover:text-white">Codex</a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-zinc-900 pt-6 text-xs text-zinc-700">
          © {new Date().getFullYear()} ChadWallet. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
