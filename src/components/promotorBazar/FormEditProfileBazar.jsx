
import { useEffect, useState, useRef } from "react";
import React from "react";
import { useForm } from "react-hook-form";
import { dataUserBazarFetch, updateProfileBazar } from "@/api/bazar/routes";
import { useParams } from "next/navigation";
import { IoCloseOutline } from "react-icons/io5";
import Swal from "sweetalert2";




function FormEditProfileBazar({ active, setActive, setDataUserMain }) {
  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm(); //React hook form
  const [dataUser, setDataUser] = useState({}) //almacena los datos del usuario al cargar el form
  const [isLoading, setIsLoading] = useState(true); //verifica el status de carga de los datos del usuario
  const [preview, setPreview] = useState(null); //almacena la imagen cargada para previsualizacion en perfil



  const redesSociales = dataUser.socialNetworks || []; //variable contenedora de las redes sociales del user
  const facebookObject = redesSociales.find(network => network.platform === 'facebook') || { platform: 'facebook', url: '' }; //variable que contiene la red social buscada en redesSociales, si no encuentra una crea un obj con la plataforma y la url  vacia
  const instagramObject = redesSociales.find(network => network.platform === 'instagram') || { platform: 'instagram', url: '' };
  const tiktokObject = redesSociales.find(network => network.platform === 'tiktok') || { platform: 'tiktok', url: '' };
  const fileInputRef = useRef(null);

  const params = useParams();// id sale de los params(URl)
  const id = params.id;




  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // const handleImagen = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       handleSetValue(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };
  const handleImagen = (e) => {
    const file = e.target.files[0];
    const maxSizeInMB = 2; // Tamaño máximo permitido en MB
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

    if (file) {
      if (file.size > maxSizeInBytes) {
        Swal.fire({
          title: "Oops!",
          text: `La imagen no debe ser mayor a ${maxSizeInMB} MB.`,
          icon: "warning",
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        handleSetValue(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSetValue = (imageDataUrl) => {
    setValue("profilePicture", imageDataUrl); // Aquí asumimos que profilePicture es la URL de la imagen
    setPreview(imageDataUrl)

  };




  const fetchData = async () => {  //funcion para traer los datos del usuario al state dataUser
    try {
      const userData = await dataUserBazarFetch(id);
      setDataUser(userData.data);
      setDataUserMain(userData.data)
      reset(userData.data);
    } catch (error) {
      console.error('Error al obtener datos del usuario:', error);
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => { //effect que se ejecuta cuando el componente se carga, poniendo en accion a la funcion fetch, basicamente cuando carga el componente se trae los datos del user
    fetchData();
  }, []);




  const onSubmit = async (data) => { //funcion que se ejecuta al enviar el formulario


    const socialNetworks = [ //con los datos enviados se crea un array de objetos apartir de las redes sociales del form
      { platform: 'facebook', url: data.facebook },
      { platform: 'instagram', url: data.instagram },
      { platform: 'tiktok', url: data.tiktok }
    ];

    let profilePicture = '';

    if (data.profilePicture === dataUser.profilePicture) {
      profilePicture = '';
    } else {
      profilePicture = data.profilePicture;
    }

    const dataAdjust = {  //se crea un objeto con los datos del formulario para enviarlos a la peticion fetch para actualizar usuario

      profilePicture: profilePicture,
      username: data.username,
      webPage: data.webPage,
      socialNetworks
      // _id: _idUser //este se pasara al fetch para hacer la update
    };

    try {
      const updatedUser = await updateProfileBazar(dataAdjust, dataUser._id);
      fetchData(); //cuando termina de actualizar se ejecuta de nuevo el fetch para traer los nuevos valores desde la db y actualizar el value por defecto de los inputs del formulario
    } catch (error) {
      console.error('Error al actualizar el usuario:', error.message);

    }

    reset();
  }


  if (isLoading) {

    return <div>Loading...</div>;
    //colocar alert
  }




  return (
    <>
      <div className="fixed inset-0 z-50 bg-gray-600/80 w-full h-dvh lg:max-w-screen-xl overflow-auto mx-auto backdrop-blur-md mt-16 px-1 ">

        <form onSubmit={handleSubmit(onSubmit)} className=" bg-customBlue w-7/12 h-5/6 rounded-xl   mx-auto px-4 flex flex-col items-center max-md:w-10/12 max-sm:w-full mt-8 pb-10"  >
          <button className="bg-raw-sienna-500 p-1 mt-3 flex justify-center items-center self-start  rounded-full " onClick={() => setActive(!active && setPreview(null))} ><IoCloseOutline className="text-2xl rounded full" /></button>
          <div className=" w-11/12 h-full flex flex-col justify-start items-center max-sm:w-full">
            <div className="  w-full h-2/6 p-15 flex items-center max-sm:rounded-lg ">
              <div className="  w-36 h-36 mx-auto rounded-full relative   ">
                <img className=" rounded-full object-cover" src={preview ? preview : dataUser.profilePicture} alt="" />
                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <label className="text-white text-lg cursor-pointer" onClick={handleButtonClick}>Cambiar perfil</label>
                  <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleImagen} />
                </div>
              </div>
            </div>
            {/* <button className="bg-green-300 rounded-lg my-1">cambiar perfil</button> */}
            <div className="  w-10/12 h-4/6 flex flex-col items-center justify-start p-2 max-sm:w-full">
              <div className="  w-full h-2/6  flex justify-around items-center max-sm:flex-col">
                <div className="  flex flex-col items-center w-1/2 max-sm:w-10/12">
                  <label className="text-lg text-white  " htmlFor="">Bazar name</label>
                  <input className="w-11/12 p-1 rounded-xl text-center max-sm:w-full" type="text" defaultValue={dataUser.username}
                    {...register("username")} />
                </div>
                <div className="  flex flex-col items-center w-1/2 max-sm:w-10/12 ">
                  <label className="text-lg text-white " htmlFor="">wep page</label>
                  <input className="w-11/12 p-1 rounded-xl  text-center max-sm:w-full" type="text" defaultValue={dataUser.webPage}
                    {...register("webPage")} />
                </div>
              </div>

              <div className="  w-full h-5/6 flex flex-col items-center ">
                <h3 className="text-xl text-white font-semibold ">Redes sociales</h3>
                <div className=" flex flex-col gap-y-1 w-full px-2 max-sm:items-center">

                  <div className="  flex flex-col items-center w-full max-sm:w-10/12 ">
                    <label id="facebook" name="facebook" className="text-lg text-white " htmlFor="facebook">Facebook</label>
                    <input className="w-11/12 p-1 rounded-xl  text-center" type="text" defaultValue={facebookObject.url}
                      {...register("facebook")} />

                  </div>
                  <div className="  flex flex-col items-center w-full max-sm:w-10/12 ">
                    <label className="text-lg text-white " htmlFor="">Instagram</label>
                    <input className="w-11/12 p-1 rounded-xl  text-center" type="text" defaultValue={instagramObject.url}
                      {...register("instagram")} />
                  </div>

                  <div className="  flex flex-col items-center w-full max-sm:w-10/12">
                    <label className="text-lg text-white" htmlFor="">TikTok</label>
                    <input className="w-11/12 p-1 rounded-xl  text-center" type="text" defaultValue={tiktokObject.url}
                      {...register("tiktok")}
                    />
                  </div>
                </div>
                <button className="bg-raw-sienna-500 w-9/12 rounded-lg p-1 mt-10" type="submit">Guardar</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default FormEditProfileBazar;