"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { RiArrowLeftLine, RiArrowRightLine } from "react-icons/ri";
// import Link from "next/link";
// import type { Route } from "next";

interface CarouselSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  backgroundImage?: string; // Optional background image
  mobileBackgroundImage?: string; // Mobile-specific background image
  mobileBackgroundPosition?: string; // Mobile-specific background position
  buttonText: string;
  buttonLink: string;
  gradient: string;
  showimg?: boolean;
  imageClassName?: string;
  descriptionClassName?: string;
  layout?: "overlay" | "side-by-side"; // New layout option
}

interface CarouselBannerProps {
  slides: CarouselSlide[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export default function CarouselBanner({
  slides,
  autoPlay = true,
  autoPlayInterval = 5000,
}: CarouselBannerProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  // Detect mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Auto-play functionality with proper cleanup
  useEffect(() => {
    if (!autoPlay || slides.length <= 1 || isPaused) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Reset and animate progress bar
    if (progressRef.current) {
      progressRef.current.style.width = "0%";
      progressRef.current.style.transition = "none";
      setTimeout(() => {
        if (progressRef.current) {
          progressRef.current.style.transition = `width ${autoPlayInterval}ms linear`;
          progressRef.current.style.width = "100%";
        }
      }, 50);
    }

    // Start new interval
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, autoPlayInterval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [autoPlay, autoPlayInterval, slides.length, isPaused]);

  // Pause auto-play on hover
  const handleMouseEnter = () => {
    setIsPaused(true);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentSlide) return;
    
    setIsTransitioning(true);
    
    // Reset progress bar when slide changes manually
    if (progressRef.current) {
      progressRef.current.style.width = "0%";
      progressRef.current.style.transition = "none";
    }
    
    setCurrentSlide(index);
    
    // Animate slide transition
    if (carouselRef.current) {
      const slides = carouselRef.current.querySelectorAll(".carousel-slide");
      gsap.to(slides[index], {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
      });
      
      slides.forEach((slide, i) => {
        if (i !== index) {
          gsap.to(slide, {
            opacity: 0,
            scale: 1.1,
            duration: 0.8,
            ease: "power3.out",
          });
        }
      });
    }

    setTimeout(() => {
      setIsTransitioning(false);
    }, 800);
  };

  // Update slide animations when currentSlide changes
  useEffect(() => {
    if (carouselRef.current) {
      const slideElements = carouselRef.current.querySelectorAll(".carousel-slide");
      slideElements.forEach((slide, index) => {
        if (index === currentSlide) {
          gsap.to(slide, {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
          });
        } else {
          gsap.to(slide, {
            opacity: 0,
            scale: 1.1,
            duration: 0.8,
            ease: "power3.out",
          });
        }
      });
    }

    // Reset progress bar when slide changes (for auto-play)
    if (autoPlay && progressRef.current && !isPaused) {
      progressRef.current.style.width = "0%";
      progressRef.current.style.transition = "none";
      setTimeout(() => {
        if (progressRef.current) {
          progressRef.current.style.transition = `width ${autoPlayInterval}ms linear`;
          progressRef.current.style.width = "100%";
        }
      }, 50);
    }
  }, [currentSlide, autoPlay, autoPlayInterval, isPaused]);

  const goToNext = () => {
    setCurrentSlide((prev) => {
      const nextIndex = (prev + 1) % slides.length;
      return nextIndex;
    });
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => {
      const prevIndex = (prev - 1 + slides.length) % slides.length;
      return prevIndex;
    });
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      goToNext();
    } else if (distance < -minSwipeDistance) {
      goToPrevious();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div
      className="relative w-full h-[560px] md:h-[620px] lg:h-[680px] overflow-hidden max-w-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides Container */}
      <div ref={carouselRef} className="relative w-full h-full mt-15">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`carousel-slide absolute inset-0 ${
              index === currentSlide ? "z-10" : "z-0"
            }`}
          >
            {slide.layout === "side-by-side" ? (
              /* Side-by-side layout: Image left, Text right */
              <>
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url(${
                      isMobile && slide.mobileBackgroundImage
                        ? slide.mobileBackgroundImage
                        : slide.backgroundImage || slide.image
                    })`,
                    backgroundSize: "stretch",
                    backgroundPosition:
                      isMobile && slide.mobileBackgroundPosition
                        ? slide.mobileBackgroundPosition
                        : "center",
                  }}
                >
                  {/* Gradient Overlay - Reduced opacity to show background */}
                  <div
                    className={`absolute inset-0 ${slide.gradient} transition-opacity duration-1000`}
                    style={{ opacity: 0.3 }}
                  />
                </div>

                {/* Content with side-by-side layout */}
                <div className="relative z-10 h-full flex items-center">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 w-full">
                    <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-center">
                      {/* Image on Left */}
                     {slide.showimg && (
                      <div
                        className={
                          slide.imageClassName ||
                          "relative w-full md:w-1/2 h-full md:h-[460px] lg:h-[500px]"
                        }
                      >
                        <Image
                          src={slide.image}
                          alt={slide.title}
                          fill
                          priority={index === currentSlide}
                          sizes="(min-width: 1024px) 45vw, 90vw"
                          className=" object-contain md:object-cover object-right md:object-center rounded-2xl shadow-xl"
                        />
                      </div>
                    )}
                      
                      {/* Text on Right */}
                      {/* <div className={slide.descriptionClassName || "w-full md:w-1/2"}>
                        <div className="space-y-3 md:space-y-4">
                          <p className="font-orbitron tracking-[0.2em] md:tracking-[0.3em] text-xs sm:text-sm text-secondary uppercase animate-fade-in">
                            {slide.subtitle}
                          </p>
                          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight break-words">
                            <span className="neon-glow block">{slide.title}</span>
                          </h1>
                          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-100 leading-relaxed break-words">
                            {slide.description}
                          </p>
                        </div>
                        <div className="pt-3 md:pt-4">
                          <Link
                            href={slide.buttonLink as Route}
                            className="group inline-flex items-center justify-center gap-2 bg-linear-to-r from-primary to-accent text-white px-6 py-3 md:px-8 md:py-4 rounded-xl text-sm md:text-base font-semibold shadow-lg glow-effect transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                          >
                            {slide.buttonText}
                            <RiArrowRightLine className="text-base md:text-lg group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              /* Overlay layout: Text over image */
              <>
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url(${
                      isMobile && slide.mobileBackgroundImage
                        ? slide.mobileBackgroundImage
                        : slide.backgroundImage || slide.image
                    })`,
                    backgroundSize: "cover",
                    backgroundPosition:
                      isMobile && slide.mobileBackgroundPosition
                        ? slide.mobileBackgroundPosition
                        : "center",
                  }}
                >
                  {/* Gradient Overlay */}
                  <div
                    className={`absolute inset-0 ${slide.gradient} transition-opacity duration-1000`}
                  />
                </div>

                {/* Content */}
                <div className="relative z-10 h-full flex items-center">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 w-full">
                    <div className="max-w-2xl space-y-4 md:space-y-6 text-white">
                      <div className="space-y-3 md:space-y-4">
                        <p className="font-orbitron tracking-[0.2em] md:tracking-[0.3em] text-xs sm:text-sm text-secondary uppercase animate-fade-in">
                          {slide.subtitle}
                        </p>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight wrap-break-word ">
                          <span className="neon-glow block">{slide.title}</span>
                        </h1>
                        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-blue-100 leading-relaxed max-w-xl wrap-break-word">
                          {slide.description}
                        </p>
                      </div>
                   
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            disabled={isTransitioning}
            className="hidden sm:flex absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-white/10 backdrop-blur-md rounded-full items-center justify-center text-white hover:bg-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
            aria-label="Previous slide"
          >
            <RiArrowLeftLine className="text-xl md:text-2xl group-hover:-translate-x-1 transition-transform" />
          </button>
          <button
            onClick={goToNext}
            disabled={isTransitioning}
            className="hidden sm:flex absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-white/10 backdrop-blur-md rounded-full items-center justify-center text-white hover:bg-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
            aria-label="Next slide"
          >
            <RiArrowRightLine className="text-xl md:text-2xl group-hover:translate-x-1 transition-transform" />
          </button>
        </>
      )}

      {/* Pagination Dots */}
      {slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isTransitioning}
              className={`relative transition-all duration-300 disabled:cursor-not-allowed group`}
              aria-label={`Go to slide ${index + 1}`}
            >
              <div
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-secondary scale-125"
                    : "bg-white/40 hover:bg-white/60"
                }`}
              />
              {index === currentSlide && (
                <div className="absolute inset-0 -m-2 border-2 border-secondary rounded-full animate-pulse" />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Progress Bar */}
      {autoPlay && slides.length > 1 && (
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10 z-20">
          <div
            ref={progressRef}
            className="h-full bg-secondary"
            style={{
              width: "0%",
            }}
          />
        </div>
      )}
    </div>
  );
}

