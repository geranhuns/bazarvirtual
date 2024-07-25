"use client";
import MarcaHeaderInfo from "@/components/Marcas/MarcaHeaderInfo";
import ProductEdit from "@/components/ProductEdit/ProductEdit";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { MdEdit } from "react-icons/md";
import { jwtDecode } from "jwt-decode";
import Button from "@/components/Button/Button";
import NewProductForm from "@/components/miCatalogo/NewProductForm";
export default function miCatalogo() {
  const [token, setToken] = useState(null);
  const [decodedToken, setDecodedToken] = useState(null);
  const [activeForm, setActiveForm] = useState(false);

  const params = useParams();
  const id = params.id;
  console.log(id);

  const [brandProducts, setBrandProducts] = useState();
  const [loading, setLoading] = useState(true);
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
        `http://localhost:3001/products/brand/${id}`
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

      console.log("Valores de token:", decoded);
      console.log("Role del usuario:", decoded.role);
    }
  }, [token]);
  useEffect(() => {
    getProducts();
  }, []);
  if (loading) {
    return <div>Cargando...</div>;
  }
  const handleNewProduct = async () => {};
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
              console.log(product);
              return (
                <ProductEdit
                  key={product._id}
                  item={product}
                  activeForm={activeForm}
                  setActiveForm={setActiveForm}
                  loadProducts={loadProducts}
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
