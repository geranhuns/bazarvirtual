import { useState } from "react";
import { useRouter } from "next/navigation";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { deleteProduct } from "@/api/marcas/routes";

import NewProductForm from "../miCatalogo/NewProductForm";

export default function ProductEdit({ item, setActiveForm, loadProducts }) {
  const router = useRouter();
  const [openProductEditor, setOpenProducteditor] = useState(false);

  const { productImage, title, price, description, category, _id } = item;

  return (
    <div className="flex flex-col  bg-raw-sienna-50 py-5  rounded-md w-full ">
      {!openProductEditor && (
        <div
          className="flex gap-5 items-center cursor-pointer justify-around px-4 "
          // href={`products/${_id}`}
        >
          <img
            className="rounded-lg w-1/12"
            src={productImage}
            width="100px"
            height="100px"
            alt={title}
          />
          <div className="w-3/12">
            <h3 className="  text-sm  ">Nombre del producto</h3>
            <h3 className="  text-lg  ">{title}</h3>
          </div>
          <div className="w-1/12">
            <h3 className="text-sm">Precio</h3>
            <h3 className="text-lg">${price}</h3>
          </div>
          <div className="w-4/12">
            <h3 className="text-sm">Descripción</h3>
            <p>{description}</p>
          </div>
          <div className="w-2/12">
            <h3 className="text-sm">Categoría</h3>

            <h4>{category}</h4>
          </div>
          <div className="flex flex-col items-center gap-3 ml-2">
            <MdEdit
              className={"text-xl h-7  self-start"}
              onClick={() => {
                setOpenProducteditor(!openProductEditor);
              }}
            />
            <RiDeleteBin6Line
              className={"text-xl h-7  self-start"}
              loadProducts={loadProducts}
              onClick={() => {
                deleteProduct(_id);
                loadProducts();
              }}
            />
          </div>
          {/* <Button
          text="Editar producto"
          variant="yellow"
          href=""
          className={"text-sm h-7 ml-10"}
          onClick={() => {
            setOpenProducteditor(!openProductEditor);
          }}
        /> */}
        </div>
      )}
      {openProductEditor && (
        <NewProductForm
          item={item}
          setOpenProducteditor={setOpenProducteditor}
          loadProducts={loadProducts}
        />
      )}
    </div>
  );
}
