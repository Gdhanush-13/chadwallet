"use client";

import { usePrivySafe as usePrivy } from "@/lib/usePrivySafe";
import Link from "next/link";
import Image from "next/image";
import { Wallet, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const { ready, authenticated, login, logout, user } = usePrivy();
  const [mobileOpen, setMobileOpen] = useState(false);

  const shortAddr = user?.wallet?.address
    ? `${user.wallet.address.slice(0, 4)}...${user.wallet.address.slice(-4)}`
    : null;

  return (
    <nav className="sticky top-0 z-50 border-b border-yellow-500/20 bg-black/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/Assets/logo/dark.png"
            alt="ChadWallet"
            width={36}
            height={36}
            className="rounded-lg"
          />
          <span className="text-xl font-bold text-white">
            Chad<span className="text-yellow-400">Wallet</span>
          </span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <Link href="/" className="text-sm text-zinc-400 transition hover:text-white">
            Home
          </Link>
          <Link href="/trade/So11111111111111111111111111111111111111112" className="text-sm text-zinc-400 transition hover:text-white">
            Trade
          </Link>
          <a href="https://play.google.com/store/apps/details?id=xyz.chadwallet.www" target="_blank" rel="noopener noreferrer" className="text-sm text-zinc-400 transition hover:text-white">
            Android
          </a>
          <a href="https://apps.apple.com/us/app/chadwallet/id6757367474" target="_blank" rel="noopener noreferrer" className="text-sm text-zinc-400 transition hover:text-white">
            iOS
          </a>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {ready && authenticated ? (
            <>
              {shortAddr && (
                <span className="rounded-full bg-zinc-800 px-3 py-1.5 text-xs font-mono text-yellow-400">
                  <Wallet className="mr-1 inline h-3 w-3" />
                  {shortAddr}
                </span>
              )}
              <button
                onClick={logout}
                className="flex items-center gap-1.5 rounded-full bg-zinc-800 px-4 py-2 text-sm text-zinc-300 transition hover:bg-zinc-700"
              >
                <LogOut className="h-3.5 w-3.5" />
                Sign Out
              </button>
            </>
          ) : (
            <button
              onClick={login}
              disabled={!ready}
              className="rounded-full bg-yellow-400 px-5 py-2 text-sm font-bold text-black transition hover:bg-yellow-300 disabled:opacity-50"
            >
              Sign In
            </button>
          )}
        </div>

        <button className="md:hidden text-white" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-zinc-800 bg-black px-4 pb-4 pt-2 md:hidden">
          <div className="flex flex-col gap-3">
            <Link href="/" className="text-sm text-zinc-400 py-2" onClick={() => setMobileOpen(false)}>Home</Link>
            <Link href="/trade/So11111111111111111111111111111111111111112" className="text-sm text-zinc-400 py-2" onClick={() => setMobileOpen(false)}>Trade</Link>
            {ready && authenticated ? (
              <button onClick={() => { logout(); setMobileOpen(false); }} className="text-left text-sm text-zinc-400 py-2">Sign Out</button>
            ) : (
              <button onClick={() => { login(); setMobileOpen(false); }} className="rounded-full bg-yellow-400 px-5 py-2 text-sm font-bold text-black w-fit">Sign In</button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
