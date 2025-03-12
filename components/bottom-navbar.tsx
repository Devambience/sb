import React from "react";
import Link from "next/link";
import { HomeIcon, ShareIcon, PaymentIcon, PhoneIcon, HeartIcon } from "@/components/icons"

const MobileBottomNavigation = () => {
    console.log("MobileBottomNavigation is rendering"); // Debugging
    return (
      <div className="fixed bottom-0 left-0 right-0 backdrop-sepia-0 to-transparent backdrop-blur-xl bg-black/80 shadow-md flex justify-around items-center inset-shadow-md px-4 py-3 border rounded-t-3xl border-t block md:hidden">
        <Link href="/" className="flex flex-col items-center text-white hover:text-white">
          <HomeIcon className="w-6 h-6" />
          <span className="text-xs">Home</span>
        </Link>
        <Link href="/profile" className="flex flex-col items-center text-white hover:text-white">
          <PaymentIcon className="w-6 h-6" />
          <span className="text-xs">Pay</span>
        </Link>
        <Link href="/likes" className="flex px-5 py-2 rounded-full bg-[#0000008f] border flex-col items-center text-white hover:text-white">
          <HeartIcon className="w-6 h-6" />
          <span className="text-xs">Liked</span>
        </Link>
        <a href="tel:9911366659" className="flex flex-col items-center text-white hover:text-white">
          <PhoneIcon className="w-6 h-6" />
          <span className="text-xs">Call</span>
        </a>
        <Link href="/dashboard" className="flex flex-col items-center text-white-20 hover:text-white">
          <ShareIcon className="w-6 h-6" />
          <span className="text-xs">Share</span>
        </Link>
      </div>
  );
};

export default MobileBottomNavigation;
