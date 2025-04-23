import Image from 'next/image';

export default function ProfileCard(props) {
    const email = props.email; 
    const eventId = props.eventId; 
    const onRemove = props.onRemove;

    const handleLeaveEvent = async () => {
        if (!email || !eventId) {
            console.error("Email or event ID is missing");
            return;
        }
    
        try {
            const response = await fetch(`/api/users/events/${email}/${eventId}`, {
                method: "DELETE",
            });
    
            if (!response.ok) {
                throw new Error("Failed to delete event");
            }
    
            console.log("User event deleted successfully from backend");
    
            // Notify parent to update UI
            onRemove(eventId);
        } catch (error) {
            console.error("Error deleting event:", error);
        }
    };
    

    const formattedDate = new Date(props.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <div className="mb-3 shadow-lg rounded-lg overflow-hidden h-[320px] border-2 border-[#C85250]">
            <div className="flex h-full">
                <div className="flex-1 w-2/5 h-full relative">
                    <Image
                        src={
                            props.imageUrl ||
                            "https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg"
                        }
                        alt={props.name}
                        fill
                        className="object-cover rounded-tl-lg rounded-bl-lg"
                    />
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
                            <div>
                                {formattedDate} @ {props.startTime} -{" "}
                                {props.endTime || "TBD"}
                            </div>
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
                        <button
                            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-500 transition"
                            onClick={onRemove} 
                        >
                            Leave Event
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}