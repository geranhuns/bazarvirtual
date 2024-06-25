"use client";
import RegisterForm from "@/components/RegisterForm/RegisterForm";
import { useState } from "react";
import RadioButton from "@/components/RadioButton/RadioButton";
export default function page() {
  const [option, setOption] = useState("quieroComprar");
  const messages = {
    quieroComprar: "¡Gracias por apoyar el comercio local!",
    soyEmprendedor: "¿Cómo quieres registrarte?",
  };
  return (
    <>
      <main className="flex flex-col items-center h-screen   ">
        <div className="bg-white px-5 py-10 md:px-10 my-auto rounded-md flex flex-col items-center shadow-md">
          <h1 className="text-4xl text-black mb-6 font-bold">Crea tu cuenta</h1>
          <div className="flex pb-4">
            <h4
              className={`cursor-pointer  border-raw-sienna-950 pt-1 px-8 ${
                option === "quieroComprar"
                  ? "border-t border-x rounded-t"
                  : "border-b"
              }`}
              onClick={() => setOption("quieroComprar")}
            >
              Quiero comprar
            </h4>
            <h4
              className={`cursor-pointer  border-raw-sienna-950 pt-1 px-8 ${
                option === "soyEmprendedor"
                  ? "border-t border-x rounded-t"
                  : "border-b"
              }`}
              onClick={() => setOption("soyEmprendedor")}
            >
              Soy emprendedor
            </h4>
          </div>

          <h2 className="text-xl text-gray-500 mb-2 lg:w-96 text-center">
            {messages[option]}
          </h2>
          {option === "soyEmprendedor" && <RadioButton />}
          <RegisterForm />
        </div>
      </main>
    </>
  );
}
