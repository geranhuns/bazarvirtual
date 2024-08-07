"use client";

import { usePathname } from "next/navigation";

export default function LandingMenu({ handleScroll }) {
  const pathname = usePathname();

  return (
    <>
      {pathname === "/" && (
        <div className="md:flex items-center cursor-pointer hidden ">
          <ul className="flex flex-row items-center  gap-8 text-lg text-color-text">
            <li
              className="flex items-center justify-center  hover:bg-raw-sienna-200  h-16 w-32  hover:text-color-btnUnete "
              onClick={() => handleScroll("section3")}
            >
              Nosotros
            </li>
            <li
              className="flex items-center justify-center  hover:bg-raw-sienna-200 h-16 w-32  hover:text-color-btnUnete "
              onClick={() => handleScroll("section4")}
            >
              Emprendedores
            </li>
            <li
              className="flex items-center justify-center  hover:bg-raw-sienna-200 h-16 w-32  hover:text-color-btnUnete "
              onClick={() => handleScroll("section6")}
            >
              Testimonios
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
