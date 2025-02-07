"use client";

import React, { useEffect, useState } from "react";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import Sale from "../Sale/Sale";

const Header = () => {
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkScreenSize(); 
    window.addEventListener("resize", checkScreenSize); 

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <header className="w-full shadow-lg bg-white">
      <Sale />
      {isDesktop ? <DesktopNavbar /> : <MobileNavbar />}
    </header>
  );
};

export default Header;
