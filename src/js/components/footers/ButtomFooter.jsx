import { Link } from "react-router-dom"

export const ButtomFooter = ({price=false, btnText}) => {

    return (
        <footer className={`flex w-full bottom-0 fixed items-center ${ price ? 'justify-evenly' : 'justify-center' } h-[100px] bg-footerNav`}>
            {
                price && (
                    <div>
                        <p>Price</p>
                        <p><strong>$24.99</strong></p>
                    </div>
                )
            }
            <Link className={`${ price ? ' w-[60%]' : 'w-[80%]' }`} to={'seats'}><button className={'bg-red-600 p-[10px] w-full rounded-xl'}> { btnText } </button></Link>
        </footer>
    )

}