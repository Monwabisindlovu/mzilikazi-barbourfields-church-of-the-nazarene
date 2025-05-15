import React, { useState } from 'react';
import AdminLogin from '../components/AdminLogin';
import AdminUpload from '../components/AdminUpload'; // or AdminPanel

function AdminPage() {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <>
      {isAdmin ? <AdminUpload /> : <AdminLogin onAdminLogin={() => setIsAdmin(true)} />}
    </>
  );
}

export default AdminPage;
