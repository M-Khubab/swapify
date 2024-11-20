"use client";
import { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { auth, db } from '../../firebase'; // Ensure googleProvider is configured
import { doc, getDocs,query,collection,where } from "firebase/firestore";
import { loginFailure, loginSuccess } from '@/redux/authslice';
import { useDispatch } from 'react-redux';

export default function login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const dispatch = useDispatch()

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Sign in the user
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Retrieve the user's role from Firestore by UID
      const userQuery = query(collection(db, "users"), where("email", "==", email));
      const querySnapshot = await getDocs(userQuery);
   
      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
         // Get the first matching document
        dispatch(loginSuccess(userData)); // Store user data in Redux state
        if(userData?.userRole == "seller"){
        router.push("/sellerdeshboard")
        }else{
        router.push("/")
        }
      } else {
        console.log("No user data found for this email.");
        loginFailure()
      }

    } catch (err) {
      setError('Error logging in: ' + err.message);
      console.error("Error logging in:", err);
    }
  };


  const handleSignupRedirect = () => {
    router.push('/signup');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
          >
            Log In
          </button>

        
        </form>

        <p className="mt-4 text-center">
          Don't have an account?{' '}
          <button
            onClick={handleSignupRedirect}
            className="text-indigo-600 hover:underline"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}
