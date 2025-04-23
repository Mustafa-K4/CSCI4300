'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import jwt from 'jsonwebtoken'; 

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState(null); // State to store the user's email
  const router = useRouter();

  useEffect(() => {
    const storedLogin = localStorage.getItem('isLoggedIn');
    const token = localStorage.getItem('token');

    if (storedLogin === 'true' && token) {
      try {
        const decoded = jwt.decode(token); // Decode the token to get user info
        setUserEmail(decoded.email); // Set the user's email
        setIsLoggedIn(true);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  const login = (token) => {
    try {
      const decoded = jwt.decode(token); // Decode the token to get user info
      setUserEmail(decoded.email); // Set the user's email
      console.log('User email:', decoded.email); // Log the user's email for debugging
      setIsLoggedIn(true);
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('token', token);
    } catch (error) {
      console.error('Error decoding token during login:', error);
    }
  };

  const logout = async () => {
    setIsLoggedIn(false);
    setUserEmail(null);
    localStorage.setItem('isLoggedIn', 'false');
    
    await fetch("/api/users/logout", {
      method: "POST",
    });
    router.push("/pages/SignIn");
  };
  

  return (
    <LoginContext.Provider value={{ userEmail, isLoggedIn, login, logout }}>
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => useContext(LoginContext);




