"use client";

export default function MarcaSmallView2({
  brand,
  profilePicture,
  
}) {
 
  return (
    <div
     
      className={`flex gap-2 items-center ${className}`}
    >
      <div className="w-12 h-12 overflow-hidden rounded-full">
        <img
          className="object-contain h-full cursor-pointer"
          src={profilePicture}
          width="50px"
          heigth="50px"
          alt="logo"
        />
      </div>
      <h3 className="underline cursor-pointer">{brand}</h3>
      <div className="text-center text-lg w-24">
      </div>
    </div>
  );
}
