"use client";

import React, { useState, useEffect, Suspense } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
import { CardWithForm } from "@/components/dashboard_/images";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { HomeIcon, ShareIcon, PaymentIcon, PhoneIcon, HeartIcon } from "@/components/icons";
import { Bell } from "lucide-react";
import MobileBottomNavigation from "@/components/bottom-navbar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Page() {
  const [isOpen, setIsOpen] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const placeholders = [
    "Want to see new design of Lahngas?",
    "Want to see new design of Suits?",
    "Why not checkout something new?",
    "Want to see Weston?",
    "What's on the trend?",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };

  if (!mounted) return null;

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div
          className={`fixed top-0 left-0 ${isOpen ? "md:left-64" : "md:left-30"} right-0 px-4 flex lg:rounded-xl h-16 shrink-0 items-center gap-2 backdrop-blur-xl border-b bg-gradient-to-b from-black to-transparent backdrop-sepia-0 z-[60] sm:rounded-bl-lg sm:rounded-br-lg`}
        >
          <header>
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" onClick={() => setIsOpen(!isOpen)} />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Button className="right-0" variant="outline">
                <Bell />
              </Button>
            </div>
          </header>
        </div>

        <div className="flex flex-1 flex-col gap-0 p-4 mt-16 pt-0">
          <div className="grid auto-rows-min gap-0 md:grid-cols-1">
            <div className="h-[50vh] w-full rounded-xl bg-muted/50 relative overflow-hidden">
              <div className="h-full w-full">
                <BackgroundGradientAnimation className="absolute inset-0 w-full h-full">
                  {/* Animation Background */}
                </BackgroundGradientAnimation>
                <div className="absolute inset-0 flex items-center justify-center mx-5">
                  <PlaceholdersAndVanishInput placeholders={placeholders} onChange={handleChange} onSubmit={onSubmit} />
                </div>
              </div>
            </div>
          </div>
          <br />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Suspense fallback={<div>Loading...</div>}>
              <CardWithForm />
              <MobileBottomNavigation />
            </Suspense>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}