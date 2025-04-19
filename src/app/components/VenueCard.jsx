import Link from "next/link";

export default function VenueCard(props) {
    return (
        <div className="mb-4 shadow-lg rounded-2xl overflow-hidden border-2 border-[#C85250] bg-white p-4 flex flex-col justify-between h-[300px] w-[400px]">
            <div>
                <h2 className="text-center font-bold text-2xl text-[#C85250] mb-3">{props.name}</h2>

                <div className="mb-2">
                    <div className="font-semibold text-gray-700">Address:</div>
                    <div className="text-gray-800">
                        {props.address}, {props.city}, {props.state}
                    </div>
                </div>

                {props.url ? (
                    <div className="mb-2">
                        <div className="font-semibold text-gray-700">Link:</div>
                        <a 
                            href={props.url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-blue-600 underline hover:text-blue-800"
                        >
                            View on Ticketmaster
                        </a>
                    </div>
                ) : (
                    <p className="text-sm text-gray-400">No link available</p>
                )}
            </div>

            <div className="flex justify-center mt-4">
                <Link className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-all" href={{pathname: '/pages/CreateEvents', query: {name: props.name, address: props.address + ',' + props.city + ',' + props.state, venue : props.url} }}>
                    Choose This Venue
                </Link>
            </div>
        </div>
    );
}