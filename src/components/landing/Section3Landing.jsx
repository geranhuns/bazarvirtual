'use client'
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardSection3 from "./CardSection3";

function Section3Landing(){
        const settings = {
                dots: false, //Puntos de debajo del carrucel off(false)
                arrows:false,
                infinite: true,
                speed: 500,
                slidesToShow: 1,
                slidesToScroll: 1,
                // nextArrow: <SampleNextArrow />,
                // prevArrow: <SamplePrevArrow />,
                autoplay: true,
                // speed: 1000,
                autoplaySpeed: 8000,
                cssEase: "linear",
                rows: 1,
                
              };
    return(
        <>
        <section className=" w-full h-85vh  flex justify-around items-center max-sm:justify-center  ">
        
        {/* <Slider {...settings} className="Slider justify-center items-center  w-11/12 h-5/6      ">
               <div className="h-full">
                <CardSection3
                bgClass="bg-KombuGreen"
                bgImageClass="bg-ecoShopping"
                title="Apoyamos la economía local"
                description="Cada compra fortalece nuestra economía local, creando empleos y apoyando a los pequeños empresarios"
                />                    
                </div>
        
                <CardSection3
                        bgClass="bg-raw-sienna-500"
                        bgImageClass="bg-panaBeer"
                        title="Con productos de calidad únicos"
                        description="Descubre productos artesanales y de alta calidad que no encontrarás en las grandes cadenas"
                />

                <CardSection3
                        bgClass="bg-customGreen"
                        bgImageClass="bg-teamPana"
                        title="Y conectamos con la Comunidad"
                        description="Forma parte de una red de personas comprometidas con el crecimiento y la prosperidad de nuestra comunidad"
                /> 
        
         </Slider> */}
        <CardSection3
                bgClass="bg-KombuGreen"
                bgImageClass="bg-ecoShopping"
                title="Apoyamos la economía local"
                description="Cada compra fortalece nuestra economía local, creando empleos y apoyando a los pequeños empresarios"
        />
        <CardSection3
                bgClass="bg-raw-sienna-500"
                bgImageClass="bg-panaBeer"
                title="Con productos de calidad únicos"
                description="Descubre productos artesanales y de alta calidad que no encontrarás en las grandes cadenas"
        />

        <CardSection3
                bgClass="bg-customGreen"
                bgImageClass="bg-teamPana"
                title="Y conectamos con la Comunidad"
                description="Forma parte de una red de personas comprometidas con el crecimiento y la prosperidad de nuestra comunidad"
        />
        
      </section>
        </>
    )
}

export default Section3Landing;