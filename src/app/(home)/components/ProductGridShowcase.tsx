"use client";

import Image from "next/image";
import Link from "next/link";
import { RiArrowRightLine } from "react-icons/ri";
import LayoutContainer from "@/components/layout/LayoutContainer";
import type { Route } from "next";

interface ProductCard {
  badge: string;
  badgeColor: string;
  title: string;
  titleParts: { text: string; color: string }[];
  description: string;
  image: string;
  imageAlt: string;
  ctaLink: Route;
  ctaText: string;
  gradientColors: { from: string; to: string };
}

interface ProductGridShowcaseProps {
  products: ProductCard[];
}

export default function ProductGridShowcase({ products }: ProductGridShowcaseProps) {
  // Reorder products: Commercial (index 3), Advanced (index 1), Home (index 2), Residential (index 0)
  const commercialProduct = products[3]; // DC EV Charger 160kW/240kW (Commercial)
  const advancedProduct = products[1]; // DC EV Charger 400kW (Ultra-High Power)
  const homeProduct = products[2]; // AC EV Charger 7kW (Residential) - swapped
  const residentialProduct = products[0]; // DC EV Charger 60kW/120kW (Premium Solution) - swapped

  return (
    <section className="section-spacing bg-linear-to-br from-white via-gray-50 to-white overflow-x-hidden">
      <LayoutContainer className="w-full lg:w-4/6 mx-auto">
        {/* Grid Layout: 
            Top: Commercial EV Charger (2 cols wide) | Residential EV Charger (2 rows tall on right)
            Bottom: Ultra-High Power EV Charger | Premium EV Charger
        */}
          <div className="grid md:grid-cols-3 gap-6 md:gap-6 items-stretch">
          {/* Top Left - Commercial (Wide Card) - Spans 2 columns */}
          <Link href="/products/ev-dc-fq-120" className="relative group md:col-span-2 block cursor-pointer rounded-2xl md:rounded-3xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
            {/* Background image for Commercial EV Charger card */}
            <div className="absolute inset-0 rounded-2xl md:rounded-3xl overflow-hidden lg:h-[350px] h-full transition-all duration-300 group-hover:brightness-110">
              <Image
                src="/HomeBanner/homeFbg.jpg"
                alt="Commercial EV Charger background"
                fill
                className="object-cover object-top lg:object-bottom lg:h-[350px] h-full transition-transform duration-300 group-hover:scale-105"
                priority
              />
            </div>
            <div className="relative grid md:grid-cols-2 gap-1 md:gap-8 lg:gap-12 items-center h-full lg:h-[350px]">
              <div className="relative h-56 md:h-80 overflow-hidden bg-transparent flex items-center justify-center z-10 order-2 md:order-1 mt-4 md:mt-0">
                <Image
                  src={commercialProduct.image}
                  alt={commercialProduct.imageAlt}
                  fill
                  className="object-contain drop-shadow-2xl transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              {/* Content */}
              <div className="p-4 md:p-6 lg:p-12 mt-[-20px] space-y-3 md:space-y-4 lg:space-y-6 flex-1 flex flex-col h-full z-10 order-1 md:order-2">
                <p className={`text-[10px] md:text-xs lg:text-sm font-semibold tracking-[0.15em] md:tracking-[0.3em] ${commercialProduct.badgeColor} uppercase`}>
                  {commercialProduct.badge}
                </p>
                <h2 className="text-lg md:text-2xl lg:text-3xl xl:text-5xl font-bold leading-tight">
                  {commercialProduct.titleParts.map((part, index) => (
                    <span key={index} className={part.color}>
                      {part.text}{" "}
                    </span>
                  ))}
                </h2>
             
                <div
                  className="inline-flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-2 bg-linear-to-r from-primary to-accent text-white rounded-lg md:rounded-xl text-sm md:text-base font-semibold hover:scale-105 transition-all duration-300 shadow-md md:shadow-lg hover:shadow-xl opacity-0 group-hover:opacity-100 -mt-[6px]"
                >
                  {commercialProduct.ctaText}
                  <RiArrowRightLine className="text-base md:text-lg lg:text-xl" />
                </div>
              </div>
            </div>
          </Link>

          {/* Top Right - Residential (Tall Card) - Spans 2 rows */}
          <Link href="/products/ev-dc-dd" className="relative group md:col-start-3 md:row-start-1 md:row-span-2 h-full md:self-stretch block cursor-pointer rounded-2xl md:rounded-3xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
          
            <div className="relative bg-transparent rounded-2xl md:rounded-3xl overflow-hidden shadow-xl h-full flex flex-col transition-all duration-300">
              {/* Background image for Residential EV Charger card */}
              <div className="absolute inset-0 transition-all duration-300 group-hover:brightness-110">
                <Image
                  src="/HomeBanner/homeFbg2.jpg"
                  alt="Residential EV Charger background"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  priority
                />
              </div>
              {/* Overlay to improve text readability */}
              <div className="absolute inset-0" />

              {/* Image */}
              <div className="relative h-64 md:h-96 lg:h-[420px] lg:mt-[50px]  flex items-end justify-center ">
                <Image
                  src={residentialProduct.image}
                  alt={residentialProduct.imageAlt}
                  fill
                  className="object-contain drop-shadow-2xl transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              {/* Content */}
              <div className="relative p-4 md:p-6 flex-1 flex flex-col md:justify-end gap-3 md:gap-4 lg:gap-5">
                <div className="space-y-2 md:space-y-3">
                  <p className={`text-[10px] md:text-xs font-semibold tracking-[0.15em] ${residentialProduct.badgeColor} uppercase`}>
                    {residentialProduct.badge}
                  </p>
                  <h3 className="text-lg md:text-xl lg:text-2xl font-bold leading-tight">
                    {residentialProduct.titleParts.map((part, idx) => (
                      <span key={idx} className={part.color}>
                        {part.text}{" "}
                      </span>
                    ))}
                  </h3>
                
                </div>
                <div
                  className="inline-flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 bg-linear-to-r from-primary to-accent text-white rounded-lg md:rounded-xl text-sm md:text-base font-semibold hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg opacity-0 group-hover:opacity-100"
                >
                  View Products
                  <RiArrowRightLine className="text-base md:text-lg" />
                </div>
              </div>
            </div>
          </Link>

          {/* Bottom Left - Advanced (Small Card) */}
          <Link href="/products/ev-dc-fd" className="relative group md:row-start-2 h-full block cursor-pointer rounded-2xl md:rounded-3xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
            <div
              className={`absolute inset-0 bg-linear-to-br ${advancedProduct.gradientColors.from} ${advancedProduct.gradientColors.to} rounded-2xl md:rounded-3xl blur-3xl group-hover:blur-2xl transition-all duration-500 opacity-50`}
            />
            <div className="relative bg-transparent rounded-2xl md:rounded-3xl overflow-hidden shadow-xl h-full flex flex-col transition-all duration-300">
              {/* Background image for Ultra-High Power EV Charger card */}
              <div className="absolute inset-0 transition-all duration-300 group-hover:brightness-110">
                <Image
                  src="/HomeBanner/homeGbg1.jpg"
                  alt="Ultra-High Power EV Charger background"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  priority
                />
              </div>
              {/* Overlay for readability */}
              <div className="absolute inset-0 " />

              {/* Foreground image */}
              <div className="relative h-[273px] w-full flex items-end justify-center order-2 md:order-1 transform translate-y-6 md:translate-y-0 lg:absolute lg:top-[70%] lg:left-1/2 lg:h-[273px] lg:w-[307px] lg:-translate-x-1/2 lg:-translate-y-1/2">
                <Image
                  src={advancedProduct.image}
                  alt={advancedProduct.imageAlt}
                  fill
                  className="object-contain p-4 md:p-6 drop-shadow-2xl transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              {/* Content */}
              <div className="relative p-4 h-full md:p-6 flex-1 flex flex-col gap-1 md:gap-4 order-1 md:order-2 md:absolute md:bottom-0 md:left-0 md:right-0 z-20">
                <p className={`text-[10px] md:text-xs font-semibold tracking-[0.15em] ${advancedProduct.badgeColor} uppercase`}>
                  {advancedProduct.badge}
                </p>
                <h3 className="text-lg md:text-xl lg:text-2xl font-bold leading-tight">
                  {advancedProduct.titleParts.map((part, idx) => (
                    <span key={idx} className={part.color}>
                      {part.text}{" "}
                    </span>
                  ))}
                </h3>
             
                <div
                  className="inline-flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 bg-linear-to-r from-primary to-accent text-white rounded-lg md:rounded-xl text-sm md:text-base font-semibold hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg mt-auto opacity-0 group-hover:opacity-100"
                >
                  View Products
                  <RiArrowRightLine className="text-base md:text-lg" />
                </div>
              </div>
            </div>
          </Link>

          {/* Bottom Middle - Home (Small Card) */}
          <Link href="/products/ev-dc-wd" className="relative group md:row-start-2 h-80 max-h-80 block cursor-pointer rounded-2xl md:rounded-3xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
            {/* Background image for Premium EV Charger card */}
            <div className="absolute inset-0 rounded-2xl md:rounded-3xl overflow-hidden transition-all duration-300 group-hover:brightness-110">
              <Image
                src="/HomeBanner/homeFbg4.jpg"
                alt="Premium EV Charger background"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                priority
              />
            </div>
            {/* Soft overlay for readability */}
            <div className="absolute inset-0 transition-all duration-300" />

            <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-xl h-full flex flex-col bg-transparent transition-all duration-300">
              {/* Image */}
              <div className="absolute w-full h-full  mt-[20px] md:h-[80%] flex items-end justify-center lg:absolute lg:top-1/2 lg:left-1/2 lg:h-[273px] lg:w-[307px] lg:-translate-x-1/2 lg:-translate-y-1/2 z-10">
                <Image
                  src={homeProduct.image}
                  alt={homeProduct.imageAlt}
                  fill
                  className="object-contain drop-shadow-2xl transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              {/* Content */}
              <div className="p-4 md:p-6 flex-1 flex flex-col gap-3 md:gap-4 absolute z-10 bottom-0 left-0 right-0 ">
                <p className={`text-[10px] md:text-xs font-semibold tracking-[0.15em] ${homeProduct.badgeColor} uppercase`}>
                  {homeProduct.badge}
                </p>
                <h3 className="text-lg md:text-xl lg:text-2xl font-bold leading-tight">
                  {homeProduct.titleParts.map((part, idx) => (
                    <span key={idx} className={part.color}>
                      {part.text}{" "}
                    </span>
                  ))}
                </h3>
               
                <div
                  className="inline-flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 bg-linear-to-r from-primary to-accent text-white rounded-lg md:rounded-xl text-sm md:text-base font-semibold hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg mt-auto opacity-0 group-hover:opacity-100"
                >
                  View Products
                  <RiArrowRightLine className="text-base md:text-lg" />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </LayoutContainer>
    </section>
  );
}

