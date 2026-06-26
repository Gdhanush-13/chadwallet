"use client";

import Navbar from "@/components/Navbar";
import TokenBanner from "@/components/TokenBanner";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-black">
      <Navbar />
      <TokenBanner position="top" />
      <Hero />
      <Features />
      <TokenBanner position="bottom" />
      <Footer />
    </div>
  );
}
