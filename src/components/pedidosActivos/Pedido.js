// import { getProductById } from "@/api/marcas/products/routes";
// import PedidoGrupo from "./PedidoGrupo";
// import { useEffect, useState } from "react";

// export default function Pedido({ producto }) {
//   const [productsArray, setProductsArray] = useState([]);

//   // useEffect(() => {
//   //   const fetchProducts = async () => {
//   //     // Crear una lista de promesas para obtener los detalles del producto
//   //     const productPromises = productGroup.map(async (product) => {
//   //       const detailedProduct = await getProductById(product.productId);
//   //       return {
//   //         detailedProduct: detailedProduct.data,
//   //         quantity: product.quantity,
//   //         _id: product._id,
//   //         pendingDelivery: product.pendingDelivery,
//   //       };
//   //     });

//   //     // Esperar a que todas las promesas se resuelvan
//   //     const products = await Promise.all(productPromises);

//   //     // Actualizar el estado con la lista completa de productos
//   //     setProductsArray(products);
//   //   };

//   //   fetchProducts();
//   // }, [productGroup]); // Ejecutar el efecto cuando `productGroup` cambie

//   return (
//     <>
//       <div className="flex flex-col  justify-center bg-raw-sienna-50 md:py-5 px-4 rounded-md">
//         {productsArray &&
//           productsArray.length > 0 &&
//           productsArray.map((item) => {
//             //if item.pendingdelivery de todos los objetos dentro del pedido grupo es false entonces no se debe renderizar.
//             return (
//               <div>
//                 <PedidoGrupo
//                   key={item._id}
//                   showButton={item.pendingDelivery}
//                   singleProduct={item.detailedProduct}
//                   quantity={item.quantity}
//                 />
//               </div>
//             );
//           })}
//       </div>
//     </>
//   );
// }
