import { Link } from "react-router-dom"

export const CardsCarrusel = () => {

    
    



    return (
        <>
            <div className="w-[200px] h-[350px]">
                <Link to={'movie/1'}>
                <img className="w-[100%] h-[100%] rounded-2xl object-cover" src="https://w0.peakpx.com/wallpaper/292/886/HD-wallpaper-puss-in-boots-dreamworks.jpg" alt="Puss in bots" />
                </Link>
            </div>
        </>

    )

}