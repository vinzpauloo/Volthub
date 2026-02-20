import { NextResponse } from "next/server";
import { getRelevantContext } from "@/lib/rag/knowledgeBase";

/**
 * Get page information for non-product pages
 */
function getPageInfo(path: string): { name: string; description: string } | null {
  // Handle sub-paths (e.g., /sectors/commercial, /sectors/residential)
  if (path.startsWith('/sectors/')) {
    const sector = path.split('/sectors/')[1];
    const sectorNames: Record<string, string> = {
      'commercial': 'Commercial Energy Solutions',
      'residential': 'Residential Energy Solutions',
      'industrial': 'Industrial Energy Solutions',
      'government': 'Government & Public Sector Solutions',
      'smart-cities': 'Smart Cities Solutions',
    };
    
    const sectorName = sectorNames[sector] || `Sector: ${sector}`;
    return {
      name: sectorName,
      description: `the ${sectorName.toLowerCase()} page showing energy solutions and products specifically designed for ${sector} sector applications`
    };
  }
  
  // Handle product sub-paths (e.g., /products/ev-charging)
  if (path.startsWith('/products/') && !path.match(/^\/products\/[^/]+$/)) {
    // This is a category page, not a specific product
    const category = path.split('/products/')[1];
    return {
      name: `Products - ${category}`,
      description: `the products page filtered by category: ${category}`
    };
  }
  
  const pageMap: Record<string, { name: string; description: string }> = {
    '/': { 
      name: 'Home', 
      description: 'the homepage with company overview, featured products, and main navigation' 
    },
    '/products': { 
      name: 'Products', 
      description: 'the products listing page showing all available products by category' 
    },
    '/sectors': { 
      name: 'Sectors', 
      description: 'the sectors page showing energy solutions organized by industry sectors (residential, commercial, industrial, etc.)' 
    },
    '/services': { 
      name: 'Services', 
      description: 'the services page with information about installation, maintenance, and support services' 
    },
    '/about': { 
      name: 'About', 
      description: 'the about page with company information, mission, and team details' 
    },
    '/contact': { 
      name: 'Contact', 
      description: 'the contact page where users can reach out for inquiries, support, or quotes' 
    },
  };

  // Check exact match first
  if (pageMap[path]) {
    return pageMap[path];
  }

  // Check if it's a product page (already handled separately)
  if (path.match(/^\/products\/[^/]+$/)) {
    return null; // Product pages are handled via productId
  }

  return null;
}

/**
 * Chat API Route - Integrates with Ollama LLM (local or cloud)
 * 
 * To use this, you need to:
 * 1. Install Ollama: https://ollama.ai (for local) OR use a cloud Ollama service
 * 2. Pull a model: ollama pull llama3.2 (for local) OR select a cloud model
 * 3. Set OLLAMA_BASE_URL in .env (defaults to http://localhost:11434)
 * 4. Set OLLAMA_MODEL in .env (defaults to llama3.2, or use cloud model name like gpt-oss:20b-cloud)
 * 
 * Cloud Model Examples:
 * - gpt-oss:20b-cloud
 * - deepseek-v3.1:671b-cloud
 * - qwen3-coder:480b-cloud
 * - glm-4.6:cloud
 */

const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || "http://localhost:11434";
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || "llama3.2";
const OLLAMA_API_KEY = process.env.OLLAMA_API_KEY; // Optional API key for cloud Ollama

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

/**
 * Call Ollama API
 */
