"use client";

import { usePathname } from "next/navigation";

export default function LandingMenu({ handleScroll }) {
  const pathname = usePathname();

  return (
    <>
      {pathname === "/" && (
        <div className="md:flex items-center cursor-pointer hidden ">
          <ul className="flex flex-row items-center  gap-4 text-lg text-color-text">
            <li
              className="flex items-center justify-center  hover:bg-raw-sienna-200  h-16 w-24  hover:text-color-btnUnete "
              onClick={() => handleScroll("section3")}
            >
              Acerca de
            </li>
            <li
              className="flex items-center justify-center  hover:bg-raw-sienna-200 h-16 w-24  hover:text-color-btnUnete "
              onClick={() => handleScroll("section4")}
            >
              Marcas
            </li>
            <li
              className="flex items-center justify-center  hover:bg-raw-sienna-200 h-16 w-24  hover:text-color-btnUnete "
              onClick={() => handleScroll("section2")}
            >
              Bazares
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
