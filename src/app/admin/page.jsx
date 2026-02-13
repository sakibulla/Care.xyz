import { requireAdmin } from "@/lib/adminAuth";
import Link from "next/link";
import { FaUsers, FaCalendarCheck, FaDollarSign, FaCog } from "react-icons/fa";
import { dbConnect, collections } from "@/lib/dbConnect";

export default async function AdminDashboard() {
  await requireAdmin();

  // Fetch statistics
  const bookingsCollection = await dbConnect(collections.BOOKINGS);
  const usersCollection = await dbConnect(collections.USERS);
  
  const totalBookings = await bookingsCollection.countDocuments();
  const pendingBookings = await bookingsCollection.countDocuments({ status: "Pending" });
  const confirmedBookings = await bookingsCollection.countDocuments({ status: "Confirmed" });
  const totalUsers = await usersCollection.countDocuments();
  
  // Calculate total revenue
  const allBookings = await bookingsCollection.find().toArray();
  const totalRevenue = allBookings.reduce((sum, booking) => sum + (booking.total || 0), 0);

  const stats = [
    {
      title: "Total Bookings",
      value: totalBookings,
      icon: <FaCalendarCheck className="text-4xl" />,
      color: "bg-blue-500",
      link: "/admin/bookings"
    },
    {
      title: "Pending Bookings",
      value: pendingBookings,
      icon: <FaCalendarCheck className="text-4xl" />,
      color: "bg-yellow-500",
      link: "/admin/bookings?status=Pending"
    },
    {
      title: "Total Revenue",
      value: `$${totalRevenue.toFixed(2)}`,
      icon: <FaDollarSign className="text-4xl" />,
      color: "bg-green-500",
      link: "/admin/payments"
    },
    {
      title: "Total Users",
      value: totalUsers,
      icon: <FaUsers className="text-4xl" />,
      color: "bg-purple-500",
      link: "/admin/users"
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
        <Link href="/admin/settings" className="btn btn-outline gap-2">
          <FaCog />
          Settings
        </Link>
      </div>

      {/* Statistics Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Link key={index} href={stat.link}>
            <div className={`card ${stat.color} text-white shadow-lg hover:shadow-xl transition-shadow cursor-pointer`}>
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
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6">
        <Link href="/admin/bookings" className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
          <div className="card-body">
            <h3 className="card-title">Manage Bookings</h3>
            <p className="text-gray-600">View and update booking status</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary btn-sm">View All</button>
            </div>
          </div>
        </Link>

        <Link href="/admin/payments" className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
          <div className="card-body">
            <h3 className="card-title">Payment History</h3>
            <p className="text-gray-600">Track all transactions and revenue</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary btn-sm">View All</button>
            </div>
          </div>
        </Link>

        <Link href="/admin/users" className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
          <div className="card-body">
            <h3 className="card-title">User Management</h3>
            <p className="text-gray-600">Manage users and permissions</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary btn-sm">View All</button>
            </div>
          </div>
        </Link>
      </div>

      {/* Recent Bookings */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Recent Bookings</h2>
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <RecentBookingsTable />
          </div>
        </div>
      </div>
    </div>
  );
}

async function RecentBookingsTable() {
  const bookingsCollection = await dbConnect(collections.BOOKINGS);
  const recentBookings = await bookingsCollection
    .find()
    .sort({ createdAt: -1 })
    .limit(5)
    .toArray();

  if (recentBookings.length === 0) {
    return <p className="text-gray-500">No bookings yet</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>Service</th>
            <th>User</th>
            <th>Duration</th>
            <th>Total</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {recentBookings.map((booking) => (
            <tr key={booking._id.toString()}>
              <td>{booking.serviceTitle}</td>
              <td>{booking.userName || booking.userEmail}</td>
              <td>{booking.duration} {booking.durationType}(s)</td>
              <td className="font-bold">${booking.total}</td>
              <td>
                <span className={`badge ${
                  booking.status === "Pending" ? "badge-warning" :
                  booking.status === "Confirmed" ? "badge-info" :
                  booking.status === "Completed" ? "badge-success" :
                  "badge-error"
                }`}>
                  {booking.status}
                </span>
              </td>
              <td>{new Date(booking.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
