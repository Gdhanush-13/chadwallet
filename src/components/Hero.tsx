"use client";

import { usePrivySafe as usePrivy } from "@/lib/usePrivySafe";
import Link from "next/link";
import Image from "next/image";
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

        {/* Real app screenshots */}
        <div className="relative mt-16 flex items-end justify-center gap-4">
          {/* Left screenshot (discover) - slightly behind */}
          <div className="hidden sm:block relative -mr-6 z-0 opacity-80 hover:opacity-100 transition-opacity">
            <Image
              src="/Assets/app store/discover.png"
              alt="ChadWallet discover screen"
              width={200}
              height={430}
              className="drop-shadow-2xl rounded-[2rem]"
            />
          </div>
          {/* Center screenshot (token) - featured */}
          <div className="relative z-10 drop-shadow-2xl">
            <Image
              src="/Assets/app store/token.png"
              alt="ChadWallet trading screen"
              width={240}
              height={516}
              className="rounded-[2rem] shadow-2xl shadow-yellow-400/10"
            />
            {/* Live badge on top */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 rounded-full border border-green-500/30 bg-black/90 px-3 py-1 text-xs font-bold text-green-400 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
              </span>
              Live trading
            </div>
          </div>
          {/* Right screenshot (portfolio) - slightly behind */}
          <div className="hidden sm:block relative -ml-6 z-0 opacity-80 hover:opacity-100 transition-opacity">
            <Image
              src="/Assets/app store/portfolio.png"
              alt="ChadWallet portfolio screen"
              width={200}
              height={430}
              className="drop-shadow-2xl rounded-[2rem]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
