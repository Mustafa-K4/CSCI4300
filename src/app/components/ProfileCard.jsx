import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfileCard(props) {
    const email = props.email; 
    const eventId = props.eventId; 
    const onRemove = props.onRemove;
    const [isOwner, setIsOwner] = useState(false);

    const router = useRouter();

    
    const goToPEdit = () => {
        router.push(`/pages/EditEvent?eventId=${eventId}`);
    };

    const checkOwnership = async () => {
        try {
            const response = await fetch(`/api/users/name/${email}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch user name");
            }

            const data = await response.json();
            console.log("Fetched user name:", data.name);

            if (props.owner === data.name) {
                setIsOwner(true);
            }
        } catch (error) {
            console.error("Error checking ownership:", error);
        }
    };

    const handleDeleteEvent = async () => {
        if (!eventId) {
            console.error("Event ID is missing");
            return;
        }

        try {
            handleLeaveEvent();

            const response = await fetch(`/api/events/${eventId}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) {
                throw new Error("Failed to delete event");
            }

            console.log("Event deleted successfully");
            alert("Event deleted successfully!");

            onRemove(eventId);
        } catch (error) {
            console.error("Error deleting event:", error);
            alert("Failed to delete event.");
        }
    };

    useEffect(() => {
        checkOwnership();
    }, [email]);

    const handleLeaveEvent = async () => {
        if (!email || !eventId) {
            console.error("Email or event ID is missing");
            return;
        }

        try {
            
            const response = await fetch(`/api/users/events/${email}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch user events");
            }

            const data = await response.json();
            const eventIds = data.events.split(","); 
            console.log("Current event IDs:", eventIds);

           
            const updatedEventIds = eventIds.filter((id) => id !== eventId);
            console.log("Updated event IDs:", updatedEventIds);

            const updatedEventsString = updatedEventIds.join(",");

            const postResponse = await fetch(`/api/users/events/${email}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ events: updatedEventsString }),
            });

            if (!postResponse.ok) {
                throw new Error("Failed to update user events");
            }

            console.log("User events updated successfully");


            onRemove(eventId); 


        } catch (error) {
            console.error("Error removing event:", error);
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
                            onClick={handleLeaveEvent} 
                        >
                            Leave Event
                        </button>
                        {isOwner && (
                            <button
                                className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-500 transition"
                                onClick={goToPEdit}
                            >
                                Edit Event
                                
                            </button>
                        )}
                        { isOwner && (
                            <button
                            className="px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-red-500 transition"
                            onClick={handleDeleteEvent}
                            >
                                Delete Event
                            </button>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}