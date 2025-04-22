'use client'
import CardGrid from "../../components/CardGrid"
import VenueGrid from "../../components/VenueGrid"
import React, { useState } from 'react';

export default function BrowsePage() {
    const [currPage, setPage] = useState('event');
    return ( 
        <div className="min-h-[1000px] ">
            <div className="flex items-center flex-col justify-center text-[#C85250] rounded-xl mt-10 mb-4">
                <p className="z-10 text-center text-4xl font-bold">
                    {currPage === 'event' ? "Explore User-Created Events Near You!" : "Possible Venues for Your Next Event!"}
                </p>
                <button className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-700"
                    onClick={() => setPage(currPage === 'event' ? 'api' : 'event')}
                >
                    {currPage === 'event' ? "View Local Venues for Your Next Event" : "View Event Listings Created by Fellow Users"}
                </button>
            </div>
            {currPage === 'event' ? (
                <CardGrid></CardGrid> 
            ) :
            (
                <VenueGrid></VenueGrid>
            )}
        </div>
    );
}; 