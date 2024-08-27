import { NavBar } from './headers/NavBar.jsx'
import { CardsCarrusel } from './bodys/CardsCarrusel.jsx'
import { useState } from 'react'


export const App = () => {

    const [ movie, setMovie ] = useState({title: "puss in boots the last...", gender: "Adventure"})


    return (
        <>
            <NavBar name="Juan David"/>
            <main className='w-full'>
                <section className='flex text-xl justify-between p-[20px]'>
                    <strong>Now playing</strong>
                    <a href="/" className='text-red-500'>See all</a>
                </section>

                <div className='my-[10px] flex max-w-full overflow-x-scroll'>
                    <div className='flex gap-[20px]'>
                    <CardsCarrusel/>
                    <CardsCarrusel/>
                    <CardsCarrusel/>
                    <CardsCarrusel/>
                    </div>
                </div>  

                <section className='w-full flex flex-col justify-between capitalize items-center mt-[20px]'>
                    <strong className='text-xl'> {movie.title} </strong>
                    <p className='text-semiWhite'> {movie.gender} </p>
                    <p>...</p>
                </section>

                

            </main>
        </>
    )

}