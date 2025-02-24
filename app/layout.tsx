import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import RedirectHandler from "@/components/RedirectHandler";
import QRDialog from "@/components/qr-dialog"; // Import QRDialog Component

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
          <RedirectHandler /> {/* Handles redirects on the client side */}
          <QRDialog /> {/* Shows the QR dialog if URL contains ?qr=true */}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
