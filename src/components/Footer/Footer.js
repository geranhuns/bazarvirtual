"use client";

import LogoTag from "../Logos/LogoTag";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function Footer() {
  const pathname = usePathname();
  return (
    <footer className="text-center w-full bg-raw-sienna-50 pb-10 pt-3 mt-auto justify-end">
      {pathname !== "/login" && pathname !== "/register" && (
        <div className="footer-content">
          <div className="footer-logo flex justify-center">
            <LogoTag width="100" />
          </div>

          <div className="footer-links px-6">
            <ul className="flex  flex-wrap justify-center gap-6 list-disc">
              <li>
                <a href="/landingPage">Acerca de</a>
              </li>
              <li>
                <a href="/bazares"> Bazares Asociados</a>
              </li>
              <li>
                <a href="/marcas">Marcas Asociadas</a>
              </li>
              <li>
                <a href="/register">Registra tu Bazar</a>
              </li>
              <li>
                <a href="/register">Registra tu Marca</a>
              </li>
            </ul>
          </div>
          <ul className="pt-2 flex justify-center gap-6 list-disc">
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
