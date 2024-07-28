import { metadata, viewport } from "./metadata";

import { Inter } from "next/font/google";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { HeaderProvider } from "@/components/HContext/HeaderContext"; //para acceder a contextos globales, en este caso acceder desde otra pagina a un state
import { UserProvider } from "@/components/UserContext/UserContext";
import SuspenseBoundary from "../components/SuspenseBoundary/SuspenseBounday"; // Ajusta la ruta según tu estructura de carpetas

import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"] });

export { metadata, viewport };

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="inter-class">
        <UserProvider>
          <HeaderProvider>
            <Header />
            <main className="flex flex-col h-full min-h-screen">
              <SuspenseBoundary>{children}</SuspenseBoundary>
            </main>
            <Footer />
          </HeaderProvider>
        </UserProvider>
      </body>
    </html>
  );
}
