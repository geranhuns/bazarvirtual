"use client";

import { useRouter } from "next/navigation";
export default function MarcaSmallView({
  className,
  brand,
  id,
  createdBy,
  profilePicture,
  brandId,
  logo,
}) {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        {
          if (brandId) {
            router.push(`/marcas/${brandId}`);
          }
          if (createdBy) {
            router.push(`/marcas/${createdBy._id}`);
          }
        }
      }}
      className={`flex gap-2  items-center ${className} text-gray-700 w-full`}
    >
      <div className="w-12 h-12 overflow-hidden rounded-full shadow-sm">
        <img
          className="object-cover w-full h-full cursor-pointer"
          src={profilePicture}
          alt="logo"
        />
      </div>
      <h3 className="text-raw-sienna-500 cursor-pointer text-lg">{brand}</h3>
      <div className="text-center text-lg w-24">
        {id && <h3>{id}</h3>}
        {createdBy && <h3>{createdBy.username}</h3>}
      </div>
    </div>
  );
}
