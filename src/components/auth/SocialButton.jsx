"use client";
import { signIn } from "next-auth/react";
import { useParams, useSearchParams } from "next/navigation";
import { FaGoogle } from "react-icons/fa";

export const SocialButtons = () => {
  const params = useSearchParams();

  const handleSignIn = async () => {
    try {
      const callbackUrl = params.get("callbackUrl") || "/";
      console.log("Attempting Google signin with callback:", callbackUrl);
      
      const result = await signIn("google", {
        callbackUrl,
        redirect: true,
      });
      
      console.log("Google signin result:", result);
    } catch (error) {
      console.error("Google signin error:", error);
    }
  };

  return (
    <div className="flex gap-3 mt-4">
      <button
        onClick={handleSignIn}
        className="btn btn-outline btn-error flex-1"
      >
        <FaGoogle className="text-lg" />
        Google
      </button>
    </div>
  );
};
