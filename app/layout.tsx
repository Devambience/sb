import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import RedirectHandler from "@/components/RedirectHandler";
import QRDialog from "@/components/qrrefer"; // Import QRDialog Component
import ShareDialog from "@/components/share-refer";
import MobileBottomNavigation from "@/components/bottom-navbar";

const geistSans = localFont({
  src: "/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "SBStyleHub",
  description: "Welcome to SBStyleHub...",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <RedirectHandler />
          <QRDialog />
          <ShareDialog />
          <MobileBottomNavigation />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
