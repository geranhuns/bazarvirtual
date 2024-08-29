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
      <section id={id} className="w-full  lg:max-w-screen-xl mx-auto px-8  flex flex-col items-center justify-center gap-1 my-20">
        <h2 className="text-patina-900 text-5xl font-semibold max-sm:text-3xl mb-6">Testimonios</h2>
        <Slider {...settings} className="  w-11/12  flex justify-center items-center ">
          <CardSection6
            bg={'bg-KombuGreen'}
            photo={'https://plus.unsplash.com/premium_photo-1681489930334-b0d26fdb9ed8?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
            testimonio={"Ser parte este Bazar Virtual ha incrementado mis ventas y me ha conectado con clientes que realmente valoran mis productos."}
            namePerson={"Miranda Herrera"}
            bazarName={"Joyería MH"}
          />

          <CardSection6
            bg={'bg-raw-sienna-900'}
            photo={'https://plus.unsplash.com/premium_photo-1688572454849-4348982edf7d?q=80&w=2576&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
            testimonio={"Bazar Virtual ha sido un cambio de juego para mi negocio. La interfaz es amigable y las ventas han aumentado significativamente."}
            namePerson={"María López"}
            bazarName={"Trendy Bazar"}
          />

          <CardSection6
            bg={'bg-customGreen'}
            photo={'https://images.unsplash.com/photo-1688167217076-190b0ec8428f?q=80&w=2477&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
            testimonio={"Gracias a la plataforma de Bazar Virtual, llegamos a más clientes. El posicionamiento de mi marca ha mejorado mucho."}
            namePerson={"Carlos García"}
            bazarName={"MarketPlace Wonders"}
          />
          <CardSection6
            bg={'bg-patina-500'}
            photo={'https://images.unsplash.com/photo-1653379671988-b32fceafb5e5?q=80&w=2576&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
            testimonio={"Empecé a usar Bazar Virtual por la recomendación de un amigo y estoy muy contenta con la proyección que mi marca está logrando."}
            namePerson={"Ana Martínez"}
            bazarName={"Style Bazar"}
          />

          <CardSection6
            bg={'bg-raw-sienna-500'}
            photo={'https://plus.unsplash.com/premium_photo-1689551670902-19b441a6afde?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
            testimonio={"La plataforma de Bazar Virtual nos ha permitido expandirnos rápidamente. La integración con redes sociales ha sido especialmente útil."}
            namePerson={"Laura Rodríguez"}
            bazarName={"Unique Finds Bazar"}
          />

          <CardSection6
            bg={'bg-patina-900'}
            photo={'https://images.unsplash.com/photo-1724159768353-55b083d0d435?q=80&w=2576&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
            testimonio={"Con Bazar Virtual, he podido participar en más eventos al año, tener nuevos clientes y aumentar mis ingresos."}
            namePerson={"Miguel Hernández"}
            bazarName={"Craft Bazar"}
          />
        </Slider>
      </section>


    </>
  )
}

export default Section6Landing;