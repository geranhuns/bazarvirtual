"use client";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import Button from "../Button/Button";
import Image from "next/image";
export default function NewProductForm({ id, token }) {
  const [previewImagen, setPreviewImagen] = useState("");

  const [decodedToken, setDecodedToken] = useState(null);

  const decodeToken = (token) => {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };
  const handleImagen = (e) => {
    console.log(e.target.files[0]);
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
    setValue("productImage", file);
  };
  const form = useForm({
    defaultValues: {
      //   productImage: dataUser.username,
      nombreMarca: "",
      createdBy: id,
      //   sloganMarca: dataUser.slogan,
      //   descriptionMarca: dataUser.description,
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
    if (token) {
      const decoded = decodeToken(token);
      setDecodedToken(decoded);
      console.log("Info Token del usuario:", decoded);
    }
  }, [token]);

  useEffect(() => {
    setPreviewImagen(
      "https://i.pinimg.com/236x/c4/02/5d/c4025d4031edfa78ce3dd60a144f77ed.jpg"
    );
  }, []);
  return (
    <>
      <form
        //   onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col items-center justify-center"
      >
        <div className="w-full flex  bg-raw-sienna-50 py-8 px-6">
          <div className="w-12/12">
            <div className="flex justify-center pb-3">
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
            <div className="flex flex-col gap-2 self-end ">
              <label
                htmlFor="productImage"
                className="font-semibold text-raw-sienna-900"
              ></label>
              <input
                type="file"
                id="productImage"
                name="productImage"
                className="border border-raw-sienna-300 p-4"
                onChange={handleImagen}
                // {...register("productImage")}
              />
            </div>
          </div>
          <div className="w-full flex flex-row items-center    py-5 pr-4 lg:max-w-screen-lg">
            <div className=" flex flex-col w-full items-start px-4">
              <label
                className="text-xl  text-right  lg:max-w-screen-lg  "
                htmlFor="title"
              >
                Nombre del Producto:
              </label>
              <input
                className=" p-1 rounded-sm  w-11/12 "
                type="string"
                {...register("title")}
              />{" "}
              <label
                className="text-xl  text-right pr-4 lg:max-w-screen-lg  "
                htmlFor="category"
              >
                Categoría:
              </label>
              <input
                className=" p-1 rounded-sm  w-11/12"
                type="string"
                {...register("category")}
              />
              <label
                className="text-xl  text-right pr-4 lg:max-w-screen-lg  "
                htmlFor="price"
              >
                Precio:
              </label>
              <input
                className="p-1 rounded-sm  w-11/12 "
                type="string"
                {...register("price")}
              />
            </div>
            <div className="h-full">
              <label
                className="text-xl  text-right pr-4 lg:max-w-screen-lg  "
                htmlFor="description"
              >
                Descripción:
              </label>
              <textarea
                type="string"
                className=" p-2 w-full h-full resize-none overflow-y-auto"
                {...register("description")}
              />
            </div>
          </div>
        </div>
        <Button type={"submit"} variant={"yellow"} text={"Publicar"} />
      </form>
    </>
  );
}
