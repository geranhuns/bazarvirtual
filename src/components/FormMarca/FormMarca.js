"use client";
require("dotenv").config();

import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { updateProfileMarca } from "@/api/marcas/routes";
import { DevTool } from "@hookform/devtools";
import Swal from "sweetalert2";

function FormMarca({ marcaInfo }) {
  const [dataUser, setDataUser] = useState({}); //almacena los datos del usuario al cargar el form
  const id = marcaInfo._id;

  const [previewImagen, setPreviewImagen] = useState(null);
  const [isLoading, setIsLoading] = useState(true); //verifica el status de carga de los datos del usuario

  const fileInputRef = useRef(null);

  const redesSociales = dataUser.socialNetworks || []; //variable contenedora de las redes sociales del user
  const facebookObject = redesSociales.find(
    (network) => network.platform === "facebook"
  ) || { platform: "facebook", url: "" }; //variable que contiene la red social buscada en redesSociales, si no encuentra una crea un obj con la plataforma y la url  vacia
  const instagramObject = redesSociales.find(
    (network) => network.platform === "instagram"
  ) || { platform: "instagram", url: "" };
  const tiktokObject = redesSociales.find(
    (network) => network.platform === "tiktok"
  ) || { platform: "tiktok", url: "" };

  const getMarcaInfo = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/marca/${id}`
      );
      const data = await response.json();
      setDataUser(data.data);
      setIsLoading(false);
      reset({
        username: data.data.username,
        slogan: data.data.slogan,
        description: data.data.description,
        profilePicture: data.data.profilePicture,

        facebook:
          data.data.socialNetworks?.find(
            (network) => network.platform === "facebook"
          )?.url || "",
        instagram:
          data.data.socialNetworks?.find(
            (network) => network.platform === "instagram"
          )?.url || "",
        tiktok:
          data.data.socialNetworks?.find(
            (network) => network.platform === "tiktok"
          )?.url || "",
      });
      // Section1Landing(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImagen = (e) => {
    const file = e.target.files[0];
    const maxSizeInMB = 2; // Tamaño máximo permitido en MB
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

    if (file) {
      if (file.size > maxSizeInBytes) {
        // alert(`El archivo no debe ser mayor a ${maxSizeInMB} MB.`);
        Swal.fire({
          title: "Oops!",
          text: `La imagen no debe ser mayor a ${maxSizeInMB} MB.`,
          icon: "warning",
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        handleSetValue(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSetValue = (imageDataUrl) => {
    setValue("profilePicture", imageDataUrl); // Aquí asumimos que profilePicture es la URL de la imagen
    setPreviewImagen(imageDataUrl);
  };

  const form = useForm({
    defaultValues: {
      profilePicture: dataUser.profilePicture,
      nombreMarca: "",
      sloganMarca: dataUser.slogan,
      descriptionMarca: dataUser.description,
      facebook: facebookObject.url,
      instagram: instagramObject.url,
      tiktok: tiktokObject.url,
    },
  });
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = form; //React hook form

  useEffect(() => {
    getMarcaInfo();
  }, []);

  const onSubmit = async (data) => {
    const socialNetworks = [
      //con los datos enviados se crea un array de objetos apartir de las redes sociales del form
      { platform: "facebook", url: data.facebook },
      { platform: "instagram", url: data.instagram },
      { platform: "tiktok", url: data.tiktok },
    ];

    let profilePicture = "";

    if (data.profilePicture === dataUser.profilePicture) {
      profilePicture = "";
    } else {
      profilePicture = data.profilePicture;
    }

    const dataAdjust = {
      username: data.username,
      profilePicture: profilePicture,
      socialNetworks,
      slogan: data.slogan,
      description: data.description,
      _id: id,
    };

    console.log(dataAdjust);

    try {
      const updatedUser = await updateProfileMarca(dataAdjust, id);
      setDataUser(updatedUser);
      getMarcaInfo(); //cuando termina de actualizar se ejecuta de nuevo el fetch para traer los nuevos valores desde la db y actualizar el value por defecto de los inputs del formulario
      // router.push(`/marcas/${id}`);
    } catch (error) {
      console.error("Error al actualizar el usuario:", error.message);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" flex  justify-center w-full p-4 mx-auto "
      >
        <div className="flex flex-col w-11/12 gap-4 pb-4">
          <div className="  w-full h-5/6 p-15 flex items-center max-sm:rounded-lg ">
            <div className="  w-36 h-36 mx-auto rounded-full relative border overflow-hidden ">
              <img
                className="w-full h-full rounded-full object-cover"
                src={previewImagen ? previewImagen : dataUser.profilePicture}
                alt=""
              />
              <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300">
                <label
                  className="text-white text-lg cursor-pointer"
                  onClick={handleButtonClick}
                >
                  Cambiar perfil
                </label>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleImagen}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="nombreMarca"
              className="font-semibold text-raw-sienna-900"
            >
              Nombre de la marca
            </label>
            <input
              disabled
              type="text"
              id="nombreMarca"
              name="nombreMarca"
              className="border border-gray-200 p-2"
              {...register("username")}
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
              name="sloganMarca"
              className=" p-2"
              {...register("slogan")}
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
              id="descriptionMarca"
              name="descriptionMarca"
              className=" p-2 w-full h-32 resize-none overflow-y-auto"
              {...register("description")}
            />
          </div>

          <div className="  w-full h-5/6 flex flex-col items-center ">
            <h3 className="text-xl font-semibold text-raw-sienna-900 ">
              Redes sociales
            </h3>
            <div className=" flex flex-col gap-y-1 w-full px-2 ">
              <div className="  flex flex-col items-center w-full  ">
                <label
                  id="facebook"
                  className="font-semibold text-raw-sienna-900 self-start"
                  htmlFor="facebook"
                >
                  Facebook
                </label>
                <input
                  className="w-full p-2   "
                  type="text"
                  name="facebook"
                  {...register("facebook")}
                />
              </div>
              <div className="  flex flex-col items-center w-full ">
                <label
                  className="font-semibold text-raw-sienna-900 self-start"
                  htmlFor="instagram"
                >
                  Instagram
                </label>
                <input
                  className="w-full p-2 "
                  type="text"
                  name="instagram"
                  {...register("instagram")}
                />
              </div>

              <div className="  flex flex-col items-center w-full ">
                <label
                  className="font-semibold text-raw-sienna-900 self-start"
                  htmlFor="tiktok"
                >
                  TikTok
                </label>
                <input
                  className="w-full p-2 "
                  type="text"
                  name="tiktok"
                  {...register("tiktok")}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="bg-raw-sienna-500 text-white p-2 rounded-md w-full self-center"
          >
            Guardar
          </button>
        </div>
      </form>
      <DevTool control={control} />
    </>
  );
}

export default FormMarca;
