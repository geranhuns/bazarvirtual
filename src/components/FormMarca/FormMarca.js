"use client";
import Image from "next/image";
import React, { useState } from "react";

function FormMarca() {
  const [previewImagen, setPreviewImagen] = useState(null);
  const [redSocial, setRedSocial] = useState("");
  const [redesSociales, setRedesSociales] = useState([]);
  const [mensajeError, setMensajeError] = useState("");

  const redesValidas = ["facebook", "twitter", "instagram"];

  const handleImagen = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImagen(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRedSocialChange = (e) => {
    setRedSocial(e.target.value);
    setMensajeError("");
  };

  const handleRedSocialKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const redSocialLower = redSocial.toLowerCase();
      if (redesValidas.includes(redSocialLower)) {
        if (!redesSociales.includes(redSocialLower)) {
          setRedesSociales([...redesSociales, redSocialLower]);
          setRedSocial("");
          setMensajeError("");
        } else {
          setMensajeError(`La red social ${redSocial} ya ha sido agregada.`);
        }
      } else {
        setMensajeError(`La red social ${redSocial} no es válida.`);
      }
    }
  };

  const renderIconoRedSocial = (redSocial) => {
    switch (redSocial) {
      case "facebook":
        return (
          <i className="fab fa-facebook">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12C2 16.42 5.13 20.13 9.5 20.88V14.59H7.81V12H9.5V9.81C9.5 7.5 10.88 6.5 12.85 6.5H14.19V9H12.85C12.55 9 12.5 9.23 12.5 9.5V12H14.19L13.88 14.59H12.5V20.88C16.87 20.13 20 16.42 20 12C20 6.48 15.52 2 12 2Z" />
            </svg>
          </i>
        );
      case "twitter":
        return (
          <i className="fab fa-twitter">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M23 4.999c-0.875 0.389-1.813 0.65-2.805 0.769 1.007-0.604 1.779-1.56 2.139-2.699-0.941 0.558-1.981 0.963-3.094 1.184-0.888-0.947-2.152-1.542-3.555-1.542-2.686 0-4.864 2.178-4.864 4.864 0 0.381 0.043 0.753 0.126 1.109C6.285 9.157 3.38 7.25 1.38 4.688 1.038 5.313 0.875 6.019 0.875 6.769c0 1.688 0.859 3.175 2.172 4.043-0.8-0.025-1.556-0.245-2.218-0.611v0.061c0 2.355 1.677 4.32 3.899 4.769-0.407 0.111-0.838 0.171-1.283 0.171-0.313 0-0.615-0.031-0.912-0.088 0.654 2.041 2.541 3.527 4.781 3.563-1.754 1.373-3.963 2.188-6.36 2.188-0.413 0-0.82-0.025-1.225-0.075C1.792 22.25 3.979 23 6.313 23 14.688 23 19 15.031 19 8.625L19 7.875C19.688 7.425 20.313 6.825 20.813 6.125 21.438 5.325 21.875 4.375 22.125 3.375 22.625 4.025 23 4.725 23 5.499L23 4.999z" />
            </svg>
          </i>
        );
      case "instagram":
        return (
          <i className="fab fa-instagram">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12C2 16.42 5.13 20.13 9.5 20.88V14.59H7.81V12H9.5V9.81C9.5 7.5 10.88 6.5 12.85 6.5H14.19V9H12.85C12.55 9 12.5 9.23 12.5 9.5V12H14.19L13.88 14.59H12.5V20.88C16.87 20.13 20 16.42 20 12C20 6.48 15.52 2 12 2Z" />
            </svg>
          </i>
        );
      default:
        return (
          <p className="text-red-500 text-sm font-semibold ml-2">
            Ingresa una red social correcta
          </p>
        );
    }
  };

  return (
    <form className=" p-4 mx-auto mt-10" onSubmit={(e) => e.preventDefault()}>
      <div className="flex flex-col gap-4 pb-4">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="logoMarca"
            className="font-semibold text-raw-sienna-900"
          >
            Logo de la marca
          </label>

          <div className="flex justify-center">
            {previewImagen && (
              <div className="w-32 h-32 relative">
                <Image
                  src={previewImagen}
                  alt="Logo de la Marca"
                  layout="fill"
                  objectFit="none"
                  className=" overflow-hidden border border-gray-300 rounded-full"
                />
              </div>
            )}
          </div>
          <input
            type="file"
            id="logoMarca"
            className="border border-raw-sienna-300 p-4"
            onChange={handleImagen}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="nombreMarca"
            className="font-semibold text-raw-sienna-900"
          >
            Nombre de la marca
          </label>
          <input
            type="text"
            id="nombreMarca"
            className="border border-gray-300 p-2"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="sloganMarca"
            className="font-semibold text-raw-sienna-900"
          >
            Slogan de la marca
          </label>
          <input
            type="text"
            id="sloganMarca"
            className="border border-gray-300 p-2"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="descripcionMarca"
            className="font-semibold text-raw-sienna-900"
          >
            Descripción de la marca
          </label>
          <textarea
            id="descripcionMarca"
            className="border border-gray-300 p-2 w-full h-32 resize-none overflow-y-auto"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="redesSociales"
            className="font-semibold text-raw-sienna-900"
          >
            Redes sociales
          </label>
          <div className="flex items-center">
            <input
              type="text"
              id="redesSociales"
              className="border border-gray-300 p-2 w-full resize-none overflow-y-auto"
              value={redSocial}
              onChange={handleRedSocialChange}
              onKeyDown={handleRedSocialKeyDown}
            />
            {mensajeError && (
              <p className="text-red-500 text-sm font-semibold ml-2">
                {mensajeError}
              </p>
            )}
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {redesSociales.map((redSocial, index) => (
              <div
                key={index}
                className="flex items-center gap-1 border border-gray-300 p-2 rounded
                            "
              >
                {renderIconoRedSocial(redSocial)}
                <span className="capitalize">{redSocial}</span>
              </div>
            ))}
          </div>
        </div>
        <button className="bg-raw-sienna-500 text-white p-2 rounded-md w-full self-center">
          Guardar
        </button>
      </div>
    </form>
  );
}

export default FormMarca;
