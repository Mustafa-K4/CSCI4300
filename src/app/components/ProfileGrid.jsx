import ProfileCard from "./ProfileCard";
import React, { useEffect, useState } from "react";
import { useLogin } from "../context/LoginContext";
import { set } from "mongoose";

export default function ProfileGrid() {
    const { userEmail } = useLogin(); // Access the user's email
    const [userEvents, setUserEvents] = useState([]); 
    const [isLoading, setIsLoading] = useState(true); 
    const [renderedEvents, setRenderedEvents] = useState([]);

    
    const fetchUserEvents = async () => {
        if (!userEmail) {
            console.error("User email is not available");
            return;
        }

        try {
            const response = await fetch(`/api/users/events/${userEmail}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch user events");
            }

            const data = await response.json();
            const eventIds = data.events.split(","); 
            console.log("Fetched event IDs:", eventIds); // Log the fetched event IDs for debugging

            const eventDetails = await Promise.all(
                eventIds.map(async (eventId) => {
                    const eventResponse = await fetch(`/api/events/${eventId}`);
                    
                    if (!eventResponse.ok) {
                        throw new Error(`Failed to fetch event with ID: ${eventId}`);
                    }
                    return await eventResponse.json();
                })
            );

            if (eventIds[0] === "") {
                setUserEvents([]);
                setRenderedEvents([]);
            } else {
                console.log("Fetched event details:", eventDetails); // Log the fetched event details for debugging
                setUserEvents(eventDetails); 
                setRenderedEvents(eventDetails);
            }
            
        } catch (error) {
            console.error("Error fetching user events:", error);
        } finally {
            setIsLoading(false); 
        }
    };

    useEffect(() => {
        console.log("Updated userEvents:", userEvents); // Debug log
    }, [userEvents]);

    useEffect(() => {
        fetchUserEvents(); 
    }, [userEmail]);

    const handleRemoveEvent = (eventId) => {
        const updatedEvents = userEvents.filter(event => {
            event._id !== eventId;
        });
        setUserEvents(updatedEvents);
         /*setUserEvents((prevEvents) => {
            const updatedEvents = prevEvents.filter((event) => event._id !== eventId);
            console.log("Updated userEvents:", updatedEvents); // Debug log
            return updatedEvents;
        });
        setRenderedEvents((prevEvents) => {
            const updatedRenderedEvents = prevEvents.filter((event) => event._id !== eventId);
            console.log("Updated renderedEvents:", updatedRenderedEvents); // Debug log
            return updatedRenderedEvents;
        });
        console.log("Event removed:", eventId); // Debug log
        */
    }

    

    const GridItem = ({ children }) => (
        <div>
            {children}
        </div>
    );

    return (
        <div>
            {isLoading ? (
                <div className="text-center text-white">Loading your events...</div>
            ) : (
                <>
                    {console.log("Rendering user events:", userEvents)} {/* Debug log */}
                    {userEvents.length > 0 ? (
                        userEvents.map((item, index) => {
                            const event = item.event;
                            return (
                                <GridItem key={event._id}>
                                    <ProfileCard
                                        eventId={event._id}
                                        owner={event.owner}
                                        name={event.name}
                                        location={event.location}
                                        date={event.date}
                                        description={event.description}
                                        imageUrl={event.imageUrl}
                                        startTime={event.startTime}
                                        endTime={event.endTime}
                                        email = {userEmail}
                                        onRemove={handleRemoveEvent}
                                    />
                                </GridItem>
                            );
                        })
                    ) : (
                        <div className="text-center text-white">No events found.</div>
                    )}
                </>
            )}
        </div>
    );
}