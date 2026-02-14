import React from "react";
import Logo from "./Logo";
import Link from "next/link";

const Footer = () => {
  return (
    <div>
      <div className="footer sm:footer-horizontal bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 text-white p-10 rounded-t-2xl shadow-2xl">
        <aside>
          <Logo></Logo>
          <p className="mt-2 text-gray-300">
            Care.xyz - Professional Caregiving Services
            <br />
            <span className="text-primary font-semibold">Trusted care for your loved ones since 2024</span>
          </p>
        </aside>
        <nav>
          <h6 className="footer-title text-accent">Services</h6>
          <Link href="/services" className="link link-hover hover:text-primary transition-colors">Baby Care</Link>
          <Link href="/services" className="link link-hover hover:text-primary transition-colors">Elderly Care</Link>
          <Link href="/services" className="link link-hover hover:text-primary transition-colors">Sick Care</Link>
          <Link href="/my-bookings" className="link link-hover hover:text-primary transition-colors">My Bookings</Link>
        </nav>
        <nav>
          <h6 className="footer-title text-accent">Company</h6>
          <Link href="/contact" className="link link-hover hover:text-secondary transition-colors">About us</Link>
          <Link href="/contact" className="link link-hover hover:text-secondary transition-colors">Contact</Link>
          <Link href="/blog" className="link link-hover hover:text-secondary transition-colors">Blog</Link>
        </nav>
        <nav>
          <h6 className="footer-title text-accent">Legal</h6>
          <a className="link link-hover hover:text-accent transition-colors">Terms of use</a>
          <a className="link link-hover hover:text-accent transition-colors">Privacy policy</a>
          <a className="link link-hover hover:text-accent transition-colors">Cookie policy</a>
        </nav>
      </div>
    </div>
  );
};

export default Footer;
