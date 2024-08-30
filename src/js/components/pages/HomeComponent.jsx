import { NavBar } from '../headers/NavBar.jsx'
import { CardsCarrusel } from '../bodys/CardsCarrusel.jsx'
import { ComingCards } from '../bodys/ComingCards.jsx'
import {FooterNavBar} from '../footers/PrincipalFooter.jsx'
// hooks
import { useEffect, useRef, useState } from 'react'
import { useLoaderData } from 'react-router-dom';

export async function moviesLoader () {
    let data = await fetch('http://localhost:3000/movies', {cache: "force-cache"}).then(res => res.json())
    
    let prox = data.data.filter(mov => mov.estado == 'proximamente')
    data = data.data.filter(mov => mov.estado == 'en cartelera' || mov.estado == 'estreno')
    
    return {proximamente: prox, data: data}
}

export const HomeComponent = () => {
    
    const fullData = useLoaderData();
    const {proximamente} = fullData
    const {data} = fullData;
    
    const [ movie, setMovie ] = useState({title: "puss in boots the last...", gender: "Adventure"})
    
    const [activeIndex, setActiveIndex] = useState(0);
    const carouselRef = useRef(null);

    
    const moveCarousel = (offset) => {
        const newIndex = (activeIndex + offset + data.length) % data.length;
        setActiveIndex(newIndex);

        if (carouselRef.current) {
            carouselRef.current.style.transform = `translateX(-${newIndex * 270}px)`; 
        }
    };

    
    useEffect(() => {
        setMovie({
            title: data[activeIndex].titulo,
            gender: data[activeIndex].genero
        });
    }, [activeIndex, data]);

    return (
        <>
            <NavBar name={import.meta.env.VITE_MONGOUSER}/>
            
            <main className='w-full'>
                <section className='flex text-xl justify-between p-[20px]'>
                    <strong>Now playing</strong>
                    <a href="/" className='text-red-500'>See all</a>
                </section>

                <div className='my-[10px] flex max-w-full overflow-x-hidden relative'>
                    <div className='flex gap-[20px] ml-[120px] justify-center transition-transform duration-300 ' ref={carouselRef}>
                    {
                        data.map(({_id, title, poster}, index) => {
                            return <CardsCarrusel 
                                        key={_id} 
                                        id={_id} 
                                        title={title} 
                                        poster={poster}
                                        index={index}
                                        setActiveIndex={setActiveIndex} 
                                    />
                        })
                    }
                    </div>
                    <button 
                        className='absolute left-0 top-1/2 transform -translate-y-1/2 bg-semiWhite p-2 rounded-full'
                        onClick={() => moveCarousel(-1)}
                    >
                        &lt; {/* Flecha izquierda */}
                    </button>
                    <button 
                        className='absolute right-0 top-1/2 transform -translate-y-1/2 bg-semiWhite p-2 rounded-full'
                        onClick={() => moveCarousel(1)}
                    >
                        &gt; {/* Flecha derecha */}
                    </button>
                </div>  

                <section className='w-full flex flex-col gap-[15px] justify-between capitalize items-center mt-[20px]'>
                    <strong className='text-xl'> {movie.title} </strong>
                    <p className='text-semiWhite'> {movie.gender} </p>
                    <div className='flex'>
                        {data.map((_, index) => (
                            <span 
                                key={index}
                                className={`h-[10px] transition duration-300 rounded-full mx-1 ${index === activeIndex ? 'bg-red-500 w-[30px]' : 'bg-semiWhite w-[10px]'}`}
                            ></span>
                        ))}
                    </div>
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