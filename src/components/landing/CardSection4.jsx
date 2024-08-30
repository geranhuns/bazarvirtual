import React from "react";

function CardSection4(props) {
  const { bgClass, iconCard, title, description1, description2, textButton, bgButton, hoverButton } = props;
  return (
    <>
      <div className={`${bgClass}  w-full lg:w-1/2 justify-center flex py-10 text-raw-sienna-50 `}>
        <div className="px-4 flex flex-col items-center justify-center text-center space-y-4">
          <div className="flex flex-col items-center space-y-4">
            {iconCard}
            <h3 className="text-xl lg:text-3xl font-bold">{title}</h3>
          </div>
          <div className=" text-2xl font-light flex flex-col justify-around items-center">
            <ul className="flex flex-col justify-center space-y-8">
              <li>{description2}</li>
              <li >{description1}</li>
            </ul>
            <button className={`${bgButton} text-xl flex justify-center items-center rounded-lg font-semibold  py-3 px-4 ${hoverButton} mt-8`}>
              <a href="/register">
                {textButton}
              </a>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default CardSection4;