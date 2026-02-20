"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import Navigator from "../common/Navigator";
import { usePathname } from "next/navigation";
import type { Route } from "next";
import { RiMenuLine, RiCloseLine } from "react-icons/ri";
import LayoutContainer from "./LayoutContainer";
import { cn } from "@/lib/utils";

type NavHref = Route | { pathname: Route; hash?: string };

type NavItem = {
  label: string;
  href: NavHref;
  description?: string;
  dropdown?: { label: string; href: NavHref; description?: string }[];
};

const navItems: NavItem[] = [
  {
    label: "Home",
    href: "/",
    description: "Hero overview and highlights",
  },
  {
    label: "Products",
    href: "/products",
    description: "Product families, specs, and trends",
    dropdown: [
      { label: "All Products", href: "/products" },
      { label: "Solar Systems", href: "/products?category=solar-street" },
      { label: "EV Chargers", href: "/products?category=ev-charging" },
      { label: "Energy Storage", href: "/products?category=smart-home" },
      {
        label: "Power Supplies",
        href: "/products?category=cabinet",
      },
      // {
      //   label: "Container Type Power Supplies",
      //   href: "/products?category=container",
      // },
    ],
  },
  {
    label: "Sectors",
    href: "/sectors",
    description: "Target customers and sector-specific solutions",
    dropdown: [
      { label: "Residential", href: "/sectors/residential" },
      { label: "Commercial", href: "/sectors/commercial" },
      { label: "Industrial", href: "/sectors/industrial" },
      // { label: "Smart Cities", href: "/sectors/smart-cities" },
      { label: "Rural Projects", href: "/sectors/rural-projects" },
    ],
  },
  {
    label: "Services",
    href: "/services",
    description: "Professional installation and maintenance services",
    dropdown: [
      { label: "Overview", href: "/services" },
      { label: "EV Charging Solutions", href: "/services/ev-charging" },
      {
        label: "Solar Energy Installation",
        href: "/services/solar-installation",
      },
    ],
  },
  {
    label: "About",
    href: "/about",
    description: "Company history and market insights",
  },
  // {
  //   label: "Case Studies",
  //   href: "/case-studies",
  //   description: "Impact stories and sustainability metrics",
  // },
  {
    label: "Partners",
    href: "/partners",
    description: "Become a location partner",
  },
  {
    label: "Contact",
    href: "/contact",
    description: "Quote requests and support channels",
  },
];

const getHrefKey = (href: NavHref) =>
  typeof href === "string"
    ? href
    : `${href.pathname}-${href.hash ? `#${href.hash}` : "root"}`;

const Header = () => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navItemRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  useEffect(() => {
    const updatePositions = () => {
      const positions: Record<string, { top: number; left: number }> = {};
      Object.keys(navItemRefs.current).forEach((label) => {
        const ref = navItemRefs.current[label];
        if (ref) {
          const rect = ref.getBoundingClientRect();
          const header = document.querySelector("header");
          const headerBottom = header?.getBoundingClientRect().bottom || 0;
          positions[label] = {
            top: headerBottom + 8,
            left: rect.left,
          };
        }
      });
    };

    if (openDropdown) {
      updatePositions();
      window.addEventListener("resize", updatePositions);
      window.addEventListener("scroll", updatePositions);
      return () => {
        window.removeEventListener("resize", updatePositions);
        window.removeEventListener("scroll", updatePositions);
      };
    }
  }, [openDropdown]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        !target.closest(".dropdown-container") &&
        !target.closest(".dropdown-menu")
      ) {
        setOpenDropdown(null);
      }
    };

    if (openDropdown) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [openDropdown]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 floating-nav",
        scrolled ? "shadow-lg shadow-primary/20" : "border-b border-white/10"
      )}
    >
      <LayoutContainer className="py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-3 group">
          <span className="w-12 h-12 rounded-lg overflow-hidden flex items-center justify-center glow-effect bg-white">
            <Image
              src="/logo.jpg"
              alt="VoltHub logo"
              width={48}
              height={48}
              className="object-cover"
              priority
            />
          </span>
          <span className="text-2xl font-bold gradient-text font-orbitron tracking-wide">
            VoltHub
          </span>
        </Link>

        <Navigator />

        <div className="hidden lg:flex items-center space-x-6 ml-8">
          <span className="text-sm font-orbitron text-emerald-200 tracking-widest hidden 2xl:block">
            +63 9682323704
          </span>
          <Link
            href="/contact"
            className="bg-linear-to-r from-secondary to-yellow-300 text-black px-6 py-2 rounded-xl font-semibold hover:scale-105 transition-all duration-300 glow-effect whitespace-nowrap"
          >
            Get Quote
          </Link>
        </div>

        <button
          className="text-white text-3xl lg:hidden"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <RiCloseLine /> : <RiMenuLine />}
        </button>
      </LayoutContainer>

      <div
        className={cn(
          "mobile-menu lg:hidden fixed top-0 left-0 h-screen w-full bg-primary z-40 transition-transform duration-300",
          mobileOpen ? "active" : ""
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <Link href="/" className="flex items-center space-x-3">
              <span className="w-10 h-10 rounded-lg overflow-hidden bg-white flex items-center justify-center">
                <Image
                  src="/logo.jpg"
                  alt="VoltHub logo"
                  width={40}
                  height={40}
                  className="object-cover"
                  priority
                />
              </span>
              <span className="text-xl font-bold gradient-text font-orbitron">
                VoltHub
              </span>
            </Link>
            <button
              className="text-white text-2xl"
              onClick={() => setMobileOpen(false)}
              aria-label="Close navigation"
            >
              <RiCloseLine />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {navItems.map((item) => (
              <div key={item.label}>
                <Link
                  onClick={() => setMobileOpen(false)}
                  href={item.href}
                  className="block text-white text-lg font-semibold mb-3"
                >
                  {item.label}
                </Link>
                {item.dropdown ? (
                  <div className="pl-4 space-y-2">
                    {(item.label === "Services"
                      ? item.dropdown.filter((link) => link.label !== "Overview")
                      : item.dropdown
                    ).map((link) => (
                      <Link
                        onClick={() => setMobileOpen(false)}
                        key={getHrefKey(link.href)}
                        href={link.href}
                        className="block text-white/80 hover:text-secondary transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </div>

          <div className="p-6 border-t border-white/10">
            <Link
              href="/contact"
              className="block w-full text-center bg-linear-to-r from-secondary to-yellow-300 text-black px-6 py-3 rounded-xl font-semibold"
            >
              Get Quote
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
