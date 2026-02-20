"use client";

import { useState, forwardRef } from "react";
import LayoutContainer from "@/components/layout/LayoutContainer";
import SectionHeading from "@/components/marketing/SectionHeading";

const LOCATION_TYPES = [
  "Mall / Shopping Center",
  "Hotel / Resort",
  "Restaurant / Cafe",
  "Office Building",
  "Gas Station",
  "Parking Facility",
  "Other",
] as const;

interface PartnerFormState {
  businessName: string;
  contactPerson: string;
  email: string;
  phone: string;
  locationAddress: string;
  locationType: string;
  message: string;
}

const INITIAL_STATE: PartnerFormState = {
  businessName: "",
  contactPerson: "",
  email: "",
  phone: "",
  locationAddress: "",
  locationType: "",
  message: "",
};

type SubmitStatus = "idle" | "submitting" | "success" | "error";

export const PartnerInquiryForm = forwardRef<HTMLElement>(
  function PartnerInquiryForm(_props, ref): React.ReactElement {
    const [formState, setFormState] = useState<PartnerFormState>(INITIAL_STATE);
    const [status, setStatus] = useState<SubmitStatus>("idle");

    const handleChange = (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ): void => {
      const { name, value } = e.target;
      setFormState((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (
      e: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
      e.preventDefault();
      setStatus("submitting");

      try {
        const payload = {
          firstName: formState.contactPerson.split(" ")[0] || formState.contactPerson,
          lastName: formState.contactPerson.split(" ").slice(1).join(" ") || "",
          email: formState.email,
          phone: formState.phone,
          interest: "Location Partner",
          details: [
            `Business Name: ${formState.businessName}`,
            `Location Type: ${formState.locationType}`,
            `Location Address: ${formState.locationAddress}`,
            formState.message ? `\nAdditional Notes:\n${formState.message}` : "",
          ]
            .filter(Boolean)
            .join("\n"),
        };

        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const result = await response.json();

        if (!response.ok || !result.ok) {
          throw new Error("Failed to send inquiry");
        }

        setStatus("success");
        setFormState(INITIAL_STATE);
      } catch (error) {
        console.error("Partner inquiry submission failed:", error);
        setStatus("error");
      }
    };

    const inputClassName =
      "w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors";

    return (
      <section ref={ref} className="section-spacing bg-gray-50">
        <LayoutContainer className="flex-col space-y-12">
          <SectionHeading
            eyebrow="Get Started"
            title="Partner Inquiry Form"
            description="Tell us about your location and our team will get in touch to discuss the next steps."
          />

          <div className="max-w-2xl mx-auto w-full">
            {status === "success" ? (
              <SuccessMessage onReset={() => setStatus("idle")} />
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    name="businessName"
                    value={formState.businessName}
                    onChange={handleChange}
                    placeholder="Business Name"
                    required
                    className={inputClassName}
                    aria-label="Business Name"
                  />
                  <input
                    name="contactPerson"
                    value={formState.contactPerson}
                    onChange={handleChange}
                    placeholder="Contact Person"
                    required
                    className={inputClassName}
                    aria-label="Contact Person"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    required
                    className={inputClassName}
                    aria-label="Email Address"
                  />
                  <input
                    name="phone"
                    type="tel"
                    value={formState.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className={inputClassName}
                    aria-label="Phone Number"
                  />
                </div>

                <input
                  name="locationAddress"
                  value={formState.locationAddress}
                  onChange={handleChange}
                  placeholder="Location Address"
                  required
                  className={inputClassName}
                  aria-label="Location Address"
                />

                <select
                  name="locationType"
                  value={formState.locationType}
                  onChange={handleChange}
                  required
                  className={inputClassName}
                  aria-label="Location Type"
                >
                  <option value="" disabled>
                    Select Location Type
                  </option>
                  {LOCATION_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>

                <textarea
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Message / Additional Notes (optional)"
                  className={`${inputClassName} resize-none`}
                  aria-label="Message"
                />

                {status === "error" && (
                  <p className="text-red-600 text-sm" role="alert">
                    Something went wrong. Please try again or contact us
                    directly at admin@volthub.ph.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === "submitting"
                    ? "Sending..."
                    : "Submit Partner Inquiry"}
                </button>
              </form>
            )}
          </div>
        </LayoutContainer>
      </section>
    );
  }
);

function SuccessMessage({
  onReset,
}: {
  onReset: () => void;
}): React.ReactElement {
  return (
    <div className="text-center space-y-4 py-8">
      <div className="w-16 h-16 rounded-full bg-primary/10 mx-auto flex items-center justify-center">
        <svg
          className="w-8 h-8 text-primary"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <h3 className="text-2xl font-bold text-gray-900">
        Application Received!
      </h3>
      <p className="text-gray-600 max-w-md mx-auto">
        Thank you for your interest in becoming a VoltHub location partner. Our
        team will review your application and contact you within 2-3 business
        days.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="text-primary font-semibold hover:underline"
      >
        Submit another inquiry
      </button>
    </div>
  );
}
