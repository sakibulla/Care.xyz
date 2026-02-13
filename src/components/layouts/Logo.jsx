import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href={"/"} className="flex items-center gap-2">
      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
        <span className="text-white font-bold text-xl">C</span>
      </div>
      <h2 className="text-xl font-bold">
        Care<span className="text-primary">.xyz</span>
      </h2>
    </Link>
  );
};

export default Logo;
