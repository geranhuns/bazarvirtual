import React from "react";

function Section2Landing(){
    return(
        <>
        <section className="w-full min-h-screen  flex justify-center items-center">
        <div className=" w-9/12 rounded-3xl h-custom1 bg-landing2 bg-cover bg-center flex justify-end items-center max-sm:bg-none max-sm:bg-white max-sm:justify-center  ">
          <div className="  w-3/6 h-2/3 text-customGreen flex flex-col items-start gap-10  max-sm:w-5/6 max-sm:h-5/6 max-sm:items-center">
            <h2 className="text-custom1 font-semibold leading-custom3 mt-4 max-sm:text-2xl max-sm:mt-0 max-sm:text-center">¡Crea y gestiona tus bazares fácilmente!</h2>
            <p className="text-2xl font-normal leading-9 max-sm:text-lg max-sm:text-center ">Conecta con marcas locales y ofrece una experiencia de compra única para
            tus clientes.</p>
            <button className="bg-customGreen w-2/3 h-16 rounded-3xl text-2xl text-white hover:bg-transparent border-4 border-customGreen hover:text-customGreen transition duration-500 max-sm:w-10/12 max-sm:text-lg">Explorar ahora</button>
          </div>
        </div>
      </section>

        </>
    )
}

export default Section2Landing