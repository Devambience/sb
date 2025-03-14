"use client"; // This makes it a client component

import { useEffect, useState } from "react";
import { ThemeProvider } from "@/components/theme-provider";
// import RedirectHandler from "@/components/RedirectHandler";
import QRDialog from "@/components/qrrefer";
import ShareDialog from "@/components/share-refer";
import MobileBottomNavigation from "@/components/bottom-navbar";

export default function ThemeProviderWrapper({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <></>; // Avoid hydration mismatch

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      {/* <RedirectHandler /> */}
      <QRDialog />
      <ShareDialog />
      <MobileBottomNavigation />
      {children}
    </ThemeProvider>
  );
}
