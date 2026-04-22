import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosClient from '@/api/client/axiosClient';
import { Plus, Pencil, Trash2, Star, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import FileUploader from './FileUploader';

export default function MediaManager() {
  const [isOpen, setIsOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [selected, setSelected] = useState([]);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Other',
    is_featured: false,
    files: [],
  });

  const queryClient = useQueryClient();

  /* ================= FETCH ================= */
  const { data: media = [], isLoading } = useQuery({
    queryKey: ['admin-media'],
    queryFn: async () => {
      const res = await axiosClient.get('/media');
      return res.data;
    },
  });

  /* ================= CREATE ================= */
  const createMutation = useMutation({
    mutationFn: async data => {
      const res = await axiosClient.post('/media', data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-media'] });
      toast.success('Media added');
    },
  });

  /* ================= UPDATE ================= */
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }) => {
      const res = await axiosClient.put(`/media/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-media'] });
      toast.success('Updated');
      handleClose();
    },
  });

  /* ================= DELETE ================= */
  const deleteMutation = useMutation({
    mutationFn: async id => axiosClient.delete(`/media/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-media'] });
      toast.success('Deleted');
    },
  });

  /* ================= OPEN ================= */
  const handleOpen = item => {
    if (item) {
      setEditingItem(item);
      setFormData({
        title: item.title || '',
        description: item.description || '',
        category: item.category || 'Other',
        is_featured: item.is_featured || false,

        // 🔥 IMPORTANT: match announcements style
        files: item.url ? [{ url: item.url }] : [],
      });
    } else {
      setEditingItem(null);
      setFormData({
        title: '',
        description: '',
        category: 'Other',
        is_featured: false,
        files: [],
      });
    }
    setIsOpen(true);
  };

  /* ================= CLOSE ================= */
  const handleClose = () => {
    setIsOpen(false);
    setEditingItem(null);
    setFormData({
      title: '',
      description: '',
      category: 'Other',
      is_featured: false,
      files: [],
    });
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = e => {
    e.preventDefault();

    const filesArray = Array.isArray(formData.files) ? formData.files : [];

    let finalUrl = null;

    if (filesArray.length > 0) {
      const first = filesArray[0];

      if (typeof first === 'string') {
        finalUrl = first;
      } else if (typeof first === 'object' && first.url) {
        finalUrl = first.url;
      }
    }

    if (!finalUrl && editingItem?.url) {
      finalUrl = editingItem.url;
    }

    if (!finalUrl) {
      toast.error('Please upload a file');
      return;
    }

    const payload = {
      title: formData.title,
      description: formData.description,
      category: formData.category,
      is_featured: formData.is_featured,
      type: 'image',
      url: finalUrl,
    };

    if (editingItem) {
      updateMutation.mutate({ id: editingItem._id, data: payload });
    } else {
      createMutation.mutate(payload);
      handleClose();
    }
  };

  /* ================= SELECT ================= */
  const toggleSelect = id => {
    setSelected(prev => (prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]));
  };

  /* ================= GROUP SAFE ================= */
  const grouped = (media || []).reduce((acc, item) => {
    const key = item.category || 'Other';
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <h2 className="text-xl font-bold">Media Manager</h2>

        <div className="flex gap-2">
          {selected.length > 0 && (
            <Button
              variant="destructive"
              onClick={() => {
                selected.forEach(id => deleteMutation.mutate(id));
                setSelected([]);
              }}
            >
              Delete Selected ({selected.length})
            </Button>
          )}

          <Button onClick={() => handleOpen()}>
            <Plus className="w-4 h-4 mr-2" /> Add Media
          </Button>
        </div>
      </div>

      {/* CONTENT */}
      {isLoading ? (
        <div>Loading...</div>
      ) : Object.keys(grouped).length === 0 ? (
        <div className="text-center py-12 text-slate-500">
          <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
          No media yet
        </div>
      ) : (
        Object.entries(grouped).map(([category, items]) => (
          <div key={category} className="mb-6">
            <h3 className="font-bold mb-3">{category}</h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {items.map(item => (
                <div
                  key={item._id}
                  className="relative group aspect-square rounded-lg overflow-hidden"
                >
                  <input
                    type="checkbox"
                    checked={selected.includes(item._id)}
                    onChange={() => toggleSelect(item._id)}
                    className="absolute top-2 left-2 z-10"
                  />

                  {/* 🔥 SAFE IMAGE */}
                  {item.url && (
                    <img
                      src={item.url}
                      alt={item.title || 'media'}
                      className="w-full h-full object-cover"
                      onError={e => (e.target.style.display = 'none')}
                    />
                  )}

                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex justify-center items-center gap-2">
                    <Button size="icon" onClick={() => handleOpen(item)}>
                      <Pencil className="w-4 h-4" />
                    </Button>

                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={() => deleteMutation.mutate(item._id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  {item.is_featured && (
                    <Star className="absolute top-2 right-2 text-amber-400 fill-amber-400" />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))
      )}

      {/* MODAL */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingItem ? 'Edit Media' : 'Add Media'}</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Title"
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              required
            />

            <Textarea
              placeholder="Description"
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
            />

            <Input
              placeholder="Category"
              value={formData.category}
              onChange={e => setFormData({ ...formData, category: e.target.value })}
            />

            {/* 🔥 IMPORTANT FIX: match working component */}
            <FileUploader
              value={formData.files}
              onChange={update =>
                setFormData(prev => ({
                  ...prev,
                  files:
                    typeof update === 'function'
                      ? update(prev.files || [])
                      : Array.isArray(update)
                        ? update.map(f => (typeof f === 'string' ? { url: f } : f))
                        : [{ url: update }],
                }))
              }
              accept="image/*,video/*"
            />

            <div className="flex items-center gap-2">
              <Switch
                checked={formData.is_featured}
                onCheckedChange={v => setFormData({ ...formData, is_featured: v })}
              />
              Featured
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit">{editingItem ? 'Update' : 'Create'}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
