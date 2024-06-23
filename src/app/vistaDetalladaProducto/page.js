"use client";
import ProductoConEstrella from "@/components/ProductoConEstrella/ProductoConEstrella";
import MarcaSmallView from "@/components/SmallViews/MarcaSmallView";
import Button from "@/components/Button/Button";
import { useState } from "react";
export default function vistaDetalladaProducto() {
  const [carrito, setCarrito] = useState([]);

  return (
    <>
      <main className="flex  items-center  mx-auto  lg:max-w-7xl overflow-auto ">
        <div className=" flex flex-col md:flex-row ">
          <div className="flex flex-col justify-center w-full md:w-7/12 md:justify-center md:inline-block relative p-6 md:pl-10 pt-10 pb-2 md:pb-8 ">
            <ProductoConEstrella
              imageUrl="https://picsum.photos/400/400"
              altText="Sample Product"
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
            <h3>Título detallado del Producto</h3>
            <MarcaSmallView className="pt-4" />
            <h4 className="text-xl py-4 md:py-8"> $550.00</h4>
            <h4> Acerca de este artículo</h4>
            <p className="  pt-2">
              ✅【VELA DE SOYA PREMIUM】Esta vela aromática con pabilo de
              algodón y cera de soya al 100% natural está hecha con aceites
              esenciales que aportan beneficios y una fragancia masculina e
              intensa a tu hogar. ✅【MORA Y SÁNDALO】 Combinación exquisita que
              combina la dulzura jugosa de las moras con la rica y terrosa
              esencia de sándalo. Este aroma cautivador y equilibrado tiene
              beneficios tanto para la mente como para el cuerpo. La mora,
              conocida por ser rica en antioxidantes, puede ayudar a fortalecer
              el sistema inmunológico y mejorar la salud general. Además, el
              sándalo es conocido por sus propiedades relajantes y calmantes, lo
              que puede ayudar a aliviar el estrés y promover la tranquilidad.
              ✅【REGALO PERFECTO】¿Llevas tiempo buscando una vela para
              hombres? Hemos diseñado la vela aromática perfecta para ti y tus
              seres queridos. Cada vela viene en un empaque de regalo listo para
              entregar, lo que la convierte en un regalo perfecto. Nuestras
              veladoras son ideales como decoración para cuarto o como regalos
              para amigos y familiares; ¡todos las amarán! ✅【NUESTRA
              MISIÓN】La Colección de ANTAVA está cuidadosamente diseñada y
              elaborada pensando en tu hogar y tu familia. Creemos que tu hogar
              debe ser una colección de personas y cosas que amas. Nuestra
              misión es ayudarte a crear un poco más de ese amor con tus seres
              queridos. ✅【CALIDAD GARANTIZADA】 Para nuestra vela decorativa
              solo usamos ingredientes naturales que no son tóxicos para el
              medio ambiente, además de que el porta velas puede reutilizarse
              una vez que se termine la cera de la vela.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
