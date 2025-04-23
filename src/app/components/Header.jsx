'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useLogin } from '../context/LoginContext'; 
import { useEffect, useState } from 'react';

export default function Header() {
  const { userEmail, isLoggedIn, logout } = useLogin();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUserName = async () => {
      if (!userEmail) return;

      try {
        const response = await fetch(`/api/users/name/${userEmail}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user name');
        }

        const data = await response.json();
        setUserName(data.name); 
      } catch (error) {
        console.error('Error fetching user name:', error);
      }
    };

    fetchUserName();
  }, [userEmail]);

  return (
    <header className="bg-[#E7625F] h-[90px] flex justify-between items-center px-6 fixed top-0 w-full z-50">
      <div className="flex items-center justify-center w-1/8">
        <Link href="/">
          <Image src="/goutsidelogo.png" alt="logo" width={80} height={80} className="rounded-full shadow-md" />
        </Link>
      </div>
      <div className="w-1/4 text-center flex items-center">
        <h1 className="text-4xl font-bold text-gray-800">
          {isLoggedIn ? `Welcome, ${userName}!` : 'Welcome!'}
        </h1>
      </div>
      <nav className="w-5/8 flex justify-end mr-4">
        <ul className="flex gap-3 items-center">
          <li><Link href="/pages/BrowseEvents" className='px-4 py-2 bg-[#E9EAE0] text-[#C85250] rounded-lg hover:bg-[#D8DBCC] transition shadow"'>Browse Events</Link></li>
          <li><Link href="/pages/CreateEvents" className='px-4 py-2 bg-[#E9EAE0] text-[#C85250] rounded-lg hover:bg-[#D8DBCC] transition shadow"'>Create An Event</Link></li>
          <li><Link href="/pages/Profile" className="px-4 py-2 bg-[#E9EAE0] text-[#C85250] rounded-lg hover:bg-[#D8DBCC] transition shadow">Profile</Link></li>
          {isLoggedIn ? (
            <li>
              <button
                onClick={logout}
                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-opacity-80 transition shadow cursor-pointer"
              >
                Log Out
              </button>
            </li>
          ) : (
            <li>
              <Link href="/pages/SignIn" className="px-4 py-2 bg-black text-white rounded-lg hover:bg-opacity-80 transition shadow">
                Sign In
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

