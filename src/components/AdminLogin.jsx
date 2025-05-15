// src/components/AdminLogin.jsx
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

function AdminLogin({ onAdminLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists() && userDoc.data().isAdmin) {
        onAdminLogin(); // Call your callback to unlock admin UI
      } else {
        setError('Access denied: Not an admin.');
      }
    } catch (err) {
      setError('Login failed: ' + err.message);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Login</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}

export default AdminLogin;
