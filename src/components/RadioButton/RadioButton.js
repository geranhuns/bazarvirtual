import React, { useState } from "react";

export default function RadioButton() {
  const [selectedOption, setSelectedOption] = useState("bazar");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="flex gap-20">
      <div>
        <label className="flex gap-3">
          <input
            type="radio"
            value="bazar"
            checked={selectedOption === "bazar"}
            onChange={handleOptionChange}
          />
          Bazar
        </label>
      </div>
      <div>
        <label className="flex gap-3">
          <input
            type="radio"
            value="marca"
            checked={selectedOption === "marca"}
            onChange={handleOptionChange}
          />
          Marca
        </label>
      </div>
    </div>
  );
}
