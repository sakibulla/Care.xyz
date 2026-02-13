import React from "react";
import { FaStar } from "react-icons/fa";
import Image from "next/image";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Ahmed",
      role: "Mother of 2",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
      rating: 5,
      text: "Hero Kidz helped me find a wonderful caregiver for my newborn. The service is professional and the caregivers are so loving!",
      gradient: "from-pink-100 to-pink-50"
    },
    {
      name: "Karim Rahman",
      role: "Son of Elderly Parent",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
      rating: 5,
      text: "My father receives excellent care from the team. They are patient, kind, and truly care about his wellbeing.",
      gradient: "from-blue-100 to-blue-50"
    },
    {
      name: "Fatima Khan",
      role: "Working Professional",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
      rating: 5,
      text: "Booking was so easy and the caregiver arrived on time. I can focus on work knowing my baby is in good hands.",
      gradient: "from-yellow-100 to-yellow-50"
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-pink-50 via-blue-50 to-yellow-50 rounded-2xl">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          What <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">Families Say</span>
        </h2>
        <p className="text-gray-600 text-lg">
          Trusted by hundreds of families who love our care
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 lg:gap-8 px-4">
        {testimonials.map((testimonial, index) => (
          <div key={index} className={`card bg-gradient-to-br ${testimonial.gradient} shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-white`}>
            <div className="card-body">
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden shadow-md ring-2 ring-white">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex gap-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="text-warning drop-shadow-sm" />
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed">{testimonial.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
