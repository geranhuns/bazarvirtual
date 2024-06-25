"use client";
import Button from "../Button/Button";

export default function registerForm() {
  return (
    <>
      <form action="">
        <div className=" flex flex-col gap-3  lg:w-96 mb-3  ">
          {/* <div className="flex flex-col gap-1">
            <label className="text-lg">Nombre de usuario</label>
            <input
              className="w-full border rounded-lg p-3"
              type="text"
              placeholder=""
            />
          </div> */}
          <div className="flex flex-col gap-1">
            <label className="text-lg">Correo</label>
            <input
              className=" border rounded-lg p-4"
              type="text"
              placeholder=""
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-lg">Contraseña</label>
            <input
              className=" border rounded-lg p-4"
              type="text"
              placeholder=""
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-lg">Confirmar Contraseña</label>
            <input
              className=" border rounded-lg p-4"
              type="password"
              placeholder=""
            />
          </div>
          <Button text="Crear cuenta" href="/" variant="raw-sienna-500" />
        </div>
        <div className="flex items-center gap-2">
          <p className="text-gray-500"> ¿Ya tienes una cuenta?</p>
          <a href="/login" className="text-blue-500">
            {" "}
            Inicia sesion
          </a>
        </div>
      </form>
    </>
  );
}
