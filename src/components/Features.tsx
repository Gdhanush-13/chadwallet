"use client";

const features = [
  "become a legend, top the leaderboard",
  "discover trending tokens before everyone else",
  "real time alerts for what the best are buying",
  "create an account in an instant",
  "gasless swaps on Solana",
  "fund with Apple Pay",
];

export default function Features() {
  return (
    <section className="border-t border-zinc-900 px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-yellow-400">
          why ChadWallet
        </p>
        <h2 className="mb-16 text-4xl font-black leading-tight text-white sm:text-6xl">
          never miss out again.
        </h2>
        <div className="divide-y divide-zinc-800/60">
          {features.map((f, i) => (
            <div
              key={i}
              className="group flex items-center gap-6 py-6 transition hover:pl-2"
            >
              <span className="shrink-0 text-xs font-mono text-zinc-600 w-6">
                0{i + 1}
              </span>
              <p className="text-xl font-bold text-zinc-300 transition group-hover:text-white sm:text-2xl">
                {f}
              </p>
              <span className="ml-auto text-yellow-400 opacity-0 transition group-hover:opacity-100">→</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
