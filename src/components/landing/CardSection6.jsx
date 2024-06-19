import React from "react";

function CardSection6(props){
    const{bg, photo, testimonio, namePerson, bazarName} =  props;
    return(
        <>
        <div className={`mt-4 ml-5  ${bg} w-11/12 text-Eggshell h-96 border-2 rounded-3xl flex flex-col items-center gap-y-8`}>
            <div className=" w-full h-2/6 flex justify-end ">
                <img src={photo} alt="" className="rounded-bl-custom1 rounded-tr-3xl" />
            </div>
            <div className="  w-10/12 h-3/6 flex flex-col gap-y-10">
                <p className="text-lg font-light italic leading-6 ">"{testimonio}"</p>
                <div className="flex flex-col gap-y-1 leading-5">
                    <span>{namePerson}</span>
                    <span>{bazarName}</span>
                </div>
            </div>
        </div>
        </>
    )
}

export default CardSection6;