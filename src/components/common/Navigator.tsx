"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Route } from "next";

interface MenuItem {
  title: string;
  href: string;
  description: string;
  image?: string;
}

const menu: Record<string, MenuItem[] | MenuItem> = {
  home: {
    title: "Home",
    href: "/",
    description: "Hero overview and highlights.",
  },
  products: [
    {
      title: "All Products",
      href: "/products",
      description: "Browse all available product categories.",
      image: "/HomeBanner/banner3.jpg",
    },
    {
      title: "Solar Systems",
      href: "/products?category=solar-street",
      description: "Discover our solar street and energy solutions.",
      image: "/aboutimages/solarstreetlight.jpg",
    },
    {
      title: "EV Chargers",
      href: "/products?category=ev-charging",
      description: "View EV charging systems and related products.",
      image: "/Product/evpb.jpg",
    },
    {
      title: "Energy Storage",
      href: "/products?category=smart-home",
      description: "Explore smart home and storage solutions.",
      image: "/HomeBanner/homebatt.png",
    },
    {
      title: "Power Supplies",
      href: "/products?category=cabinet",
      description: "Cabinet-type modular power supply systems.",
      image: "/HomeBanner/commercial.png",
    },
    // {
    //   title: "Container Type Power Supplies",
    //   href: "/products?category=container",
    //   description: "Containerized power supply solutions.",
    //   image: "/HomeBanner/container.png",
    // },
  ],

  sectors: [
    {
      title: "Residential",
      href: "/sectors/residential",
      description: "Solutions designed for households and communities.",
      image: "/HomeBanner/homebatt.png",
    },
    {
      title: "Commercial",
      href: "/sectors/commercial",
      description: "Energy systems tailored for commercial sites.",
      image: "/HomeBanner/commercial.png",
    },
    {
      title: "Industrial",
      href: "/sectors/industrial",
      description: "High-capacity systems for industrial operations.",
      image: "/HomeBanner/banner3.jpg",
    },
    {
      title: "Rural Projects",
      href: "/sectors/rural-projects",
      description: "Off-grid and rural electrification solutions.",
      image: "/aboutimages/solarpanels.jpg",
    },
  ],

  services: [
    {
      title: "Overview",
      href: "/services",
      description: "General overview of installation and maintenance services.",
      image: "/aboutimages/solarpanels.jpg",
    },
    {
      title: "EV Charging Solutions",
      href: "/services/ev-charging",
      description: "Professional EV charging installation services.",
      image: "/Product/evpb.jpg",
    },
    {
      title: "Solar Energy Installation",
      href: "/services/solar-installation",
      description: "Turnkey solar installation services.",
      image: "/aboutimages/solarpanels2.jpg",
    },
  ],

  about: {
    title: "About Us",
    href: "/about",
    description: "Learn about our company history and market insights.",
  },

  partners: {
    title: "Partners",
    href: "/partners",
    description: "Become a location partner and host an EV charger.",
  },

  contact: {
    title: "Contact",
    href: "/contact",
    description: "Quote requests and support channels.",
  },
};

