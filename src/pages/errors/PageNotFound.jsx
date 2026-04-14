import React from 'react';
import { Link } from 'react-router-dom';

export default function PageNotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">Page Not Found</p>
      <Link
        to="/"
        className="px-6 py-3 bg-amber-500 text-white rounded hover:bg-amber-600 transition"
      >
        Go Home
      </Link>
    </div>
  );
}
