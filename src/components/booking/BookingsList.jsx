"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function BookingsList({ initial }) {
  const [items, setItems] = useState(initial || []);
  const router = useRouter();

  const handleCancel = async (id) => {
    const result = await Swal.fire({
      title: "Cancel Booking?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, cancel it",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`/api/bookings?id=${id}`, { method: "DELETE" });
      const json = await res.json();
      
      if (json.success) {
        setItems((s) => s.filter((b) => b._id !== id));
        Swal.fire("Cancelled", "Your booking has been cancelled", "success");
      } else {
        Swal.fire("Error", json.message || 'Cancel failed', "error");
      }
    } catch (error) {
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      Pending: "badge-warning",
      Confirmed: "badge-info",
      Completed: "badge-success",
      Cancelled: "badge-error",
    };
    return badges[status] || "badge-ghost";
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-12 bg-gradient-to-br from-pink-50 to-blue-50 rounded-2xl shadow-lg">
        <p className="text-gray-600 text-lg mb-2">No bookings yet</p>
        <p className="text-gray-500 mb-6">Start booking professional care services today!</p>
        <button 
          onClick={() => router.push('/services')} 
          className="btn btn-primary shadow-lg hover:shadow-xl hover:scale-105 transition-all"
        >
          Browse Services
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {items.map((b) => (
        <div key={b._id} className="card bg-gradient-to-br from-white to-pink-50 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-primary/20">
          <div className="card-body">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="card-title text-2xl text-primary">{b.serviceTitle}</h3>
                <div className="mt-4 space-y-2 bg-white/60 p-4 rounded-lg">
                  <p className="text-sm">
                    <span className="font-bold text-secondary">⏱️ Duration:</span> {b.duration} {b.durationType}(s)
                  </p>
                  <p className="text-sm">
                    <span className="font-bold text-secondary">💰 Rate:</span> ${b.rate}/{b.durationType}
                  </p>
                  <p className="text-sm">
                    <span className="font-bold text-secondary">💵 Total Cost:</span> 
                    <span className="text-primary font-bold text-xl ml-2">${b.total}</span>
                  </p>
                  {b.location && (
                    <p className="text-sm">
                      <span className="font-bold text-secondary">📍 Location:</span> {b.location.division}, {b.location.district}
                    </p>
                  )}
                  <p className="text-sm">
                    <span className="font-bold text-secondary">📅 Booked:</span> {new Date(b.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="mt-4">
                  <span className={`badge ${getStatusBadge(b.status)} badge-lg font-semibold shadow-md`}>
                    {b.status}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <button 
                  className="btn btn-outline btn-secondary btn-sm hover:scale-105 transition-all" 
                  onClick={() => router.push(`/services/${b.serviceId}`)}
                >
                  View Service
                </button>
                {b.status === "Pending" && (
                  <button 
                    className="btn btn-error btn-sm hover:scale-105 transition-all shadow-md" 
                    onClick={() => handleCancel(b._id)}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
