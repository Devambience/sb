"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail } from "lucide-react";
import Image from "next/image";
import MobileBottomNavigation from "@/components/bottom-navbar";
import { AppSidebar } from "@/components/app-sidebar";


export default function ContactForm() {
  const [position, setPosition] = useState({ top: "50%", left: "50%" });

  useEffect(() => {
    if (typeof window !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          const mappedPosition = getMapPosition(latitude, longitude);
          setPosition(mappedPosition);
        },
        (error) => console.error("Error getting location:", error)
      );
    }
  }, []);

  function getMapPosition(lat: number, lon: number) {
    const x = ((lon + 180) / 360) * 100;
    const y = ((90 - lat) / 180) * 100;
    return { top: `${y}%`, left: `${x}%` };
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6">
      <Card className="w-full max-w-5xl mx-auto grid md:grid-cols-2 gap-8 bg-gray-900/95 border border-gray-800/50 shadow-xl rounded-2xl overflow-hidden backdrop-blur-xl">
        {/* Left Side - Contact Info */}
        <div className="p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10" />
          <div className="relative z-10">
            <Mail className="h-12 w-12 text-blue-400 mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">
              Get in Touch
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              We're here to help you succeed. Reach out with any questions or feedback.
            </p>
            <div className="space-y-3 text-gray-200 text-sm">
              <p className="flex items-center gap-2">
                <span className="text-blue-400">✉️</span> contact@yoursaas.ai
              </p>
              <p className="flex items-center gap-2">
                <span className="text-blue-400">📞</span> +1 (800) 123 XX21
              </p>
              <p className="flex items-center gap-2">
                <span className="text-blue-400">💡</span> support@yoursaas.ai
              </p>
            </div>
            <div className="mt-12 relative">
              <Image
                src="/world.svg"
                alt="World Map"
                width={600}
                height={300}
                className="w-full opacity-60 select-none"
              />
              <div className="absolute" style={position}>
                <div className="relative flex justify-center items-center">
                  <div className="absolute w-12 h-12 bg-blue-500/20 rounded-full animate-pulse" />
                  <div className="absolute w-6 h-6 bg-blue-500/40 rounded-full animate-ping delay-75" />
                  <div className="w-3 h-3 bg-blue-400 rounded-full z-10" />
                  <div className="absolute top-[-50px] bg-gray-800/90 text-white text-xs px-3 py-1 rounded-full shadow-lg border border-gray-700/50 backdrop-blur-sm">
                    Your Location
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="p-8 bg-gray-900/50">
          <form className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm text-gray-200 font-medium">Full Name</label>
              <Input
                className="bg-gray-800/50 border-gray-700/50 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                placeholder="Enter your name"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-200 font-medium">Email</label>
              <Input
                type="email"
                className="bg-gray-800/50 border-gray-700/50 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                placeholder="your@email.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-200 font-medium">Company</label>
              <Input
                className="bg-gray-800/50 border-gray-700/50 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                placeholder="Your company name"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-200 font-medium">Message</label>
              <Textarea
                className="bg-gray-800/50 border-gray-700/50 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all min-h-[120px]"
                placeholder="Tell us how we can assist you..."
              />
            </div>

            <Button
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-lg py-2.5 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Send Message
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}