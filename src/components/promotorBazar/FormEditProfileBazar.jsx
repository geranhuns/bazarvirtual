import { useEffect, useState } from "react";
import React from "react";
import { useForm } from "react-hook-form";
import { dataUserBazarFetch } from "@/api/bazar/routes";
import { updateProfileBazar } from "@/api/bazar/routes";





function FormEditProfileBazar({ active, setActive, _idUser }) {

  const [dataUser, setDataUser] = useState({}) //almacena los datos del usuario al cargar el form
  const [isLoading, setIsLoading] = useState(true); //verifica el status de carga de los datos del usuario

  const redesSociales = dataUser.socialNetworks || []; //variable contenedora de las redes sociales del user
  const facebookObject = redesSociales.find(network => network.platform === 'facebook') || { platform: 'facebook', url: '' }; //variable que contiene la red social buscada en redesSociales, si no encuentra una crea un obj con la plataforma y la url  vacia
  const instagramObject = redesSociales.find(network => network.platform === 'instagram') || { platform: 'instagram', url: '' };
  const tiktokObject = redesSociales.find(network => network.platform === 'tiktok') || { platform: 'tiktok', url: '' };

  // const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click(); // Simular clic en el input de tipo file
  };

  const fetchData = async () => {  //funcion para traer los datos del usuario al state dataUser
    try {
      const userData = await dataUserBazarFetch();
      setDataUser(userData.data);
      reset(userData.data);
      console.log(userData);
    } catch (error) {
      console.error('Error al obtener datos del usuario:', error);
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => { //effect que se ejecuta cuando el componente se carga, poniendo en accion a la funcion fetch, basicamente cuando carga el componente se trae los datos del user
    fetchData();
    console.log("datos cargados")
  }, []);


  const { register, handleSubmit, formState: { errors }, reset } = useForm(); //React hook form

  const onSubmit = async (data) => { //funcion que se ejecuta al enviar el formulario

    console.log(`datos de entrada del formulario: ${data}`)
    const socialNetworks = [ //con los datos enviados se crea un array de objetos apartir de las redes sociales del form
      { platform: 'facebook', url: data.facebook },
      { platform: 'instagram', url: data.instagram },
      { platform: 'tiktok', url: data.tiktok }
    ];

    const dataAdjust = {  //se crea un objeto con los datos del formulario para enviarlos a la peticion fetch para actualizar usuario
      username: data.username,
      wepPage: data.wepPage,
      socialNetworks,
      _id: _idUser //este se pasara al fetch para hacer la update
    };
    console.log(dataAdjust);

    try {
      const updatedUser = await updateProfileBazar(dataAdjust, dataUser._id);
      console.log('Usuario actualizado con éxito:', updatedUser);
      fetchData(); //cuando termina de actualizar se ejecuta de nuevo el fetch para traer los nuevos valores desde la db y actualizar el value por defecto de los inputs del formulario

    } catch (error) {
      console.error('Error al actualizar el usuario:', error.message);

    }

    reset();
  }

  if (isLoading) {

    // return <div>Loading...</div>;
    //colocar alert
  }




  return (
    <>
    <div className="fixed inset-0 z-50 bg-gray-600/80 w-full h-dvh lg:max-w-screen-xl overflow-auto mx-auto backdrop-blur-md mt-16 px-1 ">    
    <button className="bg-raw-sienna-500 w-10 h-10 flex justify-center items-center rounded-2xl " onClick={() => setActive(!active)} >Cerrar</button>
    
       <form onSubmit={handleSubmit(onSubmit)} className=" bg-customBlue w-7/12 h-5/6 rounded-xl   mx-auto px-4 flex flex-col items-center max-md:w-10/12 max-sm:w-full"  >
            <div className=" w-11/12 h-full flex flex-col justify-start items-center max-sm:w-full">
                <div className="  w-full h-2/6 p-15 flex items-center max-sm:rounded-lg">
                  <div className="  w-auto h-5/6 mx-auto rounded-full relative  ">
                    <img className="w-full h-full rounded-full" src={dataUser.profilePicture} alt="" />
                    <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <label className="text-white text-lg cursor-pointer" onClick={handleButtonClick}>Cambiar perfil</label>
                      {/* <input type="file" ref={fileInputRef} style={{ display: 'none' }}/> */}
                    </div>
                  </div>
                </div>
                {/* <button className="bg-green-300 rounded-lg my-1">cambiar perfil</button> */}
                <div className=" border w-10/12 h-4/6 flex flex-col items-center justify-start p-2 max-sm:w-full">
                    <div className=" border w-full h-2/6  flex justify-around items-center max-sm:flex-col">
                        <div className=" border flex flex-col items-center w-1/2 max-sm:w-10/12">
                            <label className="text-lg text-white  " htmlFor="">Bazar name</label>
                            <input className="w-11/12 p-1 rounded-xl text-center max-sm:w-full" type="text" defaultValue={dataUser.username}
                              {...register("username")} />
                        </div>
                        <div className="  flex flex-col items-center w-1/2 max-sm:w-10/12 ">
                            <label className="text-lg text-white " htmlFor="">wep page</label>
                            <input className="w-11/12 p-1 rounded-xl  text-center max-sm:w-full" type="text" defaultValue={dataUser.wepPage}
                              {...register("wepPage" )}/>
                        </div>
                    </div>
                    
                    <div className="  w-full h-5/6 flex flex-col items-center ">
                       <h3 className="text-xl text-white font-semibold ">Redes sociales</h3>
                       <div className=" flex flex-col gap-y-1 w-full px-2 max-sm:items-center">
                            
                            <div className="  flex flex-col items-center w-full max-sm:w-10/12 ">
                                <label id="facebook"  name="facebook" className="text-lg text-white " htmlFor="facebook">Facebook</label>
                                <input className="w-11/12 p-1 rounded-xl  text-center" type="text" defaultValue={facebookObject.url}
                                 {...register("facebook")} />
                                
                            </div>
                            <div className="  flex flex-col items-center w-full max-sm:w-10/12 ">
                                <label  className="text-lg text-white " htmlFor="">Instagram</label>
                                <input className="w-11/12 p-1 rounded-xl  text-center" type="text" defaultValue={instagramObject.url}
                                 {...register("instagram" )} />
                            </div>
                            
                            <div className="  flex flex-col items-center w-full max-sm:w-10/12">
                                <label  className="text-lg text-white" htmlFor="">TikTok</label> 
                                <input className="w-11/12 p-1 rounded-xl  text-center" type="text"  defaultValue={tiktokObject.url}
                                 {...register("tiktok" )}
                                 />
                            </div>
                       </div>
                    </div>
                    <button className="bg-raw-sienna-500 w-9/12 rounded-lg p-1" type="submit">Guardar</button>
                </div>
            </div>
       </form>
    </div>
    </>
  )
}

export default FormEditProfileBazar;