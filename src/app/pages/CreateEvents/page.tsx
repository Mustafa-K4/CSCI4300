'use client'
import EventForm from "../../components/EventForm";
import {useContext}from "react";
import LoginContext, { useLogin } from "../../context/LoginContext.jsx";

export default function CreatePage() {
        return ( 
            <div>
                <EventForm/>
            </div>
        );
}; 