import React from "react";

function CardSection4(props) {
  const { bgClass, iconCard, title, description1, description2, textButton, bgButton, hoverButton } = props;
  return (
    <>
      <div className={`${bgClass}  w-full lg:w-1/2 justify-center h-[70vh] flex py-10 `}>
        <div className="  flex flex-col items-center justify-center px-12 ">
          <div className=" w-full  flex flex-col items-center">
            {iconCard}
            <h3 className="text-custom2 text-Eggshell text-center leading-custom4 font-bold  w-96">{title}</h3>
          </div>
          <div className=" w-full h-3/6 text-2xl font-light text-center text-Eggshell flex flex-col justify-around items-center ">
            <ul className="list-disc list-inside h-72 flex flex-col justify-center">
              <li >{description1}</li>
              <li>{description2}</li>
            </ul>
            <button className={`w-2/3 h-11 ${bgButton} text-xl flex justify-center items-center rounded-sm font-semibold  py-3 ${hoverButton}`}>
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