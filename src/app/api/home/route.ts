import { NextResponse } from "next/server";
import {
  carouselSlides,
  features,
  stats,
  productShowcases,
  howItWorksSteps,
  userSegments,
  testimonials,
  trustBadges,
  videoItems,
  resources,
  faqs,
} from "@/app/(home)/components/homeData";

// Helper function to serialize data by removing React components
function serializeData(data: unknown): unknown {
  if (data === null || data === undefined) {
    return data;
  }

  if (Array.isArray(data)) {
    return data.map(serializeData);
  }

  if (typeof data === "object" && data !== null) {
    const serialized: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(data)) {
      // Skip React component functions (icons)
      if (typeof value === "function") {
        // Store component name or type instead
        serialized[key] = value.name || value.displayName || "[Component]";
        continue;
      }
      serialized[key] = serializeData(value);
    }
    return serialized;
  }

  return data;
}

export async function GET() {
  try {
    const homeData = {
      carouselSlides,
      features,
      stats,
      productShowcases,
      howItWorksSteps,
      userSegments,
      testimonials,
      trustBadges,
      videoItems,
      resources,
      faqs,
    };

    // Serialize data to remove React components
    const serializedData = serializeData(homeData);

    return NextResponse.json({
      success: true,
      data: serializedData,
    });
  } catch (error) {
    console.error("Error fetching home data:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch home data" },
      { status: 500 }
    );
  }
}

