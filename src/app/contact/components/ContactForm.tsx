"use client";

import { useState, useEffect, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import type React from "react";
import { useSearchParams } from "next/navigation";
import LayoutContainer from "@/components/layout/LayoutContainer";
import { philippineRegions, interestOptions, socialIcons } from "./contactData";
import ContactHeader from "./ContactHeader";
import ContactInfo from "./ContactInfo";

// Helper: get dropdown position from a ref (called from event handlers, not render)
function getDropdownPosition(ref: React.RefObject<HTMLDivElement | null>) {
  if (!ref.current) return null;
  const rect = ref.current.getBoundingClientRect();
  return { top: rect.bottom + 8, left: rect.left, width: rect.width };
}

// Compute initial form state from URL search params (called during render, not effect)
function computeInitialFormState(
  searchParams: ReturnType<typeof useSearchParams>
): {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  region: string;
  province: string;
  city: string;
  interest: string;
  details: string;
  isDetailsReadOnly: boolean;
} {
  const subject = searchParams.get("subject");
  const interest = searchParams.get("interest");
  const product = searchParams.get("product");
  const model = searchParams.get("model");
  const productName = searchParams.get("productName");
  const quantity = searchParams.get("quantity");
  const details = searchParams.get("details");

  let computedInterest = "";
  let computedDetails = "";
  let isDetailsReadOnly = false;

  if (interest) {
    computedInterest = interest;

    if (subject === "quote") {
      const interestLabels: Record<string, string> = {
        "residential-solutions": "Residential Solutions",
        "commercial-solutions": "Commercial Solutions",
        "industrial-solutions": "Industrial Solutions",
        "rural-projects": "Rural Projects",
        "ev-charging-quote": "EV Charging",
        "solar-installation-quote": "Solar Installation",
        "general-inquiry": "General Inquiry",
      };
      const interestLabel = interestLabels[interest] || interest.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());
      computedDetails = `I would like to request a quote for ${interestLabel}. Please contact me with pricing and availability information.`;
    } else if (subject === "installation") {
      const interestLabels: Record<string, string> = {
        "residential-solutions": "Residential Solutions",
        "commercial-solutions": "Commercial Solutions",
        "industrial-solutions": "Industrial Solutions",
        "rural-projects": "Rural Projects",
        "ev-charging-installation": "EV Charging Installation",
        "solar-energy-installation": "Solar Energy Installation",
      };
      const interestLabel = interestLabels[interest] || interest.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());
      computedDetails = `I would like to request installation for ${interestLabel}. Please contact me to discuss installation options and scheduling.`;
    } else if (subject === "consultation") {
      computedDetails = `I would like to schedule a consultation. Please contact me to arrange a meeting.`;
    }
  } else if (subject === "installation" || subject === "quote" || subject === "consultation") {
    if (product) {
      if (product.includes("ev") || product.includes("charging")) {
        computedInterest = subject === "installation" ? "ev-charging-installation" : "ev-charging-station";
      } else if (product.includes("solar")) {
        if (productName && productName.toLowerCase().includes("street")) {
          computedInterest = subject === "installation" ? "street-light-installation" : "solar-street-lights";
        } else {
          computedInterest = subject === "installation" ? "solar-energy-installation" : "solar-energy-installation";
        }
      } else if (product.includes("storage") || product.includes("battery") || product.includes("smart-home")) {
        computedInterest = subject === "installation" ? "energy-storage-installation" : "smart-home-ips";
      } else if (product.includes("cabinet")) {
        computedInterest = "cabinet-type-power-supply";
      } else if (product.includes("container")) {
        computedInterest = "container-type-power-supply";
      }
    }

    let detailsText = "";
    if (subject === "installation") {
      detailsText = "I would like to request installation for ";
    } else if (subject === "consultation") {
      detailsText = "I would like to schedule a consultation";
    } else {
      detailsText = "I would like to request a quote for ";
    }

    if (productName) {
      detailsText += productName;
    } else if (product) {
      detailsText += product;
    }

    if (model) {
      detailsText += ` (Model: ${model})`;
    }

    if (subject === "installation") {
      detailsText += ". Please contact me to discuss installation options and scheduling.";
    } else if (subject === "consultation") {
      detailsText += ". Please contact me to arrange a meeting.";
    } else {
      detailsText += ". Please contact me with pricing and availability information.";
    }

    if (quantity) {
      detailsText += `\n\nQuantity: ${quantity}`;
    }

    computedDetails = detailsText;
    isDetailsReadOnly = true;
  } else if (details) {
    computedDetails = details;
    isDetailsReadOnly = false;
  }

  return {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    region: "",
    province: "",
    city: "",
    interest: computedInterest,
    details: computedDetails,
    isDetailsReadOnly,
  };
}

