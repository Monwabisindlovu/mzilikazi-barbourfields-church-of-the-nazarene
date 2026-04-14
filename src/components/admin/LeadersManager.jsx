import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosClient from '@/api/client/axiosClient';
import { Plus, Pencil, Trash2, User, Crown } from 'lucide-react';
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
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import FileUploader from './FileUploader';

export default function LeadersManager() {
  const [isOpen, setIsOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    bio: '',
    is_pastor: false,
    display_order: 0,
    files: [],
  });

  const queryClient = useQueryClient();

  /* ================= FETCH ================= */
  const { data: leaders = [], isLoading } = useQuery({
    queryKey: ['admin-leaders'],
    queryFn: async () => {
      const res = await axiosClient.get('/leaders?sort=displayOrder');
      return res.data;
    },
  });

  /* ================= CREATE ================= */
  const createMutation = useMutation({
    mutationFn: async data => {
      const res = await axiosClient.post('/leaders', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-leaders'] });
      toast.success('Leader added');
      handleClose();
    },
    onError: err => toast.error(err?.response?.data?.message || 'Failed to add leader'),
  });

  /* ================= UPDATE ================= */
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }) => {
      const res = await axiosClient.put(`/leaders/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-leaders'] });
      toast.success('Leader updated');
      handleClose();
    },
    onError: err => toast.error(err?.response?.data?.message || 'Failed to update leader'),
  });

  /* ================= DELETE ================= */
  const deleteMutation = useMutation({
    mutationFn: async id => axiosClient.delete(`/leaders/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-leaders'] });
      toast.success('Leader removed');
    },
  });

  /* ================= OPEN ================= */
  const handleOpen = item => {
    if (item) {
      setEditingItem(item);
      setFormData({
        name: item.name || '',
        role: item.title || '', // ✅ map title → role
        bio: item.bio || '',
        is_pastor: false,
        display_order: item.displayOrder || 0,
        files: item.photo ? [item.photo] : [],
      });
    } else {
      setEditingItem(null);
      setFormData({
        name: '',
        role: '',
        bio: '',
        is_pastor: false,
        display_order: 0,
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
      name: '',
      role: '',
      bio: '',
      is_pastor: false,
      display_order: 0,
      files: [],
    });
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = e => {
    e.preventDefault();

    const filesArray = Array.isArray(formData.files) ? formData.files : [];

    const form = new FormData();

    form.append('name', formData.name);
    form.append('title', formData.role); // ✅ FIX
    form.append('ministry', formData.role); // ✅ REQUIRED by backend
    form.append('bio', formData.bio || '');
    form.append('displayOrder', formData.display_order || 0);

    if (filesArray.length > 0) {
      const first = filesArray[0];

      if (typeof first === 'string') {
        form.append('photo', first);
      }
    }

    if (editingItem) {
      updateMutation.mutate({
        id: editingItem._id,
        data: form,
      });
    } else {
      createMutation.mutate(form);
    }
  };

  /* ================= UI ================= */
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-900">Manage Leaders</h2>

        <Button
          onClick={() => handleOpen()}
          className="bg-amber-500 hover:bg-amber-600 text-slate-900"
        >
          <Plus className="w-4 h-4 mr-2" /> Add Leader
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-40 bg-slate-100 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : leaders.length === 0 ? (
        <div className="text-center py-12 text-slate-500">
          <User className="w-12 h-12 mx-auto mb-4 opacity-50" />
          No leaders yet
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {leaders.map(leader => (
            <div key={leader._id} className="relative group bg-slate-50 rounded-xl p-4 text-center">
              <div className="w-20 h-20 mx-auto rounded-full overflow-hidden bg-slate-200 mb-3">
                {leader.photo ? (
                  <img
                    src={leader.photo}
                    alt={leader.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full">
                    <User className="w-8 h-8 text-slate-400" />
                  </div>
                )}
              </div>

              <h3 className="font-semibold text-sm">{leader.name}</h3>
              <p className="text-xs text-amber-600">{leader.title}</p>

              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 rounded-xl">
                <Button size="icon" onClick={() => handleOpen(leader)}>
                  <Pencil className="w-4 h-4" />
                </Button>

                <Button
                  size="icon"
                  variant="destructive"
                  onClick={() => deleteMutation.mutate(leader._id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingItem ? 'Edit Leader' : 'Add Leader'}</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Name"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              required
            />

            <Input
              placeholder="Role"
              value={formData.role}
              onChange={e => setFormData({ ...formData, role: e.target.value })}
              required
            />

            <Textarea
              placeholder="Bio"
              value={formData.bio}
              onChange={e => setFormData({ ...formData, bio: e.target.value })}
            />

            <FileUploader
              value={formData.files}
              onChange={update =>
                setFormData(prev => ({
                  ...prev,
                  files:
                    typeof update === 'function'
                      ? update(prev.files || [])
                      : Array.isArray(update)
                        ? update
                        : [update],
                }))
              }
              accept="image/*"
            />

            <Input
              type="number"
              value={formData.display_order}
              onChange={e =>
                setFormData({
                  ...formData,
                  display_order: parseInt(e.target.value) || 0,
                })
              }
            />

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
