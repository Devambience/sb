"use client"; // Ensure this runs in the browser

import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

const AdSense = ({ adSlot }: { adSlot: string }) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        window.adsbygoogle = window.adsbygoogle || [];
        window.adsbygoogle.push({});
      } catch (e) {
        console.error("AdSense error:", e);
      }
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-8991231707248651" // Replace with your AdSense Publisher ID
      data-ad-slot={adSlot} // Replace with your Ad Slot ID
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
};

export default AdSense;
