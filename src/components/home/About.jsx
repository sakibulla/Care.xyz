import React from "react";
import { FaHeart, FaShieldAlt, FaClock, FaUserMd } from "react-icons/fa";

const About = () => {
  const features = [
    {
      icon: <FaShieldAlt className="text-4xl text-secondary" />,
      title: "Verified Caregivers",
      description: "All our caregivers are background-checked and professionally trained",
      color: "from-secondary/10 to-secondary/5"
    },
    {
      icon: <FaHeart className="text-4xl text-primary" />,
      title: "Compassionate Care",
      description: "We treat your loved ones with the dignity and respect they deserve",
      color: "from-primary/10 to-primary/5"
    },
    {
      icon: <FaClock className="text-4xl text-accent" />,
      title: "Flexible Scheduling",
      description: "Book hourly or daily care that fits your schedule",
      color: "from-accent/10 to-accent/5"
    },
    {
      icon: <FaUserMd className="text-4xl text-info" />,
      title: "Professional Service",
      description: "Experienced in baby care, elderly care, and patient assistance",
      color: "from-info/10 to-info/5"
    },
  ];

  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Why Choose <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">Care.xyz?</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          We connect families with trusted, professional caregivers who provide 
          compassionate support when you need it most.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className={`card bg-gradient-to-br ${feature.color} shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-white`}
          >
            <div className="card-body items-center text-center p-6">
              <div className="mb-4 p-4 bg-white rounded-full shadow-md">{feature.icon}</div>
              <h3 className="card-title text-lg font-bold">{feature.title}</h3>
              <p className="text-sm text-gray-700">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;
