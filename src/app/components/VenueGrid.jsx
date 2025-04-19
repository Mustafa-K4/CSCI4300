'use client';
import { useEffect, useState } from "react";
import { getVenues } from "../EventApi/VenueData";
import VenueCard from "./VenueCard";

export default function VenueGrid() {
    const GridItem = ({ children }) => (
        <div>
        {children}
        </div>
    );
    const [simplifiedVenues, setSimplifiedVenues] = useState([]);

    useEffect(() => {
        const fetchVenues = async () => {
            try {
                const data = await getVenues();
                const venues = data._embedded.venues;
                const formatted = venues.map((venue) => ({
                    name: venue.name,
                    address: venue.address?.line1 || "N/A",
                    city: venue.city?.name || "N/A",
                    state: venue.state?.name || "N/A",
                    url: venue.url || "#",
                }));
                setSimplifiedVenues(formatted);
            } catch (err) {
                console.error('Venue fetch failed:', err);
            }
        };

        fetchVenues();
    }, []);

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-xl font-bold mb-4">Nearby Venues</h1>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {simplifiedVenues.map((item, index) => (
                    <GridItem key={index}>
                        <VenueCard
                            name={item.name}
                            address={item.address}
                            city={item.city}
                            state={item.state}
                            url={item.url}
                        />
                    </GridItem>
                ))}
            </ul>
        </div>
    );
}