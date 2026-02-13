"use client";
import CartButton from "@/components/buttons/CartButton";
import Image from "next/image";
import React, { useState } from "react";
import { FaStar, FaShippingFast, FaShieldAlt, FaUndo, FaCheckCircle, FaChevronDown, FaChevronUp } from "react-icons/fa";

const ProductDetailsClient = ({ product }) => {
  const [activeTab, setActiveTab] = useState("description");
  const [expandedQna, setExpandedQna] = useState(null);

  const {
    title,
    image,
    price,
    discount,
    ratings,
    reviews,
    sold,
    description,
    info,
    qna,
  } = product;

  const discountedPrice = price - (price * discount) / 100;
  const savings = price - discountedPrice;

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Breadcrumb */}
      <div className="text-sm breadcrumbs">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/products">Products</a></li>
          <li className="text-primary">{title}</li>
        </ul>
      </div>

      {/* Main Product Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Image Section */}
        <div className="space-y-4">
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-pink-50 via-blue-50 to-yellow-50 shadow-xl border-2 border-primary/20">
            {discount > 0 && (
              <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold px-4 py-2 rounded-full shadow-lg">
                -{discount}% OFF
              </div>
            )}
            <Image
              width={700}
              height={700}
              src={image}
              alt={title}
              className="w-full aspect-square object-cover hover:scale-105 transition-transform duration-500"
              priority
            />
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white rounded-xl p-3 shadow-md text-center border border-gray-100">
              <FaShippingFast className="text-2xl text-primary mx-auto mb-1" />
              <p className="text-xs font-medium text-gray-700">Fast Delivery</p>
            </div>
            <div className="bg-white rounded-xl p-3 shadow-md text-center border border-gray-100">
              <FaShieldAlt className="text-2xl text-green-600 mx-auto mb-1" />
              <p className="text-xs font-medium text-gray-700">Safe & Secure</p>
            </div>
            <div className="bg-white rounded-xl p-3 shadow-md text-center border border-gray-100">
              <FaUndo className="text-2xl text-blue-600 mx-auto mb-1" />
              <p className="text-xs font-medium text-gray-700">Easy Returns</p>
            </div>
          </div>
        </div>

        {/* Product Info Section */}
        <div className="space-y-6">
          {/* Title */}
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 leading-tight mb-3">
              {title}
            </h1>
            
            {/* Rating & Social Proof */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 bg-yellow-50 px-3 py-1.5 rounded-full">
                <div className="flex text-yellow-400">
                  {Array.from({ length: 5 }, (_, i) => (
                    <FaStar
                      key={i}
                      className={`text-sm ${i < Math.round(ratings) ? "" : "opacity-30"}`}
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold text-gray-700">
                  {ratings}
                </span>
              </div>
              <span className="text-sm text-gray-600">
                {reviews} reviews
              </span>
              <span className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                {sold} sold
              </span>
            </div>
          </div>

          {/* Price Section */}
          <div className="bg-gradient-to-br from-pink-50 to-blue-50 rounded-2xl p-6 border-2 border-primary/20">
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                ৳{discountedPrice}
              </span>
              {discount > 0 && (
                <>
                  <span className="text-xl line-through text-gray-400">
                    ৳{price}
                  </span>
                  <span className="bg-red-500 text-white text-sm font-bold px-2 py-1 rounded-lg">
                    Save ৳{savings}
                  </span>
                </>
              )}
            </div>
            <p className="text-sm text-gray-600">Inclusive of all taxes</p>
          </div>

          {/* Key Features */}
          {info && info.length > 0 && (
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FaCheckCircle className="text-green-500" />
                Key Features
              </h3>
              <ul className="space-y-3">
                {info.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="bg-primary/10 rounded-full p-1 mt-0.5">
                      <FaCheckCircle className="text-primary text-xs" />
                    </div>
                    <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Add to Cart */}
          <div className="sticky bottom-4 bg-white rounded-2xl p-4 shadow-2xl border-2 border-primary/20">
            <CartButton product={{ ...product, _id: product._id.toString() }} />
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Tab Headers */}
        <div className="flex border-b border-gray-200 bg-gray-50">
          <button
            onClick={() => setActiveTab("description")}
            className={`flex-1 px-6 py-4 font-semibold transition-all ${
              activeTab === "description"
                ? "text-primary border-b-2 border-primary bg-white"
                : "text-gray-600 hover:text-primary"
            }`}
          >
            Description
          </button>
          {qna && qna.length > 0 && (
            <button
              onClick={() => setActiveTab("qna")}
              className={`flex-1 px-6 py-4 font-semibold transition-all ${
                activeTab === "qna"
                  ? "text-primary border-b-2 border-primary bg-white"
                  : "text-gray-600 hover:text-primary"
              }`}
            >
              Q & A ({qna.length})
            </button>
          )}
        </div>

        {/* Tab Content */}
        <div className="p-6 lg:p-8">
          {activeTab === "description" && (
            <div className="prose max-w-none">
              <div className="space-y-4 text-gray-700 leading-relaxed">
                {description?.split("\n\n").map((para, idx) => (
                  <p key={idx} className="text-base">{para}</p>
                ))}
              </div>
            </div>
          )}

          {activeTab === "qna" && qna && (
            <div className="space-y-3">
              {qna.map((item, i) => (
                <div
                  key={i}
                  className="border border-gray-200 rounded-xl overflow-hidden hover:border-primary/50 transition-colors"
                >
                  <button
                    onClick={() => setExpandedQna(expandedQna === i ? null : i)}
                    className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <span className="font-semibold text-gray-800 text-left">
                      Q: {item.question}
                    </span>
                    {expandedQna === i ? (
                      <FaChevronUp className="text-primary flex-shrink-0" />
                    ) : (
                      <FaChevronDown className="text-gray-400 flex-shrink-0" />
                    )}
                  </button>
                  {expandedQna === i && (
                    <div className="p-4 bg-white border-t border-gray-200">
                      <p className="text-gray-700 leading-relaxed">
                        <span className="font-medium text-primary">A:</span> {item.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsClient;
