"use client";

import React, { useState, useEffect } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BackgroundGradientAnimation } from "../../components/ui/background-gradient-animation";
import { PlaceholdersAndVanishInput } from "../../components/ui/placeholders-and-vanish-input";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { Bell } from "lucide-react";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Trash2 } from "lucide-react";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"


export default function LikesPage() {
  const [isOpen, setIsOpen] = useState(true); // Manual state for sidebar
  const [likedImages, setLikedImages] = useState<string[]>([]);

  const placeholders = [
    "Want to see new design of Lahngas?",
    "Want to see new design of Suits?",
    "Why not checkout something new?",
    "Want to see Weston?",
    "Whats on the trend?",
  ];

  useEffect(() => {
    // Load liked images from localStorage on mount
    const saved = localStorage.getItem("likedImages");
    if (saved) {
      setLikedImages(JSON.parse(saved));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };

  const handleDeleteAll = () => {
    setLikedImages([]); // Clear the state
    localStorage.removeItem("likedImages"); // Remove from localStorage
  };

  const handleDeletePost = (imageUrl: string) => {
    setLikedImages((prev) => {
      const updatedImages = prev.filter((url) => url !== imageUrl);
      localStorage.setItem("likedImages", JSON.stringify(updatedImages));
      return updatedImages;
    });
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div
          className={`fixed top-0 left-0 ${
            isOpen ? "md:left-64" : "md:left-16"
          } right-0 px-4 flex lg:rounded-xl h-16 shrink-0 items-center gap-2 backdrop-blur-xl border-b bg-gradient-to-b from-black to-transparent backdrop-sepia-0 z-[60] sm:rounded-bl-lg sm:rounded-br-lg`}
        >
          <header className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger
                className="-ml-1"
                onClick={() => setIsOpen(!isOpen)}
              />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Button className="right-0" variant="outline">
                <Bell />
              </Button>
            </div>
            <Drawer>
              <DrawerTrigger>
            <Button
              variant="destructive"
              size="sm"
              className="mr-4 flex items-center gap-2"
              disabled={likedImages.length === 0}
            >
              <Trash2 className="h-4 w-4" />
              Delete All
            </Button>

              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                  <DrawerDescription>When you press the delete button, the information will be permanently removed and cannot be retrieved, as it was previously saved within the storage of your device. Are you completely sure that you wish to continue with this irreversible decision? Please take a moment to consider the consequences before confirming your choice.</DrawerDescription>
                <br></br>
                </DrawerHeader>
                <DrawerFooter>
                  <Button onClick={handleDeleteAll}>Delete</Button>
                  <DrawerClose>
                    {/* <Button variant="outline">Cancel</Button> */}
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>

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
                  <h1 className="text-[54px] underline decoration-dashed">Liked Images.</h1>
                </div>
              </div>
            </div>
          </div>
          <br />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {likedImages.length === 0 ? (
              <p className="col-span-full text-center text-gray-500">
                You haven’t liked any images yet. Go back to{" "}
                <Link
                  href="/dashboard"
                  className="text-blue-500 hover:underline"
                >
                  Dashboard
                </Link>{" "}
                to like some!
              </p>
            ) : (
              // Reverse the likedImages so the most recent appear on top
              likedImages.slice().reverse().map((imageUrl, index) => (
                <Card
                  key={`${imageUrl}-${index}`}
                  className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg"
                >
                  <div className="aspect-[3/4] relative">
                    <img
                      src={imageUrl}
                      alt={`Liked Image ${index + 1}`}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full opacity-0 group-hover:opacity-100"
                      onClick={() => handleDeletePost(imageUrl)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
