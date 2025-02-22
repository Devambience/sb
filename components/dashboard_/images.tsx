'use client';

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
    // Load from localStorage on mount
    const saved = typeof window !== 'undefined' ? localStorage.getItem('likedImages') : null;
    return saved ? new Set(JSON.parse(saved)) : new Set<string>();
  });
  const loadingRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver>();
  const seenImages = useRef(new Set<string>());

  const searchQueries = ['Female fashion trend'];

  // Persist likedImages to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('likedImages', JSON.stringify(Array.from(likedImages)));
  }, [likedImages]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "100px",
      threshold: 0.1,
    };

    observerRef.current = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting && !isLoading) {
        setPage((prev) => prev + 1);
      }
    }, options);

    if (loadingRef.current) {
      observerRef.current.observe(loadingRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [isLoading]);

  useEffect(() => {
    fetchImages();
  }, [page]);

  const getRandomQuery = () => {
    const randomIndex = Math.floor(Math.random() * searchQueries.length);
    return searchQueries[randomIndex];
  };

  const getRandomPage = () => {
    return Math.floor(Math.random() * 15) + 1;
  };

  const fetchImages = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const fetchPromises = Array(3).fill(null).map(async () => {
        const query = getRandomQuery();
        const randomPage = getRandomPage();
        const res = await fetch(
          `https://api.pexels.com/v1/search?query=${query}&page=${randomPage}&per_page=5`,
          {
            headers: {
              Authorization: process.env.NEXT_PUBLIC_PEXELS_API_KEY || "",
            },
          }
        );
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      });

      const results = await Promise.all(fetchPromises);
      const newImages = results
        .flatMap((data) => data?.photos?.map((photo: any) => photo.src.large) || [])
        .filter((imageUrl) => !seenImages.current.has(imageUrl));

      const shuffledImages = newImages.sort(() => Math.random() - 0.5);
      shuffledImages.forEach((imageUrl) => seenImages.current.add(imageUrl));
      setCardSets((prev) => [...prev, ...shuffledImages]);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFullscreen = (imageUrl: string | null) => {
    setFullscreenImage(imageUrl);
    if (imageUrl) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  return (
    <>
      {/* Inject custom CSS for the ultra-cool animation */}
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
      <div className="p-4" style={{ display: 'none' }}>
        <Link href="/likes" className="text-blue-500 hover:underline">
          View Liked Images ({likedImages.size})
        </Link>
      </div>

      {cardSets.length === 0 && isLoading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg"
            >
              <Skeleton className="aspect-[3/4]" />
              <CardFooter>
                <Skeleton className="w-20 h-6" />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        cardSets.map((imageUrl, index) => (
          <Card
            key={`${imageUrl}-${index}`}
            className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg"
          >
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
                      className={`h-52 w-52 ${
                        likedImages.has(imageUrl)
                          ? 'text-red-500 heart-liked'
                          : 'text-white heart-unliked stroke-2'
                      }`}
                      fill={likedImages.has(imageUrl) ? 'currentColor' : 'none'}
                    />
                    {likedImages.has(imageUrl) && (
                      <>
                        <span
                          className="sparkle"
                          style={{
                            '--size': '10px',
                            '--color': 'rgba(255, 215, 0, 0.9)',
                            '--translate-x': '15px',
                            '--translate-y': '-15px',
                          }}
                        />
                        <span
                          className="sparkle"
                          style={{
                            '--size': '6px',
                            '--color': 'rgba(255, 0, 0, 0.8)',
                            '--translate-x': '-20px',
                            '--translate-y': '10px',
                          }}
                        />
                        <span
                          className="sparkle"
                          style={{
                            '--size': '10px',
                            '--color': 'rgba(255, 255, 255, 0.9)',
                            '--translate-x': '10px',
                            '--translate-y': '20px',
                          }}
                        />
                        <span
                          className="sparkle"
                          style={{
                            '--size': '7px',
                            '--color': 'rgba(255, 215, 0, 0.8)',
                            '--translate-x': '-15px',
                            '--translate-y': '-20px',
                          }}
                        />
                        <span
                          className="sparkle"
                          style={{
                            '--size': '12px',
                            '--color': 'rgba(49, 223, 14, 0.8)',
                            '--translate-x': '-15px',
                            '--translate-y': '-20px',
                          }}
                        />
                        <span
                          className="sparkle"
                          style={{
                            '--size': '7px',
                            '--color': 'rgba(12, 239, 247, 0.8)',
                            '--translate-x': '-15px',
                            '--translate-y': '-20px',
                          }}
                        />
                        <span
                          className="sparkle"
                          style={{
                            '--size': '9px',
                            '--color': 'rgba(255, 0, 0, 0.7)',
                            '--translate-x': '20px',
                            '--translate-y': '0px',
                          }}
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
          <div className="w-full text-center py-4">
            <div className="animate-pulse text-gray-400">Loading images...</div>
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