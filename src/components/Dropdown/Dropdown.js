"use client";
import React, { useState } from "react";

export default function Dropdown({
  options,
  className,
  setSearchCategory,
  quantity,
  handleDropdown,
}) {
  return (
    <div className="w-20">
      <label htmlFor="dropdown"></label>
      <select
        id="dropdown"
        value={quantity} // Asegúrate de que 'quantity' sea un valor primitivo
        onChange={(e) => {
          handleDropdown(e); // Pasar el valor como string
        }}
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
