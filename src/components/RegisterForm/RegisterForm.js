"use client";
import Button from "../Button/Button";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function RegisterForm({ dataRegister, role, loginRedirect }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    data.shoppingCart = [];
    data.wishList = [];
    data.purchaseHistory = [];

    dataRegister(data);
    reset();
    // loginRedirect();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" flex flex-col gap-3  lg:w-96 mb-3  ">
          <div className="flex flex-col gap-1">
            <label className="text-lg">
              {role === "bazar"
                ? "Nombre del bazar"
                : role === "marca"
                ? "Nombre de la marca"
                : "Nombre del usuario"}
            </label>
            <input
              className={`w-full border rounded-lg p-3 ${
                errors.username ? "border-red-500" : "border-gray-300"
              }`}
              type="string"
              placeholder=""
              {...register("username", { required: "Este campo es requerido" })}
            />
            {errors.username && (
              <label className="text-red-700  text-xs">
                {errors.username.message}
              </label>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-lg">Correo</label>
            <input
              className={`border rounded-lg p-4 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              type="email"
              placeholder=""
              {...register("email", {
                required: "Este campo es requerido",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                  message: "Correo no valido",
                },
              })}
            />
            {errors.email && (
              <label className="text-red-700  text-xs">
                {errors.email.message}
              </label>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-lg">Contraseña</label>
            <input
              className={` border rounded-lg p-4 ${
                errors.password ? "border-red-500" : "border-gray-300"
              } `}
              type="password"
              placeholder=""
              {...register("password", {
                required: "Este campo es requerido",
                minLength: {
                  value: 8,
                  message: "El password debe tener al menos 8 caracteres",
                },
              })}
            />
            {errors.password && (
              <label className="text-red-700 text-xs">
                {errors.password.message}
              </label>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-lg">Confirmar Contraseña</label>
            <input
              className={`border rounded-lg p-4 ${
                errors.passwordComparation
                  ? "border-red-500"
                  : "border-gray-300"
              } `}
              type="password"
              placeholder=""
              {...register("passwordComparation", {
                required: "Este campo es requerido",
                minLength: {
                  value: 8,
                  message: "El password debe tener al menos 8 caracteres",
                },
              })}
            />
            {errors.passwordComparation && (
              <label className="text-red-700  text-xs">
                {errors.passwordComparation.message}
              </label>
            )}
          </div>
          {/* <button
            type="submit"
            className="bg-raw-sienna-500 text-raw-sienna-50 flex items-center justify-center p-1 rounded-lg text-lg  font-medium h-9"
          >
            Crear cuenta
          </button> */}
          <Button type="submit" text="Crear cuenta" variant="raw-sienna-500" />
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
