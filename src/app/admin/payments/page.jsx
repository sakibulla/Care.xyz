import { requireAdmin } from "@/lib/adminAuth";
import { dbConnect, collections } from "@/lib/dbConnect";
import { FaDollarSign, FaCalendarAlt, FaChartLine } from "react-icons/fa";

export default async function AdminPaymentsPage() {
  await requireAdmin();

  const bookingsCollection = await dbConnect(collections.BOOKINGS);
  
  // Get all bookings (payments)
  const allBookings = await bookingsCollection
    .find()
    .sort({ createdAt: -1 })
    .toArray();

  // Calculate statistics
  const totalRevenue = allBookings.reduce((sum, b) => sum + (b.total || 0), 0);
  const completedBookings = allBookings.filter(b => b.status === "Completed");
  const completedRevenue = completedBookings.reduce((sum, b) => sum + (b.total || 0), 0);
  const pendingRevenue = allBookings
    .filter(b => b.status === "Pending" || b.status === "Confirmed")
    .reduce((sum, b) => sum + (b.total || 0), 0);

  // Group by month
  const revenueByMonth = {};
  allBookings.forEach(booking => {
    const date = new Date(booking.createdAt);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    if (!revenueByMonth[monthKey]) {
      revenueByMonth[monthKey] = 0;
    }
    revenueByMonth[monthKey] += booking.total || 0;
  });

  const stats = [
    {
      title: "Total Revenue",
      value: `$${totalRevenue.toFixed(2)}`,
      icon: <FaDollarSign className="text-3xl" />,
      color: "bg-green-500",
    },
    {
      title: "Completed Revenue",
      value: `$${completedRevenue.toFixed(2)}`,
      icon: <FaChartLine className="text-3xl" />,
      color: "bg-blue-500",
    },
    {
      title: "Pending Revenue",
      value: `$${pendingRevenue.toFixed(2)}`,
      icon: <FaCalendarAlt className="text-3xl" />,
      color: "bg-yellow-500",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Payment History</h1>

      {/* Statistics */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className={`card ${stat.color} text-white shadow-lg`}>
            <div className="card-body">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm opacity-90">{stat.title}</p>
                  <h2 className="text-3xl font-bold mt-2">{stat.value}</h2>
                </div>
                <div className="opacity-80">{stat.icon}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Monthly Revenue */}
      <div className="card bg-base-100 shadow-lg mb-8">
        <div className="card-body">
          <h2 className="card-title mb-4">Revenue by Month</h2>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Revenue</th>
                  <th>Bookings</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(revenueByMonth)
                  .sort((a, b) => b[0].localeCompare(a[0]))
                  .map(([month, revenue]) => {
                    const bookingsInMonth = allBookings.filter(b => {
                      const date = new Date(b.createdAt);
                      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
                      return monthKey === month;
                    }).length;

                    return (
                      <tr key={month}>
                        <td className="font-semibold">{month}</td>
                        <td className="text-primary font-bold">${revenue.toFixed(2)}</td>
                        <td>{bookingsInMonth}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* All Transactions */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h2 className="card-title mb-4">All Transactions</h2>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Transaction ID</th>
                  <th>Service</th>
                  <th>User</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {allBookings.map((booking) => (
                  <tr key={booking._id.toString()}>
                    <td className="font-mono text-xs">
                      {booking._id.toString().slice(-8)}
                    </td>
                    <td>{booking.serviceTitle}</td>
                    <td>
                      <div className="text-sm">
                        <div className="font-semibold">{booking.userName || "N/A"}</div>
                        <div className="text-gray-500 text-xs">{booking.userEmail}</div>
                      </div>
                    </td>
                    <td className="font-bold text-primary">${booking.total}</td>
                    <td>
                      <span className={`badge ${
                        booking.status === "Completed" ? "badge-success" :
                        booking.status === "Confirmed" ? "badge-info" :
                        booking.status === "Pending" ? "badge-warning" :
                        "badge-error"
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="text-sm">
                      {new Date(booking.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
