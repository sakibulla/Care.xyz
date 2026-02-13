import { getSingleService } from "@/actions/server/service";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import BookingForm from "@/components/booking/BookingForm";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function BookingPage({ params }) {
  const { serviceId } = await params;
  
  console.log("📝 Booking page - Service ID:", serviceId);
  
  const session = await getServerSession(authOptions);

  // If not logged in, redirect to login with callback
  if (!session) {
    redirect(`/login?callbackUrl=/booking/${serviceId}`);
  }

  const service = await getSingleService(serviceId);
  
  if (!service) {
    console.log("❌ Service not found for booking:", serviceId);
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-6xl font-bold text-gray-300">404</h1>
          <h2 className="text-3xl font-semibold">Service Not Available</h2>
          <p className="text-gray-600">
            The service you're trying to book doesn't exist or has been removed.
          </p>
          <p className="text-sm text-gray-500">
            Service ID: <code className="bg-gray-100 px-2 py-1 rounded">{serviceId}</code>
          </p>
          <div className="flex gap-4 justify-center mt-6">
            <Link href="/services" className="btn btn-primary">
              Browse All Services
            </Link>
            <Link href="/" className="btn btn-outline">
              Go Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  console.log("✅ Service found for booking:", service.title);

  return (
    <div className="py-8">
      <div className="max-w-3xl mx-auto px-4">
        <BookingForm service={service} />
      </div>
    </div>
  );
}
