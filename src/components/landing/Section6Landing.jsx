'use client';
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardSection6 from "./CardSection6";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} `}
      style={{ ...style, display: "block", }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", }}
      onClick={onClick}
    />
  );
}

function Section6Landing({ id }) {
  const settings = {
    dots: false, //Puntos de debajo del carrucel off(false)
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    autoplay: true,
    // speed: 1000,
    autoplaySpeed: 10000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrows: true
        }

      },

      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,

        }
      },
    ]

  };
  return (
    <>
      <section id={id} className="w-full  lg:max-w-screen-xl mx-auto px-8  flex flex-col items-center justify-center gap-1 mt-8 mb-20">
        <h2 className="text-customGreen text-5xl font-semibold max-sm:text-3xl ">Testimonios</h2>
        <Slider {...settings} className="  w-11/12  flex justify-center items-center ">
          <CardSection6
            bg={'bg-KombuGreen'}
            photo={'https://picsum.photos/100/100'}
            testimonio={"Ser parte este Bazar Virtual ha incrementado mis ventas y me ha conectado con clientes que realmente valoran mis productos."}
            namePerson={"Miranda Herrera"}
            bazarName={"Joyería MH"}
          />

          <CardSection6
            bg={'bg-raw-sienna-900'}
            photo={'https://picsum.photos/100/100'}
            testimonio={"Usar Bazar Virtual ha sido un cambio de juego para mi negocio. La interfaz es amigable y las ventas han aumentado significativamente"}
            namePerson={"María López"}
            bazarName={"Trendy Bazaar"}
          />

          <CardSection6
            bg={'bg-customGreen'}
            photo={'https://picsum.photos/100/100'}
            testimonio={"Gracias a la plataforma de Bazar Virtual, llegamos a más clientes. La facilidad de uso y las herramientas de marketing son excelentes."}
            namePerson={"Carlos García"}
            bazarName={"MarketPlace Wonders"}
          />
          <CardSection6
            bg={'bg-patina-500'}
            photo={'https://picsum.photos/100/100'}
            testimonio={"Desde que empecé a usar Bazar Virtual, la gestión de inventarios es más sencilla. La atención al cliente también es destacable."}
            namePerson={"Ana Martínez"}
            bazarName={"Style Bazaar"}
          />

          <CardSection6
            bg={'bg-raw-sienna-500'}
            photo={'https://picsum.photos/100/100'}
            testimonio={"La plataforma de Bazar Virtual nos ha permitido expandirnos rápidamente. La integración con redes sociales ha sido especialmente útil."}
            namePerson={"Laura Rodríguez"}
            bazarName={"Unique Finds Bazaar"}
          />

          <CardSection6
            bg={'bg-patina-900'}
            photo={'https://picsum.photos/100/100'}
            testimonio={"Con Bazar Virtual, he podido optimizar mi tiempo y aumentar mis ingresos. La herramienta de análisis es muy útil para tomar decisiones."}
            namePerson={"Miguel Hernández"}
            bazarName={"Craft Bazaar"}
          />
        </Slider>
      </section>


    </>
  )
}

export default Section6Landing;