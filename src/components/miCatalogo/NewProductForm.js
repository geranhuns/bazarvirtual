"use client";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import Button from "../Button/Button";
import Image from "next/image";
import { DevTool } from "@hookform/devtools";
import { postNewProduct, editProduct } from "@/api/marcas/routes";
export default function NewProductForm({
  id,
  token,
  setActiveForm,
  setOpenProducteditor,
  item,
  loadProducts,
}) {
  const [previewImagen, setPreviewImagen] = useState("");

  const [decodedToken, setDecodedToken] = useState(null);

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

  const defaultValues = {
    productImage: previewImagen,
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

  const onSubmit = async (data) => {
    //funcion que se ejecuta al enviar el formulario

    console.log(
      `Datos de entrada del formulario: ${JSON.stringify(data, null, 2)}`
    );

    const dataAdjust = {
      productImage:
        "https://i.pinimg.com/236x/c4/02/5d/c4025d4031edfa78ce3dd60a144f77ed.jpg",
      createdBy: id,
      price: data.price,
      description: data.description,
      title: data.title,
      category: data.category,
    };
    console.log(dataAdjust);

    try {
      if (item) {
        const changedProduct = await editProduct(dataAdjust, item._id);
        console.log("Producto actualizado con éxito:", changedProduct);
      }
      const newProduct = await postNewProduct(dataAdjust, id);
      console.log("Producto creado con éxito:", newProduct);

      // router.push(`/marcas/${id}`);
    } catch (error) {
      if (item) {
        console.error("Error al actualizar el producto:", error.message);
      }
      console.error("Error al crear el producto:", error.message);
    }

    if (setActiveForm) setActiveForm(false);
    if (setOpenProducteditor) setOpenProducteditor(false);
    loadProducts();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col items-center justify-center bg-raw-sienna-50"
      >
        <div className="w-full flex   py-8 px-6">
          <div className="w-12/12">
            <div className="flex justify-center pb-3 ">
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
                // required
                type="file"
                id="productImage"
                name="productImage"
                className="border border-raw-sienna-300 p-4"
                onChange={handleImagen}
                // {...register("productImage")}
              />
            </div>
          </div>
          <div className="w-full flex flex-row items-center    py-5  lg:max-w-screen-lg">
            <div className=" flex flex-col w-full items-start pl-6">
              <label
                className="text-xl  text-right  lg:max-w-screen-lg  "
                htmlFor="title"
              >
                Nombre del Producto:
              </label>
              <input
                required
                className=" p-1 rounded-sm  w-11/12  "
                type="string"
                {...register("title")}
              />{" "}
              <label
                className="text-xl  text-right  lg:max-w-screen-lg  "
                htmlFor="category"
              >
                Categoría:
              </label>
              <select
                required
                id="dropdown"
                className={`h-8 w-11/12 pl-1 bg-raw-sienna-100 text-raw-sienna-900`}
                {...register("category")}
              >
                {categories.map((option, index) => (
                  <option value={option} key={index}>
                    {option}
                  </option>
                ))}
              </select>
              <label
                className="text-xl  text-right pr-4 lg:max-w-screen-lg  "
                htmlFor="price"
              >
                Precio:
              </label>
              <input
                required
                type="number"
                step="0.01"
                min="0"
                className="p-1 rounded-sm  w-11/12 "
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
                required
                type="string"
                className="  w-full h-full resize-none overflow-y-auto"
                {...register("description")}
              />
            </div>
          </div>
        </div>
        <div className="flex gap-10  items-center justify-center pb-8">
          <Button
            type={"submit"}
            variant={"yellow"}
            text={"Publicar"}
            className={"px-3"}
          />
          {setOpenProducteditor && (
            <Button
              type={"button"}
              variant={"raw-sienna-50"}
              className={"px-3"}
              text={"Cancelar"}
              onClick={() => {
                setOpenProducteditor(false);
              }}
            />
          )}
          {setActiveForm && (
            <Button
              type={"button"}
              variant={"raw-sienna-50"}
              className={"px-3"}
              text={"Cancelar"}
              onClick={() => {
                setActiveForm(false);
              }}
            />
          )}
        </div>
      </form>
      <DevTool control={control} />
    </>
  );
}