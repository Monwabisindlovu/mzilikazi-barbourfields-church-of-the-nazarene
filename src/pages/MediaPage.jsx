// src/pages/MediaPage.jsx
import React from 'react';
import AdminUpload from '../components/AdminUpload'; // Admin upload form
import Media from '../components/Media'; // Correct import for Media.js

const MediaPage = () => {
  return (
    <div>
      <h1>Media Management</h1>
      <AdminUpload /> {/* Admin upload form */}
      <hr />
      <Media /> {/* Display the uploaded media */}
    </div>
  );
};

export default MediaPage;
