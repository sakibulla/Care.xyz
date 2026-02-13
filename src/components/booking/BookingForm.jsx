"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const BD_DIVISIONS = [
  "Dhaka", "Chittagong", "Rajshahi", "Khulna", "Barisal", "Sylhet", "Rangpur", "Mymensingh"
];

export default function BookingForm({ service }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [durationType, setDurationType] = useState("hour");
  const [duration, setDuration] = useState(1);
  const [location, setLocation] = useState({ 
    division: "", 
    district: "", 
    city: "", 
    area: "", 
    address: "" 
  });
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  // Debug: Log service data
  console.log("🎯 BookingForm received service:", {
    _id: service._id,
    _idType: typeof service._id,
    _idLength: service._id?.length,
    title: service.title,
    slug: service.slug,
    charge_per_hour: service.charge_per_hour,
    charge_per_day: service.charge_per_day
  });

  useEffect(() => {
    const rate = durationType === "day" ? service.charge_per_day : service.charge_per_hour;
    setTotal(Number(rate) * Number(duration || 0));
  }, [durationType, duration, service]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocation((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!session?.user?.email) {
      router.push(`/login?callbackUrl=/booking/${service._id}`);
      return;
    }

    // Validation
    if (!location.division || !location.district || !location.address) {
      Swal.fire("Missing Information", "Please fill in Division, District, and Address", "warning");
      return;
    }

    setLoading(true);
    
    const payload = {
      serviceId: service._id,
      durationType,
      duration: Number(duration),
      location,
      userEmail: session.user.email,
      userName: session.user.name || "",
      contact: session.user.contact || "",
    };
    
    console.log("📤 Sending booking request:", {
      serviceId: payload.serviceId,
      serviceIdType: typeof payload.serviceId,
      serviceIdLength: payload.serviceId?.length,
      duration: payload.duration,
      durationType: payload.durationType,
      total: total
    });
    
    try {
      const res = await fetch(`/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      
      console.log("📥 Booking response:", json);
      
      if (json?.success) {
        Swal.fire("Success", "Booking confirmed! Check your email for invoice.", "success");
        router.push('/my-bookings');
      } else {
        Swal.fire("Error", json?.message || 'Booking failed', "error");
      }
    } catch (error) {
      console.error("❌ Booking request failed:", error);
      Swal.fire("Error", "Something went wrong. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-base-100 shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-6">Book {service.title}</h2>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="label">
            <span className="label-text font-semibold">Duration Type</span>
          </label>
          <select 
            value={durationType} 
            onChange={(e) => setDurationType(e.target.value)} 
            className="select select-bordered w-full"
          >
            <option value="hour">Hourly (${service.charge_per_hour}/hour)</option>
            <option value="day">Daily (${service.charge_per_day}/day)</option>
          </select>
        </div>

        <div>
          <label className="label">
            <span className="label-text font-semibold">Duration</span>
          </label>
          <input 
            type="number" 
            min={1} 
            value={duration} 
            onChange={(e) => setDuration(e.target.value)} 
            className="input input-bordered w-full" 
            required
          />
        </div>
      </div>

      <div className="divider">Location Details</div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="label">
            <span className="label-text font-semibold">Division *</span>
          </label>
          <select 
            name="division" 
            value={location.division} 
            onChange={handleChange} 
            className="select select-bordered w-full"
            required
          >
            <option value="">Select Division</option>
            {BD_DIVISIONS.map(div => (
              <option key={div} value={div}>{div}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="label">
            <span className="label-text font-semibold">District *</span>
          </label>
          <input 
            name="district" 
            value={location.district} 
            onChange={handleChange} 
            className="input input-bordered w-full" 
            placeholder="e.g., Dhaka"
            required
          />
        </div>

        <div>
          <label className="label">
            <span className="label-text font-semibold">City</span>
          </label>
          <input 
            name="city" 
            value={location.city} 
            onChange={handleChange} 
            className="input input-bordered w-full" 
            placeholder="e.g., Dhaka City"
          />
        </div>

        <div>
          <label className="label">
            <span className="label-text font-semibold">Area</span>
          </label>
          <input 
            name="area" 
            value={location.area} 
            onChange={handleChange} 
            className="input input-bordered w-full" 
            placeholder="e.g., Gulshan"
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="label">
          <span className="label-text font-semibold">Full Address *</span>
        </label>
        <textarea 
          name="address" 
          value={location.address} 
          onChange={handleChange} 
          className="textarea textarea-bordered w-full" 
          placeholder="House/Flat number, Road, Block..."
          rows={3}
          required
        />
      </div>

      <div className="mt-6 p-4 bg-primary/10 rounded-lg">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">Total Cost:</span>
          <span className="text-2xl font-bold text-primary">${total}</span>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          {duration} {durationType}(s) × ${durationType === "day" ? service.charge_per_day : service.charge_per_hour}
        </p>
      </div>

      <button 
        type="submit" 
        className="btn btn-primary mt-6 w-full text-lg" 
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Confirm Booking'}
      </button>
    </form>
  );
}
