export default function Loading() {
  return (
    <div className="py-8 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">
          My <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">Bookings</span>
        </h1>
        <p className="text-gray-600">View and manage your care service bookings</p>
      </div>
      
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="card bg-base-100 shadow-xl animate-pulse">
            <div className="card-body">
              <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
