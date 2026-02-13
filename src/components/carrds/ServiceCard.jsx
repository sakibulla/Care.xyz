"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaClock, FaCalendarAlt, FaArrowRight, FaCheckCircle, FaStar } from "react-icons/fa";

const ServiceCard = ({ service }) => {
  const { title, image, short, charge_per_hour, charge_per_day, _id, slug } = service;
  const [isHovered, setIsHovered] = useState(false);
  
  // Use slug if available, otherwise use _id
  const linkHref = slug ? `/services/${slug}` : `/services/${_id}`;
  
  return (
    <div 
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-primary/40"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Premium Badge */}
      <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
        <FaStar className="text-xs" />
        <span>Certified</span>
      </div>

      {/* Image Section */}
      <Link href={linkHref}>
        <figure className="relative overflow-hidden bg-gradient-to-br from-pink-50 via-blue-50 to-yellow-50 h-56">
          <Image
            width={400}
            height={300}
            src={image || "/assets/hero.png"}
            alt={title}
            className={`w-full h-full object-cover transition-all duration-700 ${
              isHovered ? "scale-110 rotate-2" : "scale-100 rotate-0"
            }`}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60" />
          
          {/* Floating Icon on Hover */}
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
            isHovered ? "opacity-100 scale-100" : "opacity-0 scale-50"
          }`}>
            <div className="bg-white/90 backdrop-blur-sm p-4 rounded-full shadow-2xl">
              <FaArrowRight className="text-2xl text-primary" />
            </div>
          </div>
        </figure>
      </Link>

      {/* Content Section */}
      <div className="p-6 space-y-4">
        {/* Title */}
        <Link href={linkHref}>
          <h3 className="text-xl font-bold text-gray-800 hover:text-primary transition-colors line-clamp-1 group-hover:text-primary">
            {title}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 min-h-[2.5rem]">
          {short}
        </p>

        {/* Features */}
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1 text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full">
            <FaCheckCircle className="text-xs" />
            Verified
          </span>
          <span className="inline-flex items-center gap-1 text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
            <FaCheckCircle className="text-xs" />
            24/7 Available
          </span>
        </div>

        {/* Pricing Section */}
        <div className="bg-gradient-to-br from-pink-50 to-blue-50 rounded-xl p-4 space-y-2 border border-primary/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-700">
              <div className="bg-white p-2 rounded-lg shadow-sm">
                <FaClock className="text-secondary" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Hourly Rate</p>
                <p className="text-lg font-bold text-secondary">${charge_per_hour}</p>
              </div>
            </div>
            
            <div className="h-10 w-px bg-gray-300" />
            
            <div className="flex items-center gap-2 text-gray-700">
              <div className="bg-white p-2 rounded-lg shadow-sm">
                <FaCalendarAlt className="text-primary" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Daily Rate</p>
                <p className="text-lg font-bold text-primary">${charge_per_day}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Link 
            href={`/booking/${_id || slug}`}
            className="btn btn-secondary btn-sm flex-1 hover:scale-105 transition-transform shadow-md"
          >
            Book Now
          </Link>
          <Link
            href={linkHref}
            className="btn btn-outline btn-primary btn-sm flex-1 hover:scale-105 transition-transform group/btn"
          >
            <span>Details</span>
            <FaArrowRight className="ml-1 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute -top-10 -left-10 w-32 h-32 bg-gradient-to-br from-secondary/10 to-accent/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
};

export default ServiceCard;
