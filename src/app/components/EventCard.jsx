export default function EventCard(props) {
    return (
        <div className="mb-3 shadow-lg rounded-lg overflow-hidden h-[280px]">
            <div className="flex h-full">
                <div className="flex-1 w-2/5 h-full">
                    <img
                        src={props.img}
                        alt={props.title}
                        className="w-full h-full object-cover rounded-tl-lg rounded-bl-lg"
                    />
                </div>
                <div className="flex-1 w-3/5 p-4">
                    <div className="mb-2 text-center font-semibold text-xl">{props.title}                        
                    </div>
                    <div>
                        <div className="mb-2">
                            <div className="font-semibold">Date:</div>
                            <div>{props.date}</div>
                        </div>
                        <div className="mb-2">
                            <div className="font-semibold">Location:</div>
                            <div>{props.location}</div>
                        </div>
                        <div className="mb-2">
                            <div className="font-semibold">Description:</div>
                            <div>{props.description}</div>
                        </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-3">
                        <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-[#D8DBCC] transition">
                            Join Event!
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
