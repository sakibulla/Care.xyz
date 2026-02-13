import React from "react";
import ServiceCard from "@/components/carrds/ServiceCard";
import { getServices } from "@/actions/server/service";

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Our <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">Services</span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Professional caregiving services tailored to your family's unique needs
        </p>
      </div>
      
      {services.length === 0 ? (
        <div className="text-center p-12 bg-gradient-to-br from-pink-50 to-blue-50 rounded-2xl shadow-lg">
          <p className="text-gray-500 text-lg">No services available at the moment.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service) => (
            <ServiceCard key={service._id} service={service} />
          ))}
        </div>
      )}
    </div>
  );
}
