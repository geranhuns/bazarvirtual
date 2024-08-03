import { useState } from "react";
import { useRouter } from "next/navigation";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

import NewProductForm from "../miCatalogo/NewProductForm";

export default function ProductEdit({
  item,
  setActiveForm,
  loadProducts,
  handleDelete,
}) {
  const router = useRouter();
  const [openProductEditor, setOpenProducteditor] = useState(false);

  const { productImage, title, price, description, category, _id } = item;

  // const handleDelete = (_id) => {
  //   deleteProduct(_id);
  //   loadProducts();
  // };
  return (
    <div className="flex flex-col  bg-raw-sienna-50   rounded-md w-full py-5 ">
      {!openProductEditor && (
        <div
          className="flex flex-col md:flex-row gap-5 items-center cursor-pointer justify-around px-5 md:h-36 overflow-auto"
          // href={`products/${_id}`}
        >
          <div className="w-36 h-36 overflow-hidden flex justify-center items-center rounded-lg">
            <img
              className="w-full h-full object-cover"
              src={productImage}
              alt={title}
            />
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between w-full pl-6 md:pl-0 md:gap-6">
            <div className="w-full">
              <h3 className="  text-sm italic  ">Nombre del producto</h3>
              <h3 className="  text-lg font-medium  ">{title}</h3>
            </div>
            <div className="w-full md:w-auto">
              <h3 className="text-sm italic">Precio</h3>
              <h3 className="text-lg font-medium">${price}</h3>
            </div>
            <div className="w-full">
              <h3 className="text-sm italic">Descripción</h3>
              <p className="text-lg font-medium">{description}</p>
            </div>
            <div className="w-full">
              <h3 className="text-sm italic">Categoría</h3>

              <h4 className="text-lg font-medium">{category}</h4>
            </div>
            <div className="flex md:flex-col items-center md:gap-3 w-full md:w-auto justify-between pt-6 md:pt-0 ml-2">
              <MdEdit
                className={"text-xl h-7  self-start"}
                onClick={() => {
                  setOpenProducteditor(!openProductEditor);
                }}
              />
              <RiDeleteBin6Line
                className={"text-xl h-7  self-start"}
                onClick={() => {
                  handleDelete(_id);
                }}
              />
            </div>
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
