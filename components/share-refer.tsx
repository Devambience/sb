"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { MapPin, Phone } from "lucide-react";

function ShareDialogContent() { // Fixed component name
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const qrParam = searchParams.get("share") ?? "";
    if (qrParam === "true") {
      setIsOpen(true);
    }
  }, [searchParams]);

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>🎊 Welcome To SBStyleHub! 🥳</DrawerTitle>
          <DrawerDescription>It looks like you landed here by a Shared Link.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <div className="flex justify-center gap-4">
            <a
              href="https://maps.app.goo.gl/aSoaRTUYxWVgVRfh8"
              className="flex flex-col items-center border w-1/2 rounded-2xl p-5"
            >
              <MapPin className="h-12 w-7" />
              <p>Navigate to maps</p>
            </a>
            <a
              href="tel:9911366659"
              className="flex flex-col items-center border w-1/2 rounded-2xl p-5"
            >
              <Phone className="h-12 w-7" />
              <p>Contact Us</p>
            </a>
          </div>
          <br />
          <DrawerClose asChild>
            <Button className="rounded-xl bg-white text-black text-md w-full py-5" variant="outline">
              Continue With App
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default function ShareDialog() {
  return (
    <Suspense fallback={null}>
      <ShareDialogContent /> {/* Fixed component name */}
    </Suspense>
  );
}