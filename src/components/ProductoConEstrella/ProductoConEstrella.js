"use client";

import { FaRegStar, FaStar } from "react-icons/fa6";

import { useState } from "react";
const ProductoConEstrella = ({ imageUrl, altText, addToWishList }) => {
  const [activeStar, setActiveStar] = useState(false);
  // const [showMessage, setShowMessage] = useState(false);

  const handleClick = () => {
    setActiveStar(!activeStar);
    addToWishList();
    // setShowMessage(true);
    // setTimeout(() => {
    //   // setShowMessage(false);
    // }, 3000);
  };

  return (
    <div className="relative inline-block w-80">
      <img src={imageUrl} alt={altText} className="w-full h-auto rounded-md" />
      <div className="cursor-pointer" onClick={handleClick}>
        {activeStar === false ? (
          <FaRegStar className="absolute md:bottom-6 md:left-6 bottom-2 left-2 text-xl md:text-4xl" />
        ) : (
          <FaStar className="absolute md:bottom-6 md:left-6 bottom-2 left-2 text-yellow-bazar text-xl md:text-4xl" />
        )}
      </div>
      {/* {showMessage && activeStar && (
        <div className="leading-6 absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white text-center py-1 text-xs md:text-xl">
          Haz agregado este producto a tu lista de deseos
        </div>
      )}
      {showMessage && !activeStar && (
        <div className=" leading-6 absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white text-center py-1 text-xs md:text-xl">
          Haz eliminado este producto de tu lista de deseos
        </div>
      )} */}
    </div>
  );
};

export default ProductoConEstrella;
