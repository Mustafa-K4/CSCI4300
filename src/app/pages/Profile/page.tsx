'use client'
import Calendar from "../../components/Calendar.jsx";
import ProfileItems from "../../components/ProfileItems.jsx";
import {useContext}from "react";
import LoginContext, { useLogin } from "../../context/LoginContext.jsx";

export default function ProfilePage() {

        return ( 
            <>
                <div>
                    <h1 className="text-4xl font-bold mb-2 text-center mt-6">User's Events</h1>
                </div>

                <ProfileItems></ProfileItems>
            </>
        ); 
}; 