This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Marketing Tags

Set these public environment variables in Vercel when the corresponding
tracking platform should be enabled:

```env
NEXT_PUBLIC_GTM_ID=GTM-MHLCDHH4
NEXT_PUBLIC_GOOGLE_ADS_ID=AW-18143858726
NEXT_PUBLIC_UET_ID=187244204
NEXT_PUBLIC_META_PIXEL_ID=1668104927560679
```

`NEXT_PUBLIC_GOOGLE_ADS_ID` installs the Google tag across all pages. Google Ads
conversion events also require a conversion action label from Google Ads, such
as `AW-18143858726/abc123_label`.

## AI Chatbot

This project includes an **AI-powered customer support chatbot** that uses **Ollama** (open-source LLM) with **RAG (Retrieval Augmented Generation)** to provide intelligent, context-aware responses about products, services, and company information.

### Features

- 🤖 **Open-source LLM integration** - Uses Ollama for local/cloud LLM inference
- 📚 **RAG-powered** - Automatically reads and understands your project context
- 🎯 **Context-aware** - Knows which product page users are viewing
- 💬 **Conversational** - Maintains conversation history for natural interactions
- 📞 **Contact integration** - Seamlessly redirects to contact form when needed

### Quick Setup

1. **Install Ollama**: Visit [https://ollama.ai](https://ollama.ai) and install for your OS
2. **Pull a model**: 
   ```bash
   ollama pull llama3.2
   # Or for cloud models: gpt-oss:20b-cloud, deepseek-v3.1:671b-cloud, etc.
   ```
3. **Configure** (optional): Create `.env`:
   ```env
   OLLAMA_BASE_URL
   OLLAMA_MODEL=llama3.2
   ```
4. **Test**: Visit `http://localhost:3000/api/chat` to check status

### How It Works

The chatbot uses **RAG (Retrieval Augmented Generation)** to:
- Extract knowledge from your product data, company info, and specifications
- Retrieve relevant context when users ask questions
- Generate accurate, context-aware responses using the LLM
- Understand which product page users are viewing for better assistance

### Knowledge Base

The chatbot automatically indexes:
- ✅ Product information (names, descriptions, specifications, features)
- ✅ Company information (mission, services, contact details)
- ✅ Product categories and use cases
- ✅ Pricing and warranty information
- ✅ Installation and service details

### Usage

The chatbot appears as a floating "Service" button in the bottom-right corner of all pages. Users can:
- Ask questions about products and services
- Get information about pricing, specifications, and features
- Learn about applicable use cases for products
- Request contact information or support


### API Endpoints

- `GET /api/chat` - Health check and Ollama status
- `POST /api/chat` - Send chat messages and get AI responses

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
