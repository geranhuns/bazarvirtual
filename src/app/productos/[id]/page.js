"use client";
import ProductoConEstrella from "@/components/ProductoConEstrella/ProductoConEstrella";
import MarcaSmallView from "@/components/SmallViews/MarcaSmallView";
import Button from "@/components/Button/Button";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
export default function vistaDetalladaProducto() {
  // const [carrito, setCarrito] = useState([]);
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const id = params.id;
  console.log(id);

  const getProduct = async () => {
    try {
      const response = await fetch(`http://localhost:3001/products/${id}`);
      const data = await response.json();
      setProduct(data.data);
      console.log(data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getProduct();
    console.log(product);
  }, []);

  // useEffect(() => {
  //   fetch(`http://localhost:3001/products/${params.id}`).then((res) => {
  //     return res.json().then((data) => {
  //       console.log(data.data);
  //       setProduct(data.data);
  //       setLoading(false);
  //     });
  //   });
  // }, []);
  // console.log(product);
  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <div className="flex  items-center lg:max-w-screen-xl mx-auto overflow-auto ">
        <div className=" flex flex-col md:flex-row ">
          <div className="flex flex-col justify-center w-full md:w-7/12 md:justify-center md:inline-block relative p-6 md:pl-10 pt-10 pb-2 md:pb-8 ">
            <ProductoConEstrella
              imageUrl={product.productImage}
              altText={product.text}
            />
            <div className="flex gap-1  justify-evenly pt-4">
              <Button
                href=""
                text="Agregar al carrito"
                variant="raw-sienna-50"
                className={"text-xs lg:text-lg"}
                onClick={() => {
                  // setCarrito(carrito.push("nuevoProductoId"));
                }}
              />
              <Button
                href="/carritoDeCompras"
                text="Comprar Ahora"
                variant="raw-sienna-50"
                className={"text-xs lg:text-lg"}
              />
            </div>
          </div>
          <div className="  md:pt-10 pr-10  w-full pl-6">
            <h3>{product.title}</h3>
            <MarcaSmallView className="pt-4" createdBy={product.createdBy} />
            <h4 className="text-xl py-4 md:py-8">{`$${product.price}`}</h4>
            <h4 className="italic"> Acerca de este artículo</h4>
            <p className="  pt-2 text-justify pb-10">{product.description}</p>
          </div>
        </div>
      </div>
    </>
  );
}
