"use client";
import React, { useState } from "react";

export default function Dropdown({
  options,
  className,
  setSearchCategory,
  quantity,
}) {
  const [selectedOption, setSelectedOption] = useState("Todos");
  const handleDropdown = (e) => {
    setSelectedOption(e.target.value);
    setSearchCategory(e.target.value);
  };
  return (
    <div className="w-20">
      <label htmlFor="dropdown"></label>
      <select
        id="dropdown"
        defaultValue={quantity}
        onChange={handleDropdown}
        className={`h-8 w-16 pl-1  bg-raw-sienna-200 text-raw-sienna-900 ${className}`}
      >
        {options.map((option, index) => (
          <option value={option} key={index}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
