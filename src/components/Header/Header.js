"use client";

import { usePathname } from "next/navigation";
import HeaderBazar from "../promotorBazar/headerBazar";
import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import HeaderLogin from "./HeaderLogin/HeaderLogin";
import HeaderSearch from "./HeaderSearch/HeaderSearch";
import HeaderLogo from "./HeaderLogo/HeaderLogo";
import DropdownMenu from "./DropdownMenu/DropdownMenu";
import HeaderLoginHamburguer from "./HeaderLoginHamburguer/HeaderLoginHamburguer";
import LandingMenu from "./LandingMenu/LandingMenu";

function Header() {
  const [token, setToken] = useState(null);
  const [dropdownActive, setDropdownActive] = useState(false);

  const pathname = usePathname();
  const handleScroll = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      console.log("click en acerca de");
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("jwtToken");
      if (storedToken) {
        setToken(storedToken);
      }
    }
  }, [token]);
  return (
    <>
      {/* {pathname === "/promotorBazarView" && <HeaderBazar />}

      {pathname != "/promotorBazarView" && ( */}
      <nav className="bg-raw-sienna-500 sticky h-16  left-0 right-0 top-0 shadow-md z-50 ">
        <div className="h-full flex justify-between items-center mx-auto   lg:max-w-screen-xl  px-5 ">
          <div className="lg:w-80">
            <HeaderLogo />
          </div>

          {pathname !== "/login" &&
            pathname !== "/register" &&
            pathname !== "/" && <HeaderSearch />}
          {pathname !== "/login" && pathname !== "/register" && !token && (
            <>
              <div className="flex items-center gap-4">
                <LandingMenu handleScroll={handleScroll} />
                <div className=" lg:w-80">
                  <HeaderLogin />
                  <HeaderLoginHamburguer />
                </div>
              </div>
            </>
          )}
          {pathname !== "/login" && pathname !== "/register" && token && (
            <div className="lg:w-80 flex justify-end  ">
              <button
                className="rounded-full p-2 bg-raw-sienna-200  "
                onClick={() => setDropdownActive(!dropdownActive)}
              >
                <CgProfile className="w-full h-full bg-raw-sienna-200 text-raw-sienna-900" />
              </button>
            </div>
          )}
        </div>
        {dropdownActive && (
          <DropdownMenu
            token={token}
            setDropdownActive={setDropdownActive}
            setToken={setToken}
          />
        )}
      </nav>
      {/* )} */}
    </>
  );
}

export default Header;
