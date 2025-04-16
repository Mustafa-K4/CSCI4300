'use client'
import React from 'react';
import { useState } from 'react';

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                      'July', 'August', 'September', 'October', 'November', 'December'];
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = firstDayOfMonth.getDay();
  
  const days = [];

  for (let i = 0; i < firstDayOfWeek; i++) {
    days.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }

  const handleDayClick = (day) => {
    if (!day) return;
    
  };

    return ( 
      <div className="flex items-start justify-center h-auto">
        <div className="lg:w-7/12 md:w-9/12 sm:w-10/12 mx-auto p-4">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="flex items-center justify-between px-6 py-3 bg-gray-700">
              <span className="text-white"></span>
                <h2 className="text-white text-lg font-semibold">
                  {monthNames[month]} {year}
                </h2>
              <span className="text-white"></span>
            </div>

            <div className="grid grid-cols-7 gap-2 p-4">
              {daysOfWeek.map((day, idx) => (
                <div key={idx} className="text-center font-semibold text-gray-700">{day}</div>
              ))}

              {days.map((day, idx) => {
                const isToday =
                  day === currentDate.getDate() &&
                  month === currentDate.getMonth() &&
                  year === currentDate.getFullYear();

                return (
                  <button 
                    key={idx}
                    className={`text-center py-2 border cursor-pointer rounded ${
                      isToday ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'
                    }`}
                    onClick={() => day && handleDayClick(day)}
                  >
                    {day ?? ''}
                  </button>
                );
              })}
            </div>
              {/* For selected date */}
          </div>
        </div>
      </div>
    );
}