"use client";

import LogoTag from "../Logos/LogoTag";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function Footer() {
  const pathname = usePathname();
  return (
    <footer className="text-center w-full bg-raw-sienna-50 pb-10 pt-3 mt-auto justify-end text-sm md:text-base">
      {pathname !== "/login" && pathname !== "/register" && (
        <div className="footer-content">
          <div className="footer-logo flex justify-center">
            <LogoTag className={"w-20 md:w-24"} />
          </div>

          <div className="footer-links px-6">
            <ul className="flex  flex-wrap justify-center leading-3 gap-6 list-disc pt-6">
              <li>
                <a href="/">Acerca de</a>
              </li>
              <li>
                <a href="/bazares"> Bazares Afiliados</a>
              </li>
              <li>
                <a href="/marcas">Marcas Afiliadas</a>
              </li>
              <li>
                <a href="/register">Registra tu Bazar</a>
              </li>
              <li>
                <a href="/register">Registra tu Marca</a>
              </li>
            </ul>
          </div>
          <ul className="pt-8  flex justify-center gap-6 list-disc">
            <li>
              <Link href="/">Aviso de privacidad</Link>
            </li>
            <li>
              <Link href="/">Términos y condiciones</Link>
            </li>
          </ul>
        </div>
      )}
      <div className="footer-copyright pt-2">
        <p>Derechos de autor © 2024 Bazar Virtual - Consume Local</p>
      </div>
    </footer>
  );
}
