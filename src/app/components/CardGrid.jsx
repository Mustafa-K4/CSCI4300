'use client';
import EventCard from "./EventCard";
import React, { useEffect, useState } from 'react';
import { useLogin } from '../context/LoginContext';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';
import Cookies from 'js-cookie';
import { on } from "events";

export default function CardGrid() {

    const { userEmail} = useLogin(); // Access context values
    //console.log(userEmail); // Log the values for debugging

    const GridItem = ({ children }) => (
        <div>
        {children}
        </div>
    );
    const [allEvents, setEvents] = useState([]);
    const [searchInfo, setInfo] = useState('');
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [searchCategory, setCat] = useState('name');
    const [selectedLabel, setSelectedLabel] = useState('Search by Title');
    const [isLoading, setIsLoading] = useState(true);
    const [userEvents, setUserEvents] = useState([]);

    const fetchUserEvents = async () => {
        const response = await fetch(`/api/users/events/${userEmail}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user events');
        }

        const data = await response.json();
        setUserEvents(data.events);
    }

    useEffect(() => {
        if (userEmail) {
            fetchUserEvents(); // Fetch events when the user is logged in and email is available
        }
    }, [userEmail]);

    const updateEventsAfterSearch = (value) => {
        const lowercasedValue = value.toLowerCase();
    
        const filtered = allEvents.filter(event => {
            if (searchCategory === 'date') {
                // Format event.date to something like "April 20, 2025"
                const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                }).toLowerCase();
    
                return formattedDate.includes(lowercasedValue);
            }
    
            return event[searchCategory].toLowerCase().includes(lowercasedValue);
        });
    
        setFilteredEvents(filtered);
    };
    
    const joinEvent = async (eventId, Email) => {

        const tempEmail = Email;
        if (!tempEmail) {
            console.error("User email is not available");
            return;
        }

        try {
            
            const updatedEvents = userEvents
                ? `${userEvents},${eventId}` 
                : `${eventId}`; 

            setUserEvents(updatedEvents); // Update the local state

            // Send a POST request to update the user's events
            const response = await fetch(`/api/users/events/${userEmail}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ events: updatedEvents }),
            });

            if (!response.ok) {
                throw new Error('Failed to update user events');
            }

            console.log('User events updated successfully');
        } catch (error) {
            console.error('Error updating user events:', error);
        }
    };

    const getAllEvents = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('/api/events');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            } 
            const data = await response.json();
            setEvents(data.Events);
            setFilteredEvents(data.Events);
        } catch (error) {
            console.error('Error fetching events:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getAllEvents();
    }, []);

    

    return (     
        <div> 
            <form className="max-w-xl g mx-auto mb-4" 
                onSubmit={(e) => {
                    e.preventDefault();
                    updateEventsAfterSearch(searchInfo);
                }}
            >
            <div className="flex relative items-center gap-2">
                <div className="relative inline-block">
                    <label htmlFor="search-dropdown" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Your Email</label>
                    <button
                        onClick={() => setDropdownOpen(prev => !prev)}
                        className="z-10 inline-flex items-center text-sm font-medium text-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-700"
                        type="button"
                    >
                        {selectedLabel}
                    <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                    </svg>
                    </button>
                    {isDropdownOpen && (
                        <div className="absolute top-full left-0 mt-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                                <li>
                                    <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                    onClick={() => {
                                        setCat('name');
                                        setSelectedLabel('Search by Title');
                                        setDropdownOpen(false);
                                    }}
                                    > Search by Title </button>
                                </li>
                                <li>
                                    <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                    onClick={() => {
                                        setCat('date');
                                        setSelectedLabel('Search by Date (Month Day, Year)');
                                        setDropdownOpen(false);
                                    }}
                                    > Search by Date (Month Day, Year) </button>
                                </li>
                                <li>
                                    <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                    onClick={() => {
                                        setCat('location');
                                        setSelectedLabel('Search by Location');
                                        setDropdownOpen(false);
                                    }}
                                    > Search by Location </button>
                                </li>
                            </ul>
                        </div>
                    )}
                    </div>
                    <div className="relative flex-1">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                        <input value={searchInfo} className="block w-full p-4 ps-10 text-sm text-white border border-gray-300 rounded-lg bg-gray-500" placeholder="Search Events..." onChange={(e) => setInfo(e.target.value)} required />
                        <button type="submit" className="absolute end-2.5 bottom-2.5 px-4 py-2 bg-[#E9EAE0] text-[#C85250] rounded-lg hover:bg-[#D8DBCC] transition shadow text-sm">Search</button>
                    </div>
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
                >Reset Search Settings</button>
            </div>
            {isLoading ? (
                <div className="text-center text-white">Loading events...</div>
            ) : (
                filteredEvents.map((item, index) => (
                    <GridItem key={index}>
                        <EventCard 
                            owner={item.owner}
                            name={item.name}
                            location={item.location}
                            date={item.date}
                            description={item.description}
                            imageUrl={item.imageUrl}
                            startTime={item.startTime}
                            endTime={item.endTime}
                            email = {userEmail}
                            buttonHandler= {() => joinEvent(item._id, userEmail)}
                        />
                    </GridItem>
                ))
            )}
        </div>
    )
}