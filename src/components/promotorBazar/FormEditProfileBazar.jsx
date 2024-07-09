import React from "react";




function FormEditProfileBazar(){
return(
    <>
    <div className="fixed inset-0 z-50 bg-gray-600/80 w-full h-dvh backdrop-blur-md flex flex-col mt-16">    
       
       <div className="bg-customBlue fixed w-7/12 h-5/6 flex flex-col  justify-center left-20 max-sm:w-11/12 max-sm:left-1 ">
       <button className="bg-raw-sienna-500 w-10 h-10 flex justify-center items-center rounded-2xl" onClick={() => setOpen(!open)} ><MdClose className="w-full h-full" /></button>
           <form  className="border w-11/12 h-5/6 mx-auto rounded-lg flex flex-col items-center text-customGreen text-2xl ">
               <label htmlFor="">Lugar</label>
               <input className="rounded-lg" type="text"  />

               <label htmlFor="">Fecha</label>
               <input className="rounded-lg" type="text"  />

               <label htmlFor="">Horario</label>
               <input className="rounded-lg" type="text"  />

                       <h2>Eventos especiales:</h2>

                       <div className=" w-full flex justify-around   ">

                           <div className="flex flex-col justify-center w-3/12 text-center ">
                               <label htmlFor="">Evento</label>
                               <input className="rounded-lg" type="text"  />
                           </div>


                           <div className="flex flex-col w-5/12 text-center">
                               <label htmlFor="">Descripcion</label>
                               <input className="rounded-lg" type="text" />
                           </div>

                           <div className="flex flex-col w-3/12 text-center">
                               <label htmlFor="">Horario</label>
                               <input className="rounded-lg" type="text"  />
                           </div>

                       </div>

            

                       <input className="bg-raw-sienna-500 rounded-xl text-xl w-2/12 h-10" type="submit" value="Enviar" />
                   </form>
               </div>
           </div>
    </>
)
}

export default FormEditProfileBazar;