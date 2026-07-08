"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  RiArrowLeftLine,
  RiArrowRightSLine,
  RiCloseLine,
  RiDownloadLine,
  RiQuestionLine,
  RiArrowLeftSLine,
} from "react-icons/ri";
import { Product, categories } from "./productData";

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const categoryLabel = categories.find((c) => c.id === product.category)?.label;

  // Build image URL array from backend product.images, falling back to product.image
  const allImages: string[] = (() => {
    if (product.images && product.images.length > 0) {
      return product.images.map((img) => img.image_url);
    }
    return [product.image];
  })();

  const [selectedImage, setSelectedImage] = useState(() => allImages[0] || product.image);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const openImageModal = (index: number) => {
    setModalImageIndex(index);
    setIsImageModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
    document.body.style.overflow = "unset";
  };

  const navigateModalImage = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setModalImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
    } else {
      setModalImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
    }
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isImageModalOpen) closeImageModal();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isImageModalOpen]);

  return (
    <div className="space-y-4 md:space-y-8 w-full md:w-3/4 md:mx-auto pb-24 lg:pb-8">
      {/* Back Button */}
      <Link
        href="/products"
        className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-primary transition-colors"
      >
        <RiArrowLeftLine className="h-4 w-4" />
        <span>Back to Products</span>
      </Link>

      {/* Product Hero — Image Gallery + Info */}
      <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
        {/* Image Gallery */}
        <div className="lg:w-1/2 space-y-4">
          <button
            onClick={() => openImageModal(allImages.findIndex((img) => img === selectedImage))}
            className="relative aspect-square bg-white w-full rounded-xl md:rounded-2xl overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 border-2 border-slate-200 shadow-lg cursor-zoom-in hover:shadow-xl transition-all group"
            aria-label="Click to view larger image"
          >
            <Image
              src={selectedImage}
              alt={product.name}
              fill
              className="object-contain transition-transform duration-300 p-4 md:p-6 lg:p-8 group-hover:scale-105"
              priority
            />
            {allImages.length > 1 && (
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold text-slate-700 shadow-md">
                {allImages.findIndex((img) => img === selectedImage) + 1} / {allImages.length}
              </div>
            )}
          </button>

          {/* Thumbnails */}
          {allImages.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {allImages.map((img, index) => {
                const isSelected = selectedImage === img;
                return (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(img)}
                    className={`relative flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden border-2 transition-all bg-white shadow-sm ${
                      isSelected
                        ? "border-primary ring-2 ring-primary/20 scale-105"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                    aria-label={`Select image ${index + 1}`}
                  >
                    <Image src={img} alt={`Thumb ${index + 1}`} fill className="object-contain p-1.5" />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="lg:w-1/2">
          <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 border border-slate-200 shadow-sm space-y-4">
            {categoryLabel && (
              <span className="text-xs uppercase tracking-wider text-primary font-semibold">
                {categoryLabel}
              </span>
            )}
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900">
              {product.name}
            </h1>
            {product.sku_code && (
              <p className="text-xs text-slate-500">SKU: {product.sku_code}</p>
            )}
            {product.price && (
              <p className="text-2xl md:text-3xl font-bold text-primary">{product.price}</p>
            )}

            {/* Quantity */}
            <div className="pt-2 border-t border-slate-200">
              <label className="block text-sm font-semibold text-slate-900 mb-1.5">Quantity</label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="w-8 h-8 md:w-10 md:h-10 rounded-lg border-2 border-slate-300 hover:border-primary text-slate-700 font-bold"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 md:w-20 h-8 md:h-10 text-center text-sm font-semibold border-2 border-slate-300 rounded-lg focus:border-primary outline-none"
                />
                <button
                  type="button"
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="w-8 h-8 md:w-10 md:h-10 rounded-lg border-2 border-slate-300 hover:border-primary text-slate-700 font-bold"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            {/* CTA */}
            <Link
              href={`/contact?subject=quote&product=${encodeURIComponent(product.category)}&productName=${encodeURIComponent(product.name)}&quantity=${quantity}`}
              className="flex items-center justify-center gap-2 w-full bg-primary hover:bg-primary/90 text-white font-bold px-4 py-3 rounded-lg shadow-lg transition-all text-base group"
            >
              <span>Get Quote</span>
              <RiArrowRightSLine className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Description */}
      {product.description && (
        <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 border border-slate-200 shadow-sm">
          <h2 className="text-xl md:text-2xl font-semibold text-slate-900 mb-3 md:mb-4">Description</h2>
          <p className="text-sm md:text-base text-slate-600 leading-relaxed whitespace-pre-line">
            {product.description}
          </p>
        </div>
      )}

      {/* Product Images Gallery */}
      {product.images && product.images.length > 1 && (
        <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 border border-slate-200 shadow-sm">
          <h2 className="text-xl md:text-2xl font-semibold text-slate-900 mb-3 md:mb-4">Product Images</h2>
          <div className="flex flex-col gap-4">
            {product.images.map((img, index) => (
              <div key={img.id || index} className="relative w-full">
                <Image
                  src={img.image_url}
                  alt={img.alt_text || `${product.name} - Image ${index + 1}`}
                  width={1200}
                  height={800}
                  className="w-full h-auto object-contain rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FAQ */}
      <div className="mt-8 md:mt-12 space-y-4">
        <h3 className="text-xl md:text-2xl font-bold text-slate-900 flex items-center gap-2">
          <RiQuestionLine className="h-6 w-6 text-primary" />
          Frequently Asked Questions
        </h3>
        <div className="space-y-3">
          {[
            { q: "What is the installation time?", a: "Installation typically takes 2-4 hours for standard setups. Our certified technicians handle the entire process." },
            { q: "Is maintenance required?", a: "Our products are designed for minimal maintenance. We recommend annual inspections and cleaning." },
            { q: "What payment options are available?", a: "30% bank transfer in advance, balance before shipping. Production time: 20-25 working days." },
            { q: "Can I get a custom configuration?", a: "Yes! Contact our sales team to discuss your requirements and get a tailored solution." },
          ].map((faq, i) => (
            <details key={i} className="group bg-slate-50 rounded-lg border border-slate-200 p-4">
              <summary className="font-semibold text-slate-900 cursor-pointer text-sm md:text-base flex items-center justify-between">
                <span>{faq.q}</span>
                <span className="text-primary text-xl">+</span>
              </summary>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>

      {/* CTA Banner */}
      <div className="bg-gradient-to-r from-primary to-blue-600 rounded-2xl p-6 md:p-8 text-white text-center">
        <h3 className="text-xl md:text-2xl font-bold mb-2">Interested in this product?</h3>
        <p className="text-sm text-blue-100 mb-4">Contact us for pricing, availability, and custom configurations</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href={`/contact?subject=quote&product=${encodeURIComponent(product.category)}&productName=${encodeURIComponent(product.name)}&quantity=${quantity}`}
            className="inline-flex items-center gap-2 bg-white text-primary px-6 py-2.5 rounded-xl font-semibold hover:bg-slate-100 transition-colors text-sm"
          >
            Get Quote
          </Link>
          <Link
            href={`/contact?subject=brouchure&product=${encodeURIComponent(product.category)}&productName=${encodeURIComponent(product.name)}`}
            className="inline-flex items-center gap-2 bg-white/10 text-white border-2 border-white/30 px-6 py-2.5 rounded-xl font-semibold hover:bg-white/20 transition-colors text-sm"
          >
            <RiDownloadLine className="h-4 w-4" />
            Download Brochure
          </Link>
        </div>
      </div>

      {/* Image Modal */}
      {isImageModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-8"
          onClick={closeImageModal}
        >
          <button
            onClick={closeImageModal}
            className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white"
            aria-label="Close"
          >
            <RiCloseLine className="h-6 w-6" />
          </button>
          {allImages.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); navigateModalImage("prev"); }}
                className="absolute left-4 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white"
              >
                <RiArrowLeftSLine className="h-6 w-6" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); navigateModalImage("next"); }}
                className="absolute right-4 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white"
              >
                <RiArrowRightSLine className="h-6 w-6" />
              </button>
              <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 bg-white/10 px-4 py-2 rounded-full text-white text-sm">
                {modalImageIndex + 1} / {allImages.length}
              </div>
            </>
          )}
          <div className="relative w-full h-full max-w-7xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={allImages[modalImageIndex]}
              alt={`${product.name} - Image ${modalImageIndex + 1}`}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 90vw"
              priority
            />
          </div>
        </div>
      )}
    </div>
  );
}
