import { SeatSquare } from "./SeatSquare.jsx"

export const GridSeatsLayout = ({ fila }) => {

    return (
        <div className="flex w-full gap-[1px]">
            <p className="w-[5%]" >{fila}</p>
            <div className="flex gap-2 justify-center min-w-[95%] max-w-[95%]">
                <SeatSquare/>
                <SeatSquare/>
                <SeatSquare/>
                <SeatSquare/>
                <SeatSquare/>
                <SeatSquare/>
                <SeatSquare/>
                <SeatSquare/>
            </div>
        </div>
    )

}