"use client";
import Link from "next/link";
import { SocialButtons } from "./SocialButton";
import { signIn } from "next-auth/react";
import Swal from "sweetalert2";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";

const LoginForm = () => {
  const params = useSearchParams();
  const router = useRouter();
  const callback = params.get("callbackUrl") || "/";
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password, callback);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: params.get("callbackUrl") || "/",
    });

    if (!result.ok) {
      Swal.fire(
        "error",
        "Email password not Matched . Try Google Login / Register",
        "error"
      );
    } else {
      Swal.fire("success", "Welcome to Kidz Hub", "success");
      router.push(callback);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-pink-100 via-blue-100 to-yellow-100">
      <div
        className={` ${
          loading ? " flex opacity-80 inset-0 absolute" : "hidden"
        }  z-20 glass w-full  h-full  justify-center items-center gap-4`}
      >
        <AiOutlineLoading
          size={50}
          className="animate-spin text-primary font-bold"
        />
        <h2 className={`text-xl font-bold animate-pulse`}>
          {" "}
          Processing Login{" "}
        </h2>
      </div>
      <div className="card w-full max-w-sm shadow-2xl bg-white border-2 border-primary/20">
        <div className="card-body">
          <h2 className="text-3xl font-bold text-center mb-2">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">Welcome Back!</span>
          </h2>
          <p className="text-center text-gray-600 mb-4">Login to access your account</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input input-bordered w-full bg-gray-50 focus:ring-2 focus:ring-primary"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="input input-bordered w-full bg-gray-50 focus:ring-2 focus:ring-primary"
              required
            />

            <button
              disabled={loading}
              type="submit"
              className="btn btn-primary w-full shadow-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              Login
            </button>
          </form>

          <SocialButtons />

          <p className="text-center text-sm mt-4">
            Don't have an account?{" "}
            <Link
              href={`/register?callbackUrl=${callback}`}
              className="link link-primary font-semibold"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default LoginForm;
