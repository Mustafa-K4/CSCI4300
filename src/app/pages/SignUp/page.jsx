'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('Sign up successful! You can now log in.');
      } else {
        setMessage(`${data.error || 'Sign up failed.'}`);
      }
    } catch (err) {
      setMessage('Something went wrong.');
    }
  };

  return (
    <div
      className="fixed inset-0 bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/backgroundphoto.jpeg')" }}
    >
      <div className="bg-[#d45d56]/70 backdrop-blur-md rounded-2xl p-10 w-full max-w-md sm:max-w-lg shadow-lg">
        <h1 className="text-white text-3xl font-bold text-center mb-8">Sign Up</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
            <div className="flex-1">
              <label className="block text-white font-semibold mb-1">First Name</label>
              <input
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full p-3 rounded-md bg-white text-black"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-white font-semibold mb-1">Last Name</label>
              <input
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full p-3 rounded-md bg-white text-black"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-white font-semibold mb-1">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-white text-black"
              required
            />
          </div>

          <div>
            <label className="block text-white font-semibold mb-1">Password</label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-white text-black"
              required
            />
          </div>

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="bg-black text-white px-8 py-2 rounded-full font-semibold hover:bg-opacity-80 cursor-pointer"
            >
              Sign Up
            </button>
          </div>

          {message && (
            <p className="text-white text-center mt-4">{message}</p>
          )}

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







