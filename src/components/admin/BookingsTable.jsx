"use client";

import { useState } from "react";
import Swal from "sweetalert2";

export default function BookingsTable({ bookings: initialBookings }) {
  const [bookings, setBookings] = useState(initialBookings);
  const [loading, setLoading] = useState(null);

  const updateStatus = async (bookingId, newStatus) => {
    setLoading(bookingId);
    
    try {
      const res = await fetch("/api/admin/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId, status: newStatus }),
      });

      const data = await res.json();

      if (data.success) {
        setBookings(bookings.map(b => 
          b._id === bookingId ? { ...b, status: newStatus } : b
        ));
        Swal.fire("Success", `Booking ${newStatus.toLowerCase()}`, "success");
      } else {
        Swal.fire("Error", data.message || "Failed to update", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Something went wrong", "error");
    } finally {
      setLoading(null);
    }
  };

  const viewDetails = (booking) => {
    Swal.fire({
      title: booking.serviceTitle,
      html: `
        <div class="text-left space-y-2">
          <p><strong>User:</strong> ${booking.userName || booking.userEmail}</p>
          <p><strong>Email:</strong> ${booking.userEmail}</p>
          <p><strong>Contact:</strong> ${booking.contact || "N/A"}</p>
          <p><strong>Duration:</strong> ${booking.duration} ${booking.durationType}(s)</p>
          <p><strong>Rate:</strong> $${booking.rate}/${booking.durationType}</p>
          <p><strong>Total:</strong> $${booking.total}</p>
          <p><strong>Location:</strong></p>
          <ul class="ml-4">
            <li>Division: ${booking.location?.division || "N/A"}</li>
            <li>District: ${booking.location?.district || "N/A"}</li>
            <li>City: ${booking.location?.city || "N/A"}</li>
            <li>Area: ${booking.location?.area || "N/A"}</li>
            <li>Address: ${booking.location?.address || "N/A"}</li>
          </ul>
          <p><strong>Booked:</strong> ${new Date(booking.createdAt).toLocaleString()}</p>
        </div>
      `,
      width: 600,
      confirmButtonText: "Close",
    });
  };

  if (bookings.length === 0) {
    return <p className="text-gray-500 text-center py-8">No bookings found</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>ID</th>
            <th>Service</th>
            <th>User</th>
            <th>Duration</th>
            <th>Total</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td className="font-mono text-xs">{booking._id.slice(-6)}</td>
              <td>{booking.serviceTitle}</td>
              <td>
                <div className="text-sm">
                  <div className="font-semibold">{booking.userName || "N/A"}</div>
                  <div className="text-gray-500 text-xs">{booking.userEmail}</div>
                </div>
              </td>
              <td>{booking.duration} {booking.durationType}(s)</td>
              <td className="font-bold text-primary">${booking.total}</td>
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
              <td className="text-sm">{new Date(booking.createdAt).toLocaleDateString()}</td>
              <td>
                <div className="dropdown dropdown-end">
                  <label tabIndex={0} className="btn btn-sm btn-ghost">
                    Actions
                  </label>
                  <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li>
                      <button onClick={() => viewDetails(booking)}>
                        View Details
                      </button>
                    </li>
                    {booking.status === "Pending" && (
                      <>
                        <li>
                          <button 
                            onClick={() => updateStatus(booking._id, "Confirmed")}
                            disabled={loading === booking._id}
                          >
                            Confirm
                          </button>
                        </li>
                        <li>
                          <button 
                            onClick={() => updateStatus(booking._id, "Cancelled")}
                            disabled={loading === booking._id}
                          >
                            Cancel
                          </button>
                        </li>
                      </>
                    )}
                    {booking.status === "Confirmed" && (
                      <li>
                        <button 
                          onClick={() => updateStatus(booking._id, "Completed")}
                          disabled={loading === booking._id}
                        >
                          Mark Completed
                        </button>
                      </li>
                    )}
                  </ul>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
