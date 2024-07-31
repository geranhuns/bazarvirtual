"use client";
import Dropdown from "@/components/Dropdown/Dropdown";
import Link from "next/link";
import { useState, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";

export default function HeaderSearch() {
  const [categories, setCategories] = useState([]);
  const [searchCategory, setSearchCategory] = useState("Todo");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3001/products");
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        const allCategories = data.data.map((product) => product.category);
        const uniqueCategories = [...new Set(allCategories)];
        uniqueCategories.sort().unshift("Todo");
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleDropdown = (e) => {
    setSearchCategory(e.target.value);
  };

  return (
    <div className="md:flex  items-center  w-4/12 gap-0  hidden ">
      <Dropdown
        className="rounded-l-lg"
        options={categories}
        quantity={searchCategory}
        handleDropdown={handleDropdown}
      />
      <input
        type="text"
        className=" w-full p-1  "
        placeholder="Buscar productos..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <div className=" bg-yellow-bazar p-1.5 rounded-r-lg">
        <Link
          href={`/busquedaProductos?search=${searchTerm}&category=${searchCategory}`}
        >
          <IoIosSearch size={20} />
        </Link>
      </div>
    </div>
  );
}
