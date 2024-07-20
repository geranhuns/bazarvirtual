import { MdOutlineShoppingCart } from "react-icons/md";
import Button from "@/components/Button/Button";

export default function HeaderLogin() {
  return (
    <div className="md:flex gap-4 items-center  hidden">
      <Button text="Iniciar sesión" href="/login" variant="transparent" />
      <Button text="Crear cuenta" href="/register" variant="yellow" />
      <div className="p-2 text-raw-sienna-50 cursor-pointer">
        <a href="/carritoDeCompras">
          <MdOutlineShoppingCart size={25} />
        </a>
      </div>
    </div>
  );
}
