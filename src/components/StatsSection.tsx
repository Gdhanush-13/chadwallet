"use client";

import { ANDROID_LINK, IPHONE_LINK } from "@/lib/constants";

const stats = [
  { value: "10K+", label: "active traders" },
  { value: "$2.4B", label: "volume traded" },
  { value: "<1s", label: "swap speed" },
  { value: "100+", label: "Solana tokens" },
];

export default function StatsSection() {
  return (
    <section className="border-t border-zinc-900 px-6 py-24">
      <div className="mx-auto max-w-5xl">
        {/* Stats row */}
        <div className="mb-20 grid grid-cols-2 gap-8 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-black text-yellow-400 sm:text-4xl">{s.value}</div>
              <div className="mt-1 text-sm text-zinc-500">{s.label}</div>
            </div>
          ))}
        </div>

        {/* CTA block — mirrors fomo.family "a trading app for the rest of us" */}
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-10 text-center sm:p-16">
          <h2 className="mb-4 text-4xl font-black leading-tight text-white sm:text-6xl">
            a trading app for{" "}
            <span className="text-yellow-400">the rest of us.</span>
          </h2>
          <p className="mb-8 text-zinc-400 text-lg">
            join thousands of chads making their name on ChadWallet
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href={ANDROID_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-yellow-400 px-8 py-3.5 text-base font-bold text-black transition hover:bg-yellow-300"
            >
              Download Android
            </a>
            <a
              href={IPHONE_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-zinc-700 px-8 py-3.5 text-base font-medium text-white transition hover:border-zinc-500 hover:bg-zinc-900"
            >
              Download iOS
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
