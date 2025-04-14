'use client'
import React from 'react';
import { useState } from 'react';
import ProfileGrid from './ProfileGrid';



export default function ProfileItems() {
     
    return (
        <div>
            <div className="mx-60 bg-red-200 p-4 rounded-lg shadow-lg mt-4 text-2xl">
                Today's Events:
            </div>
            <div className = "mx-60 bg-red-800"> 
                <ProfileGrid></ProfileGrid>
            </div>
        </div>
    )
}