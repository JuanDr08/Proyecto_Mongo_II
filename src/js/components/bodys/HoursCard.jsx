import { useRef } from "react"


export const HoursCard = ({horas, setSelected}) => {

    const hourRef = useRef(null)

    return (
        <>
            {
                horas.map(({id, hora}) => (
                    <button ref={hourRef} onClick={()=> setSelected(hourRef.current)} className="flex w-[100px] h-[60px] flex-col p-[20px] bg-white text-black justify-center items-center rounded-lg">
                        <p><strong> {`${hora}0`} </strong></p>
                    </button>
                ))
            }
        </>
    )

}