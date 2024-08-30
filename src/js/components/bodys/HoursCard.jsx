import { useRef, useState, useEffect } from "react"


export const HoursCard = ({id, hora, setSelected}) => {

    const hourRef = useRef(null)
    hora = `${hora}0`
    const selectThisElement = (ref) => {
        let reference = ref.current
        let salaId = salaInfo._id
        setSelected({reference, id, hora, salaId, tipo_sala: salaInfo.tipo_Sala, sala: salaInfo.nombre, fila_vip: salaInfo.filaVip})
    }

    const [salaInfo, setSalaInfo] = useState(null)

    useEffect(()=>{
        
        fetch(`http://localhost:3000/room/${id}`)
            .then(res => res.json())
            .then(({data}) => setSalaInfo((data)))
        
    }, [])

    return (
        <button ref={hourRef} onClick={() => selectThisElement(hourRef)} className="flex w-[110px] h-[70px] flex-col p-[20px] bg-white text-black  justify-center items-center rounded-lg">
            <p className="text-xl"><strong> {hora} </strong></p>
            <p><small>{`$14000°${salaInfo?.tipo_Sala}`}</small></p>
        </button>
    )

}