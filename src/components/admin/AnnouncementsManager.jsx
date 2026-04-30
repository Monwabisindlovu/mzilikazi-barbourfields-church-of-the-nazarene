import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosClient from '@/api/client/axiosClient';
import { Plus, Pencil, Trash2, Eye, EyeOff, Megaphone } from 'lucide-react';
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

export default function AnnouncementsManager() {
  const [isOpen, setIsOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    media_type: 'image',
    files: [],
    link_url: '',
    link_text: '',
    display_order: 0,
    is_active: true,
  });

  const queryClient = useQueryClient();

  /* ================= FETCH ================= */
  const { data: announcements = [], isLoading } = useQuery({
    queryKey: ['admin-announcements'],
    queryFn: async () => {
      const { data } = await axiosClient.get('/announcements?sort=display_order');
      return data;
    },
  });

  /* ================= CREATE ================= */
  const createMutation = useMutation({
    mutationFn: async data => {
      const res = await axiosClient.post('/announcements', data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-announcements'] });
      toast.success('Announcement created');
      handleClose();
    },
  });

  /* ================= UPDATE ================= */
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }) => {
      const res = await axiosClient.put(`/announcements/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-announcements'] });
      toast.success('Announcement updated');
      handleClose();
    },
  });

  /* ================= DELETE ================= */
  const deleteMutation = useMutation({
    mutationFn: async id => {
      await axiosClient.delete(`/announcements/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-announcements'] });
      toast.success('Deleted');
    },
  });

  /* ================= OPEN ================= */
  const handleOpen = item => {
    if (item) {
      setEditingItem(item);
      setFormData({
        title: item.title || '',
        content: item.content || '',
        media_type: item.media_type || 'image',
        files: item.url ? [{ url: item.url }] : [], // ✅ FIXED
        link_url: item.link_url || '',
        link_text: item.link_text || '',
        display_order: item.display_order || 0,
        is_active: item.is_active ?? true,
      });
    } else {
      setEditingItem(null);
      setFormData({
        title: '',
        content: '',
        media_type: 'image',
        files: [],
        link_url: '',
        link_text: '',
        display_order: 0,
        is_active: true,
      });
    }
    setIsOpen(true);
  };

  /* ================= CLOSE ================= */
  const handleClose = () => {
    setIsOpen(false);
    setEditingItem(null);
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

    // fallback to existing when editing
    if (!finalUrl && editingItem?.url) {
      finalUrl = editingItem.url;
    }

    if (!finalUrl) {
      toast.error('Please upload an image or video');
      return;
    }

    const payload = {
      title: formData.title,
      content: formData.content,
      media_type: formData.media_type,
      url: finalUrl,
      link_url: formData.link_url,
      link_text: formData.link_text,
      display_order: formData.display_order,
      is_active: formData.is_active,
    };

    if (editingItem) {
      updateMutation.mutate({
        id: editingItem._id,
        data: payload, // ✅ FIXED (no spreading)
      });
    } else {
      createMutation.mutate(payload);
    }
  };

  /* ================= TOGGLE ================= */
  const toggleActive = item => {
    updateMutation.mutate({
      id: item._id,
      data: {
        ...item,
        is_active: !item.is_active,
      },
    });
  };

  /* ================= UI ================= */
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between mb-6">
        <h2 className="text-xl font-bold">Manage Announcements</h2>

        <Button onClick={() => handleOpen()}>
          <Plus className="w-4 h-4 mr-2" /> Add
        </Button>
      </div>

      {isLoading ? (
        <div>Loading...</div>
      ) : announcements.length === 0 ? (
        <div className="text-center py-12 text-slate-500">
          <Megaphone className="w-12 h-12 mx-auto mb-4 opacity-50" />
          No announcements
        </div>
      ) : (
        <div className="space-y-4">
          {announcements.map(item => {
            const mediaUrl = item.url; // ✅ FIXED

            return (
              <div key={item._id} className="flex gap-4 p-4 border rounded-lg">
                {mediaUrl && (
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-slate-100">
                    {item.media_type === 'video' ? (
                      <video src={mediaUrl} className="w-full h-full object-cover" />
                    ) : (
                      <img src={mediaUrl} className="w-full h-full object-cover" />
                    )}
                  </div>
                )}

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{item.title}</h3>

                    {item.is_active ? (
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    ) : (
                      <Badge variant="secondary">Hidden</Badge>
                    )}
                  </div>

                  <p className="text-sm text-slate-600">{item.content}</p>
                </div>

                <div className="flex gap-2">
                  <Button size="icon" variant="ghost" onClick={() => toggleActive(item)}>
                    {item.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </Button>

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
              </div>
            );
          })}
        </div>
      )}

      {/* MODAL */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-h-[90vh] flex flex-col overflow-hidden">
          <DialogHeader className="shrink-0">
            <DialogTitle>{editingItem ? 'Edit' : 'Add'} Announcement</DialogTitle>
          </DialogHeader>

          {/* SCROLLABLE CONTENT AREA */}
          <form
            id="announcement-form"
            onSubmit={handleSubmit}
            className="flex-1 overflow-y-auto space-y-4 pr-2"
          >
            <Input
              placeholder="Title"
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              required
            />

            <Textarea
              placeholder="Content"
              value={formData.content}
              onChange={e => setFormData({ ...formData, content: e.target.value })}
              required
            />

            <select
              value={formData.media_type}
              onChange={e => setFormData({ ...formData, media_type: e.target.value })}
              className="w-full border rounded-md p-2"
            >
              <option value="image">Image</option>
              <option value="video">Video</option>
            </select>

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
              accept={formData.media_type === 'video' ? 'video/*' : 'image/*'}
            />

            <Input
              placeholder="Link URL"
              value={formData.link_url}
              onChange={e => setFormData({ ...formData, link_url: e.target.value })}
            />

            <Input
              placeholder="Link Text"
              value={formData.link_text}
              onChange={e => setFormData({ ...formData, link_text: e.target.value })}
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

            <div className="flex items-center gap-2 pb-2">
              <Switch
                checked={formData.is_active}
                onCheckedChange={v => setFormData({ ...formData, is_active: v })}
              />
              Active
            </div>
          </form>

          {/* FIXED FOOTER (always visible) */}
          <DialogFooter className="shrink-0 border-t pt-3 bg-white">
            <Button type="button" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" form="announcement-form">
              {editingItem ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
