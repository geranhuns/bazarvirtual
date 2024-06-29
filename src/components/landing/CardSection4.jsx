import React from "react";

function CardSection4( props){
    const { bgClass, iconCard, title, description1,description2, textButton, bgButton, hoverButton } = props;
    return(
        <>
        <div className={`${bgClass} w-1/2 h-full flex justify-center items-center max-sm:h-1/2 max-sm:w-full`}>
          <div className=" w-9/12 h-5/6 flex flex-col items-center justify-around max-sm:justify-start  ">
            <div className=" w-full h-2/6 flex flex-col items-center">
              {iconCard}
              <h3 className="text-custom2 text-Eggshell text-center leading-custom4 font-bold max-sm:text-base">{title}</h3>
            </div>
            <div className=" w-full h-3/6 text-2xl font-light text-center text-Eggshell flex flex-col justify-around items-center max-sm:text-sm">
                <ul className="list-disc list-inside">
                  <li >{description1}</li>
                  <li>{description2}</li>
                </ul>
                <button className={`w-2/3 h-11 ${bgButton} text-xl rounded-2xl font-semibold max-sm:text-sm max-sm:h-8 max-sm:w-10/12 max-sm:mt-1 ${hoverButton}`}>{textButton}</button>
            </div>
          </div>
        </div>
        </>
    )
}

export default CardSection4;