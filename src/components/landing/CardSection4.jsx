import React from "react";

function CardSection4( props){
    const { bgClass, iconCard, title, description1,description2, textButton, bgButton, hoverButton } = props;
    return(
        <>
        <div className={`${bgClass} w-1/2 h-full flex justify-center items-center`}>
          <div className=" w-9/12 h-5/6 flex flex-col items-center justify-around ">
            <div className=" w-full h-2/6 flex flex-col items-center">
              {iconCard}
              <h3 className="text-custom2 text-Eggshell text-center leading-custom4 font-bold">{title}</h3>
            </div>
            <div className=" w-full h-3/6 text-2xl font-light text-center text-Eggshell flex flex-col justify-around items-center jus">
                <ul className="list-disc list-inside">
                  <li >{description1}</li>
                  <li>{description2}</li>
                </ul>
                <button className={`w-2/3 h-11 ${bgButton} text-xl rounded-2xl font-semibold ${hoverButton}`}>{textButton}</button>
            </div>
          </div>
        </div>
        </>
    )
}

export default CardSection4;