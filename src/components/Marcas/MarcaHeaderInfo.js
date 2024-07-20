"use client";
import SocialMedia from "@/components/SocialMedia/SocialMedia";
import { Asul } from "next/font/google";
import { useEffect, useState } from "react";
import Section1Landing from "../landing/Section1Land";
import { FaFacebook, FaInstagramSquare } from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";
import Image from "next/image";
export default function MarcaHeaderInfo({ id }) {
  console.log(id);
  const [brandInfo, setBrandInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [redesSociales, setRedesSociales] = useState(null);

  const getMarca = async () => {
    try {
      const response = await fetch(`http://localhost:3001/marca/${id}`);
      const data = await response.json();
      setBrandInfo(data.data);
      setRedesSociales(data.data.socialNetworks);
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
        <div className="flex flex-col  md:flex-row justify-center gap-10 py-10">
          <div className="flex relative h-44 w-44 ">
            <Image
              src={brandInfo.profilePicture}
              alt={brandInfo.username}
              layout="fill"
              objectFit="cover"
              className=" overflow-hidden   rounded-full"
            />
          </div>
          <div id="infoMarca" className="flex flex-col justify-center pl-10 ">
            <h2>{brandInfo.username}</h2>
            <h3 className="pt-2">{brandInfo.slogan}</h3>
            <p className="pt-6 w-2/3">{brandInfo.description}</p>
            <div className=" flex justify-center gap-x-4 mb-5">
              {redesSociales &&
                redesSociales.map((red) => {
                  if (red.platform === "facebook" && red.url != "") {
                    return (
                      <a key={red._id} href={red.url}>
                        <FaFacebook className="w-10 h-11 rounded-custom2 text-facebook bg-white max-sm:w-auto" />
                      </a>
                    );
                  }
                  if (red.platform === "instagram" && red.url != "") {
                    return (
                      <a key={red._id} href={red.url}>
                        <FaInstagramSquare className="w-10 h-11 rounded-custom2  bg-instagram-gradient  max-sm:w-auto" />
                      </a>
                    );
                  }
                  if (red.platform === "tiktok" && red.url != "") {
                    return (
                      <a key={red._id} href={red.url}>
                        <AiFillTikTok className="w-10 h-11 rounded-custom2 text-black bg-tiktok-gradient max-sm:w-auto " />
                      </a>
                    );
                  }
                })}
            </div>
          </div>
          <SocialMedia />
        </div>
      </>
    );
  }
}
