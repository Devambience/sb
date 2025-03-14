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

function QRDialogContent() {
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState("");

  useEffect(() => {
    const qrParam = searchParams.get("share") ?? "";
    if (qrParam) {
      setIsOpen(true);
      setSource(qrParam); // Store whatever comes after `share=`
    }
  }, [searchParams]);

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>🎊 Welcome To SBStyleHub! 🥳</DrawerTitle>
          <DrawerDescription>
            It looks like you landed here by scanning a <strong>{source}</strong>.
          </DrawerDescription>
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
          <br></br>
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

export default function QRDialog() {
  return (
    <Suspense fallback={null}>
      <QRDialogContent />
    </Suspense>
  );
}
