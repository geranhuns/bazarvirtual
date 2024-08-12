"use client";
require("dotenv").config();

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { updateProfileMarca } from "@/api/marcas/routes";
import { useRouter } from "next/navigation";
import axios from "axios";
import { DevTool } from "@hookform/devtools";
// import Button from "../Button/Button";

function FormMarca({ marcaInfo }) {
  const router = useRouter();

  const [dataUser, setDataUser] = useState({}); //almacena los datos del usuario al cargar el form
  const id = marcaInfo._id;

  const [previewImagen, setPreviewImagen] = useState(null);
  const [isLoading, setIsLoading] = useState(true); //verifica el status de carga de los datos del usuario

  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState();

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

  const handleImagen = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImagen(reader.result);
      };
      reader.readAsDataURL(file);
      handleSetValue(reader);
    }
  };
  const handleSetValue = (file) => {
    setValue("profilePicture", file);
  };

  // const handleFileChange = (e) => {
  //   setSelectedImage(e.target.files[0]);
  // };

  const handleS3Submit = async (e) => {
    setUploading(true);
    const formData = new FormData();
    try {
      const response = await fetch(" http://localhost:3000/api/s3", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };

  const form = useForm({
    defaultValues: {
      profilePicture: dataUser.username,
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
  useEffect(() => {
    setPreviewImagen(marcaInfo.profilePicture);
  }, []);

  const imageToS3 = async () => {
    try {
      if (previewImagen) {
        const formData = new FormData();
        formData.append("image", previewImagen); // "image" es el nombre del campo que S3 espera recibir
        const { data } = await axios.post(
          "http://localhost:3000/api/s3",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (data.success) {
          setPreviewImagen(data.data.url); // Actualizar la URL de previsualización si es necesario
        } else {
          console.error("Error al subir la imagen a S3:", data.error);
        }
      }
    } catch (error) {
      console.error("Error al subir la imagen a S3:", error);
    }
  };

  const onSubmit = async (data) => {
    //funcion que se ejecuta al enviar el formulario

    await imageToS3(); // Subir la imagen antes de enviar el formulario
    await handleS3Submit();

    const socialNetworks = [
      //con los datos enviados se crea un array de objetos apartir de las redes sociales del form
      { platform: "facebook", url: data.facebook },
      { platform: "instagram", url: data.instagram },
      { platform: "tiktok", url: data.tiktok },
    ];

    const dataAdjust = {
      //se crea un objeto con los datos del formulario para enviarlos a la peticion fetch para actualizar usuario
      username: data.username,
      // wepPage: data.wepPage,
      profilePicture: data.profilePicture,
      socialNetworks,
      slogan: data.slogan,
      description: data.description,
      _id: id, //este se pasara al fetch para hacer la update
    };

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
      <div className="flex justify-center ">
        {previewImagen && (
          <div className="w-32 h-32 relative">
            <Image
              src={previewImagen}
              alt="Previsualización de la imagen"
              layout="fill"
              objectFit="cover"
              className=" overflow-hidden border  rounded-full"
            />
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className=" p-4 mx-auto ">
        <div className="flex flex-col gap-4 pb-4">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="profilePicture"
              className="font-semibold text-raw-sienna-900"
            ></label>
            <input
              type="file"
              id="profilePicture"
              name="profilePicture"
              className="border border-raw-sienna-300 p-4"
              onChange={handleImagen}
              // {...register("profilePicture")}
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
