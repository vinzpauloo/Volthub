import Image from "next/image";
import Link from "next/link";
import { RiArrowRightSLine } from "react-icons/ri";
// [BACKEND-TODO] — Restore category icons when tag field is re-added
// import { RiBatteryChargeLine, RiChargingPile2Line, RiHomeGearLine, RiSunLine } from "react-icons/ri";
import { Product } from "./productData";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  // [BACKEND-TODO] — Restore category icon mapping when tag field is re-added
  // const getCategoryIcon = () => {
  //   switch (product.category) {
  //     case "smart-home":
  //       return RiHomeGearLine;
  //     case "ev-charging":
  //       return RiChargingPile2Line;
  //     case "solar-street":
  //       return RiSunLine;
  //     case "cabinet":
  //       return RiBatteryChargeLine;
  //     default:
  //       return null;
  //   }
  // };
  // const Icon = getCategoryIcon();

  // Use description (truncated) or SKU as subtitle fallback
  const subtitle = product.description
    ?.slice(0, 100)
    ?? product.sku_code
    ?? "";

  return (
    <Link href={`/products/${product.id}`}>
      <article className="group bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col border border-slate-100 cursor-pointer h-full">
        <div className="relative overflow-hidden bg-slate-100">
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={420}
            className="w-full h-48 md:h-52 lg:h-56 object-cover group-hover:scale-[1.03] transition-transform duration-500"
          />
          <div className="absolute inset-0 pointer-events-none bg-linear-to-t from-black/5 via-transparent to-transparent opacity-70" />
          {/* Logo overlay - top left */}
          <div className="absolute top-3 left-3 z-10">
            <Image
              src="/volthub-logo-black-text.png"
              alt="VoltHub logo"
              width={120}
              height={32}
              className="h-4 md:h-5 w-auto object-contain opacity-30 drop-shadow-sm"
            />
          </div>
        </div>

        <div className="p-4 md:p-5 lg:p-6 flex flex-col gap-3 md:gap-4 flex-1">
          <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-slate-900 line-clamp-2 leading-tight">
            {product.name}
          </h3>
          
          <p className="text-sm md:text-base text-slate-600 flex-1 line-clamp-2 leading-relaxed">
            {subtitle}
          </p>

          <div className="flex items-center justify-between pt-2 gap-2">
            {/* [BACKEND-TODO] — Restore tag badge with icon when tag field is re-added
            {product.tag && Icon && (
              <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700 truncate">
                <Icon className="h-4 w-4 text-primary flex-shrink-0" />
                <span>{product.tag.trim()}</span>
              </span>
            )}
            {product.tag && !Icon && (
              <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700 truncate">
                {product.tag.trim()}
              </span>
            )}
            */}
            {/* SKU code badge if available */}
            {product.sku_code && (
              <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700 truncate">
                {product.sku_code}
              </span>
            )}
            <div className="ml-auto inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2 transition-all shrink-0">
              <span>Learn More</span>
              <RiArrowRightSLine className="h-4 w-4 md:h-5 md:w-5" />
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

