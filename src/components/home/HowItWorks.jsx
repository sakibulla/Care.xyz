import React from "react";
import { FaSearch, FaCalendarCheck, FaUserCheck, FaHeart } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaSearch className="text-5xl text-primary" />,
      title: "Browse Services",
      description: "Explore our wide range of professional caregiving services tailored to your needs",
      color: "from-pink-100 to-pink-50",
      number: "1"
    },
    {
      icon: <FaCalendarCheck className="text-5xl text-secondary" />,
      title: "Book & Schedule",
      description: "Choose your preferred time and duration - hourly or daily care options available",
      color: "from-blue-100 to-blue-50",
      number: "2"
    },
    {
      icon: <FaUserCheck className="text-5xl text-accent" />,
      title: "Meet Your Caregiver",
      description: "Get matched with a verified, trained professional who meets your requirements",
      color: "from-yellow-100 to-yellow-50",
      number: "3"
    },
    {
      icon: <FaHeart className="text-5xl text-error" />,
      title: "Enjoy Peace of Mind",
      description: "Relax knowing your loved ones are in safe, compassionate, and professional hands",
      color: "from-red-100 to-red-50",
      number: "4"
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 via-pink-50 to-yellow-50 rounded-2xl">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          How It <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">Works</span>
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Getting started with Hero Kidz is simple and straightforward
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 px-4">
        {steps.map((step, index) => (
          <div 
            key={index} 
            className={`card bg-gradient-to-br ${step.color} shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-white relative`}
          >
            <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
              {step.number}
            </div>
            <div className="card-body items-center text-center pt-8">
              <div className="mb-4 p-4 bg-white rounded-full shadow-md">
                {step.icon}
              </div>
              <h3 className="card-title text-lg font-bold text-gray-800">{step.title}</h3>
              <p className="text-sm text-gray-700 leading-relaxed">{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <a href="/services" className="btn btn-primary btn-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all">
          Get Started Now
        </a>
      </div>
    </section>
  );
};

export default HowItWorks;
