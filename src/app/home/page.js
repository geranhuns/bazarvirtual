"use client";
require("dotenv").config();

import { useEffect, useState } from "react";
import ProximosBazares from "@/components/ProximosBazaresBanner/ProximosBazaresBanner";
import ProductSmallView from "@/components/SmallViews/ProductSmallView";
export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const apiBaseUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/products`;
    console.log("API Base URL:", apiBaseUrl);
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setProducts(data.data);
      });
  }, []);

  return (
    <div className="flex flex-col    mx-auto  lg:max-w-screen-xl overflow-auto ">
      <div className="flex flex-col w-full mx-auto lg:max-w-screen-xl items-center">
        <ProximosBazares className="" />
        <h2 className="pt-6 text-xl">Productos destacados</h2>
        <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-5 ">
          {products &&
            products.map((item) => {
              return <ProductSmallView key={item._id} item={item} />;
            })}
        </div>
      </div>
    </div>
  );
}
