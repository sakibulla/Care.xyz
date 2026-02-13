"use client";
import Link from "next/link";
import { SocialButtons } from "./SocialButton";
import { useState } from "react";
import { postUser } from "@/actions/server/auth";
import { useRouter, useSearchParams } from "next/navigation";
import Swal from "sweetalert2";
import { AiOutlineLoading } from "react-icons/ai";

export const RegisterForm = () => {
  const params = useSearchParams();
  const router = useRouter();
  const callbackUrl = params.get("callbackUrl") || "/";

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    nid: "",
    contact: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await postUser(form);
      console.log("Full registration result:", JSON.stringify(result, null, 2));
      console.log("acknowledged value:", result?.acknowledged);
      console.log("acknowledged type:", typeof result?.acknowledged);

      // Show only success or failure based on acknowledged
      if (result?.acknowledged === true) {
        await Swal.fire({
          icon: "success",
          title: "Account Created!",
          text: "Your account has been created successfully.",
          confirmButtonColor: "#06b6d4",
        });
        router.push("/login");
      } else {
        await Swal.fire({
          icon: "error",
          title: "Oops!",
          text: result?.message || "Unable to create account. Please try again.",
          confirmButtonColor: "#ef4444",
        });
      }
    } catch (error) {
      console.error("Registration error:", error);
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Something went wrong.",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-pink-100 via-blue-100 to-yellow-100">
      {/* Loading overlay */}
      {loading && (
        <div className="flex opacity-80 inset-0 absolute z-20 glass w-full h-full justify-center items-center gap-4">
          <AiOutlineLoading size={50} className="animate-spin text-primary font-bold" />
          <h2 className="text-xl font-bold animate-pulse">Processing Registration</h2>
        </div>
      )}

      <div className="card w-full max-w-sm shadow-2xl bg-white border-2 border-primary/20">
        <div className="card-body">
          <h2 className="text-3xl font-bold text-center mb-2">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Join Us!
            </span>
          </h2>
          <p className="text-center text-gray-600 mb-4">Create your account today</p>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="input input-bordered w-full bg-gray-50 focus:ring-2 focus:ring-primary"
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input input-bordered w-full bg-gray-50 focus:ring-2 focus:ring-primary"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password (minimum 6 characters)"
              className="input input-bordered w-full bg-gray-50 focus:ring-2 focus:ring-primary"
              onChange={handleChange}
              minLength={6}
              required
            />
            <input
              type="text"
              name="nid"
              placeholder="NID Number (optional)"
              className="input input-bordered w-full bg-gray-50 focus:ring-2 focus:ring-primary"
              onChange={handleChange}
            />
            <input
              type="tel"
              name="contact"
              placeholder="Contact Number (optional)"
              className="input input-bordered w-full bg-gray-50 focus:ring-2 focus:ring-primary"
              onChange={handleChange}
            />

            <button
              disabled={loading}
              type="submit"
              className="btn btn-primary w-full shadow-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              Register
            </button>
          </form>

          <SocialButtons />

          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link href="/login" className="link link-primary font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
