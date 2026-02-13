"use client";
import Image from "next/image";
import Link from "next/link";
import { FaStar, FaShoppingCart, FaEye, FaHeart } from "react-icons/fa";
import { useState } from "react";
import CartButton from "../buttons/CartButton";

const ProductCard = ({ product }) => {
  const { title, image, price, ratings, reviews, sold, _id } = product;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-primary/30 hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Sold Badge */}
      {sold > 50 && (
        <div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
          🔥 Popular
        </div>
      )}

      {/* Wishlist Button */}
      <button 
        className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110"
        aria-label="Add to wishlist"
      >
        <FaHeart className="text-sm" />
      </button>

      {/* Image Section */}
      <Link href={`/products/${_id}`}>
        <figure className="relative overflow-hidden bg-gradient-to-br from-pink-50 to-blue-50 aspect-square">
          <Image
            width={400}
            height={400}
            src={image}
            alt={title}
            className={`w-full h-full object-cover transition-transform duration-500 ${
              isHovered ? "scale-110" : "scale-100"
            }`}
          />
          
          {/* Overlay on Hover */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              <Link
                href={`/products/${_id}`}
                className="btn btn-sm btn-circle bg-white text-primary hover:bg-primary hover:text-white shadow-lg"
              >
                <FaEye />
              </Link>
            </div>
          </div>
        </figure>
      </Link>

      {/* Content Section */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <Link href={`/products/${_id}`}>
          <h2 className="font-semibold text-gray-800 line-clamp-2 hover:text-primary transition-colors min-h-[3rem]">
            {title}
          </h2>
        </Link>

        {/* Rating & Reviews */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }, (_, i) => (
              <FaStar
                key={i}
                className={`text-sm ${
                  i < Math.round(ratings) 
                    ? "text-yellow-400" 
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 font-medium">
            {ratings.toFixed(1)}
          </span>
          <span className="text-xs text-gray-400">
            ({reviews})
          </span>
        </div>

        {/* Price & Sold */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              ৳{price}
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs text-gray-500 block">
              {sold} sold
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <CartButton product={{ ...product, _id: _id.toString() }} />
          <Link
            href={`/products/${_id}`}
            className="btn btn-outline btn-primary btn-sm flex-1 hover:scale-105 transition-transform"
          >
            Details
          </Link>
        </div>
      </div>

      {/* Decorative Corner */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
};

export default ProductCard;
