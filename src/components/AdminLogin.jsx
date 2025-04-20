// components/AdminLogin.jsx
import React from "react";
import { auth, provider } from "../firebase/firebase";
import { signInWithPopup } from "firebase/auth";

const AdminLogin = ({ setUser }) => {
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUser(user); // pass user back to App or parent
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-2xl mb-4 font-semibold">Admin Login</h2>
      <button
        onClick={handleLogin}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow-md"
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default AdminLogin;
