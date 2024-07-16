"use client";
import { useState, useEffect } from "react";
import LogoH from "@/components/Logos/LogoH";
import LogoTag from "@/components/Logos/LogoTag";

export default function HeaderLogo() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {!isSmallScreen && <LogoH />}
      {isSmallScreen && <LogoTag width={"50px"} />}
    </>
  );
}
