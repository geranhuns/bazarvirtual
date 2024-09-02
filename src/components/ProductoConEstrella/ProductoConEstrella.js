"use client";

import { FaRegStar, FaStar } from "react-icons/fa6";
import { useEffect, useState } from "react";
const ProductoConEstrella = ({
  imageUrl,
  altText,
  addToWishList,
  removeFromWishList,
  alreadyOnWishList,
}) => {
  const [activeStar, setActiveStar] = useState(false);
  // const [showMessage, setShowMessage] = useState(false);
  useEffect(() => {
    setActiveStar(alreadyOnWishList);
  }, [alreadyOnWishList]);

  const handleClick = () => {
    if (activeStar) {
      removeFromWishList();
    } else {
      addToWishList();
    }
    setActiveStar(!activeStar);
  };

  return (
    <div className="relative inline-block w-full">
      <img src={imageUrl} alt={altText} className="w-full h-auto rounded-md" />
      <div className="cursor-pointer" onClick={handleClick}>
        {activeStar === false ? (
          <FaRegStar className="absolute md:bottom-6 md:left-6 bottom-2 left-2 text-xl md:text-4xl text-yellow-bazar" />
        ) : (
          <FaStar className="absolute md:bottom-6 md:left-6 bottom-2 left-2 text-yellow-bazar text-xl md:text-4xl" />
        )}
      </div>
    </div>
  );
};

export default ProductoConEstrella;
