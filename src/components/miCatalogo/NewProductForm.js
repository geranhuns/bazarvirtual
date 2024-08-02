"use client";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import Button from "../Button/Button";
import Image from "next/image";
import { DevTool } from "@hookform/devtools";
import { postNewProduct, editProduct } from "@/api/marcas/products/routes";

export default function NewProductForm({
  id,
  token,
  setActiveForm,
  setOpenProducteditor,
  item,
  loadProducts,
}) {
  const [previewImagen, setPreviewImagen] = useState("");

  const categories = [
    "Alimentos y Bebidas",
    "Auto",
    "Bebé",
    "Belleza",
    "Deportes y Aire Libre",
    "Electrónicos",
    "Hecho a mano",
    "Herramientas y Mejoras del Hogar",
    "Hogar y Cocina",
    "Industria y Ciencia",
    "Instrumentos Musicales",
    "Jardín",
    "Juegos y juguetes",
    "Libros",
    "Mascotas",
    "Música",
    "Oficina y Papelería",
    "Otros productos",
    "Películas y Series de TV",
    "Ropa, Zapatos y Accesorios",
    "Salud y Cuidado Personal",
    "Software",
    "Videojuegos",
  ];

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
  const defaultValues = {
    productImage: item?.productImage || previewImagen,
    createdBy: id,
    price: item?.price || "",
    description: item?.description || "",
    title: item?.title || "",
    category: item?.category || "",
  };
  const form = useForm({
    defaultValues: defaultValues,
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
    setPreviewImagen(
      "https://i.pinimg.com/236x/c4/02/5d/c4025d4031edfa78ce3dd60a144f77ed.jpg"
    );
    setValue(
      "productImage",
      "https://i.pinimg.com/236x/c4/02/5d/c4025d4031edfa78ce3dd60a144f77ed.jpg"
    );
    if (item) {
      setPreviewImagen(item.productImage);
      reset(defaultValues); // Reset the form with the new item values
    }
  }, [item, reset]);
  const onSubmit = async (data) => {
    console.log(data);
    const dataAdjust = {
      productImage: data.productImage,
      createdBy: id,
      price: data.price,
      description: data.description,
      title: data.title,
      category: data.category,
    };

    try {
      if (item) {
        const changedProduct = await editProduct(dataAdjust, item._id);
        console.log("Producto actualizado con éxito:", changedProduct);
      } else {
        const newProduct = await postNewProduct(dataAdjust, id);
        console.log("Producto creado con éxito:", newProduct);
      }
    } catch (error) {
      console.error("Error al guardar el producto:", error.message);
    }

    if (setActiveForm) setActiveForm(false);
    if (setOpenProducteditor) setOpenProducteditor(false);
    loadProducts();
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col items-center justify-center"
      >
        <div className="w-full flex flex-col lg:flex-row   bg-raw-sienna-50 py-8 px-6 gap-8">
          <div className="w-12/12 lg:w-1/3">
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
          <div className="flex flex-col lg:flex-row gap-8  lg:w-2/3">
            <div className=" flex flex-col w-full items-start">
              <label
                className="text-lg italic text-right  lg:max-w-screen-lg  "
                htmlFor="title"
              >
                Nombre del Producto:
              </label>
              <input
                className=" p-1 font-medium rounded-sm  w-full "
                type="string"
                {...register("title")}
              />{" "}
              <label
                className="text-lg italic text-right pr-4 lg:max-w-screen-lg  "
                htmlFor="category"
              >
                Categoría:
              </label>
              <select
                required
                id="dropdown"
                className="h-8 w-full pl-1 bg-raw-sienna-100 text-raw-sienna-900 font-medium"
                {...register("category")}
              >
                {categories.map((option, index) => (
                  <option value={option} key={index}>
                    {option}
                  </option>
                ))}
              </select>
              <label
                className="text-lg italic text-right pr-4 lg:max-w-screen-lg  "
                htmlFor="price"
              >
                Precio:
              </label>
              <input
                required
                type="number"
                step="0.01"
                min="10"
                className="p-1 rounded-sm w-full font-medium"
                {...register("price")}
              />
            </div>
            <div className="h-full lg:w-full">
              <label
                className="text-lg italic text-right pr-4 lg:max-w-screen-lg  "
                htmlFor="description"
              >
                Descripción:
              </label>
              <textarea
                required
                type="text"
                className="w-full  h-40 resize-none overflow-y-auto font-medium"
                {...register("description")}
              />
            </div>
          </div>
        </div>
        <div className="flex gap-10 items-center justify-center pb-8">
          <Button
            type="submit"
            variant="yellow"
            text="Publicar"
            className="px-3"
          />
          {setOpenProducteditor && (
            <Button
              type="button"
              variant="raw-sienna-50"
              className="px-3"
              text="Cancelar"
              onClick={() => {
                setOpenProducteditor(false);
              }}
            />
          )}
          {setActiveForm && (
            <Button
              type="button"
              variant="raw-sienna-50"
              className="px-3"
              text="Cancelar"
              onClick={() => {
                setActiveForm(false);
              }}
            />
          )}
        </div>{" "}
      </form>
      <DevTool control={control} />
    </>
  );
}
