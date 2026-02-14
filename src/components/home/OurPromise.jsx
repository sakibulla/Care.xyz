import React from "react";
import { FaCertificate, FaHandHoldingHeart, FaHeadset, FaAward, FaShieldAlt, FaSmile } from "react-icons/fa";

const OurPromise = () => {
  const promises = [
    {
      icon: <FaCertificate className="text-4xl text-primary" />,
      title: "Certified Professionals",
      description: "All caregivers are certified, trained, and experienced in their field",
    },
    {
      icon: <FaShieldAlt className="text-4xl text-secondary" />,
      title: "Background Verified",
      description: "Complete background checks and verification for your safety",
    },
    {
      icon: <FaHandHoldingHeart className="text-4xl text-accent" />,
      title: "Compassionate Care",
      description: "We treat your loved ones with dignity, respect, and genuine care",
    },
    {
      icon: <FaHeadset className="text-4xl text-info" />,
      title: "24/7 Support",
      description: "Round-the-clock customer support whenever you need assistance",
    },
    {
      icon: <FaAward className="text-4xl text-success" />,
      title: "Quality Guaranteed",
      description: "We maintain the highest standards of care and service quality",
    },
    {
      icon: <FaSmile className="text-4xl text-warning" />,
      title: "100% Satisfaction",
      description: "Your happiness and peace of mind are our top priorities",
    },
  ];

  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Our <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">Promise</span> to You
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          We're committed to providing exceptional care that you can trust
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {promises.map((promise, index) => (
          <div 
            key={index} 
            className="card bg-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-primary/10"
          >
            <div className="card-body items-center text-center">
              <div className="mb-4 p-4 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full">
                {promise.icon}
              </div>
              <h3 className="card-title text-lg font-bold text-gray-800">{promise.title}</h3>
              <p className="text-sm text-gray-700 leading-relaxed">{promise.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 p-8 rounded-2xl border-2 border-primary/20">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">
          Ready to Experience the Difference?
        </h3>
        <p className="text-gray-600 mb-6 max-w-xl mx-auto">
          Join hundreds of families who trust Care.xyz for their caregiving needs
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/services" className="btn btn-primary btn-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all">
            Browse Services
          </a>
          <a href="/contact" className="btn btn-outline btn-secondary btn-lg hover:scale-105 transition-all">
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
};

export default OurPromise;
