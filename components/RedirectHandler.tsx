"use client"; // This makes it a Client Component

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function RedirectHandler() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname === "/") {
      router.replace("/dashboard");
    }
  }, [pathname, router]);

  return null; // This component doesn't render anything, just handles redirection
}
