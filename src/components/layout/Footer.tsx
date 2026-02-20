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
      // { label: "Case Studies", href: "/case-studies" },
      // { label: "Careers", href: "/contact" },
      // { label: "News", href: { pathname: "/about", hash: "insights" } },
      { label: "Become a Partner", href: "/partners" },
      { label: "Contact", href: "/contact" },
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
        <div className="grid grid-cols-1 lg:grid-cols-[22%_20%_1fr_15%_1fr_1fr] gap-2 md:gap-3 lg:gap-2 mb-8 md:mb-12">
          {/* Brand Section - Always visible */}
          <div className="max-w-xs">
            <div className="flex items-center space-x-3 mb-4 md:mb-6">
              <span className="w-10 h-10 md:w-12 md:h-12 rounded-lg overflow-hidden bg-white flex items-center justify-center shrink-0">
                <Image
                  src="/logo.jpg"
                  alt="VoltHub logo"
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </span>
              <span className="text-xl md:text-2xl font-bold">VoltHub</span>
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
                  +63 9682323704
                </a>
              </p>
              <p className="text-sm md:text-base leading-relaxed select-text">
                <span className="font-bold text-white">Email:</span>{" "}
                <a href="mailto:admin@volthub.ph" className="hover:underline">
                  admin@volthub.ph
                </a>  
              </p>
              <p className="text-sm md:text-base leading-relaxed select-text">
                <span className="font-bold text-white">Address:</span>  High Street South Corporate Plaza Tower 2, 11th Ave,
                Bonifacio Global City, Taguig, Philippines
              </p>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className=" hidden lg:block border-t border-gray-800 pt-6 md:pt-8">
          <div className="flex flex-col gap-4 text-gray-400 text-xs md:text-sm">
            <p className="text-center md:text-left">
              © {new Date().getFullYear()} VoltHub.
              <span className=" md:inline md:ml-1"> All rights reserved.</span>
            </p>
            <div className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-6">
              <a
                href="#"
                className="hover:text-white transition-colors py-1"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="hover:text-white transition-colors py-1"
              >
                Terms of Service
              </a>
            </div>
            
          </div>
        </div>
        
      </LayoutContainer>
    </footer>
  );
};

export default Footer;
