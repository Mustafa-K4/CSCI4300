'use client'
import EventForm from "../../components/EventForm";
import {useContext}from "react";
import LoginContext, { useLogin } from "../../context/LoginContext.jsx";

export default function CreatePage() {
    const loginVar = useLogin;
    
    if (loginVar().isLoggedIn) {
        return ( 
            <>
               <div>
                    <EventForm/>
                </div>
            </>
        );
    } else {
        return (
            <>
                <div className="text-center mt-6">
                    <h1 className="text-4xl font-bold mb-2">
                        Please Log In to View Your Profile
                    </h1>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4" onClick={() => window.location.href = '/pages/SignIn'}>
                        Log In
                    </button>

                </div>
            </>
        ) 
    }
}; 