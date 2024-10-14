import { useLoaderData } from "react-router-dom"
import { SectionIndicator } from "../headers/SectionIndicator"

import { TicketCard } from "../bodys/TicketCard"
const URL = import.meta.env.VITE_BACKEND_HOST || "http://localhost:3000"
export const loader = async ({params}) => {

    const {data} = await fetch(`${URL}/ticket/${params.id}`).then(res => res.json())
    return data

}

export const TicketComponent = () => {

    const data = useLoaderData()

    return (

        <>
        
            <SectionIndicator to={'/'} section='Ticket' />

            <main className="py-[20px] px-[40px] ">
                <TicketCard {...data} />
            </main>

        </>

    )

}