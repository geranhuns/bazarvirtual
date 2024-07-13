"use client";
import RegisterForm from "@/components/RegisterForm/RegisterForm";
import { useState, useEffect } from "react";
import RadioButton from "@/components/RadioButton/RadioButton";
import { registerBazarFetch } from "@/api/bazar/routes";
import { registerUserFetch } from "@/api/users/routes";
import { registerMarcaFetch } from "@/api/marcas/routes";
import Swal from 'sweetalert2'

export default function page() {

  const [option, setOption] = useState("quieroComprar");
  const [stateForm, setStateForm] = useState(''); //agregado
  const [role, setRole] = useState('');

  useEffect(() => {
    if (option === "quieroComprar") {
      setRole("comprador");
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

  const dataRegister =( async  (data)=>{
    console.log(data)
    
    let validPassword = null;
    if (data.password === data.passwordComparation) {

       validPassword = data.password;
          const modifiedData = {
            ...data,
            role: role,
            password: validPassword, 
          };
  
          delete modifiedData.passwordComparation; 
          console.log(modifiedData.role)

          if(modifiedData.role === 'comprador'){
            // console.log("registrando como comprador") 
            console.log(modifiedData)
            await registerUserFetch(modifiedData)
          }
          if(modifiedData.role === 'bazar'){
             await registerBazarFetch(modifiedData)
          }
          if(modifiedData.role === 'marca'){
            await registerMarcaFetch(modifiedData)
         }
         
    } else {
      
      Swal.fire({
        title: "Oops",
        text: "Las contraseñas no coinciden prueba de nuevo!",
        icon: "error"
      });
    }
  
  })


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
          {option === "soyEmprendedor" && <RadioButton setStateFormProp={setStateForm} />}
          <RegisterForm dataRegister={dataRegister} role={role} />
        </div>
      </div>
    </>
  );
}
