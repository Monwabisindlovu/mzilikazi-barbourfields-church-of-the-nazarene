// src/components/AdminButton.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const AdminButton = () => {
  return (
    <div>
      <Link to="/admin-upload">
        <button>Go to Admin Upload</button>
      </Link>
    </div>
  );
};

export default AdminButton;
