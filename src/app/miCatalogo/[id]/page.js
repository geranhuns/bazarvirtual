"use client";
require("dotenv").config();

import MarcaHeaderInfo from "@/components/Marcas/MarcaHeaderInfo";
import ProductEdit from "@/components/ProductEdit/ProductEdit";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { MdEdit } from "react-icons/md";
import { jwtDecode } from "jwt-decode";
import Button from "@/components/Button/Button";
import NewProductForm from "@/components/miCatalogo/NewProductForm";
import { deleteProduct } from "@/api/marcas/products/routes";

export default function MiCatalogo() {
  const [token, setToken] = useState(null);
  const [decodedToken, setDecodedToken] = useState(null);
  const [activeForm, setActiveForm] = useState(false);

  const params = useParams();
  const id = params.id;

  const [brandProducts, setBrandProducts] = useState();
  const [loading, setLoading] = useState(true);

  const handleDelete = async (_id) => {
    try {
      await deleteProduct(_id);
      loadProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("jwtToken");
      if (storedToken) {
        setToken(storedToken);
      }
    }
  }, [token]);

  const getProducts = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/brand/${id}`
      );

      const data = await response.json();
      setBrandProducts(data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const loadProducts = () => {
    getProducts();
  };

  const decodeToken = (token) => {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };
  useEffect(() => {
    if (token) {
      const decoded = decodeToken(token);
      setDecodedToken(decoded);
    }
  }, [token]);
  useEffect(() => {
    getProducts();
  }, []);
  if (loading) {
    return <div>Cargando...</div>;
  }
  return (
    <>
      <div className=" flex flex-col w-10/12 items-center  mx-auto  lg:max-w-7xl overflow-auto mb-28">
        <h3 className="text-3xl mr-4 pt-8">Editar catálogo de productos</h3>
        {!brandProducts && (
          <>
            <h3>Esta marca no tiene productos.</h3>
            <h3>¡Crea tu primer producto ahora!</h3>
          </>
        )}
        <div className="flex flex-col gap-4 py-5 w-full">
          {brandProducts &&
            brandProducts.map((product) => {
              return (
                <ProductEdit
                  key={product._id}
                  item={product}
                  activeForm={activeForm}
                  setActiveForm={setActiveForm}
                  loadProducts={loadProducts}
                  handleDelete={handleDelete}
                />
              );
            })}
        </div>
        {!activeForm && (
          <Button
            variant={"yellow"}
            text={"Agregar producto"}
            onClick={() => {
              setActiveForm(!activeForm);
            }}
            type={"button"}
          />
        )}
        {activeForm && (
          <NewProductForm
            token={token}
            id={id}
            setActiveForm={setActiveForm}
            loadProducts={loadProducts}
          />
        )}
      </div>
    </>
  );
}