function DropdownPortal({
  isOpen,
  isMounted,
  position,
  children,
}: {
  isOpen: boolean;
  isMounted: boolean;
  position: { top: number; left: number; width: number } | null;
  children: React.ReactNode;
}) {
  if (!isOpen || !isMounted || !position) return null;

  return createPortal(
    <div
      data-dropdown-portal
      className="fixed z-99999 rounded-xl bg-gray-800/95 backdrop-blur-sm border border-white/30 shadow-2xl overflow-y-auto max-h-[300px]"
      style={{
        zIndex: 99999,
        top: `${position.top}px`,
        left: `${position.left}px`,
        width: `${position.width}px`,
      }}
    >
      {children}
    </div>,
    document.body
  );
}

// A dropdown button that, when clicked, captures position from its ref THEN opens
function useDropdownToggle(
  ref: React.RefObject<HTMLDivElement | null>,
  isOpen: boolean,
  setOpen: (v: boolean) => void,
  setPosition: (p: { top: number; left: number; width: number } | null) => void
) {
  return () => {
    const nextOpen = !isOpen;
    if (nextOpen) {
      const pos = getDropdownPosition(ref);
      if (pos) setPosition(pos);
    } else {
      setPosition(null);
    }
    setOpen(nextOpen);
  };
}

