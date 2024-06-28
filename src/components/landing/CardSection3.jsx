import React from "react";

function CardSection3(props){
   const { bgClass, bgImageClass, title, description } = props;
    return(
        <>
        <div className={`w-3/12 h-5/6 rounded-3xl ${bgClass} flex flex-col items-center justify-center max-sm:w-11/12 max-sm:h-custom2 max-sm:justify-start `}>
          <div className={`${bgImageClass} bg-cover bg-center w-10/12 h-3/6 max-sm:h-3/6 max-sm:mt-3`}>
          </div>
          <div className=" w-10/12 h-2/6 flex flex-col justify-around gap-2 ">
            <h3 className="text-custom2 font-bold text-Eggshell leading-custom4 max-sm:text-2xl max-sm:text-center">{title}</h3>
            <p className="text-left text-base text-Eggshell max-sm:text-base max-sm:text-center">{description}</p>
          </div>
        </div>
        </>
    )
}

export default CardSection3;