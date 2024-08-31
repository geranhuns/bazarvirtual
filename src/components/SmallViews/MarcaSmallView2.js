"use client";

export default function MarcaSmallView2({ brand, profilePicture, className }) {
  return (
    <div className={`flex gap-1 items-center  ${className}`}>
      <div className="w-12 h-12 overflow-hidden rounded-full ">
        <img
          className="object-cover h-full cursor-pointer "
          src={profilePicture}
          width="50px"
          heigth="50px"
          alt="logo"
        />
      </div>
      <h3 className="text-xl font-semibold text-raw-sienna-50 py-4">{brand}</h3>
    </div>
  );
}
