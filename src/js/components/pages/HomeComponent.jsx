import { NavBar } from '../headers/NavBar.jsx'
import { CardsCarrusel } from '../bodys/CardsCarrusel.jsx'
import { ComingCards } from '../bodys/ComingCards.jsx'
import {FooterNavBar} from '../footers/PrincipalFooter.jsx'
// hooks
import { useState } from 'react'
import { useLoaderData } from 'react-router-dom';

export async function moviesLoader () {
    let data = await fetch('http://localhost:3000/movies').then(res => res.json())
    
    let prox = data.data.filter(mov => mov.estado == 'proximamente')
    data = data.data.filter(mov => mov.estado == 'en cartelera' || mov.estado == 'estreno')
    
    return {proximamente: prox, data: data}
}

export const HomeComponent = () => {
    
    const fullData = useLoaderData();
    const {proximamente} = fullData
    const {data} = fullData;
    console.log(proximamente)
    
    const [ movie, setMovie ] = useState({title: "puss in boots the last...", gender: "Adventure"})


    return (
        <>
            <NavBar name={import.meta.env.VITE_MONGOUSER}/>
            
            <main className='w-full'>
                <section className='flex text-xl justify-between p-[20px]'>
                    <strong>Now playing</strong>
                    <a href="/" className='text-red-500'>See all</a>
                </section>

                <div className='my-[10px] flex max-w-full overflow-x-scroll'>
                    <div className='flex gap-[20px]'>
                    {
                        data.map(({_id, title, poster}) => {
                            return <CardsCarrusel key={_id} id={_id} title={title} poster={poster}/>
                        })
                    }
                    </div>
                </div>  

                <section className='w-full flex flex-col justify-between capitalize items-center mt-[20px]'>
                    <strong className='text-xl'> {movie.title} </strong>
                    <p className='text-semiWhite'> {movie.gender} </p>
                    <p>...</p>
                </section>

                <section className='flex flex-col gap-[20px] p-[20px]'>
                    <div className='flex text-xl justify-between'>
                        <strong>Coming soon</strong>
                        <a href="/" className='text-red-500'>See all</a>
                    </div>
                    
                    <div className='flex flex-col justify-center items-center gap-[15px]  mb-[100px]'>
                        {
                            proximamente.map(({_id, titulo, poster, genero, fecha}) => (
                                <ComingCards key={_id} fecha={fecha} title={titulo} poster={poster} genero={genero} />
                            ))
                        }
                    </div>

                </section>
            </main>

            <FooterNavBar />
        </>
    )

}