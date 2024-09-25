"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { app, auth } from '@/app/config';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [googleSignedIn, setGoogleSignedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push('/');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      setLoading(true); // Start loading
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('User signed in with Google:', user);
      router.push('/');
    } catch (error) {
      console.error('Error during Google sign-in:', error);
      setErrorMessage('Failed to sign in with Google.');
      setLoading(false); // Stop loading on error
    }
  };

  const handleEmailSignIn = async () => {
    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    try {
      setLoading(true); // Start loading
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('User signed in with email and password:', user);
      router.push('/');
    } catch (error) {
      console.error('Error during email sign-in:', error);
      setErrorMessage('Failed to sign in with email.');
      setLoading(false); // Stop loading on error
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  return (
    <div className="w-full max-w-sm mx-auto p-6 bg-white border-2 border-brand mt-10 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6 text-brand">Login</h2>

      {errorMessage && (
        <div className="mb-4 text-red-600">
          {errorMessage}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-brand h-12 w-12"></div>
          <p className="ml-3 text-brand">Redirecting, please wait...</p>
        </div>
      ) : (
        <div>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700">Email:</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-brand rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>

            <div>
              <label className="block text-gray-700">Password:</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border border-brand rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>

            <button
              onClick={handleEmailSignIn}
              className="w-full bg-brand text-white py-2 px-4 rounded hover:bg-brand"
            >
              Sign In
            </button>
          </div>

          <div className="text-center my-4 text-gray-600">or</div>

          <button
            onClick={handleGoogleSignIn}
            className="w-full py-2 px-4 rounded border-2 border-brand text-brand"
          >
            Sign in with Google
          </button>
          <h1 className="mt-2">
            Don't have an account?
            <Link href={"/register"} className="text-blue-500 underline ">
              Register{" "}
            </Link>
          </h1>
          
        </div>
      )}
    </div>
  );
};

export default Login;
