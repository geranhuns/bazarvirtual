"use client";
import { MdOutlineShoppingCart } from "react-icons/md";
import { usePathname } from "next/navigation";
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
import { useRouter } from "next/navigation";

function Header() {
  const router = useRouter();

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
  function handleLogout() {
    localStorage.removeItem("jwtToken");
    localStorage.clear();

    setUser({ id: null, role: null });

    router.push("/login");
    setDropdownActive(false);
  }
  const handleDropdown = (e) => {
    setSelectedOption(e.target.value);
    setSearchCategory(e.target.value);
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

  return (
    <>
      <nav className="bg-raw-sienna-500 sticky h-16  left-0 right-0 top-0  z-50 drop-shadow-lg">
        <div className="h-full flex justify-between items-center mx-auto   lg:max-w-screen-xl  px-5 ">
          <div className="lg:w-80">
            <HeaderLogo />
          </div>

          {pathname !== "/login" &&
            pathname !== "/register" &&
            pathname !== "/" && <HeaderSearch />}
          <div className="lg:w-80   flex justify-end items-center ">
            {pathname !== "/login" && pathname !== "/register" && !user.id && (
              <>
                <div className="flex items-center gap-4">
                  <LandingMenu handleScroll={handleScroll} />
                  <div className=" lg:w-80">
                    <HeaderLogin userRole={user.role} />
                    <HeaderLoginHamburguer />
                  </div>
                </div>
              </>
            )}
            {user.id && pathname !== "/login" && pathname !== "/register" && (
              <>
                <button
                  className="rounded-full p-2  "
                  onClick={() => setDropdownActive(!dropdownActive)}
                >
                  {userProfilePicture ? (
                    <div className="h-9 w-9">
                      <img
                        src={userProfilePicture}
                        className="w-full h-full object-cover rounded-full"
                        alt="User Profile"
                      />
                    </div>
                  ) : (
                    <CgProfile className="w-full h-full bg-raw-sienna-200 text-raw-sienna-900 p-2 rounded-full text-xl" />
                  )}
                </button>
              </>
            )}
            {user.role === "cliente" && (
              <div className="p-2 text-raw-sienna-50 cursor-pointer">
                <a href="/carritoDeCompras">
                  <MdOutlineShoppingCart size={25} />
                </a>
              </div>
            )}
          </div>
        </div>
        <div className=" flex justify-between items-center mx-auto   lg:max-w-screen-xl     ">
          {dropdownActive && (
            <DropdownMenu
              id={user.id}
              setDropdownActive={setDropdownActive}
              role={user.role}
              handleLogout={handleLogout}
              handleDropdown={handleDropdown}
              dropdownActive={dropdownActive}
            />
          )}
        </div>
      </nav>
    </>
  );
}

export default Header;
