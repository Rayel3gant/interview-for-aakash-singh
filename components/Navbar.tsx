import Image from "next/image";
import React from "react";

export const Navbar = () => {
  return (
    <div className="py-6 w-full flex justify-center navbarShadow">
      <Image src="/Group.png" alt="logo" width={260} height={32} />
    </div>
  );
};
