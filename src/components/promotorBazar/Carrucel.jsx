import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Button from "../Button/Button";
import { IoAddCircleSharp } from "react-icons/io5";
import { CiCircleMinus } from "react-icons/ci";
import { useUserContext } from "../UserContext/UserContext";
import { subscribeToEvent } from "@/api/bazar/routes";
import { getSubscribedBrands } from "@/api/bazar/routes";
import { getBrandById } from "@/api/marcas/routes";
import ProductoDestacadoMarca from "../SmallViews/ProductoDestacadoMarca";


function Carrucel({ eventId, bazarDates }) {
  const [loading, setLoading] = useState(true);
  const [subscribedBrands, setSubscribedBrands] = useState([]);
  const { user } = useUserContext();

  useEffect(() => {
    console.log("bazarDates:", bazarDates);
    if (Array.isArray(bazarDates) && bazarDates.length > 0) {
      const allSubscribedBrands = bazarDates.flatMap(date => date.marcasCurso || []);
      console.log("allSubscribedBrands:", allSubscribedBrands);
      setSubscribedBrands(allSubscribedBrands);
    } else {
      console.log("bazarDates is not an array or is empty");
    }
    setLoading(false);
  }, [bazarDates]);


  const settings = {
    dots: false,
    infinite: (subscribedBrands.length > 3),
    speed: 500,
    rows: 1,
    slidesPerRow: 1,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3.1,
          slidesToScroll: 3,
          infinite: (subscribedBrands.length > 3),
          dots: false
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2.09,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1.05,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },


    ]
  };
  const handleSubscribe = () => {
    const brandId = { brandId: user._id }
    getSubscribedBrands(eventId, brandId)
  }
  useEffect(() => {
    setLoading(false)

  }, [])

  if (loading) return <h3>Loading...</h3>
  return (
    <>
      <section className="w-full pb-10 bg-patina-200 flex flex-col lg:max-w-screen-xl  mx-auto  text-center lg:rounded-xl h-[80vh] md:h-[59vh] lg:h-[59vh] ">
        <h2 className="font-medium text-3xl text-patina-900 pt-5 mb-8">Marcas participantes</h2>
        <div className=" relative slider-container flex justify-center w-11/12 h-5/6 mx-auto  ">
          <Slider {...settings} className="  w-11/12 h-full flex justify-center items-center mx-auto  ">
            {subscribedBrands.map((event) => {
              return (<ProductoDestacadoMarca key={event._id} id={event.brandId} profilePicture={event.profilePicture} brand={event.username} className={"h-[80vh"} />)

            })}


          </Slider>
        </div>

        {user.role === "marca" &&
          <div className="flex items-center justify-center gap-6 pt-6">

            <div className="flex items-center bg-yellow-bazar rounded-md px-3">

              <Button text="Participar" variant="yellow" type="button" className={"px-3 text-yellow-800"} onClick={() => { subscribeToEvent() }} /><IoAddCircleSharp className="text-2xl text-yellow-700" />
            </div>
            <div className="flex items-center rounded-md border border-patina-500 px-3">

              <Button text="Cancelar" variant="transparent" type="button" className={"px-3 text-patina-500"} /><CiCircleMinus className="text-2xl text-patina-500" />
            </div>

          </div>
        }
      </section>
    </>
  )
}

export default Carrucel;