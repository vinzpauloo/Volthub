"use client";

import { IconType } from "react-icons";
import { RiStarFill } from "react-icons/ri";
import LayoutContainer from "@/components/layout/LayoutContainer";

interface Testimonial {
  name: string;
  role: string;
  location: string;
  rating: number;
  text: string;
  image: string;
}

interface TrustBadge {
  name: string;
  icon: IconType;
}

interface SocialProofSectionProps {
  badge?: string;
  title: string;
  description: string;
  testimonials: Testimonial[];
  trustBadges: TrustBadge[];
  showCertifications?: boolean;
}

export default function SocialProofSection({
  badge = "Customer Voices",
  title,
  description,
  testimonials,
  trustBadges,
  showCertifications = true,
}: SocialProofSectionProps) {
  return (
    <section className="section-spacing bg-gradient-to-br from-white via-gray-50 to-white overflow-x-hidden">
      <LayoutContainer className="flex flex-col md:flex-row gap-6 md:gap-8 p-2">
        <div className="text-center space-y-3 md:space-y-4 mb-8 md:mb-16 reveal-on-scroll px-2">
          <p className="text-xs sm:text-sm font-semibold tracking-[0.2em] md:tracking-[0.3em] text-green-700 uppercase">{badge}</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold gradient-text break-words">{title}</h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto break-words px-2">{description}</p>
        </div>

        {/* Testimonials */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8 mb-8 md:mb-16">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1.34rem)] stagger-card reveal-on-scroll p-4 sm:p-5 md:p-6 bg-white rounded-xl md:rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center gap-1 mb-3 md:mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <RiStarFill key={i} className="text-yellow-400 text-base md:text-lg" />
                ))}
              </div>
              <p className="text-sm sm:text-base text-gray-700 mb-4 md:mb-6 leading-relaxed italic break-words">&ldquo;{testimonial.text}&rdquo;</p>
              <div className="flex items-center gap-3 md:gap-4 pt-3 md:pt-4 border-t border-gray-100">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-lg md:text-2xl flex-shrink-0">
                  {testimonial.image}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-sm md:text-base text-gray-800 truncate">{testimonial.name}</div>
                  <div className="text-xs sm:text-sm text-gray-600 truncate">
                    {testimonial.role} • {testimonial.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges & Certifications */}
        {showCertifications && (
          <div className="bg-white rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg border border-gray-100">
            <div className="text-center mb-6 md:mb-8">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2 break-words">Certified &amp; Trusted</h3>
              <p className="text-sm sm:text-base text-gray-600 break-words px-2">
                Our certifications and partnerships ensure quality and reliability
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 items-center">
              {trustBadges.map((badge, index) => (
                <div key={index} className="w-[45%] sm:w-[45%] md:w-[22%] flex flex-col items-center gap-2 text-center group">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg md:rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <badge.icon className="text-2xl sm:text-2xl md:text-3xl text-primary" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-gray-700 break-words px-1">{badge.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </LayoutContainer>
    </section>
  );
}

