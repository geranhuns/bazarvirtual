"use client";
import LoginForm from "@/components/LoginForm/LoginForm";
import { loginUserFetch } from "@/api/users/routes";
export default function Login() {
  
  const dataLogin =((data)=>{
    // console.log(data)
    loginUserFetch(data)
  })

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
