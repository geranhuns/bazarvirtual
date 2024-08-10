import React, { useState, useEffect } from "react";

export default function RadioButton({ setStateFormProp }) {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  useEffect(() => {
    //useEffect para monitorear cuando cambie el valor del state selectedOption
    setStateFormProp(selectedOption);
  }, [selectedOption]);

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
