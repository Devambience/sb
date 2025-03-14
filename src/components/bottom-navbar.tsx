import React from "react";
import Link from "next/link";
import { HomeIcon, ShareIcon, PaymentIcon, PhoneIcon, HeartIcon } from "@/components/icons"
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const MobileBottomNavigation = () => {
  console.log("MobileBottomNavigation is rendering"); // Debugging
  return (
    <div className="fixed bottom-0 left-0 right-0 backdrop-sepia-0 to-transparent backdrop-blur-xl bg-black/80 shadow-md flex justify-around items-center inset-shadow-md px-4 py-1 border rounded-t-3xl border-t block md:hidden">
      <Link href="/" className="flex flex-col items-center text-white hover:text-white">
        <HomeIcon className="w-6 h-6" />
        <span className="text-xs">Home</span>
      </Link>
      <Dialog>
        <DialogTrigger asChild>
          <a className="flex flex-col items-center text-white hover:text-white text-xs"><PaymentIcon />Pay</a>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Payment via UPI</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <center>
            <Image
              src="/payment-qr.png"
              width={250}
              height={250}
              alt="Picture of the author"
              className="rounded-xl"
            />
          </center>
          <center>
            <DialogFooter>
              <Link href="upi://pay?pa=santushtiboutique@pnb&pn=SBstylehub" className="berder px-5 py-2 bg-[#ffffff] rounded-xl text-black" type="submit">Click Here To Pay</Link>
            </DialogFooter>
          </center>
        </DialogContent>
      </Dialog>
      <Link href="/likes" className="flex px-5 py-2 flex-col items-center text-white hover:text-white">
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
