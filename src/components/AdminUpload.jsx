// src/components/AdminUpload.jsx
import React, { useState } from 'react';
import { db, storage } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const AdminUpload = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !title || !description || !date) {
      alert('Please fill in all fields.');
      return;
    }

    const mediaType = file.type.startsWith('image') ? 'image' : 'video';
    const storageRef = ref(storage, `events/${Date.now()}_${file.name}`);

    try {
      setUploading(true);
      await uploadBytes(storageRef, file);
      const mediaUrl = await getDownloadURL(storageRef);

      await addDoc(collection(db, 'upcomingUpdates'), {
        title,
        description,
        date,
        mediaUrl,
        mediaType,
      });

      alert('Event uploaded successfully!');
      setTitle('');
      setDescription('');
      setDate('');
      setFile(null);
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Error uploading event.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleUpload} style={{ padding: 20, background: '#f5f5f5', borderRadius: 8 }}>
      <h2>Admin Upload Panel</h2>
      <input type="text" placeholder="Event Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      <input type="file" onChange={(e) => setFile(e.target.files[0])} accept="image/*,video/*" required />
      <button type="submit" disabled={uploading}>{uploading ? 'Uploading...' : 'Upload Event'}</button>
    </form>
  );
};

export default AdminUpload;
