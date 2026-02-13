import Link from "next/link";

export default function ServiceNotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-bold text-gray-300">404</h1>
        <h2 className="text-3xl font-semibold">Service Not Found</h2>
        <p className="text-gray-600">
          The service you're looking for doesn't exist or has been removed.
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
