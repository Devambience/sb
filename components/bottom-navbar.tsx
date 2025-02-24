import React from "react";
import Link from "next/link";
import { Home, Search, User, Heart, Phone, Share, RefreshCcw, ArrowUp } from "lucide-react"; // Using lucide-react icons

const MobileBottomNavigation = () => {
    console.log("MobileBottomNavigation is rendering"); // Debugging
    return (
      <div className="fixed bottom-0 left-0 right-0 backdrop-sepia-0 to-transparent backdrop-blur-xl bg-black/80 shadow-md flex justify-around items-center inset-shadow-md p-4 border rounded-t-3xl border-t block md:hidden">
        <Link href="/" className="flex flex-col items-center text-white hover:text-white">
          <Home className="w-6 h-6" />
          <span className="text-xs">Home</span>
        </Link>
        <Link href="/profile" className="flex flex-col items-center text-white hover:text-white">
          <Share className="w-6 h-6" />
          <span className="text-xs">Share</span>
        </Link>
        <Link href="/likes" className="flex flex-col items-center text-white hover:text-white">
          <Heart className="w-6 h-6" />
          <span className="text-xs">Liked</span>
        </Link>
        <a href="tel:9911366659" className="flex flex-col items-center text-white hover:text-white">
          <Phone className="w-6 h-6" />
          <span className="text-xs">Call</span>
        </a>
        <Link href="/dashboard" className="flex flex-col items-center text-white-20 hover:text-white">
          <ArrowUp className="w-6 h-6" />
          <span className="text-xs">To Top</span>
        </Link>
      </div>
  );
};

export default MobileBottomNavigation;
