import { useFetcher, useParams } from "react-router-dom"
import { ButtomFooter } from "../footers/ButtomFooter"
import { SectionIndicator } from "../headers/SectionIndicator"
import { GridSeatsLayout } from "../bodys/GridSeatsLayout";
import { SeatStatus } from "../bodys/SeatStatus";
import { useEffect, useState } from "react";
import { DaysCard } from "../bodys/DaysCard";
import { HoursCard } from "../bodys/HoursCard";

const DAYS = {
    '0': 'Domingo',
    '1': 'Lunes',
    '2': 'Martes',
    '3': 'Miércoles',
    '4': 'Jueves',
    '5': 'Viernes',
    '6': 'Sábado'
}

export const SeatsSelection = () => {

    const { id } = useParams();
    const [funcion, setFuncion] = useState(null)
    const [formatDay, setFormatDay] = useState([])
    const [functionSchedule, setFunctionSchedule] = useState([])

    useEffect(() => {
        let resultado = {}

        formatDay.forEach(val => {

            const clave = `${val.dia}-${val.dia_semana}`;
            if (!resultado[clave]) resultado[clave] = { ...val }
            else {
                const horasUnicas = new Set([...resultado[clave].hora, ...val.hora].map(JSON.stringify))
                resultado[clave].hora = Array.from(horasUnicas).map(JSON.parse)
            }

        })
        const arregloFinal = Object.values(resultado)
        setFunctionSchedule(arregloFinal)
    }, [formatDay])

    useEffect(() => {
        if (!funcion) return
        funcion.forEach(({ _id, fecha_init }) => {
            let diaSemana = DAYS[`${new Date(fecha_init).getDay()}`].slice(0, 3);
            let dia = new Date(fecha_init).getDate()


            let objFuncion = {
                dia_semana: diaSemana,
                dia: dia,
                hora: [{
                    id: _id,
                    hora: new Date(fecha_init).getUTCHours() + ':' + new Date(fecha_init).getMinutes()
                }]
            }

            setFormatDay(prev => [...prev, objFuncion])
        })
    }, [funcion])

    useEffect(() => {
        let funciones = fetch(`http://localhost:3000/movie/${id}/functions`)
            .then(res => res.json()).then(data => setFuncion(data.msg))
    }, [])

    const [daySelected, setDaySelected] = useState({})
    const selectDay = (ref, id) => {
        console.log(ref);
        let { elemento } = daySelected ?? 0
        console.log('k',elemento);
        if (elemento) {
            elemento.classList.remove('bg-rojoFuerte', 'text-white')
            elemento.classList.add('bg-white', 'text-black')
        }
        if (ref == elemento) {
            elemento.classList.remove('bg-rojoFuerte', 'text-white')
            ref.classList.add('bg-white', 'text-black')
            return setDaySelected(null)
        }
        ref.classList.add('bg-rojoFuerte', 'text-white')
        setDaySelected({ elemento: ref, id: id })
    }

    const [horas, setHoras] = useState(null)
    useEffect(() => {
        let { id } = daySelected ?? false
        if (id == 1 || id == 0 ) {
            let { hora } = functionSchedule[id]
            setHoras(hora)
            console.log(horas);
        }

    }, [daySelected])

    return (
        <>
            <SectionIndicator section='Choose seat' />

            <main className="flex flex-col gap-[20px]">
                {
                    !funcion ? <h1>Cargando...</h1> : (
                        <>
                            <section className="flex flex-col items-center w-full">
                                <svg width="306" height="41" viewBox="0 0 306 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g filter="url(#filter0_d_2_891)">
                                        <path d="M7 29.2619C85 -7.23758 207 -4.23804 299 29.2612" stroke="#FE0000" strokeWidth="6"
                                            strokeLinecap="round" />
                                    </g>
                                    <defs>
                                        <filter id="filter0_d_2_891" x="-0.000717163" y="-6.10352e-05" width="306.002"
                                            height="40.2627" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                            <feColorMatrix in="SourceAlpha" type="matrix"
                                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                            <feOffset dy="4" />
                                            <feGaussianBlur stdDeviation="2" />
                                            <feComposite in2="hardAlpha" operator="out" />
                                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2_891" />
                                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2_891" result="shape" />
                                        </filter>
                                    </defs>
                                </svg>
                                <p>Screen this way</p>
                            </section>

                            <section className="flex flex-col gap-2 p-[20px]">
                                <GridSeatsLayout fila="A" />
                                <GridSeatsLayout fila="B" />
                                <span className="h-[40px]"></span>
                                <GridSeatsLayout fila="C" />
                                <GridSeatsLayout fila="D" />
                                <GridSeatsLayout fila="E" />
                                <GridSeatsLayout fila="F" />
                            </section>

                            <div className="flex w-full justify-center gap-[20px]">
                                <SeatStatus text='Aviable' color='linear' />
                                <SeatStatus text='Reserved' color='white' />
                                <SeatStatus text='Selected' color='rojoFuerte' />
                            </div>

                            <section className="flex flex-col gap-[20px] ml-[20px] ">
                                <div className="flex gap-[20px]">
                                    {
                                        functionSchedule.map(({ dia, dia_semana }, i) => (
                                            <DaysCard key={i} id={i} setSelected={selectDay} dia={dia} dayName={dia_semana} />
                                        ))
                                    }
                                </div>
                                <div>
                                    {
                                        horas && (
                                            <HoursCard horas={horas} />
                                        )
                                    }
                                </div>
                            </section>

                        </>
                    )
                }
            </main>

            <ButtomFooter price btnText='Buy ticket' />

        </>
    )

}