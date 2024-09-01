import { useLoaderData } from "react-router-dom"
import { SectionIndicator } from "../headers/SectionIndicator"

import { TicketCard } from "../bodys/TicketCard"

export const loader = async ({params}) => {

    const {data} = await fetch(`http://localhost:3000/ticket/${params.id}`).then(res => res.json())
    const movie = await fetch(`http://localhost:3000/movie/${data.pelicula}`).then(res => res.json())
    return {data, movie: movie.data}

}

export const TicketComponent = () => {

    const {data} = useLoaderData()
    const {movie} = useLoaderData();
    console.log(data, movie)

    return (

        <>
        
            <SectionIndicator to={'/'} section='Ticket' />

            <main className="py-[20px] px-[40px] ">
                <TicketCard img={movie.poster} title={movie.titulo} {...data} />
            </main>

        </>

    )

}