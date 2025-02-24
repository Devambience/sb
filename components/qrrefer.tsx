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

  useEffect(() => {
    const qrParam = searchParams.get("qr") ?? "";
    if (qrParam === "true") {
      setIsOpen(true);
    }
  }, [searchParams]);

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Welcome To SBStyleHub!</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <div className="flex justify-center gap-4">
            <a
              href="https://maps.app.goo.gl/aSoaRTUYxWVgVRfh8"
              className="flex flex-col items-center border w-1/2 rounded-lg p-5"
            >
              <MapPin className="h-12 w-7" />
              <p>Navigate to maps</p>
            </a>
            <a
              href="tel:9911366659"
              className="flex flex-col items-center border w-1/2 rounded-lg p-5"
            >
              <Phone className="h-12 w-7" />
              <p>Contact Us</p>
            </a>
          </div>
          <DrawerClose asChild>
            <Button className="rounded bg-white text-black w-full" variant="outline">
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
