import React, { useState, useRef } from 'react';
import { X, Image as ImageIcon, GripVertical, RefreshCw, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import axios from 'axios';

export default function FileUploader({ value = [], onChange, accept = 'image/*' }) {
  const [uploads, setUploads] = useState([]);
  const [previews, setPreviews] = useState([]);
  const inputRef = useRef(null);
  const dragIndex = useRef(null);

  const files = Array.isArray(value) ? value : [];

  /* ================= HELPERS ================= */

  const isVideo = item => {
    if (!item) return false;

    if (typeof item === 'string') {
      return /\.(mp4|mov|webm|ogg)$/i.test(item);
    }

    if (typeof item === 'object') {
      if (item.url) return /\.(mp4|mov|webm|ogg)$/i.test(item.url);
      if (item.type) return item.type.startsWith('video/');
    }

    return false;
  };

  const getSrc = item => {
    if (!item) return '';
    if (typeof item === 'string') return item;
    if (item.url) return item.url;
    return '';
  };

  /* ================= HANDLE FILES ================= */

  const uploadSingleFile = async (file, id) => {
    const token = localStorage.getItem('token');

    try {
      const formData = new FormData();
      formData.append('image', file);

      const { data } = await axios.post('/api/uploads/image', formData, {
        headers: { Authorization: `Bearer ${token}` },
        onUploadProgress: e => {
          const percent = Math.round((e.loaded * 100) / e.total);
          setUploads(prev => prev.map(u => (u.id === id ? { ...u, progress: percent } : u)));
        },
      });

      if (data.url) {
        onChange(prev => [...(prev || []), data.url]);

        setPreviews(prev => prev.filter(p => p.id !== id));
        setUploads(prev => prev.filter(u => u.id !== id));

        toast.success(`${file.name} uploaded`);
      }
    } catch (err) {
      console.error(err);

      setUploads(prev => prev.map(u => (u.id === id ? { ...u, error: true } : u)));

      setPreviews(prev => prev.map(p => (p.id === id ? { ...p, error: true } : p)));

      toast.error(`Failed to upload ${file.name}`);
    }
  };

  const handleFiles = async filesInput => {
    const fileArray = Array.from(filesInput || []);
    if (!fileArray.length) return;

    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('User not authenticated');
      return;
    }

    for (const file of fileArray) {
      if (file.size > 50 * 1024 * 1024) {
        toast.error(`${file.name} is too large`);
        continue;
      }

      const id = Date.now() + file.name;

      const previewUrl = URL.createObjectURL(file);

      setPreviews(prev => [...prev, { id, url: previewUrl, file }]);
      setUploads(prev => [...prev, { id, progress: 0, file }]);

      uploadSingleFile(file, id);
    }
  };

  const retryUpload = id => {
    const item = previews.find(p => p.id === id);
    if (!item?.file) return;

    setUploads(prev => prev.map(u => (u.id === id ? { ...u, progress: 0, error: false } : u)));

    setPreviews(prev => prev.map(p => (p.id === id ? { ...p, error: false } : p)));

    uploadSingleFile(item.file, id);
  };

  /* ================= REMOVE ================= */

  const handleRemove = index => {
    const updated = files.filter((_, i) => i !== index);
    onChange(updated);
  };

  /* ================= DRAG ================= */

  const onDragStart = index => {
    dragIndex.current = index;
  };

  const onDrop = index => {
    if (dragIndex.current === null) return;

    const updated = [...files];
    const [moved] = updated.splice(dragIndex.current, 1);
    updated.splice(index, 0, moved);

    dragIndex.current = null;
    onChange(updated);
  };

  /* ================= SET MAIN ================= */

  const setMainImage = index => {
    if (index === 0) return;

    const updated = [...files];
    const [main] = updated.splice(index, 1);
    updated.unshift(main);

    onChange(updated);
  };

  const isUploading = uploads.length > 0;

  /* ================= UI ================= */

  return (
    <div className="space-y-3">
      {/* Upload Area */}
      <div
        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:border-amber-400"
        onClick={() => inputRef.current.click()}
        onDrop={e => {
          e.preventDefault();
          handleFiles(e.dataTransfer.files);
        }}
        onDragOver={e => e.preventDefault()}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={accept}
          onChange={e => handleFiles(e.target.files)}
          className="hidden"
        />

        <ImageIcon className="w-8 h-8 text-slate-400 mb-2" />
        <span className="text-sm text-slate-500">Drag & drop or click to upload</span>
      </div>

      {isUploading && <p className="text-xs text-amber-600">Uploading... please wait</p>}

      {(previews.length > 0 || files.length > 0) && (
        <div className="flex flex-wrap gap-2">
          {/* PREVIEWS (Uploading / Failed) */}
          {previews.map(p => {
            const upload = uploads.find(u => u.id === p.id);

            return (
              <div key={p.id} className="relative">
                {isVideo(p) ? (
                  <div className="relative">
                    <video
                      src={p.url}
                      className="w-24 h-20 object-cover rounded border opacity-70"
                      muted
                    />
                    <Play className="absolute inset-0 m-auto text-white" size={18} />
                  </div>
                ) : (
                  <img src={p.url} className="w-24 h-20 object-cover rounded border opacity-70" />
                )}

                {/* Progress */}
                {!p.error && (
                  <span className="absolute bottom-1 left-1 text-[10px] bg-black/70 text-white px-1 rounded">
                    {upload?.progress || 0}%
                  </span>
                )}

                {/* Retry */}
                {p.error && (
                  <button
                    onClick={() => retryUpload(p.id)}
                    className="absolute inset-0 flex items-center justify-center bg-black/60 text-white text-xs rounded"
                  >
                    <RefreshCw size={14} />
                  </button>
                )}
              </div>
            );
          })}

          {/* REAL FILES */}
          {files.map((item, index) => {
            const src = getSrc(item);

            return (
              <div
                key={index}
                draggable
                onDragStart={() => onDragStart(index)}
                onDragOver={e => e.preventDefault()}
                onDrop={() => onDrop(index)}
                className="relative group"
              >
                {isVideo(item) ? (
                  <div className="relative">
                    <video className="w-24 h-20 object-cover rounded border" src={src} muted />
                    <Play className="absolute inset-0 m-auto text-white" size={18} />
                  </div>
                ) : (
                  <img className="w-24 h-20 object-cover rounded border" src={src} />
                )}

                {/* MAIN */}
                {index === 0 && (
                  <span className="absolute top-1 left-1 text-xs bg-black/70 text-white px-1 rounded">
                    Main
                  </span>
                )}

                {/* REMOVE */}
                <Button
                  type="button"
                  size="icon"
                  variant="destructive"
                  className="absolute -top-2 -right-2 w-5 h-5 hidden group-hover:block"
                  onClick={() => handleRemove(index)}
                >
                  <X className="w-3 h-3" />
                </Button>

                {/* SET MAIN */}
                <button
                  type="button"
                  onClick={() => setMainImage(index)}
                  className="absolute bottom-1 left-1 hidden group-hover:block text-xs bg-black/70 text-white px-1 rounded"
                >
                  Set main
                </button>

                <GripVertical className="absolute bottom-1 right-1 w-3 h-3 text-white hidden group-hover:block" />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
