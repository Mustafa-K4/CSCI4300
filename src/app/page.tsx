import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-[1400px] bg-cover bg-center bg-[url('/background.png')] text-white flex flex-col justify-end gap-8 p-8 pb-50 m-0">
      <div className="flex justify-center items-center">
        <p className="text-center text-2xl max-w-4xl p-7 rounded-xl">
          Welcome to Go Outside — your go-to hub for finding and creating events around your college town. Whether you&apos;re into pickleball tournaments, scenic hikes, or chill movie nights, Go Outside makes it easy to connect with others and discover what’s happening nearby. Create your own listings, join events that interest you, and keep track of everything on your personal profile. It’s time to step out, meet new people, and make the most of your college experience.
        </p>
      </div>
      <div className="flex gap-8">
        <div className="w-[50vw] h-[450px] flex flex-col justify-end items-center pb-4 bg-cover bg-center bg-[url('/browse.png')] text-black rounded-xl transition-transform transform hover:scale-105 hover:shadow-xl">
          <div className="z-10 text-center text-2xl px-4 rounded-xl py-2">
            See what people in your area are up to! 
          </div>
          <Link href="/pages/BrowseEvents">
            <button className="mt-4 px-4 py-2 bg-black text-white rounded-lg hover:bg-[#D8DBCC] transition shadow">
              Browse Local Events
            </button>
          </Link>
        </div>
        <div className="w-[50vw] h-[450px] flex flex-col justify-end items-center pb-4 bg-cover bg-center bg-[url('/create.png')] text-black rounded-xl transition-transform transform hover:scale-105 hover:shadow-xl">
          <div className="z-10 text-center text-2xl px-4 rounded-xl py-2">
            Coordinate with friends and family or interact with your local community. The choice is yours!
          </div>
          <Link href="/pages/CreateEvents">
            <button className="mt-4 px-4 py-2 bg-black text-white rounded-lg hover:bg-[#D8DBCC] transition shadow">
              Create An Event Listing
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
