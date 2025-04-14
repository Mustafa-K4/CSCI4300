'use client';
import Link from 'next/link';
import { useLogin } from '../../context/LoginContext'; // make sure this path is correct

export default function SignInPage() {
  const { login } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    login(); // Set isLoggedIn to true
    window.location.href = '/'; // Redirect to homepage
  };

  return (
    <div
      className="fixed inset-0 bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/backgroundphoto.jpeg')" }}
    >
      <div className="bg-[#d45d56]/70 backdrop-blur-md rounded-2xl p-10 w-full max-w-md sm:max-w-lg shadow-lg">
        <h1 className="text-white text-3xl font-bold text-center mb-8">Sign In</h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
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
              Sign In
            </button>
          </div>

          <p className="text-center text-white mt-4">
            Don&apos;t have an account?{' '}
            <Link href="/pages/SignUp" className="underline font-semibold">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}











