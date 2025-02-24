"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Maximize2, MapPin, Phone } from "lucide-react";

export default function QRDialog() {
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (searchParams.get("qr") === "true") {
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
              <span><MapPin className="h-12 w-7" /></span>
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
          <br></br>
          <DrawerClose>
            <Button className="rounded bg-white text-black w-full rounded-lg" variant="outline">Continue With App</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
