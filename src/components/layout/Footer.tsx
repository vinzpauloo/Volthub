import Link from "next/link";
import type { Route } from "next";
import Image from "next/image";
import {
  RiLinkedinFill,
  RiTwitterFill,
  RiFacebookFill,
  RiInstagramLine,
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
        label: "Cabinet Type Power Supplies",
        href: "/products?category=cabinet",
      },
      {
        label: "Container Type Power Supplies",
        href: "/products?category=container",
      },
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
      { label: "Overview", href: "/services" },
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
      { label: "Contact", href: "/contact" },
    ],
  },
] satisfies {
  heading: string;
  links: { label: string; href: FooterHref }[];
}[];

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <LayoutContainer>
        <div className="grid md:grid-cols-1 lg:grid-cols-5 gap-5 mb-12">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <span className="w-10 h-10 rounded-lg overflow-hidden bg-white flex items-center justify-center">
                <Image
                  src="/logo.jpg"
                  alt="VoltHub logo"
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </span>
              <span className="text-2xl font-bold">VoltHub</span>
            </div>
            <p className="text-gray-400 mb-6">
              Leading the future of clean energy with innovative solutions for a
              sustainable tomorrow.
            </p>
            <div className="flex space-x-4 text-gray-400">
              {[
                { Icon: RiLinkedinFill, label: "Visit VoltHub on LinkedIn" },
                { Icon: RiTwitterFill, label: "Visit VoltHub on Twitter" },
                { Icon: RiFacebookFill, label: "Visit VoltHub on Facebook" },
                { Icon: RiInstagramLine, label: "Visit VoltHub on Instagram" },
              ].map(({ Icon, label }) => (
                <a
                  key={Icon.name}
                  href="#"
                  className="hover:text-secondary transition-colors"
                  aria-label={label}
                >
                  <Icon className="text-xl" />
                </a>
              ))}
            </div>
          </div>

          {footerColumns.map((column) => (
            <div key={column.heading}>
              <h4 className="text-lg font-semibold mb-6">{column.heading}</h4>
              <ul className="space-y-3 text-gray-400">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} VoltHub. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            {/* <a href="#" className="hover:text-white transition-colors">
              Cookie Policy
            </a> */}
          </div>
        </div>
      </LayoutContainer>
    </footer>
  );
};

export default Footer;
