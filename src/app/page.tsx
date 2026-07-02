"use client";

import Navbar from "@/components/Navbar";
import TokenBanner from "@/components/TokenBanner";
import Hero from "@/components/Hero";
import SplitSection from "@/components/SplitSection";
import Features from "@/components/Features";
import StatsSection from "@/components/StatsSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-black">
      <Navbar />
      <TokenBanner position="top" />
      <Hero />
      <SplitSection />
      <Features />
      <StatsSection />
      <TokenBanner position="bottom" />
      <Footer />
    </div>
  );
}