async function callOllama(
  messages: ChatMessage[],
  context?: string,
  currentProduct?: { id: string; name: string },
  currentPagePath?: string | null
): Promise<string> {
  try {
    // Build the prompt with context
    let systemPrompt = `You are a helpful AI customer support assistant for VoltHub Electric Power Generation Services Corporation. 
You help customers with questions about products, services, specifications, and installation.
Be friendly, professional, and concise. If you don't know something, suggest contacting the support team.
IMPORTANT: Never share specific prices or currency amounts. For any pricing questions, direct users to contact the sales team or submit a quote request through the contact form at /contact.`;

    // Add current page context
    if (currentProduct) {
      systemPrompt += `\n\nIMPORTANT: The user is currently viewing the product page for "${currentProduct.name}" (ID: ${currentProduct.id}). 
When they ask questions like "this product", "what page am I on", "tell me about this", or "I'd like to know more about this product", 
they are referring to "${currentProduct.name}". Always assume questions about "this product" refer to "${currentProduct.name}" unless they explicitly mention a different product.`;
    } else if (currentPagePath) {
      // Handle non-product pages
      const pageInfo = getPageInfo(currentPagePath);
      if (pageInfo) {
        systemPrompt += `\n\nIMPORTANT: The user is currently on the "${pageInfo.name}" page (${currentPagePath}). 
When they ask "what page am I on", "where am I", or questions about the current page, they are referring to the "${pageInfo.name}" page. 
You can provide information about: ${pageInfo.description}`;
      }
    }

    if (context) {
      systemPrompt += `\n\nUse the following context to answer questions:\n\n${context}`;
    }

    // Prepare messages for Ollama
    const ollamaMessages = [
      {
        role: "system",
        content: systemPrompt,
      },
      ...messages.filter(m => m.role !== "system"),
    ];

    // Handle both localhost and cloud Ollama URLs
    // If base URL already includes /api (cloud), use it directly; otherwise append /api
    const apiUrl = OLLAMA_BASE_URL.includes('ollama.com') || OLLAMA_BASE_URL.endsWith('/api')
      ? `${OLLAMA_BASE_URL}/chat`  // Cloud API: https://ollama.com/api/chat
      : `${OLLAMA_BASE_URL}/api/chat`;  // Local: http://localhost:11434/api/chat
    
    // Prepare headers with API key if provided
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };
    
    // Add API key for cloud Ollama (if provided)
    if (OLLAMA_API_KEY) {
      headers["Authorization"] = `Bearer ${OLLAMA_API_KEY}`;
    }

    const response = await fetch(apiUrl, {
      method: "POST",
      headers,
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        messages: ollamaMessages,
        stream: false,
        options: {
          temperature: 0.7,
          top_p: 0.9,
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Ollama API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return data.message?.content || "I apologize, but I couldn't generate a response. Please try again.";
  } catch (error) {
    console.error("Error calling Ollama:", error);
    throw error;
  }
}

/**
 * POST /api/chat - Handle chat messages
 */
export async function POST(request: Request) {
  try {
    const { message, conversationHistory = [], productId, currentPagePath } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Get current product info if productId is provided
    let currentProduct: { id: string; name: string } | undefined;
    if (productId) {
      const { getProductById } = await import("@/app/products/components/productData");
      const product = getProductById(productId);
      if (product) {
        currentProduct = { id: product.id, name: product.name };
      }
    }

    // Get relevant context from knowledge base (with current page info)
    const context = getRelevantContext(message, productId || null, currentPagePath || null, 5);

    // Build conversation history
    const messages: ChatMessage[] = conversationHistory.map((msg: { sender: string; text: string }) => ({
      role: msg.sender === "user" ? "user" : "assistant",
      content: msg.text,
    }));

    // Add current user message
    messages.push({
      role: "user",
      content: message,
    });

    // Call Ollama with current product and page context
    const response = await callOllama(messages, context, currentProduct, currentPagePath);

    return NextResponse.json({
      response,
      contextUsed: context.length > 0,
    });
  } catch (error: unknown) {
    console.error("Chat API error:", error);

    // Check if Ollama is not running
    const errorMessage = error instanceof Error ? error.message : String(error);
    if (errorMessage.includes("fetch failed") || errorMessage.includes("ECONNREFUSED")) {
      return NextResponse.json(
        {
          error: "LLM service unavailable",
          message: "Ollama is not running. Please start Ollama and ensure a model is installed.",
          details: `Make sure Ollama is running at ${OLLAMA_BASE_URL} and model ${OLLAMA_MODEL} is installed.`,
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      {
        error: "Failed to generate response",
        message: error instanceof Error ? error.message : "An unexpected error occurred",
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/chat - Health check
 */
export async function GET() {
  try {
    // Check if Ollama is available
    // Handle both localhost and cloud Ollama URLs
    const tagsUrl = OLLAMA_BASE_URL.includes('ollama.com') || OLLAMA_BASE_URL.endsWith('/api')
      ? `${OLLAMA_BASE_URL}/tags`  // Cloud API: https://ollama.com/api/tags
      : `${OLLAMA_BASE_URL}/api/tags`;  // Local: http://localhost:11434/api/tags
    
    // Prepare headers with API key if provided
    const headers: HeadersInit = {};
    
    // Add API key for cloud Ollama (if provided)
    if (OLLAMA_API_KEY) {
      headers["Authorization"] = `Bearer ${OLLAMA_API_KEY}`;
    }
    
    const response = await fetch(tagsUrl, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          status: "unavailable",
          message: "Ollama is not running or not accessible",
        },
        { status: 503 }
      );
    }

    const data = await response.json() as { models?: Array<{ name: string }> };
    const models = data.models || [];
    const hasModel = models.some((m: { name: string }) => m.name.includes(OLLAMA_MODEL));

    return NextResponse.json({
      status: "available",
      ollamaUrl: OLLAMA_BASE_URL,
      model: OLLAMA_MODEL,
      modelsInstalled: models.map((m: { name: string }) => m.name),
      modelAvailable: hasModel,
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "unavailable",
        message: "Cannot connect to Ollama",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 503 }
    );
  }
}
