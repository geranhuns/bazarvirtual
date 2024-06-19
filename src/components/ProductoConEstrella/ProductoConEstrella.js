"use client";

import { FaRegStar, FaStar } from "react-icons/fa6";

import { useState } from "react";
const ProductWithStar = ({ imageUrl, altText }) => {
  const [activeStar, setActiveStar] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const [addToWishList, setAddToWishList] = useState([]);

  const handleClick = () => {
    setActiveStar(!activeStar);
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  };

  return (
    <div className="relative inline-block">
      <img src={imageUrl} alt={altText} className="w-full h-auto rounded-md" />
      <div className="cursor-pointer" onClick={handleClick}>
        {activeStar === false ? (
          <FaRegStar className="absolute bottom-6 left-6  text-4xl" />
        ) : (
          <FaStar className="absolute bottom-6 left-6 text-yellow-bazar text-4xl" />
        )}
      </div>
      {showMessage && activeStar && (
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white text-center py-2">
          Haz agregado este producto a tu lista de deseos
        </div>
      )}
      {showMessage && !activeStar && (
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white text-center py-2">
          Haz eliminado este producto a tu lista de deseos
        </div>
      )}
    </div>
  );
};

export default ProductWithStar;