export default function Navigator() {
  const pathname = usePathname();

  const isRouteActive = (href: string, menuKey: string) => {
    // For home route, only match exactly
    if (href === "/") {
      return pathname === "/";
    }

    // For other routes, check if pathname starts with the href
    // Also handle query parameters by comparing pathname only
    const hrefPath = href.split("?")[0];
    const currentPath = pathname.split("?")[0];

    // For dropdown menus, check if any item in the array matches
    const menuItems = menu[menuKey];
    if (Array.isArray(menuItems)) {
      // For sectors, also check if we're on /sectors
      if (menuKey === "sectors" && currentPath === "/sectors") {
        return true;
      }
      return menuItems.some((item) => {
        const itemPath = item.href.split("?")[0];
        return (
          currentPath === itemPath || currentPath.startsWith(itemPath + "/")
        );
      });
    }

    return currentPath === hrefPath || currentPath.startsWith(hrefPath + "/");
  };

  return (
    <NavigationMenu viewport={false} className="hidden lg:block">
      <NavigationMenuList className="flex-wrap justify-center">
        {Object.entries(menu).map(([key, items]) => {
          if (Array.isArray(items)) {
            // For sectors, use /sectors as the check href, otherwise use first item
            const checkHref = key === "sectors" ? "/sectors" : (items[0]?.href || "");
            const isActive = isRouteActive(checkHref, key);
            return (
              <NavigationMenuItemWithHover
                key={key}
                menuKey={key}
                items={items}
                isActive={isActive}
              />
            );
          } else {
            const isActive = isRouteActive(items?.href || "", key);
            return (
              <NavigationMenuItem key={key}>
                <NavigationMenuTrigger
                  asChild
                  showChevron={false}
                  className="capitalize"
                  active={isActive}
                >
                  <Link href={items?.href as Route}>{key}</Link>
                </NavigationMenuTrigger>
              </NavigationMenuItem>
            );
          }
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function NavigationMenuItemWithHover({
  menuKey,
  items,
  isActive,
}: {
  menuKey: string;
  items: MenuItem[];
  isActive: boolean;
}) {
  const renderedItems =
    menuKey === "services"
      ? items.filter((item) => item.title !== "Overview")
      : items;
  const [hoveredIndex, setHoveredIndex] = useState<number>(0);
  const featuredItem =
    renderedItems[hoveredIndex] ||
    renderedItems[0] ||
    items[hoveredIndex] ||
    items[0];
  
  const itemCount = renderedItems.length;
  const isTwoColumn = itemCount < 4;
  const gridCols = isTwoColumn ? "md:grid-cols-2" : "md:grid-cols-3";
  const dropdownWidth = isTwoColumn ? "467px" : "700px";
  const getImageRowSpan = () => {
    if (!isTwoColumn) return "row-span-3";
    if (itemCount === 1) return "row-span-1";
    if (itemCount === 2) return "row-span-2";
    if (itemCount === 3) return "row-span-3";
    return "row-span-3";
  };

  // For sectors, the main link should go to /sectors, not the first dropdown item
  const mainHref = menuKey === "sectors" ? "/sectors" : (items[0]?.href as Route);

  return (
    <NavigationMenuItem className="relative flex items-center">
      <NavigationMenuTrigger asChild className="capitalize" active={isActive}>
        <Link href={mainHref}>{menuKey}</Link>
      </NavigationMenuTrigger>
      <NavigationMenuContent 
        style={{ 
          minWidth: dropdownWidth,
        }}
      >
        <ul className={`grid gap-2 w-full ${isTwoColumn ? `md:w-[467px]` : `md:w-[700px]`} ${gridCols}`}>
          <li className={getImageRowSpan()}>
            <NavigationMenuLink asChild>
              <a
                className="relative flex h-full w-full flex-col justify-end rounded-md bg-cover bg-center bg-no-repeat p-2 no-underline outline-hidden transition-all duration-200 select-none focus:shadow-md min-h-[240px]"
                style={{
                  backgroundImage: `url(${featuredItem?.image || ""})`,
                }}
                href={featuredItem?.href || "/"}
              >
                <div className="absolute inset-0 rounded-md bg-linear-to-b from-black/20 to-black/60" />
                <div className="relative text-lg font-medium text-white">
                  {featuredItem?.title || "Volthub"}
                </div>
                <p className="relative text-white/90 text-sm leading-tight">
                  {featuredItem?.description ||
                    "Powering the future of green mobility."}
                </p>
              </a>
            </NavigationMenuLink>
          </li>
          {renderedItems.map((item, index) => (
            <ListItem
              key={item.title}
              title={item.title}
              href={item.href}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(0)}
            >
              {item.description}
            </ListItem>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}

function ListItem({
  title,
  children,
  href,
  onMouseEnter,
  onMouseLeave,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & {
  href: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) {
  return (
    <li {...props} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className="relative overflow-hidden rounded-sm min-w-0 max-w-full">
      <NavigationMenuLink asChild className="block overflow-hidden rounded-sm h-full w-[93%] ">
        <Link href={href as Route} className="group/link relative flex flex-col gap-1  rounded-sm h-full w-[93%]  mx-1 hover:bg-[#959aa2]">
          <div className="text-sm font-bold leading-none">{title}</div>
          <p className="text-muted-foreground text-sm leading-snug line-clamp-2">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
