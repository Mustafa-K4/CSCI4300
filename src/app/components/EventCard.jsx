import Image from 'next/image';

export default function EventCard(props) {
    return (
        <div className="mb-3 shadow-lg rounded-lg overflow-hidden h-[320px] border-2 border-[#C85250]">
            <div className="flex h-full">
                <div className="flex-1 w-2/5 h-full relative">
                    <Image src={props.imageUrl} alt={props.name} fill className="object-cover rounded-tl-lg rounded-bl-lg"/>
                </div>
                <div className="flex-1 w-3/5 p-4">
                    <div className="mb-2 text-center font-semibold text-xl">
                        {props.name}                        
                    </div>
                    <div>
                        <div className="mb-2">
                            <div className="font-semibold">Creator: {props.owner}</div>
                        </div>
                        <div className="mb-2">
                            <div className="font-semibold">Date and Time:</div>
                            <div>{props.date} @ {props.startTime} - {props.endTime || "TBD"}</div>
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
                        <button className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-500 transition">
                            Join Event!
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
