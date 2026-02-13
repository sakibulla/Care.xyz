"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { FaUserShield } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";

const AdminLink = () => {
  const { data: session } = useSession();

  // Only show for admin users
  if (session?.user?.role !== "admin") {
    return null;
  }

  return (
    <Link 
      href="/admin" 
      className="btn btn-sm bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white border-none rounded-full px-5 shadow-md hover:shadow-lg transition-all duration-200 gap-2 group"
    >
      <FaUserShield className="text-lg group-hover:scale-110 transition-transform" />
      <span className="hidden lg:inline font-medium">Admin Panel</span>
      <HiSparkles className="text-yellow-300 text-xs" />
    </Link>
  );
};

export default AdminLink;
