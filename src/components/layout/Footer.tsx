"use client";

import { useState } from "react";
import Link from "next/link";
import type { Route } from "next";
import Image from "next/image";
import {
  RiLinkedinFill,
  RiTwitterFill,
  RiFacebookFill,
  RiInstagramLine,
  RiArrowDownSLine,
} from "react-icons/ri";
import LayoutContainer from "./LayoutContainer";

type FooterHref = Route | { pathname: Route; hash?: string };

const footerColumns = [
  {
    heading: "Products",
    links: [
      { 
        label: "EV Charging Equipment", 
        href: "/products?category=ev-charging" },
      {
        label: "Solar Energy Systems",
        href: "/products?category=solar-street",
      },
      {
        label: "Energy Storage",
        href: "/products?category=smart-home",
      },
      {
        label: "Power Supplies",
        href: "/products?category=cabinet",
      },
      // {
      //   label: "Container Type Power Supplies",
      //   href: "/products?category=container",
      // },
      // { label: "Solar Fans", href: { pathname: "/products", hash: "featured" } },
    ],
  },
  {
    heading: "Sectors",
    links: [
      { label: "Residential", href: "/sectors/residential" },
      {
        label: "Commercial",
        href: "/sectors/commercial",
      },
      {
        label: "Industrial",
        href: "/sectors/industrial",
      },
      // {
      //   label: "Smart Cities",
      //   href: "/sectors/smart-cities",
      // },
      {
        label: "Rural Projects",
        href: "/sectors/rural-projects",
      },
    ],
  },
  {
    heading: "Services",
    links: [
      // { label: "Overview", href: "/services" },
      { label: "EV Charging Solutions", href: "/services/ev-charging" },
      {
        label: "Solar Energy Installation",
        href: "/services/solar-installation",
      },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Market Insights", href: "/insights" },
      { label: "Become a Partner", href: "/partners" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
] satisfies {
  heading: string;
  links: { label: string; href: FooterHref }[];
}[];

const Footer = () => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const toggleSection = (heading: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [heading]: !prev[heading],
    }));
  };

  return (
    <footer className="bg-gray-900 text-white py-8 md:py-16">
      <LayoutContainer>
        <div className="grid grid-cols-1 lg:grid-cols-[20%_repeat(5,minmax(0,1fr))_1.2fr] gap-2 md:gap-3 lg:gap-4 mb-8 md:mb-12">
          {/* Brand Section - Always visible */}
          <div className="max-w-xs">
            <div className="flex items-center mb-4 md:mb-6">
              <span className="bg-green-100 rounded-lg px-3 py-1.5">
                <Image
                  src="/green-volthub-logo-transparent.png"
                  alt="VoltHub logo"
                  width={160}
                  height={40}
                  className="h-6 md:h-7 w-auto object-contain"
                />
              </span>
            </div>
            <p className="text-sm md:text-base text-gray-400 mb-4 md:mb-3 leading-relaxed">
              Leading the future of clean energy with innovative solutions for a
              sustainable tomorrow.
            </p>
            <div className="flex space-x-3 md:space-x-4">
              {[
                { Icon: RiLinkedinFill, label: "Visit VoltHub on LinkedIn" },
                { Icon: RiTwitterFill, label: "Visit VoltHub on Twitter" },
                { Icon: RiFacebookFill, label: "Visit VoltHub on Facebook" },
                { Icon: RiInstagramLine, label: "Visit VoltHub on Instagram" },
              ].map(({ Icon, label }) => (
                <a
                  key={Icon.name}
                  href="#"
                  className="hover:text-secondary transition-colors p-2 -m-2"
                  aria-label={label}
                >
                  <Icon className="text-lg md:text-xl" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Columns - Collapsible on mobile */}
          {footerColumns.map((column) => {
            const isOpen = openSections[column.heading] ?? false;
            return (
              <div
                key={column.heading}
                className="border-b border-gray-800 pb-4 last:border-b-0 lg:border-b-0 lg:pb-0"
              >
                <button
                  onClick={() => toggleSection(column.heading)}
                  className="w-full flex items-center justify-between mb-3 lg:w-auto lg:justify-start lg:mb-4 lg:pointer-events-none"
                  aria-expanded={isOpen}
                  aria-label={`Toggle ${column.heading} menu`}
                >
                  <h4 className="text-base md:text-lg font-semibold text-left">
                    {column.heading}
                  </h4>
                  <RiArrowDownSLine
                    className={`lg:hidden ml-2 text-gray-400 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <ul
                  className={`space-y-2 md:space-y-3 text-gray-400 overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  } lg:max-h-none lg:opacity-100`}
                >
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm md:text-base hover:text-white transition-colors inline-block"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}

          {/* Contact Information Column */}
          <div className="border-b border-gray-800 pb-4 last:border-b-0 lg:border-b-0 lg:pb-0">
            <h4 className="text-base md:text-lg font-semibold text-left mb-3 lg:mb-4">
              Contact Us :
            </h4>
            <div className="space-y-2 md:space-y-3 text-gray-400">
            <p className="text-sm md:text-base leading-relaxed select-text">
                <span className="font-bold text-white">Phone:</span>{" "}
                <a href="tel:+639682323704" className="hover:underline">
                  +63 968 232 3704
                </a>
              </p>
              <p className="text-sm md:text-base leading-relaxed select-text">
                <span className="font-bold text-white">Email:</span>{" "}
                <a href="mailto:admin@volthub.ph" className="hover:underline">
                  admin@volthub.ph
                </a>
              </p>
              <p className="text-sm md:text-base leading-relaxed select-text">
                <span className="font-bold text-white">Inquiries:</span>{" "}
                <a href="mailto:judy@volthub.ph" className="hover:underline">
                  judy@volthub.ph
                </a>
              </p>
              <p className="text-sm md:text-base leading-relaxed select-text">
                <span className="font-bold text-white">Address:</span> Unit
                2503, High Street South Corporate Plaza Tower 2, 11th Street
                corner 26th Avenue, Fort Bonifacio, Bonifacio Global City,
                Taguig City 1635, Metro Manila, Philippines
              </p>
              <p className="text-xs md:text-sm leading-relaxed select-text text-gray-500 pt-1">
                VOLTHUB ELECTRONIC POWER GENERATION SERVICES CORP. &mdash;
                a Philippine domestic corporation (VoltHub.PH)
              </p>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-800 pt-6 md:pt-8">
          <div className="flex flex-col gap-4 text-gray-400 text-xs md:text-sm">
            <p className="text-center md:text-left">
              © {new Date().getFullYear()} VOLTHUB ELECTRONIC POWER GENERATION
              SERVICES CORP.
              <span className=" md:inline md:ml-1"> All rights reserved.</span>
            </p>
            <p className="text-center md:text-left text-gray-500 text-[11px] md:text-xs">
              SEC Reg. No. 2025010184535-18 &middot; BIR TIN 667-401-960-000
              &middot; Registered in Taguig City, Philippines
            </p>
            <div className="flex flex-wrap justify-center md:justify-end gap-5 md:gap-8 text-sm md:text-base font-semibold">
              <Link
                href="/privacy"
                className="text-gray-200 hover:text-white underline underline-offset-4 transition-colors py-2 inline-block"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-gray-200 hover:text-white underline underline-offset-4 transition-colors py-2 inline-block"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
        
      </LayoutContainer>
    </footer>
  );
};

export default Footer;
