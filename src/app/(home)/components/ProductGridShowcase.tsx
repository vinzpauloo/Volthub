"use client";

import Image from "next/image";
import Link from "next/link";
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
  imageHasCopy?: boolean;
  coverPosition?: string;
  ctaLink: Route;
  gradientColors: { from: string; to: string };
}

interface ProductGridShowcaseProps {
  products: ProductCard[];
}

interface FullBleedCardProps {
  product: ProductCard;
  href: Route;
  className?: string;
  imageClassName?: string;
  sizes: string;
  priority?: boolean;
}

function FullBleedProductCard({
  product,
  href,
  className = "",
  imageClassName = "object-cover object-center",
  sizes,
  priority = false,
}: FullBleedCardProps) {
  const showOverlayCopy = !product.imageHasCopy;

  return (
    <Link
      href={href}
      className={`relative group block cursor-pointer rounded-2xl md:rounded-3xl overflow-hidden shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl ${className}`}
    >
      <Image
        src={product.image}
        alt={product.imageAlt}
        fill
        className={`${imageClassName} transition-all duration-300 group-hover:scale-105 group-hover:brightness-110`}
        style={
          product.coverPosition ? { objectPosition: product.coverPosition } : undefined
        }
        priority={priority}
        sizes={sizes}
      />
      {showOverlayCopy && (
        <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/10 to-transparent pointer-events-none" />
      )}
      {showOverlayCopy && (
        <div className="absolute bottom-4 inset-x-0 z-10 px-4 md:bottom-6 md:px-6 space-y-1 md:space-y-1.5 pointer-events-none">
          <p
            className={`text-[10px] md:text-xs font-semibold tracking-[0.15em] ${product.badgeColor} uppercase drop-shadow-sm`}
          >
            {product.badge}
          </p>
          <h3 className="text-base md:text-lg lg:text-xl font-bold leading-snug drop-shadow-md">
            {product.titleParts.map((part, idx) => (
              <span key={idx} className={part.color}>
                {part.text}{" "}
              </span>
            ))}
          </h3>
        </div>
      )}
    </Link>
  );
}

export default function ProductGridShowcase({ products }: ProductGridShowcaseProps) {
  const commercialProduct = products[3];
  const advancedProduct = products[1];
  const homeProduct = products[2];
  const residentialProduct = products[0];

  return (
    <section className="section-spacing bg-linear-to-br from-white via-gray-50 to-white overflow-x-hidden">
      <LayoutContainer className="w-full lg:w-4/6 mx-auto">
        <div className="grid md:grid-cols-3 gap-6 md:gap-6 items-stretch">
          <FullBleedProductCard
            product={commercialProduct}
            href={commercialProduct.ctaLink}
            className="md:col-span-2 min-h-[320px] lg:min-h-[400px]"
            imageClassName="object-cover"
            sizes="(max-width: 768px) 100vw, 66vw"
            priority
          />

          <FullBleedProductCard
            product={residentialProduct}
            href={residentialProduct.ctaLink}
            className="md:col-start-3 md:row-start-1 md:row-span-2 min-h-[360px] md:min-h-0 md:self-stretch"
            sizes="(max-width: 768px) 100vw, 33vw"
            priority
          />

          <FullBleedProductCard
            product={advancedProduct}
            href={advancedProduct.ctaLink}
            className="md:row-start-2 min-h-[320px] md:min-h-[360px]"
            imageClassName="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 33vw"
          />

          <FullBleedProductCard
            product={homeProduct}
            href={homeProduct.ctaLink}
            className="md:row-start-2 min-h-[320px] md:max-h-none md:min-h-[360px]"
            imageClassName="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      </LayoutContainer>
    </section>
  );
}
