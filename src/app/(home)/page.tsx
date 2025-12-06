"use client";

import CarouselBanner from "@/components/home/CarouselBanner";
import HoverEffects from "@/components/home/HoverEffects";
import ProductShowcase from "./components/ProductShowcase";
import FeaturesSection from "./components/FeaturesSection";
import StatsSection from "./components/StatsSection";
import HowItWorksSection from "./components/HowItWorksSection";
import UserSegmentationSection from "./components/UserSegmentationSection";
import SocialProofSection from "./components/SocialProofSection";
import FAQSection from "./components/FAQSection";
import {
  carouselSlides,
  features,
  stats,
  productShowcases,
  howItWorksSteps,
  userSegments,
  testimonials,
  trustBadges,
  faqs,
} from "./components/homeData";

export default function Home() {
  return (
    <main className="flex flex-col w-full flex-1 overflow-x-hidden">
      <HoverEffects />

      {/* Carousel Banner */}
      <CarouselBanner slides={carouselSlides} autoPlay={true} autoPlayInterval={6000} />

      {/* Product Showcases */}
      {productShowcases.map((showcase, index) => (
        <ProductShowcase key={index} {...showcase} />
      ))}

    

      {/* How It Works Section */}
      <HowItWorksSection
        title="How It Works"
        description="From consultation to installation, we make the transition to clean energy simple and seamless."
        steps={howItWorksSteps}
      />

      {/* User Segmentation Section */}
      <UserSegmentationSection
        title="Find Your Perfect Solution"
        description="Whether you're a homeowner, business owner, or developer, we have the right energy solution for you."
        segments={userSegments}
      />

      {/* Social Proof Section */}
      <SocialProofSection
        title="What Our Customers Say"
        description="Join thousands of satisfied customers who have made the switch to clean energy."
        testimonials={testimonials}
        trustBadges={trustBadges}
        showCertifications={false}
      />

      {/* ROI Calculator Section */}
      {/* <ROICalculatorSection
        title="Energy Savings Calculator"
        description="Discover how much you could save with VoltHub's energy solutions. Get an instant estimate of your potential savings and ROI."
        benefits={roiCalculatorBenefits}
      /> */}

      {/* Video Section */}
      {/* <VideoSection
        title="See VoltHub in Action"
        description="Discover how VoltHub's energy solutions are transforming homes and businesses worldwide. Watch real customer stories and product demonstrations."
        videoItems={videoItems}
      /> */}

      {/* Blog/Resources Section */}
      {/* <BlogResourcesSection
        title="Latest Resources & Insights"
        description="Stay informed with our latest articles, guides, and industry insights on renewable energy."
        resources={resources}
      /> */}

      {/* FAQ Section */}
      <FAQSection
        title="Frequently Asked Questions"
        description="Find answers to the most common questions about our energy solutions."
        faqs={faqs}
      />

      {/* Lead Capture Section */}
      {/* <LeadCaptureSection
        title="Ready to Make the Switch?"
        description="Join thousands of satisfied customers. Get a free consultation and discover how much you could save with clean energy."
      /> */}

  {/* Features Section */}
  <FeaturesSection
        title="Clean energy without compromise"
        description="From ultra-efficient solar modules to AI-driven grid intelligence, we engineer every layer of the renewable ecosystem to deliver measurable impact on day one."
        features={features}
      />

      {/* Stats Section */}
      <StatsSection stats={stats} />


    </main>
  );
}
