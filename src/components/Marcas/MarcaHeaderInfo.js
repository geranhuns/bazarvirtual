"use client";
require("dotenv").config();

import { useEffect, useState } from "react";
import { FaFacebookF } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { IoLogoTiktok } from "react-icons/io5";

export default function MarcaHeaderInfo({ id }) {
  const [brandInfo, setBrandInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [redesSociales, setRedesSociales] = useState(null);

  const getMarca = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/marca/${id}`
      );
      const data = await response.json();
      setBrandInfo(data.data);
      setRedesSociales(data.data.socialNetworks);

      localStorage.setItem("brandProfilePicture", data.data.profilePicture);
      localStorage.setItem("brandUsername", data.data.username);

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMarca();
  }, []);

  if (loading) {
    <div>Cargando...</div>;
  }

  if (brandInfo) {
    return (
      <>
        <div className="flex flex-col  md:flex-row   gap-10  md:px-10 py-7 bg-patina-500 rounded-xl w-full lg:max-w-4xl  my-10 items-center drop-shadow-lg">
          <div className="flex items-center justify-center md:w-5/12  rounded-full overflow-hidden drop-shadow-lg">
            <img
              src={brandInfo.profilePicture}
              alt={brandInfo.username}
              className=" object-cover  size-64 md:size-80 rounded-full  "
            />
          </div>
          <div className="flex flex-col items-center w-full md:w-7/12 h-80">
            <div
              id="infoMarca"
              className="flex flex-col items-center justify-center w-full bg-patina-900 md:rounded-xl text-raw-sienna-50 drop-shadow-lg p-4"
            >
              <h2 className="text-4xl font-semibold">{brandInfo.username}</h2>
              <h3 className="pt-2 text-lg italic">{brandInfo.slogan}</h3>
              <div className=" flex justify-center gap-x-4 my-5 ">
                {redesSociales &&
                  redesSociales.map((red) => {
                    if (red.platform === "facebook" && red.url != "") {
                      return (
                        <a
                          key={red._id}
                          href={`http://${red.url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaFacebookF className="w-9 h-9  " />
                        </a>
                      );
                    }
                    if (red.platform === "instagram" && red.url != "") {
                      return (
                        <a
                          key={red._id}
                          href={`http://${red.url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <AiFillInstagram className="w-10 h-10     max-sm:w-auto" />
                        </a>
                      );
                    }
                    if (red.platform === "tiktok" && red.url != "") {
                      return (
                        <a
                          key={red._id}
                          href={`http://${red.url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <IoLogoTiktok className="w-11 h-11  max-sm:w-auto " />
                        </a>
                      );
                    }
                  })}
              </div>
            </div>
            <p className=" text-lg text-raw-sienna-50 p-4 mt-1 text-ellipsis overflow-hidden text-pretty">
              {brandInfo.description}
            </p>
          </div>
        </div>
      </>
    );
  }
}
