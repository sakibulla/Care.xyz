import React from "react";
import ServiceCard from "@/components/carrds/ServiceCard";
import { getServices } from "@/actions/server/service";

const Services = async () => {
  let services = [];
  
  try {
    services = await getServices();
    // Limit to top 3 services for homepage
    services = services.slice(0, 3);
  } catch (error) {
    console.error("Failed to fetch services:", error.message);
    // Return empty state if MongoDB connection fails
    return (
      <div className="py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">Top Services</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our most popular caregiving services
          </p>
        </div>
        <div className="text-center p-8 bg-gradient-to-br from-pink-50 to-blue-50 rounded-xl shadow-lg">
          <p className="text-gray-500">Services will be available once database is connected.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Our <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">Top Services</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover our most popular caregiving services
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
        {services.map((service) => (
          <ServiceCard key={service._id} service={service}></ServiceCard>
        ))}
      </div>
      
      <div className="text-center mt-10">
        <a href="/services" className="btn btn-primary btn-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all">
          View All Services
        </a>
      </div>
    </div>
  );
};

export default Services;
