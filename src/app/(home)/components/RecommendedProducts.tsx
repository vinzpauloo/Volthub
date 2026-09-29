"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  RiSunLine,
  RiChargingPile2Line,
  RiHomeSmileLine,
  // RiBatteryChargeLine,
  RiFlashlightLine,
} from "react-icons/ri";
import Link from "next/link";
import { Route } from "next";
type RecommendedProduct = {
  title: string;
  image: string;
  Icon: React.ElementType;
  hoverBorderClass: string;
  hoverBgClass: string;
  hoverIconClass: string;
  hoverTextClass: string;
  href: string;
  description: string;
};

const products: RecommendedProduct[] = [
  {
    title: "Solar Street Light",
    image: "/aboutimages/solarstreetlight.jpg",
    hoverBorderClass: "hover:border-blue-900",
    hoverBgClass: "hover:bg-blue-900/50",
    hoverIconClass: "group-hover:text-blue-900",
    hoverTextClass: "group-hover:text-blue-900",
    Icon: RiSunLine,
    href: "/products?category=solar-street",
    description: "Efficient solar-powered street lighting solutions that provide reliable illumination while reducing energy costs and environmental impact.",
  },
  {
    title: "EV Chargers",
    image: "/Product/evpb.jpg",
    hoverBorderClass: "hover:border-teal-700",
    hoverBgClass: "hover:bg-teal-700/50",
    hoverIconClass: "group-hover:text-teal-700",
    hoverTextClass: "group-hover:text-teal-700",
    Icon: RiChargingPile2Line,
    href: "/products?category=ev-charging",
    description: "Fast and reliable electric vehicle charging stations designed for homes, businesses, and public spaces to support the future of transportation.",
  },
  {
    title: "Smart Home Storage",
    image: "/Product/SmartHome/2B/prod2.png",
    hoverBorderClass: "hover:border-amber-300",
    hoverBgClass: "hover:bg-amber-300/50",
    hoverIconClass: "group-hover:text-amber-300",
    hoverTextClass: "group-hover:text-amber-300",
    Icon: RiHomeSmileLine,
    href: "/products?category=smart-home",
    description: "Advanced home battery storage systems that store solar energy for use anytime, providing energy independence and backup power for your home.",
  },
  {
    title: "Power Supplies",
    image: "/HomeBanner/commercial1.png",
    hoverBorderClass: "hover:border-lime-700",
    hoverBgClass: "hover:bg-lime-700/50",
    hoverIconClass: "group-hover:text-lime-700",
    hoverTextClass: "group-hover:text-lime-700",
    Icon: RiFlashlightLine,
    href: "/products?category=cabinet",
    description: "Industrial-grade power supply solutions and energy storage systems for commercial and large-scale applications with maximum reliability.",
  },
];

export default function RecommendedProducts() {
  return (
    <section className="bg-[var(--cr-bg)] py-10 md:py-14">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="text-center space-y-2 md:space-y-3">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Products Categories
          </h2>
          <p className="text-sm md:text-base text-[var(--cr-fg-dim)]">
            Choose from our products categories and feel free to choose!
          </p>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <Link
              key={product.title}
              href={product.href as Route}
              className={cn(
                "group rounded-xl border border-[var(--cr-line)] bg-[var(--cr-bg-elev)] shadow-sm transition-all duration-200 block relative overflow-hidden",
                "hover:-translate-y-0.5 hover:shadow-lg",
                product.hoverBorderClass,
                product.hoverBgClass
              )}
            >
              <div className="p-5 space-y-2 relative z-10">
                <div className={cn("h-10 w-10 text-primary flex items-center justify-center text-[60px] font-large font-bold transition-colors duration-200", product.hoverIconClass)}>
                  <product.Icon />
                </div>
                <h3 className={cn("text-lg font-semibold text-white transition-colors duration-200", product.hoverTextClass)}>
                  {product.title}
                </h3>
                <div className="h-0.5 w-10 bg-primary group-hover:w-12 transition-all duration-200" />
              </div>
              <div className="relative h-56 w-full overflow-hidden rounded-b-xl">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  priority
                />
                {/* Description overlay that appears on hover */}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <p className="text-white text-sm md:text-base p-4 md:p-5 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

