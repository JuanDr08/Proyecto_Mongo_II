import { useRef } from "react"

export const CinemaCards = ({changeCinema}) => {
    
    const divRef = useRef(null)

    

    return (

        <div ref={divRef} onClick={() => changeCinema(divRef.current)} className="w-full flex justify-between items-center bg-linear rounded-2xl px-[15px] py-[10px] tracking-wider ">
            <section className="max-w-[80%]">
                <p><strong>Cine Campus</strong></p>
                <p className="text-semiWhite"><small>Centro Comercial Cacique, piso 4  </small></p>
            </section>

            <img className="w-[50px] rounded-xl" src="https://unavatar.io/pheralb" alt="cinecampus logo"/>

        </div>

    )

}