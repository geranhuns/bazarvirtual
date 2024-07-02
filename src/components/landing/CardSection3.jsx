import React from "react";
// import EcoShopping from "../../../public/img/EcoShopping"
function CardSection3(props) {
  const { bgClass, bgImageClass, title, description, src } = props;
  return (

    <div className={`w-full h-full rounded-3xl ${bgClass} grid grid-cols-1   items-center justify-center   py-10 px-6 `}>
      <div className="row-start-1">

        <img src={src} alt="image" className="w-full h-full" />
      </div>
      <div className=" flex  flex-col justify-around space-y-2 px-4 mt-3 row-start-2 h-60">
        <h3 className="text-custom2 font-bold text-Eggshell leading-custom4 max-sm:text-2xl max-sm:text-center">{title}</h3>
        <p className="text-left text-base text-Eggshell max-sm:text-base max-sm:text-center">{description}</p>
      </div>
    </div>

  )
}

export default CardSection3;