export default function ContactForm() {
  const searchParams = useSearchParams();

  // isMounted: true on client, false on server — replaces the old useState+useEffect pattern
  const isMounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const initial = computeInitialFormState(searchParams);
  const [formState, setFormState] = useState({
    firstName: initial.firstName,
    lastName: initial.lastName,
    email: initial.email,
    phone: initial.phone,
    region: initial.region,
    province: initial.province,
    city: initial.city,
    interest: initial.interest,
    details: initial.details,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownPosition, setDropdownPosition] = useState<{ top: number; left: number; width: number } | null>(null);
  const [isDetailsReadOnly, setIsDetailsReadOnly] = useState(initial.isDetailsReadOnly);
  const [isRegionOpen, setIsRegionOpen] = useState(false);
  const [isProvinceOpen, setIsProvinceOpen] = useState(false);
  const [isCityOpen, setIsCityOpen] = useState(false);
  const regionDropdownRef = useRef<HTMLDivElement>(null);
  const provinceDropdownRef = useRef<HTMLDivElement>(null);
  const cityDropdownRef = useRef<HTMLDivElement>(null);
  const [regionDropdownPosition, setRegionDropdownPosition] = useState<{ top: number; left: number; width: number } | null>(null);
  const [provinceDropdownPosition, setProvinceDropdownPosition] = useState<{ top: number; left: number; width: number } | null>(null);
  const [cityDropdownPosition, setCityDropdownPosition] = useState<{ top: number; left: number; width: number } | null>(null);

  // Clear details when component unmounts
  useEffect(() => {
    return () => {
      setFormState((prev) => ({ ...prev, details: "" }));
      setIsDetailsReadOnly(false);
    };
  }, []);

  // Handle click outside dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as HTMLElement;

      // Check if click is inside any portal dropdown
      const portalDropdown = target.closest('[data-dropdown-portal]');
      if (portalDropdown) {
        return;
      }

      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setIsDropdownOpen(false);
      }
      if (regionDropdownRef.current && !regionDropdownRef.current.contains(target)) {
        setIsRegionOpen(false);
      }
      if (provinceDropdownRef.current && !provinceDropdownRef.current.contains(target)) {
        setIsProvinceOpen(false);
      }
      if (cityDropdownRef.current && !cityDropdownRef.current.contains(target)) {
        setIsCityOpen(false);
      }
    };

    if (isDropdownOpen || isRegionOpen || isProvinceOpen || isCityOpen) {
      document.addEventListener("mousedown", handleClickOutside as EventListener);
      document.addEventListener("touchstart", handleClickOutside as EventListener);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside as EventListener);
        document.removeEventListener("touchstart", handleClickOutside as EventListener);
      };
    }
  }, [isDropdownOpen, isRegionOpen, isProvinceOpen, isCityOpen]);

  // Update dropdown positions on scroll/resize
  useEffect(() => {
    const updatePositions = () => {
      if (isDropdownOpen) {
        const pos = getDropdownPosition(dropdownRef);
        if (pos) setDropdownPosition(pos);
      }
      if (isRegionOpen) {
        const pos = getDropdownPosition(regionDropdownRef);
        if (pos) setRegionDropdownPosition(pos);
      }
      if (isProvinceOpen) {
        const pos = getDropdownPosition(provinceDropdownRef);
        if (pos) setProvinceDropdownPosition(pos);
      }
      if (isCityOpen) {
        const pos = getDropdownPosition(cityDropdownRef);
        if (pos) setCityDropdownPosition(pos);
      }
    };

    window.addEventListener('scroll', updatePositions, true);
    window.addEventListener('resize', updatePositions);

    return () => {
      window.removeEventListener('scroll', updatePositions, true);
      window.removeEventListener('resize', updatePositions);
    };
  }, [isDropdownOpen, isRegionOpen, isProvinceOpen, isCityOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegionChange = (value: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    e?.preventDefault();
    setFormState((prev) => ({ ...prev, region: value, province: "", city: "" }));
    setIsRegionOpen(false);
    setRegionDropdownPosition(null);
  };

  const handleProvinceChange = (value: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    e?.preventDefault();
    setFormState((prev) => ({ ...prev, province: value, city: "" }));
    setIsProvinceOpen(false);
    setProvinceDropdownPosition(null);
  };

  const handleCityChange = (value: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    e?.preventDefault();
    setFormState((prev) => ({ ...prev, city: value }));
    setIsCityOpen(false);
    setCityDropdownPosition(null);
  };

  // Dropdown toggle hooks — capture position before opening
  const toggleRegion = useDropdownToggle(regionDropdownRef, isRegionOpen, setIsRegionOpen, setRegionDropdownPosition);
  const toggleProvince = useDropdownToggle(provinceDropdownRef, isProvinceOpen, setIsProvinceOpen, setProvinceDropdownPosition);
  const toggleCity = useDropdownToggle(cityDropdownRef, isCityOpen, setIsCityOpen, setCityDropdownPosition);
  const toggleInterest = useDropdownToggle(dropdownRef, isDropdownOpen, setIsDropdownOpen, setDropdownPosition);

  const getRegionLabel = () => {
    if (!formState.region) return "Select Region";
    return formState.region;
  };

  const getProvinceLabel = () => {
    if (!formState.province) {
      return formState.region ? "Select Province" : "Select Region First";
    }
    return formState.province;
  };

  const getCityLabel = () => {
    if (!formState.city) {
      return formState.province ? "Select City" : "Select Province First";
    }
    return formState.city;
  };

  const availableProvinces = formState.region
    ? Object.keys(philippineRegions[formState.region] || {})
    : [];

  const availableCities = (formState.region && formState.province)
    ? philippineRegions[formState.region]?.[formState.province] || []
    : [];

  const handleInterestChange = (value: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    e?.preventDefault();
    setFormState((prev) => ({ ...prev, interest: value }));
    setIsDropdownOpen(false);
    setDropdownPosition(null);
  };

  const selectedOption = interestOptions.find(opt => opt.value === formState.interest) || interestOptions[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      const result = await response.json();

      if (!response.ok || !result.ok) {
        throw new Error("Failed to send message");
      }

      alert("Your request has been sent to our team. We'll be in touch shortly.");

      setFormState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        region: "",
        province: "",
        city: "",
        interest: "",
        details: "",
      });

      setIsDropdownOpen(false);
      setIsRegionOpen(false);
      setIsProvinceOpen(false);
      setIsCityOpen(false);
      setIsDetailsReadOnly(false);

      setDropdownPosition(null);
      setRegionDropdownPosition(null);
      setProvinceDropdownPosition(null);
      setCityDropdownPosition(null);

      if (window.location.search) {
        window.history.replaceState({}, '', window.location.pathname);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong while sending your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="pt-10">
      <section
        className="relative py-20 text-white bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://readdy.ai/api/search-image?query=futuristic%20sustainable%20city%20skyline%20at%20sunset%20with%20renewable%20energy%20infrastructure%2C%20solar%20panels%20and%20wind%20turbines%2C%20clean%20modern%20architecture%2C%20warm%20golden%20lighting%2C%20professional%20corporate%20background&width=1920&height=600&seq=contact001&orientation=landscape')",
        }}
      >
        <div className="absolute inset-0 backdrop-blur"/>
        <div className="relative">
          <LayoutContainer className="flex-col space-y-14">
            <ContactHeader />

            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
              <div className="flex-1 min-w-0 lg:min-w-[500px] bg-black/50 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-2xl overflow-visible relative">
                <h3 className="text-2xl font-semibold mb-6">Get Your Quote</h3>
                <form onSubmit={handleSubmit} className="space-y-5 overflow-visible relative">
                  <div className="flex flex-col md:flex-row gap-4">
                    {["firstName", "lastName"].map((field) => (
                      <input
                        key={field}
                        name={field}
                        value={formState[field as keyof typeof formState]}
                        onChange={handleChange}
                        placeholder={
                          field === "firstName" ? "First Name" : "Last Name"
                        }
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-secondary"
                      />
                    ))}
                  </div>
                  {["email", "phone"].map((field) => (
                    <input
                      key={field}
                      name={field}
                      value={formState[field as keyof typeof formState]}
                      onChange={handleChange}
                      placeholder={
                        field === "email" ? "Email Address" : "Phone Number"
                      }
                      type={field === "email" ? "email" : "tel"}
                      required={field === "email"}
                      className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                  ))}
                  <div className="flex flex-col md:flex-row gap-2 md:gap-3 w-full">
                    {/* Region Dropdown */}
                    <div className="relative overflow-visible z-1000 w-full md:w-[calc(44%-8px)] md:shrink-0" ref={regionDropdownRef}>
                      <button
                        type="button"
                        onClick={toggleRegion}
                        className="w-full h-[48px] px-4 pr-10 rounded-xl bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-secondary text-left text-base touch-manipulation flex items-center justify-between relative z-1000"
                      >
                        <span className="truncate whitespace-nowrap overflow-hidden">{getRegionLabel()}</span>
                        <svg
                          className={`w-5 h-5 transition-transform ${isRegionOpen ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      <DropdownPortal isOpen={isRegionOpen} isMounted={isMounted} position={regionDropdownPosition}>
                        <button
                          type="button"
                          onClick={(e) => handleRegionChange("", e)}
                          className="w-full px-5 py-3 text-left text-base transition-colors touch-manipulation flex items-center text-white hover:bg-white/10"
                        >
                          Select Region
                        </button>
                        {Object.keys(philippineRegions).map((region) => (
                          <button
                            key={region}
                            type="button"
                            onClick={(e) => handleRegionChange(region, e)}
                            className={`w-full px-5 py-3 text-left text-base transition-colors touch-manipulation flex items-center ${
                              formState.region === region
                                ? 'bg-primary/30 text-secondary font-semibold'
                                : 'text-white hover:bg-white/10'
                            }`}
                          >
                            {formState.region === region && (
                              <svg className="w-5 h-5 mr-3 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                            <span>{region}</span>
                          </button>
                        ))}
                      </DropdownPortal>
                      <input type="hidden" name="region" value={formState.region} required />
                    </div>

                    {/* Province Dropdown */}
                    <div className="relative overflow-visible z-1000 w-full md:w-[calc(28%-8px)] md:shrink-0" ref={provinceDropdownRef}>
                      <button
                        type="button"
                        onClick={() => formState.region && toggleProvince()}
                        disabled={!formState.region}
                        className={`w-full h-[48px] px-4 pr-10 rounded-xl bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-secondary text-left text-base touch-manipulation flex items-center justify-between relative z-1000 ${
                          !formState.region ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      >
                        <span className="truncate whitespace-nowrap overflow-hidden">{getProvinceLabel()}</span>
                        <svg
                          className={`w-5 h-5 transition-transform ${isProvinceOpen ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      <DropdownPortal isOpen={isProvinceOpen && !!formState.region} isMounted={isMounted} position={provinceDropdownPosition}>
                        <button
                          type="button"
                          onClick={(e) => handleProvinceChange("", e)}
                          className="w-full px-5 py-3 text-left text-base transition-colors touch-manipulation flex items-center text-white hover:bg-white/10"
                        >
                          Select Province
                        </button>
                        {availableProvinces.map((province) => (
                          <button
                            key={province}
                            type="button"
                            onClick={(e) => handleProvinceChange(province, e)}
                            className={`w-full px-5 py-3 text-left text-base transition-colors touch-manipulation flex items-center ${
                              formState.province === province
                                ? 'bg-primary/30 text-secondary font-semibold'
                                : 'text-white hover:bg-white/10'
                            }`}
                          >
                            {formState.province === province && (
                              <svg className="w-5 h-5 mr-3 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                            <span>{province}</span>
                          </button>
                        ))}
                      </DropdownPortal>
                      <input type="hidden" name="province" value={formState.province} required />
                    </div>

                    {/* City Dropdown */}
                    <div className="relative overflow-visible z-1000 w-full md:w-[calc(28%-8px)] md:shrink-0" ref={cityDropdownRef}>
                      <button
                        type="button"
                        onClick={() => formState.province && toggleCity()}
                        disabled={!formState.province}
                        className={`w-full h-[48px] px-4 pr-10 rounded-xl bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-secondary text-left text-base touch-manipulation flex items-center justify-between relative z-1000 ${
                          !formState.province ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      >
                        <span className="truncate whitespace-nowrap overflow-hidden">{getCityLabel()}</span>
                        <svg
                          className={`w-5 h-5 transition-transform ${isCityOpen ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      <DropdownPortal isOpen={isCityOpen && !!formState.province} isMounted={isMounted} position={cityDropdownPosition}>
                        <button
                          type="button"
                          onClick={(e) => handleCityChange("", e)}
                          className="w-full px-5 py-3 text-left text-base transition-colors touch-manipulation flex items-center text-white hover:bg-white/10"
                        >
                          Select City
                        </button>
                        {availableCities.map((city) => (
                          <button
                            key={city}
                            type="button"
                            onClick={(e) => handleCityChange(city, e)}
                            className={`w-full px-5 py-3 text-left text-base transition-colors touch-manipulation flex items-center ${
                              formState.city === city
                                ? 'bg-primary/30 text-secondary font-semibold'
                                : 'text-white hover:bg-white/10'
                            }`}
                          >
                            {formState.city === city && (
                              <svg className="w-5 h-5 mr-3 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                            <span>{city}</span>
                          </button>
                        ))}
                      </DropdownPortal>
                      <input type="hidden" name="city" value={formState.city} required />
                    </div>
                  </div>
                  <div className="relative overflow-visible z-1000" ref={dropdownRef}>
                    <button
                      type="button"
                      onClick={() => !isDetailsReadOnly && toggleInterest()}
                      disabled={isDetailsReadOnly}
                      className={`w-full h-[48px] px-4 pr-10 rounded-xl bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-secondary text-left text-base touch-manipulation flex items-center justify-between relative z-1000 ${
                        isDetailsReadOnly ? "opacity-70 cursor-not-allowed" : ""
                      }`}
                    >
                      <span className="truncate whitespace-nowrap overflow-hidden">{selectedOption.label}</span>
                      <svg
                        className={`w-5 h-5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <DropdownPortal isOpen={isDropdownOpen} isMounted={isMounted} position={dropdownPosition}>
                      {interestOptions.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={(e) => !isDetailsReadOnly && handleInterestChange(option.value, e)}
                          disabled={isDetailsReadOnly}
                          className={`w-full px-5 py-3 text-left text-base transition-colors touch-manipulation flex items-center ${
                            formState.interest === option.value
                              ? 'bg-primary/30 text-secondary font-semibold'
                              : 'text-white hover:bg-white/10'
                          } ${isDetailsReadOnly ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          {formState.interest === option.value && (
                            <svg className="w-5 h-5 mr-3 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                          <span>{option.label}</span>
                        </button>
                      ))}
                    </DropdownPortal>
                    <input type="hidden" name="interest" value={formState.interest} />
                  </div>
                  <textarea
                    name="details"
                    value={formState.details}
                    onChange={handleChange}
                    readOnly={isDetailsReadOnly}
                    disabled={isDetailsReadOnly}
                    rows={4}
                    placeholder="Tell us about your project..."
                    className={`w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-secondary resize-none ${
                      isDetailsReadOnly ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-secondary text-black px-6 py-3 rounded-xl font-semibold hover:bg-yellow-300 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Sending..." : "Send Quote Request"}
                  </button>
                </form>
              </div>

              <ContactInfo />
            </div>

            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
              <div className="flex-1 min-w-0 lg:min-w-[500px]">
                <h4 className="text-lg font-semibold mb-3 text-white">Follow Us</h4>
                <div className="flex gap-4">
                  {socialIcons.map(({ icon: Icon, href, label }) => (
                    <a
                      key={href}
                      href={href}
                      aria-label={label}
                      className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                    >
                      <Icon className="text-xl text-white" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="flex min-w-0">
                <div className="bg-white/10 rounded-xl p-4 border border-white/10">
                  <h4 className="text-lg font-semibold mb-2 text-white">24/7 Support</h4>
                  <p className="text-blue-100 text-sm">
                    Our technical support team is available around the clock to
                    assist with any questions or system issues.
                  </p>
                </div>
              </div>
            </div>
          </LayoutContainer>
        </div>
      </section>
    </main>
  );
}
