"use client";

import { usePathname } from "next/navigation";
import HeaderBazar from "../promotorBazar/HeaderBazar";
import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import HeaderLogin from "./HeaderLogin/HeaderLogin";
import HeaderSearch from "./HeaderSearch/HeaderSearch";
import HeaderLogo from "./HeaderLogo/HeaderLogo";
import DropdownMenu from "./DropdownMenu/DropdownMenu";
import HeaderLoginHamburguer from "./HeaderLoginHamburguer/HeaderLoginHamburguer";
import LandingMenu from "./LandingMenu/LandingMenu";
import { useUserContext } from "../UserContext/UserContext";
import { jwtDecode } from "jwt-decode";
import { getUserById } from "@/api/users/routes";
import { getBrandById } from "@/api/marcas/routes";
import { getBazarById } from "@/api/bazar/routes";
function Header() {
  // const [token, setToken] = useState(null);
  const [userProfilePicture, setUserProfilePicture] = useState(null);
  const { user, setUser } = useUserContext();
  const [dropdownActive, setDropdownActive] = useState(false);

  const pathname = usePathname();

  const handleScroll = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("jwtToken");
      if (storedToken) {
        try {
          const decodedUser = jwtDecode(storedToken);
          setUser({ id: decodedUser._id, role: decodedUser.role });
        } catch (error) {
          console.error("Error decoding token:", error);
          setUser({ id: null, role: null });
        }
      }
    }
  }, [setUser]);

  useEffect(() => {
    const fetchUserProfilePicture = async () => {
      try {
        let userData;
        if (user.id) {
          switch (user.role) {
            case "cliente":
              userData = await getUserById(user.id);
              break;
            case "marca":
              userData = await getBrandById(user.id);
              break;
            case "bazar":
              userData = await getBazarById(user.id);
              break;
            default:
              userData = null;
          }
          if (userData && userData.data.profilePicture) {
            setUserProfilePicture(userData.data.profilePicture);
          } else {
            setUserProfilePicture(null); // Para mostrar el ícono si no hay imagen
          }
        }
      } catch (error) {
        console.error("Error fetching user profile picture:", error);
      }
    };

    if (user.id) {
      fetchUserProfilePicture();
    }
  }, [user]);

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const storedToken = localStorage.getItem("jwtToken");
  //     if (storedToken) {
  //       setToken(storedToken);
  //     }
  //   }
  // }, [token]);
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
          {pathname !== "/login" && pathname !== "/register" && !user.id && (
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
          {pathname !== "/login" && pathname !== "/register" && user.id && (
            <div className="lg:w-80 w-40 flex justify-end  ">
              <button
                className="rounded-full p-2  "
                onClick={() => setDropdownActive(!dropdownActive)}
              >
                {userProfilePicture ? (
                  <img
                    src={userProfilePicture}
                    className="h-9 w-9 object-contain rounded-full"
                    alt="User Profile"
                  />
                ) : (
                  <CgProfile className="w-full h-full bg-raw-sienna-200 text-raw-sienna-900 p-2 rounded-full text-xl" />
                )}
              </button>
            </div>
          )}
        </div>
        {dropdownActive && (
          <DropdownMenu
            id={user.id}
            setDropdownActive={setDropdownActive}
            role={user.role}
          />
        )}
      </nav>
      {/* )} */}
    </>
  );
}

export default Header;
