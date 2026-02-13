"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { FiLogOut, FiLogIn, FiUser, FiSettings, FiChevronDown } from "react-icons/fi";
import { FaUserShield } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";

const AuthButtons = () => {
  const { data: session, status } = useSession();
  const isAdmin = session?.user?.role === "admin";

  return (
    <div className="flex items-center gap-2">
      {status === "authenticated" ? (
        <div className="dropdown dropdown-end">
          <div 
            tabIndex={0} 
            role="button" 
            className="btn btn-sm bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white border-none rounded-full px-5 shadow-md hover:shadow-lg transition-all duration-200 gap-2"
          >
            <div className="avatar placeholder">
              <div className="bg-white/20 text-white rounded-full w-6 h-6 flex items-center justify-center">
                <FiUser className="text-sm" />
              </div>
            </div>
            <span className="hidden md:inline font-medium max-w-[100px] truncate">
              {session?.user?.name?.split(' ')[0] || 'User'}
            </span>
            <FiChevronDown className="text-sm" />
          </div>
          <ul 
            tabIndex={0} 
            className="dropdown-content menu bg-white/95 backdrop-blur-xl rounded-2xl z-[1] w-64 p-3 shadow-2xl border border-gray-200 mt-3"
          >
            {/* User Info Header */}
            <li className="menu-title px-4 py-3 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="avatar placeholder">
                  <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-full w-10 h-10 flex items-center justify-center">
                    <span className="text-lg font-bold">
                      {session?.user?.name?.charAt(0).toUpperCase() || 'U'}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-gray-800 text-sm">
                    {session?.user?.name || 'User'}
                  </span>
                  <span className="text-xs text-gray-500 truncate max-w-[150px]">
                    {session?.user?.email}
                  </span>
                </div>
              </div>
            </li>

            {/* Admin Panel - Only show for admins */}
            {isAdmin && (
              <li>
                <Link 
                  href="/admin" 
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 rounded-xl transition-all duration-200 group"
                >
                  <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-2 rounded-lg group-hover:scale-110 transition-transform">
                    <FaUserShield className="text-white text-sm" />
                  </div>
                  <div className="flex flex-col flex-1">
                    <span className="font-semibold text-gray-800">Admin Panel</span>
                    <span className="text-xs text-gray-500">Manage your platform</span>
                  </div>
                  <HiSparkles className="text-yellow-500" />
                </Link>
              </li>
            )}

            {/* Edit Profile */}
            <li>
              <Link 
                href="/profile" 
                className="flex items-center gap-3 px-4 py-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 rounded-xl transition-all duration-200 group"
              >
                <div className="bg-gradient-to-r from-blue-500 to-cyan-600 p-2 rounded-lg group-hover:scale-110 transition-transform">
                  <FiSettings className="text-white text-sm" />
                </div>
                <div className="flex flex-col flex-1">
                  <span className="font-semibold text-gray-800">Edit Profile</span>
                  <span className="text-xs text-gray-500">Update your information</span>
                </div>
              </Link>
            </li>

            {/* Divider */}
            <div className="divider my-1"></div>

            {/* Logout */}
            <li>
              <button 
                onClick={() => signOut()} 
                className="flex items-center gap-3 px-4 py-3 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 rounded-xl transition-all duration-200 group text-red-600"
              >
                <div className="bg-gradient-to-r from-red-500 to-red-600 p-2 rounded-lg group-hover:scale-110 transition-transform">
                  <FiLogOut className="text-white text-sm" />
                </div>
                <div className="flex flex-col flex-1">
                  <span className="font-semibold">Logout</span>
                  <span className="text-xs text-gray-500">Sign out of your account</span>
                </div>
              </button>
            </li>
          </ul>
        </div>
      ) : (
        <Link href={"/login"}>
          <button className="btn btn-sm bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white border-none rounded-full px-6 shadow-md hover:shadow-lg transition-all duration-200 gap-2">
            <FiLogIn className="text-lg" />
            Login
          </button>
        </Link>
      )}
    </div>
  );
};

export default AuthButtons;
