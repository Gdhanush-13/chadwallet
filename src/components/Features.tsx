"use client";

import { Shield, Zap, Globe, TrendingUp, Smartphone, Users } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Trade in Seconds",
    description: "Instant swaps on Solana. No delays, no missed opportunities.",
  },
  {
    icon: Shield,
    title: "Secure by Default",
    description: "Sign in with Apple or Google. Your keys, your crypto, always.",
  },
  {
    icon: Globe,
    title: "Solana Native",
    description: "Built for the fastest blockchain. Sub-second finality.",
  },
  {
    icon: TrendingUp,
    title: "Real-Time Data",
    description: "Live prices, charts, and trending tokens powered by Codex & Jupiter.",
  },
  {
    icon: Smartphone,
    title: "Trade Anywhere",
    description: "Open a trade on your phone, close it on desktop — seamlessly.",
  },
  {
    icon: Users,
    title: "Social Trading",
    description: "See what top traders are buying. Follow the alpha.",
  },
];

export default function Features() {
  return (
    <section className="relative px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-black text-white sm:text-5xl">
            built for <span className="text-yellow-400">chads</span>
          </h2>
          <p className="mx-auto max-w-xl text-lg text-zinc-400">
            Everything you need to trade like a legend. Fast, secure, and always on.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 transition hover:border-yellow-500/30 hover:bg-zinc-900"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-400/10 text-yellow-400 transition group-hover:bg-yellow-400/20">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-white">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-zinc-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
