"use client";
import Button from "@/components/Button/Button";
import { useForm } from "react-hook-form";

export default function LoginForm({dataLoginProp}) {

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit =  (data) =>{
   
    dataLoginProp(data)
   
    reset();
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} >
        <div className="flex flex-col w-60 lg:w-96 mb-3 gap-1">
          <div className="mb-4">
            <label  className="text-base lg:text-xl mb-1">
              Correo:
            </label>
            <input
              type="email"
              className="w-full border rounded-lg p-4"
              {...register("email",{ required: "Este campo es requerido",  pattern:{
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                message: "Correo no valido"
              }})}
            />
            {errors.email && <label className="text-red-700  text-xs">{errors.email.message}</label>}
          </div>
          <div className="mb-4">
            <label  className="text-base lg:text-xl mb-1">
              Contraseña:
            </label>
            <input
              type="password"
              className="w-full border rounded-lg p-4"
              {...register("password", { required: "Este campo es requerido", minLength: { value: 8, message: "El password debe tener al menos 8 caracteres" } })}
            />
            {errors.password && <label className="text-red-700  text-xs">{errors.password.message}</label>}
          </div>
          <button type="submit" className="bg-green-400">Iniciar sesion</button>
          {/* <Button text="Iniciar sesión" href="/" variant="raw-sienna-500" /> */}
        </div>
      </form>
    </>
  );
}
