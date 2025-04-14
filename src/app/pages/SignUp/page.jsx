'use client';
import Link from 'next/link';

export default function SignUpPage() {
  return (
    <div
      className="fixed inset-0 bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/backgroundphoto.jpeg')" }}
    >
      <div className="bg-[#d45d56]/70 backdrop-blur-md rounded-2xl p-10 w-full max-w-md sm:max-w-lg shadow-lg">
        <h1 className="text-white text-3xl font-bold text-center mb-8">Sign Up</h1>

        <form className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
            <div className="flex-1">
              <label className="block text-white font-semibold mb-1">First Name</label>
              <input type="text" className="w-full p-3 rounded-md bg-white text-black" />
            </div>
            <div className="flex-1">
              <label className="block text-white font-semibold mb-1">Last Name</label>
              <input type="text" className="w-full p-3 rounded-md bg-white text-black" />
            </div>
          </div>

          <div>
            <label className="block text-white font-semibold mb-1">Email</label>
            <input type="email" className="w-full p-3 rounded-md bg-white text-black" />
          </div>

          <div>
            <label className="block text-white font-semibold mb-1">Password</label>
            <input type="password" className="w-full p-3 rounded-md bg-white text-black" />
          </div>

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="bg-black text-white px-8 py-2 rounded-full font-semibold hover:bg-opacity-80 cursor-pointer"
            >
              Sign Up
            </button>
          </div>

          <p className="text-center text-white mt-4">
            Already have an account?{' '}
            <Link href="/pages/SignIn" className="underline font-semibold">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}





