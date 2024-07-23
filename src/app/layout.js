import { Inter } from "next/font/google";
import Footer from "@/components/Footer/Footer";
import { metadata } from "./metadata";
import Header from "@/components/Header/Header";
import { HeaderProvider } from "@/components/HContext/HeaderContext"; //para acceder a contextos globales, en este caso acceder desde otra pagina a un state
// import { UserProvider } from "@/components/UserContext/UserContext";
import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"] });

export { metadata };

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="inter-class">
        {/* <UserProvider> */}
        <HeaderProvider>
          <Header />
          <main className="flex flex-col h-full">{children}</main>
          <Footer />
        </HeaderProvider>
        {/* </UserProvider> */}
      </body>
    </html>
  );
}
