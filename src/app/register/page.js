"use client";
import RegisterForm from "@/components/RegisterForm/RegisterForm";
import { useState, useEffect } from "react";
import RadioButton from "@/components/RadioButton/RadioButton";
import { registerBazarFetch } from "@/api/bazar/routes";
import { registerUserFetch } from "@/api/users/routes";
import { registerMarcaFetch } from "@/api/marcas/routes";
import Swal from "sweetalert2";

export default function Register() {
  const [option, setOption] = useState("quieroComprar");
  const [stateForm, setStateForm] = useState(""); //agregado
  const [role, setRole] = useState("");

  useEffect(() => {
    if (option === "quieroComprar") {
      setRole("cliente");
    } else if (stateForm === "bazar") {
      setRole("bazar");
    } else if (stateForm === "marca") {
      setRole("marca");
    } else {
      setRole("");
    }
  }, [option, stateForm]);

  const messages = {
    quieroComprar: "¡Gracias por apoyar el comercio local!",
    soyEmprendedor: "¿Cómo quieres registrarte?",
  };

  const dataRegister = async (data) => {
    let validPassword = null;
    if (data.password === data.passwordComparation) {
      validPassword = data.password;
      const modifiedData = {
        ...data,
        role: role,
        password: validPassword,
        profilePicture:
          "https://i.pinimg.com/564x/57/00/c0/5700c04197ee9a4372a35ef16eb78f4e.jpg",
      };
      const modifiedDataCliente = {
        ...data,
        role: role,
        password: validPassword,
        profilePicture:
          "https://i.pinimg.com/564x/57/00/c0/5700c04197ee9a4372a35ef16eb78f4e.jpg",
      };
      const modifiedDataMarca = {
        ...data,
        role: role,
        password: validPassword,
        profilePicture:
          "https://i.pinimg.com/236x/c4/02/5d/c4025d4031edfa78ce3dd60a144f77ed.jpg",
        description:
          "Aquí puedes escribir una descripción de tu marca para invitar a tu clientela a conocer más sobre tu proyecto",
        slogan: "Escribe aquí el slogan de tu marca",
        socialNetworks: [
          {
            platform: "facebook",
            url: "facebook.com",
          },
          {
            platform: "instagram",
            url: "instagram.com",
          },
          {
            platform: "tiktok",
            url: "tiktok.com",
          },
        ],
      };

      delete modifiedData.passwordComparation;
      delete modifiedDataCliente.passwordComparation;
      delete modifiedDataMarca.passwordComparation;

      if (modifiedDataCliente.role === "cliente") {
        // console.log("registrando como comprador")
        await registerUserFetch(modifiedDataCliente);
      }
      if (modifiedData.role === "bazar") {
        await registerBazarFetch(modifiedData);
      }
      if (modifiedDataMarca.role === "marca") {
        await registerMarcaFetch(modifiedDataMarca);
      }
    } else {
      Swal.fire({
        title: "Oops",
        text: "Las contraseñas no coinciden prueba de nuevo!",
        icon: "error",
      });
    }
  };

  return (
    <>
      <div className="flex flex-col items-center h-screen lg:max-w-screen-xl mx-auto  ">
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
          {option === "soyEmprendedor" && (
            <RadioButton setStateFormProp={setStateForm} />
          )}
          <RegisterForm dataRegister={dataRegister} role={role} />
        </div>
      </div>
    </>
  );
}
