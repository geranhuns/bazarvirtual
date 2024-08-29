import React from "react";
import Link from "next/link";

function Section2Landing({ id }) {
  return (
    <>
      <section id={id} className="lg:max-w-screen-xl mx-auto  px-8 py-20 w-full  flex justify-center items-center h-full">
        <div className=" w-full rounded-2xl h-custom1 bg-landing2 bg-cover bg-center flex justify-end md:items-center  text-patina-900 pr-6 md:pr-0   ">
          <div className="  md:w-3/6  flex flex-col  gap-10   items-end   md:pr-8">
            <h2 className="text-40px font-semibold leading-custom3 mt-4 text-right md:text-left ">¡Crea y gestiona tus bazares fácilmente!</h2>
            <p className="text-2xl leading-9 max-sm:text-lg text-right md:text-left w-3/5 md:w-full self-end">Conecta con marcas locales y ofrece una experiencia de compra única para
              tus clientes.</p>
            <button className="bg-patina-900 md:w-2/3 h-16 rounded-xl text-xl px-6 text-white hover:bg-patina-200 font-semibold hover:text-patina-900 transition duration-300  mt-10 md:mt-0 self-end md:self-start">
              <Link href={"/home"} >Explorar más</Link>
            </button>
          </div>
        </div>
      </section>

    </>
  )
}

export default Section2Landing