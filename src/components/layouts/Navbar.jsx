import React from "react";
import Logo from "./Logo";
import Link from "next/link";
import NavLink from "../buttons/NavLink";
import AuthButtons from "../buttons/AuthButtons";

const Navbar = () => {
  const nav = (
    <>
      <li>
        <Link href={"/"} className="hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200 font-medium">
          Home
        </Link>
      </li>
      <li>
        <NavLink href={"/services"}>Services</NavLink>
      </li>
      <li>
        <NavLink href={"/my-bookings"}>My Bookings</NavLink>
      </li>
      <li>
        <NavLink href={"/blog"}>Blog</NavLink>
      </li>
      <li>
        <NavLink href={"/contact"}>Contact</NavLink>
      </li>
    </>
  );
  return (
      <nav className="navbar bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200/50 px-2 md:px-6 py-3 transition-all duration-300">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden hover:bg-primary/10 rounded-xl p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-white/95 backdrop-blur-xl rounded-2xl z-[1] mt-3 w-64 p-4 shadow-2xl border border-gray-200"
            >
              {nav}
            </ul>
          </div>
          <div className="lg:block">
            <Logo></Logo>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-1 font-medium text-gray-700">{nav}</ul>
        </div>
        <div className="navbar-end flex items-center gap-2">
          <AuthButtons></AuthButtons>
        </div>
      </nav>
  );
};

export default Navbar;
