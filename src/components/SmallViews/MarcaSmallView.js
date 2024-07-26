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
  console.log(createdBy);
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
      className={`flex gap-2 items-center ${className}`}
    >
      <div className="w-12 h-12 overflow-hidden rounded-full">
        <img
          className="object-contain h-full"
          src={logo}
          width="50px"
          heigth="50px"
          alt="logo"
        />
      </div>
      <h3>{brand}</h3>
      <div className="text-center text-lg w-24">
        {id && <h3>{id}</h3>}
        {createdBy && <h3>{createdBy.username}</h3>}
      </div>
    </div>
  );
}
