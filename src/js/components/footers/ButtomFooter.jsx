import { Link } from "react-router-dom"

export const ButtomFooter = ({amount=14000,price=false, btnText, clasesExtra=false}) => {

    return (
        <footer className={`flex w-full bottom-0 fixed items-center ${clasesExtra && clasesExtra } ${ price ? 'justify-evenly' : 'justify-center' } h-[100px] bg-footerNav`}>
            {
                price && (
                    <div className="text-2xl">
                        <p>Price</p>
                        <p><strong>{`$ ${amount}`}</strong></p>
                    </div>
                )
            }
            <Link className={`${ price ? ' w-[60%]' : 'w-[80%]' }`} to={'seats'}><button className={'bg-red-600 p-[20px] w-full rounded-xl'}> { btnText } </button></Link>
        </footer>
    )

}