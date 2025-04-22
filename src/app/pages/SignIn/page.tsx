'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useLogin } from '../../context/LoginContext';

export default function SignInPage() {
  const { login } = useLogin();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong');
        return;
      }

      // Call context login (you can customize it to store token/user info)
      login(data.token);

      // Redirect to homepage
      window.location.href = '/';
    } catch (err) {
      console.error('🔥 Login error:', err);
      setError('Something went wrong');
    }
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
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-md bg-white text-black"
            />
          </div>

          <div>
            <label className="block text-white font-semibold mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-md bg-white text-black"
            />
          </div>

          {error && <p className="text-red-200 text-center">{error}</p>}

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












