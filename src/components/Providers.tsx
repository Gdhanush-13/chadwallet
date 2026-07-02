"use client";

import { PrivyProvider } from "@privy-io/react-auth";
import { toSolanaWalletConnectors } from "@privy-io/react-auth/solana";
import { useState, useEffect } from "react";

const solanaConnectors = toSolanaWalletConnectors();

export default function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID;

  // During SSR/prerender or if no valid app ID, render children without Privy
  if (!mounted || !appId || appId === "your-privy-app-id") {
    return <>{children}</>;
  }

  return (
    <PrivyProvider
      appId={appId}
      config={{
        appearance: {
          theme: "dark",
          accentColor: "#FACC15",
          logo: "/Assets/logo/light.png",
          landingHeader: "Sign in to ChadWallet",
          loginMessage: "Trade like a chad.",
        },
        loginMethods: ["google", "apple", "wallet"],
        embeddedWallets: {
          solana: {
            createOnLogin: "users-without-wallets",
          },
        },
        externalWallets: {
          solana: { connectors: solanaConnectors },
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
}
