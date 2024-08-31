import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Button from "../Button/Button";
import { IoAddCircleSharp } from "react-icons/io5";
import { CiCircleMinus } from "react-icons/ci";
import { useUserContext } from "../UserContext/UserContext";
import EmptyCard from "./EmptyCard";
import ProductoDestacadoMarca2 from "../SmallViews/ProductoDestacadoMarca2";
import { subscribeToEvent, deleteSubscription } from "@/api/bazar/routes";
import { getAllProducts } from "@/api/marcas/products/routes"




function Carrucel({ idDate, marcasCurso, fetchDataDates, isParticipant, showMessage }) {
  const [loading, setLoading] = useState(true);
  const { user } = useUserContext();
  const [products, setProducts] = useState([])
  const [newMarcasCurso, setNewMarcasCurso] = useState([]);



  useEffect(() => {

    if (Array.isArray(marcasCurso)) {
      const updatedMarcasCurso = marcasCurso.map((marca) => {
        if (products) {
          const productsMarca = products
            .filter((producto) => producto.createdBy === marca.marcaID)
            .slice(0, 4)
            .map((producto) => ({
              image: producto.productImage,
              id: producto._id,
            })); // Aquí solo obtenemos la imagen de los productos

          return {
            ...marca,
            productos: productsMarca,
          };
        }
        return marca; // En caso de que no haya productos, devolver la marca sin modificar
      });

      setNewMarcasCurso(updatedMarcasCurso); // Guardar en el estado
    }
  }, [marcasCurso, products]);


  const handleSuscribed = async () => {
    const dataUpdate = {
      profile: localStorage.getItem("brandProfilePicture"),
      nameMarca: localStorage.getItem("brandUsername"),
      marcaID: localStorage.getItem("marcaID")
    };
    if (idDate) {
      await subscribeToEvent(idDate, dataUpdate); // Asumiendo que subscribeToEvent acepta el dataUpdate como segundo parámetro
      fetchDataDates()

    } else {
      console.error("eventId is required");
    }
  };

  const handleCancelSubscription = async () => {
    const nameMarca = localStorage.getItem("brandUsername")

    if (idDate) {
      await deleteSubscription(idDate, nameMarca); // Asumiendo que subscribeToEvent acepta el dataUpdate como segundo parámetro
      fetchDataDates()

    } else {
      console.error("eventId is required");
    }
  };


  // const slidesToShow = marcasCurso && marcasCurso.length < 3 ? marcasCurso.length : 3;
  const slidesToShow = (!marcasCurso || marcasCurso.length === 0) ? 1 : (marcasCurso.length < 3 ? marcasCurso.length : 3);

  const infiniteSetting = !marcasCurso || marcasCurso.length > 1;

  const settings = {
    dots: false,
    infinite: infiniteSetting,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: slidesToShow,
          slidesToScroll: 1,
          infinite: infiniteSetting,
          dots: false

        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: infiniteSetting,
          dots: false
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: infiniteSetting,
          dots: false
        }
      },


    ]
  };


  useEffect(() => {

    const fetchProducts = async () => {
      const products = await getAllProducts();
      setProducts(products.data);
    };

    fetchProducts();
    setLoading(false);

  }, [])

  if (loading) return <h3>Loading...</h3>
  return (
    <>
      <section className=" w-full  bg-patina-200 flex flex-col  lg:max-w-screen-xl  mx-auto  text-center lg:rounded-xl  drop-shadow-lg  my-8 mb-20 ">
        {idDate && <h2 className="  font-semibold text-4xl  text-patina-900 pt-12 pb-4">Marcas participantes</h2>}
        {showMessage && !idDate && (
          <>
            <p className="flex w-full md:w-2/3 mx-auto justify-center pt-12 pb-4 self-start font-semibold text-4xl text-patina-900">Amplía tus horizontes y alcanza nuevos públicos

            </p>
            <p className="flex w-full md:w-2/3 mx-auto justify-center text-xl self-start pb-4 text-patina-900">
              Invita a tus marcas asociadas y ayúdales a ampliar su alcance, tener mayor visibilidad y generar nuevas oportunidades de venta.
            </p>
          </>
        )}

        <div className=" flex  flex-col items-center w-11/12 h-5/6 mx-auto mt-2   ">
          {newMarcasCurso && newMarcasCurso.length > 0 ?
            (
              <Slider {...settings} className="w-11/12 h-full flex mx-auto">
                {newMarcasCurso.map((marca, index) => {
                  console.log(newMarcasCurso)
                  return <ProductoDestacadoMarca2
                    key={index}
                    profile={marca.profile}
                    nameMarca={marca.nameMarca}
                    imageProductos={marca.productos}
                    className={`${(newMarcasCurso.length < 3) ? " md:w-5/12 lg:w-1/3" : "w-11/12"}`}
                  />
                })
                }
              </Slider>
            ) : (
              <EmptyCard idDate={idDate} showMessage={showMessage} />
            )

          }

        </div>

        <div className="flex items-center justify-center gap-6 pt-6 bg-patina-200 pb-10 lg:rounded-xl  ">
          {user.role === "marca" &&
            <>
              {isParticipant ? (<div className="flex items-center rounded-md border-2  border-patina-500 px-3 ">
                <Button text="Cancelar" variant="transparent" type="button" className={"px-3 text-patina-500"} onClick={() => { handleCancelSubscription() }} /><CiCircleMinus className="text-2xl text-patina-500" />
              </div>
              ) : (<div className="flex items-center bg-yellow-bazar rounded-md px-3">
                <Button text="Participar" variant="yellow" type="button" className={"px-3 text-yellow-800"} onClick={() => { handleSuscribed() }} /><IoAddCircleSharp className="text-2xl text-yellow-700" />
              </div>
              )}

            </>

          }

        </div>

      </section>
    </>
  )
}

export default Carrucel;