'use client';
import EventCard from "./EventCard";
import dummyData from "../data/DummyEventData.json"; 
import React, { useEffect, useState } from 'react';

export default function CardGrid() {
    const GridItem = ({ children }) => (
        <div>
          {children}
        </div>
    );
    const [searchInfo, setInfo] = useState('');
    const [filteredEvents, setFilteredEvents] = useState(dummyData);

    const updateEventsAfterSearch = (value) => {
        const lowercasedValue = value.toLowerCase();
        const filtered = dummyData.filter(event =>
            event.title.toLowerCase().includes(lowercasedValue)
        );
        setFilteredEvents(filtered);
    };

    return (     
        <div> 
            <form className="max-w-md mx-auto mb-4" 
                onSubmit={(e) => {
                    e.preventDefault();
                    updateEventsAfterSearch(searchInfo);
                }}
            >
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input value={searchInfo} className="block w-full p-4 ps-10 text-sm text-white border border-gray-300 rounded-lg bg-gray-500" placeholder="Search Events..." onChange={(e) => setInfo(e.target.value)} required />
                    <button type="submit" className="absolute end-2.5 bottom-2.5 px-4 py-2 bg-[#E9EAE0] text-[#C85250] rounded-lg hover:bg-[#D8DBCC] transition shadow text-sm">Search</button>
                </div>
            </form>
            <div className="flex justify-center mb-4">
                <button 
                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-700"
                    onClick={(e) => {
                        e.preventDefault();
                        updateEventsAfterSearch("");
                        setInfo("");
                    }}
                >Reset Event Listing</button>
            </div>
            {filteredEvents.map((item, index) => (
                <GridItem key={index}>
                    <EventCard 
                        title={item.title}
                        location={item.location}
                        date={item.date}
                        description={item.description}
                        img={item.img}
                    />
                </GridItem>
            ))}
        </div>
    )
}