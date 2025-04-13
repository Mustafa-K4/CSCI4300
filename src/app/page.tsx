import "./Landingpage.css"
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center">
      <div className="Landing-Page min-h-[1200px] gap-4">
        <div className="w-80vw h-3/5 flex justify-center items-center bg-cover bg-center bg-[url('/background.png')] text-white rounded-xl">
          <p className="z-10 text-center text-2xl">
            Welcome to Go Outside — your go-to hub for finding and creating events around your college town. Whether you're into pickleball tournaments, scenic hikes, or chill movie nights, Go Outside makes it easy to connect with others and discover what’s happening nearby. Create your own listings, join events that interest you, and keep track of everything on your personal profile. It’s time to step out, meet new people, and make the most of your college experience.
          </p>
        </div>
        <div className="w-[80vw] h-2/5 flex justify-center items-center gap-4">
          <div className="w-[40vw] h-full flex flex-col justify-end items-center pb-4 bg-cover bg-center bg-[url('/browse.png')] text-black rounded-xl">
            <div className="z-10 text-center text-2xl px-4">
              See what people in your area are up to! 
            </div>
            <Link href="/pages/BrowseEvents">
              <button className="mt-4 px-4 py-2 bg-black text-white rounded-lg hover:bg-[#D8DBCC] transition shadow">Browse Local Events</button>
            </Link>
          </div>
          <div className="w-[40vw] h-full flex flex-col justify-end items-center pb-4 bg-cover bg-center bg-[url('/create.png')] text-black rounded-xl">
            <div className="z-10 text-center text-2xl px-4">
              Coordinate with friends and family or interact with your local community. The choice is yours!
            </div>
            <Link href="/pages/CreateEvents">
              <button className="mt-4 px-4 py-2 bg-black text-white rounded-lg hover:bg-[#D8DBCC] transition shadow">Create An Event Listing</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}