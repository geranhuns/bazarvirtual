"use client";
import React, { useState } from "react";

export default function Dropdown({ options }) {
  const [selectedOption, setSelectedOption] = useState("Todos");
  const handleDropdown = (e) => {
    setSelectedOption(e.target.value);
  };
  return (
    <div className="w-20">
      <label htmlFor="dropdown"></label>
      <select id="dropdown" value={selectedOption} onChange={handleDropdown}>
        {options.map((option, index) => (
          <option value={option} key={index}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
