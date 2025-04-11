import './Header.css';
import Link from 'next/link';

export default function Header() {

    return <header className="App-header fixed top-0 w-full">
        <div className="flex items-center justify-center w-1/8">
            <img src="/logo.jpeg" className="h-[80px] rounded-full shadow-md" alt="logo" />
        </div>
        <div className="w-1/4 text-center flex items-center">
            <h1 className="text-4xl font-bold text-gray-800">Welcome!</h1>
        </div>
        <nav className="w-5/8 flex justify-end mr-4">
            <ul className="flex gap-3 items-center">
                <li><Link href="/pages/BrowseEvents" className='px-4 py-2 bg-[#E9EAE0] text-[#C85250] rounded-lg hover:bg-[#D8DBCC] transition shadow"'>Browse Events</Link></li>
                <li><Link href="/pages/CreateEvents" className='px-4 py-2 bg-[#E9EAE0] text-[#C85250] rounded-lg hover:bg-[#D8DBCC] transition shadow"'>Create An Event</Link></li>
                <li><Link href="/pages/Profile" className="px-4 py-2 bg-[#E9EAE0] text-[#C85250] rounded-lg hover:bg-[#D8DBCC] transition shadow">Profile</Link></li>
                <li><Link href="/pages/SignIn" className="px-4 py-2 bg-black text-white rounded-lg hover:bg-[#D8DBCC] transition shadow">Sign In</Link></li>
            </ul>
        </nav>
    </header>
}