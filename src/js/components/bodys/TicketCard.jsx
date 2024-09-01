import { TicketDesc } from "./TicketDesc"

export const TicketCard = ({img, title,fechaFuncion, hora, sala, total, asientos, _id}) => {

    return (
        <div className="h-[700px] flex flex-col justify-around w-full bg-white rounded-3xl text-black p-[20px] ">
            <section className=" flex flex-col gap-[10px] " >
                <img className="w-full h-[130px] object-cover object-[center_25%] rounded-3xl" src={`https://${img}`} alt={title} />
                <div className="flex flex-col gap-[10px">
                    <p className="text-xl"><strong>{title}</strong></p>
                    <p className="text-[#0007]"><small>Show this ticket at the entrance</small></p>
                </div>
            </section>
            <hr />
            <section>
                <div className="flex w-full justify-between items-center mb-[50px]">
                    <div>
                        <p className="text-[#0007] text-sm"><strong>Cinema</strong></p>
                        <p className="text-xl"><strong>Cine Campus</strong></p>
                    </div>
                    <div className=" w-[50px] h-[50px] ">
                        <img className=" rounded-lg w-full h-full object-cover " src="https://unavatar.io/pheralb" alt="unavatar" />
                    </div>
                </div>
                <div className="flex flex-col justify-between w-full gap-[20px]">

                    <TicketDesc title='Date' content={fechaFuncion} title2='Time' content2={hora} />
                    <TicketDesc title='Cinema Hall #' content={sala} title2='Seat/s' content2={asientos.join(', ')} />
                    <TicketDesc title='Cost' content={`$ ${total}`} title2='Order ID' content2={_id} />
                </div>
            </section>
            <section className="border-t-[2px] border-[#0007] border-spacing-4 border-dashed h-[100px] flex items-center ">
                <img src={`https://barcode.tec-it.com/barcode.ashx?data=${_id}&code=Code128&translate-esc=on`}/>
            </section>
        </div>
    )

}