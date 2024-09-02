import React from "react";

function CardSection6(props) {
    const { bg, photo, testimonio, namePerson, bazarName } = props;
    return (
        <>
            <div className={`mt-4 ml-5  ${bg} w-11/12 text-raw-sienna-50 h-96  rounded-3xl flex flex-col items-center gap-y-8`}>
                <div className="w-1/3 h-1/3 flex justify-end overflow-hidden self-end">
                    <img src={photo} alt="" className="object-cover object-center rounded-bl-custom1 rounded-tr-3xl" />
                </div>
                <div className="w-10/12 h-3/6 flex flex-col gap-y-8">
                    <p className="text-xl font-light italic leading-6 ">&quot;{testimonio}&quot;</p>
                    <div className="flex flex-col gap-y-1 leading-5 pb-6">
                        <span className="font-semibold">{namePerson}</span>
                        <span>{bazarName}</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CardSection6;