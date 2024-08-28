"use client";

export default function MarcaSmallView2({
  brand,
  profilePicture,
  className
  
}) {
 
  return (
    <div
     
      className={`flex gap-2 items-center  ${className}`}
    >
      <div className="w-12 h-12 overflow-hidden rounded-full border border-gray-500">
        <img
          className="object-contain h-full cursor-pointer "
          src={profilePicture}
          width="50px"
          heigth="50px"
          alt="logo"
        />
      </div>
      <h3 className="text-lg font-semibold">{brand}</h3>
    </div>
  );
}
