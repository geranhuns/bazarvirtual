"use client";
require("dotenv").config();

import { useEffect, useState } from "react";
import ProximosBazares from "@/components/ProximosBazaresBanner/ProximosBazaresBanner";
import ProductSmallView from "@/components/SmallViews/ProductSmallView";
export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const apiBaseUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/products`;
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
        <ProximosBazares className="w-11/12 md:w-auto" />
        <h2 className="pt-14 pb-6 text-4xl font-semibold text-patina-900 text-center">
          Productos destacados
        </h2>
        <div className="w-11/12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-5 ">
          {products &&
            products.map((item) => {
              return <ProductSmallView key={item._id} item={item} />;
            })}
        </div>
      </div>
    </div>
  );
}
