import { getSingleService } from "@/actions/server/service";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle, Clock, Star, Users, Calendar } from "lucide-react";

export default async function ServicePage({ params }) {
  const { id } = await params;
  const service = await getSingleService(id);

  if (!service) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-300">404</h1>
          <h2 className="text-2xl font-semibold mt-4">Service Not Found</h2>
          <p className="text-gray-600 mt-2">The service you're looking for doesn't exist.</p>
          <Link href="/services" className="btn btn-primary mt-6">
            Browse Services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <Link href="/services" className="text-primary hover:underline text-sm">
          ← Back to Services
        </Link>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Image */}
          <div className="relative h-96 rounded-xl overflow-hidden">
            <Image
              src={service.image || "/assets/hero.png"}
              fill
              className="object-cover"
              alt={service.title}
              priority
            />
          </div>

          {/* Title & Description */}
          <div>
            <h1 className="text-3xl font-bold">{service.title}</h1>
            {service.bangla && (
              <p className="text-gray-600 mt-1">{service.bangla}</p>
            )}
          </div>

          <p className="text-gray-700 leading-relaxed">{service.description}</p>

          {/* Quick Stats */}
          <div className="flex flex-wrap gap-4 text-sm">
            {service.ratings && (
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{service.ratings} ({service.reviews} reviews)</span>
              </div>
            )}
            {service.sold > 0 && (
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4 text-gray-500" />
                <span>{service.sold}+ bookings</span>
              </div>
            )}
            {service.availability && (
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span>{service.availability}</span>
              </div>
            )}
          </div>

          {/* Features */}
          {service.infoArray?.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3">What's included</h3>
              <div className="grid sm:grid-cols-2 gap-2">
                {service.infoArray.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FAQs */}
          {service.qnaArray?.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3">FAQs</h3>
              <div className="space-y-3">
                {service.qnaArray.slice(0, 3).map((qna, idx) => (
                  <details key={idx} className="bg-gray-50 p-3 rounded-lg">
                    <summary className="font-medium cursor-pointer">{qna.question}</summary>
                    <p className="text-sm text-gray-600 mt-2">{qna.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4 border">
            {/* Price */}
            <div className="text-center pb-4 border-b">
              <span className="text-3xl font-bold">${service.charge_per_hour}</span>
              <span className="text-gray-600">/hour</span>
              
              {service.discount > 0 && (
                <div className="mt-2">
                  <span className="bg-green-100 text-green-700 text-sm font-medium px-3 py-1 rounded-full">
                    {service.discount}% off
                  </span>
                </div>
              )}
            </div>

            {/* Quick Details */}
            <div className="space-y-3 py-4 border-b">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Per Day</span>
                <span className="font-semibold">${service.charge_per_day}</span>
              </div>
              {service.ageGroup && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Age Group</span>
                  <span className="font-semibold">{service.ageGroup}</span>
                </div>
              )}
              {service.minBookingHours && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Minimum booking</span>
                  <span className="font-semibold">{service.minBookingHours} hours</span>
                </div>
              )}
            </div>

            {/* Features Tags */}
            {service.features?.length > 0 && (
              <div className="py-4 border-b">
                <p className="text-sm font-medium mb-2">Features</p>
                <div className="flex flex-wrap gap-1">
                  {service.features.slice(0, 4).map((feat, idx) => (
                    <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {feat}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <Link
              href={`/booking/${service._id}`}
              className="btn btn-primary w-full mt-6"
            >
              Book Now
            </Link>
            
            <p className="text-xs text-gray-500 text-center mt-3">
              Free cancellation • Instant confirmation
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}