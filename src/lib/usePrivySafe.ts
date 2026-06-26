"use client";

import { usePrivy } from "@privy-io/react-auth";

const fallback = {
  ready: false,
  authenticated: false,
  login: () => {},
  logout: () => {},
  user: null,
};

export function usePrivySafe() {
  try {
    return usePrivy();
  } catch {
    return fallback as ReturnType<typeof usePrivy>;
  }
}
