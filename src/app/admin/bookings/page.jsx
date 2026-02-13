import { requireAdmin } from "@/lib/adminAuth";
import { dbConnect, collections } from "@/lib/dbConnect";
import BookingsTable from "@/components/admin/BookingsTable";

export default async function AdminBookingsPage({ searchParams }) {
  await requireAdmin();

  const params = await searchParams;
  const statusFilter = params?.status || "all";

  const bookingsCollection = await dbConnect(collections.BOOKINGS);
  
  let query = {};
  if (statusFilter !== "all") {
    query.status = statusFilter;
  }

  const bookings = await bookingsCollection
    .find(query)
    .sort({ createdAt: -1 })
    .toArray();

  const mappedBookings = bookings.map(b => ({
    ...b,
    _id: b._id.toString(),
    serviceId: b.serviceId.toString(),
  }));

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Manage Bookings</h1>

      {/* Filter Tabs */}
      <div className="tabs tabs-boxed mb-6">
        <a 
          href="/admin/bookings?status=all" 
          className={`tab ${statusFilter === "all" ? "tab-active" : ""}`}
        >
          All
        </a>
        <a 
          href="/admin/bookings?status=Pending" 
          className={`tab ${statusFilter === "Pending" ? "tab-active" : ""}`}
        >
          Pending
        </a>
        <a 
          href="/admin/bookings?status=Confirmed" 
          className={`tab ${statusFilter === "Confirmed" ? "tab-active" : ""}`}
        >
          Confirmed
        </a>
        <a 
          href="/admin/bookings?status=Completed" 
          className={`tab ${statusFilter === "Completed" ? "tab-active" : ""}`}
        >
          Completed
        </a>
        <a 
          href="/admin/bookings?status=Cancelled" 
          className={`tab ${statusFilter === "Cancelled" ? "tab-active" : ""}`}
        >
          Cancelled
        </a>
      </div>

      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <BookingsTable bookings={mappedBookings} />
        </div>
      </div>
    </div>
  );
}
