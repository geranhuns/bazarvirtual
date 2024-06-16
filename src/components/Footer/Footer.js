import LogoTag from "../Logos/LogoTag";
export default function Footer() {
  return (
    <footer className="text-center w-full bg-raw-sienna-50 pb-10 pt-3 mt-auto justify-end">
      <div className="footer-content">
        <div className="footer-logo flex justify-center">
          <LogoTag width="100" />
        </div>

        <div className="footer-links px-6">
          <ul className="flex  flex-wrap justify-center gap-6 list-disc">
            <li>
              <a href="/landingPage">Nosotros</a>
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
      </div>
      <div className="footer-copyright pt-2">
        <p>Derechos de autor © 2024 Bazar Virtual - Consume Local</p>
      </div>
    </footer>
  );
}
