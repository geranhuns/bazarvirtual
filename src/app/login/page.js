"use client";
import LoginForm from "@/components/LoginForm/LoginForm";
import { loginUserFetch } from "@/api/users/routes";
import { loginBazarFetch } from "@/api/bazar/routes";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function Login() {
  const router = useRouter();

  const dataLogin = async (data) => {
    try {
      const token = await loginUserFetch(data);
      const decodedToken = jwtDecode(token.data);
      const id = decodedToken._id;
      const userRole = decodedToken.role;
      console.log(userRole);

      if (userRole === "marca") {
        router.push(`/marcas/${id}`); //NOTA cambiarle aqui la ruta
      } else if (userRole === "bazar") {
        router.push(`/bazares/${id}`);
      } else {
        router.push("/home");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className=" flex justify-center items-center h-screen lg:max-w-screen-xl mx-auto">
      <div className="bg-white p-10 rounded shadow-md flex flex-col items-center">
        <h2 className="text-xl lg:text-2xl mb-6">Iniciar sesión</h2>
        <LoginForm dataLoginProp={dataLogin} />
        <p className="mt-4">
          ¿No tienes una cuenta?{" "}
          <a href="/register" className="text-blue-500">
            Regístrate aquí
          </a>
        </p>
      </div>
    </div>
  );
}
