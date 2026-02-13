"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FiUser, FiMail, FiPhone, FiCreditCard, FiSave, FiArrowLeft, FiEdit3 } from "react-icons/fi";
import Link from "next/link";
import Swal from "sweetalert2";

export default function ProfilePage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    nid: "",
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
    if (session?.user) {
      setFormData({
        name: session.user.name || "",
        email: session.user.email || "",
        contact: session.user.contact || "",
        nid: session.user.nid || "",
      });
    }
  }, [session, status, router]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Update the session with new data
        await update({
          user: {
            name: formData.name,
            contact: formData.contact,
            nid: formData.nid,
          },
        });

        // Force a small delay to ensure session is updated
        await new Promise(resolve => setTimeout(resolve, 500));

        Swal.fire({
          icon: "success",
          title: "Profile Updated!",
          text: "Your profile has been updated successfully.",
          confirmButtonColor: "#06b6d4",
          timer: 2000,
          showConfirmButton: false,
        });
        setIsEditing(false);
        
        // Reload the page to get fresh session data
        window.location.reload();
      } else {
        throw new Error(data.message || "Failed to update profile");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error.message || "Something went wrong. Please try again.",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="mt-4 text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-gray-600 hover:text-primary transition-colors mb-4 group"
        >
          <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              My Profile
            </h1>
            <p className="text-gray-600 mt-2">Manage your personal information</p>
          </div>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="btn btn-primary gap-2 shadow-lg hover:shadow-xl transition-all"
            >
              <FiEdit3 />
              Edit Profile
            </button>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 rounded-3xl p-8 shadow-xl border-2 border-white sticky top-24">
            <div className="flex flex-col items-center text-center">
              {/* Avatar */}
              <div className="relative mb-6">
                <div className="avatar placeholder">
                  <div className="bg-gradient-to-br from-primary via-secondary to-accent text-white rounded-full w-32 h-32 flex items-center justify-center shadow-2xl ring-4 ring-white">
                    <span className="text-5xl font-bold">
                      {session?.user?.name?.charAt(0).toUpperCase() || "U"}
                    </span>
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-lg">
                  {session?.user?.role === "admin" ? (
                    <div className="badge badge-secondary badge-sm">Admin</div>
                  ) : (
                    <div className="badge badge-primary badge-sm">User</div>
                  )}
                </div>
              </div>

              {/* User Info */}
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {session?.user?.name || "User"}
              </h2>
              <p className="text-sm text-gray-600 mb-4 break-all px-4">{session?.user?.email}</p>

              {/* Stats */}
              <div className="w-full mt-6 space-y-3">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 text-sm">Account Type</span>
                    <span className="font-bold text-primary capitalize">
                      {session?.user?.role || "User"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Details / Edit Form */}
        <div className="lg:col-span-2">
          {isEditing ? (
            /* Edit Mode */
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 shadow-xl border-2 border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Edit Information</h3>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="btn btn-ghost btn-sm"
                >
                  Cancel
                </button>
              </div>
              
              <div className="space-y-6">
                {/* Name */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold text-base flex items-center gap-2">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <FiUser className="text-primary" />
                      </div>
                      Full Name
                    </span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input input-bordered input-lg w-full focus:input-primary bg-gray-50"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                {/* Email (Read-only) */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold text-base flex items-center gap-2">
                      <div className="p-2 bg-secondary/10 rounded-lg">
                        <FiMail className="text-secondary" />
                      </div>
                      Email Address
                    </span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    className="input input-bordered input-lg w-full bg-gray-200 cursor-not-allowed"
                    disabled
                  />
                  <label className="label">
                    <span className="label-text-alt text-gray-500 flex items-center gap-1">
                      <span className="text-warning">⚠</span> Email cannot be changed for security reasons
                    </span>
                  </label>
                </div>

                {/* Contact */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold text-base flex items-center gap-2">
                      <div className="p-2 bg-accent/10 rounded-lg">
                        <FiPhone className="text-accent" />
                      </div>
                      Contact Number
                    </span>
                  </label>
                  <input
                    type="tel"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    className="input input-bordered input-lg w-full focus:input-primary bg-gray-50"
                    placeholder="+880 1XXX XXXXXX"
                  />
                  <label className="label">
                    <span className="label-text-alt text-gray-500">
                      Your contact number for booking confirmations
                    </span>
                  </label>
                </div>

                {/* NID */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold text-base flex items-center gap-2">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <FiCreditCard className="text-purple-600" />
                      </div>
                      National ID (NID)
                    </span>
                  </label>
                  <input
                    type="text"
                    name="nid"
                    value={formData.nid}
                    onChange={handleChange}
                    className="input input-bordered input-lg w-full focus:input-primary bg-gray-50"
                    placeholder="Enter your NID number"
                  />
                  <label className="label">
                    <span className="label-text-alt text-gray-500">
                      Required for identity verification
                    </span>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-8">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary btn-lg w-full gap-2 shadow-lg hover:shadow-xl transition-all"
                >
                  {loading ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Updating...
                    </>
                  ) : (
                    <>
                      <FiSave className="text-xl" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            /* View Mode */
            <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-gray-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Personal Information</h3>
              
              <div className="space-y-4">
                {/* Name */}
                <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl p-6 border-l-4 border-primary">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/20 rounded-xl">
                      <FiUser className="text-primary text-xl" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 mb-1">Full Name</p>
                      <p className="text-lg font-bold text-gray-800">{formData.name || "Not provided"}</p>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="bg-gradient-to-r from-secondary/5 to-secondary/10 rounded-2xl p-6 border-l-4 border-secondary">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-secondary/20 rounded-xl">
                      <FiMail className="text-secondary text-xl" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 mb-1">Email Address</p>
                      <p className="text-lg font-bold text-gray-800 break-all">{formData.email}</p>
                    </div>
                  </div>
                </div>

                {/* Contact */}
                <div className="bg-gradient-to-r from-accent/5 to-accent/10 rounded-2xl p-6 border-l-4 border-accent">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-accent/20 rounded-xl">
                      <FiPhone className="text-accent text-xl" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 mb-1">Contact Number</p>
                      <p className="text-lg font-bold text-gray-800">
                        {formData.contact || <span className="text-gray-400 font-normal">Not provided</span>}
                      </p>
                    </div>
                  </div>
                </div>

                {/* NID */}
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-2xl p-6 border-l-4 border-purple-600">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-purple-200 rounded-xl">
                      <FiCreditCard className="text-purple-600 text-xl" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 mb-1">National ID (NID)</p>
                      <p className="text-lg font-bold text-gray-800">
                        {formData.nid || <span className="text-gray-400 font-normal">Not provided</span>}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
