"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import { Maximize2, X, Heart } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

export function CardWithForm() {
  const [cardSets, setCardSets] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const [likedImages, setLikedImages] = useState<Set<string>>(() => {
    if (typeof window === "undefined") return new Set();
    const saved = localStorage.getItem("likedImages");
    return saved ? new Set(JSON.parse(saved)) : new Set<string>();
  });

  const loadingRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const seenImages = useRef(new Set<string>());

  const searchQueries = ["Female fashion trend Indian"];

  // Persist liked images to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("likedImages", JSON.stringify(Array.from(likedImages)));
    }
  }, [likedImages]);

  // Infinite scroll observer
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isLoading) {
          setPage((prev) => prev + 1);
        }
      },
      { root: null, rootMargin: "100px", threshold: 0.1 }
    );
    if (loadingRef.current) observerRef.current.observe(loadingRef.current);
    return () => observerRef.current?.disconnect();
  }, [isLoading]);

  // Fetch images on page change
  useEffect(() => {
    fetchImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const getRandomQuery = () => searchQueries[Math.floor(Math.random() * searchQueries.length)];
  const getRandomPage = () => Math.floor(Math.random() * 15) + 1;

  const fetchImages = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const fetchPromises = Array.from({ length: 3 }, async () => {
        const query = getRandomQuery();
        const randomPage = getRandomPage();
        const res = await fetch(
          `https://api.pexels.com/v1/search?query=${query}&page=${randomPage}&per_page=5`,
          { headers: { Authorization: process.env.NEXT_PUBLIC_PEXELS_API_KEY} }
        );
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      });
      const results = await Promise.all(fetchPromises);
      const newImages = results
        .flatMap((data) => data?.photos?.map((photo: any) => photo.src.large) || [])
        .filter((imageUrl) => !seenImages.current.has(imageUrl));
      newImages.forEach((imageUrl) => seenImages.current.add(imageUrl));
      setCardSets((prev) => [...prev, ...newImages]);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFullscreen = (imageUrl: string | null) => {
    setFullscreenImage(imageUrl);
    document.body.style.overflow = imageUrl ? "hidden" : "auto";
  };

  return (
    <>
      {/* Global CSS for Animations */}
      <style jsx global>{`
        @keyframes heartSpin {
          0% {
            transform: scale(1) rotate(0deg);
          }
          50% {
            transform: scale(2) rotate(180deg);
          }
          100% {
            transform: scale(1.3) rotate(360deg);
          }
        }
        @keyframes sparkle {
          0% {
            opacity: 1;
            transform: scale(0);
          }
          50% {
            opacity: 0.9;
            transform: scale(1.5);
          }
          100% {
            opacity: 0;
            transform: scale(2) translate(var(--translate-x), var(--translate-y));
          }
        }
        @keyframes ripple {
          0% {
            opacity: 0.6;
            transform: scale(0);
          }
          100% {
            opacity: 0;
            transform: scale(3);
          }
        }
        .heart-liked {
          animation: heartSpin 0.8s ease-out forwards;
        }
        .heart-unliked {
          transition: all 0.3s ease-out;
        }
        .sparkle {
          position: absolute;
          width: var(--size);
          height: var(--size);
          background: radial-gradient(circle, var(--color), transparent);
          border-radius: 50%;
          animation: sparkle 1.2s ease-out forwards;
          pointer-events: none;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .ripple {
          position: absolute;
          width: 48px;
          height: 48px;
          background: radial-gradient(circle, rgba(255, 0, 0, 0.3), transparent);
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: ripple 1.2s ease-out forwards;
          pointer-events: none;
        }
      `}</style>

      {/* Link to Likes Page */}
      <div className="p-4" style={{display: 'none'}}>
        <Link href="/likes" className="text-blue-500 hover:underline">
          View Liked Images ({likedImages.size})
        </Link>
      </div>

      {cardSets.length === 0 && isLoading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <Card key={index} className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg">
              <Skeleton className="aspect-[3/4]" />
              <CardFooter>
                <Skeleton className="w-20 h-6" />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        cardSets.map((imageUrl, index) => (
          <Card key={`${imageUrl}-${index}`} className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg">
            <div className="aspect-[3/4] relative">
              <img
                src={imageUrl}
                alt={`Fashion Item ${index + 1}`}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute top-4 right-4 flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-black/50 hover:bg-black/70 text-white rounded-full opacity-0 transition-opacity group-hover:opacity-100"
                  onClick={() => toggleFullscreen(imageUrl)}
                >
                  <Maximize2 className="h-4 w-4" />
                </Button>
                <div className="relative flex items-center justify-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="bg-black/90 rounded-full text-white hover:text-gray-200"
                    onClick={() => {
                      setLikedImages((prev) => {
                        const newSet = new Set(prev);
                        if (newSet.has(imageUrl)) {
                          newSet.delete(imageUrl);
                        } else {
                          newSet.add(imageUrl);
                        }
                        return newSet;
                      });
                    }}
                  >
                    <Heart
                      className={`h-6 w-6 ${
                        likedImages.has(imageUrl)
                          ? "text-red-500"
                          : "text-white stroke-2"
                      } ${likedImages.has(imageUrl) ? "heart-liked" : "heart-unliked"}`}
                      fill={likedImages.has(imageUrl) ? "currentColor" : "none"}
                    />
                    {likedImages.has(imageUrl) && (
                      <>
                        <span
                          className="sparkle"
                          style={
                            {
                              "--size": "8px",
                              "--color": "rgba(255, 215, 0, 0.9)",
                              "--translate-x": "15px",
                              "--translate-y": "-15px",
                            } as React.CSSProperties
                          }
                        />
                        <span
                          className="sparkle"
                          style={
                            {
                              "--size": "6px",
                              "--color": "rgba(255, 0, 0, 0.8)",
                              "--translate-x": "-20px",
                              "--translate-y": "10px",
                            } as React.CSSProperties
                          }
                        />
                        <span
                          className="sparkle"
                          style={
                            {
                              "--size": "8px",
                              "--color": "rgba(255, 0, 0, 0.8)",
                              "--translate-x": "-20px",
                              "--translate-y": "10px",
                            } as React.CSSProperties
                          }
                        />
                        <span
                          className="sparkle"
                          style={
                            {
                              "--size": "6px",
                              "--color": "rgba(143, 241, 30, 0.8)",
                              "--translate-x": "-20px",
                              "--translate-y": "10px",
                            } as React.CSSProperties
                          }
                        />
                        <span
                          className="sparkle"
                          style={
                            {
                              "--size": "6px",
                              "--color": "rgba(248, 99, 99, 0.8)",
                              "--translate-x": "-20px",
                              "--translate-y": "10px",
                            } as React.CSSProperties
                          }
                        />
                        <span
                          className="sparkle"
                          style={
                            {
                              "--size": "6px",
                              "--color": "rgba(3, 33, 165, 0.8)",
                              "--translate-x": "-20px",
                              "--translate-y": "10px",
                            } as React.CSSProperties
                          }
                        />
                        <span
                          className="sparkle"
                          style={
                            {
                              "--size": "6px",
                              "--color": "rgba(255, 200, 200, 0.8)",
                              "--translate-x": "-20px",
                              "--translate-y": "10px",
                            } as React.CSSProperties
                          }
                        />
                        <span
                          className="sparkle"
                          style={
                            {
                              "--size": "10px",
                              "--color": "rgba(255, 255, 255, 0.9)",
                              "--translate-x": "10px",
                              "--translate-y": "20px",
                            } as React.CSSProperties
                          }
                        />
                        <span
                          className="sparkle"
                          style={
                            {
                              "--size": "7px",
                              "--color": "rgba(255, 215, 0, 0.8)",
                              "--translate-x": "-15px",
                              "--translate-y": "-20px",
                            } as React.CSSProperties
                          }
                        />
                        <span
                          className="sparkle"
                          style={
                            {
                              "--size": "9px",
                              "--color": "rgba(255, 0, 0, 0.7)",
                              "--translate-x": "20px",
                              "--translate-y": "0px",
                            } as React.CSSProperties
                          }
                        />
                        <span className="ripple" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))
      )}

      <div ref={loadingRef} className="col-span-full h-4">
        {isLoading && (
          <div className="w-full text-center py-4 animate-pulse text-gray-400">
            Loading images...
          </div>
        )}
      </div>

      {fullscreenImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={() => toggleFullscreen(null)}
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full"
            onClick={() => toggleFullscreen(null)}
          >
            <X className="h-4 w-4" />
          </Button>
          <img
            src={fullscreenImage}
            alt="Fullscreen view"
            className="max-h-[90vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
