"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaBaby, FaUserNurse, FaHeartbeat } from "react-icons/fa";

const slides = [
  {
    id: 1,
    title: "Professional Care for Your",
    highlight: "Loved Ones",
    description: "Trusted, compassionate caregiving services for babies, elderly, and sick family members. Book trained professionals for hourly or daily care.",
    image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800&h=600&fit=crop&q=80",
    icon: FaHeartbeat,
    stats: [
      { value: "500+", label: "Happy Families" },
      { value: "50+", label: "Trained Caregivers" },
      { value: "24/7", label: "Support Available" }
    ]
  },
  {
    id: 2,
    title: "Expert Baby Care",
    highlight: "Services",
    description: "Certified nannies and baby care specialists providing loving attention to your little ones. Safe, nurturing environment guaranteed.",
    image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&h=600&fit=crop&q=80",
    icon: FaBaby,
    stats: [
      { value: "100%", label: "Verified Caregivers" },
      { value: "5★", label: "Average Rating" },
      { value: "1000+", label: "Hours of Care" }
    ]
  },
  {
    id: 3,
    title: "Elderly & Medical",
    highlight: "Care Experts",
    description: "Compassionate care for seniors and patients. Our trained professionals ensure comfort, dignity, and quality healthcare at home.",
    image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=800&h=600&fit=crop&q=80",
    icon: FaUserNurse,
    stats: [
      { value: "Licensed", label: "Professionals" },
      { value: "Safe", label: "Environment" },
      { value: "Trusted", label: "By Families" }
    ]
  }
];

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const slide = slides[currentSlide];
  const Icon = slide.icon;

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-pink-50 via-blue-50 to-yellow-50 rounded-xl md:rounded-2xl shadow-2xl border-2 border-primary/20">
      <div className="flex flex-col-reverse lg:flex-row justify-between items-center gap-6 md:gap-8 lg:gap-12 py-8 md:py-12 lg:py-16 px-4 md:px-8 lg:px-12 min-h-[500px] md:min-h-[600px] relative z-10">
        
        {/* Content Section */}
        <div className="flex-1 space-y-4 md:space-y-6 text-center lg:text-left z-10 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-4 md:space-y-6"
            >
              {/* Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="inline-block p-3 md:p-4 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full shadow-lg"
              >
                <Icon className="text-3xl md:text-4xl text-primary drop-shadow-sm" />
              </motion.div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                {slide.title}{" "}
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent block lg:inline">{slide.highlight}</span>
              </h1>

              {/* Description */}
              <p className="text-base md:text-lg text-gray-600 max-w-xl mx-auto lg:mx-0">
                {slide.description}
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start pt-2">
                <Link href="/services" className="btn btn-primary btn-md md:btn-lg w-full sm:w-auto shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                  Browse Services
                </Link>
                <Link href="/contact" className="btn btn-outline btn-secondary btn-md md:btn-lg w-full sm:w-auto hover:scale-105 transition-all">
                  Contact Us
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 md:gap-8 justify-center lg:justify-start pt-4">
                {slide.stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="text-center lg:text-left bg-white/60 backdrop-blur-sm rounded-lg p-3 shadow-md"
                  >
                    <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{stat.value}</p>
                    <p className="text-xs md:text-sm text-gray-700 font-medium">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Image Section */}
        <div className="flex-1 relative w-full max-w-md lg:max-w-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotate: 5 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-secondary/30 to-accent/30 rounded-full blur-3xl animate-pulse" />
              <div className="relative z-10 aspect-[4/3] w-full">
                <Image
                  alt={slide.title}
                  src={slide.image}
                  fill
                  className="rounded-2xl shadow-2xl object-cover ring-4 ring-white/50"
                  priority={currentSlide === 0}
                  loading={currentSlide === 0 ? "eager" : "lazy"}
                  quality={75}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 btn btn-circle btn-primary btn-xs sm:btn-sm md:btn-md z-20 hover:scale-110 transition-transform shadow-lg"
        aria-label="Previous slide"
      >
        <FaChevronLeft className="text-sm md:text-base" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 btn btn-circle btn-primary btn-xs sm:btn-sm md:btn-md z-20 hover:scale-110 transition-transform shadow-lg"
        aria-label="Next slide"
      >
        <FaChevronRight className="text-sm md:text-base" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-1.5 md:h-2 rounded-full transition-all ${
              index === currentSlide
                ? "w-6 md:w-8 bg-gradient-to-r from-primary to-secondary"
                : "w-1.5 md:w-2 bg-gray-400 hover:bg-primary/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
