"use client";

import { usePathname } from "next/navigation";
import HeaderBazar from "../promotorBazar/headerBazar";
import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import HeaderLogin from "./HeaderLogin/HeaderLogin";
import HeaderSearch from "./HeaderSearch/HeaderSearch";
import HeaderLogo from "./HeaderLogo/HeaderLogo";
import DropdownMenu from "./DropdownMenu/DropdownMenu";

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
          <HeaderLogo />
          {pathname === "/" && (
            <div className="md:flex items-center cursor-pointer hidden">
              <ul className="flex flex-row items-center mr-10 gap-4 text-base text-color-text">
                <li
                  className="flex items-center justify-center  hover:bg-raw-sienna-200 h-10 w-24 rounded-xl hover:text-color-btnUnete "
                  onClick={() => handleScroll("section3")}
                >
                  Acerca de
                </li>
                <li
                  className="flex items-center justify-center  hover:bg-raw-sienna-200 h-10 w-24 rounded-xl hover:text-color-btnUnete "
                  onClick={() => handleScroll("section4")}
                >
                  Marcas
                </li>
                <li
                  className="flex items-center justify-center  hover:bg-raw-sienna-200 h-10 w-24 rounded-xl hover:text-color-btnUnete "
                  onClick={() => handleScroll("section2")}
                >
                  Bazares
                </li>
              </ul>
            </div>
          )}
          {pathname !== "/login" &&
            pathname !== "/register" &&
            pathname !== "/" && <HeaderSearch />}
          {pathname !== "/login" && pathname !== "/register" && !token && (
            <HeaderLogin />
          )}
          {pathname !== "/login" && pathname !== "/register" && token && (
            <button
              className="rounded-full p-2 bg-raw-sienna-200  "
              onClick={() => setDropdownActive(!dropdownActive)}
            >
              <CgProfile className="w-full h-full bg-raw-sienna-200 text-raw-sienna-900" />
            </button>
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
