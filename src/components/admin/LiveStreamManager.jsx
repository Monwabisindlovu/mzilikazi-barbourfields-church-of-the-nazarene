import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosClient from '@/api/client/axiosClient';
import { Plus, Pencil, Trash2, Radio, StopCircle, Video } from 'lucide-react';
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

export default function LiveStreamManager() {
  const [isOpen, setIsOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});
  const queryClient = useQueryClient();

  /* ================= FETCH ================= */
  const { data: streams = [], isLoading } = useQuery({
    queryKey: ['admin-streams'],
    queryFn: async () => {
      const res = await axiosClient.get('/livestreams?sort=-created_date');
      return res.data;
    },
  });

  /* ================= CREATE ================= */
  const createMutation = useMutation({
    mutationFn: async data => {
      const res = await axiosClient.post('/livestreams', data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-streams'] });
      toast.success('Live stream created');
      handleClose();
    },
    onError: err => toast.error(err?.response?.data?.message || 'Failed to create stream'),
  });

  /* ================= UPDATE ================= */
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }) => {
      const res = await axiosClient.put(`/livestreams/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-streams'] });
      toast.success('Live stream updated');
      handleClose();
    },
    onError: err => toast.error(err?.response?.data?.message || 'Failed to update stream'),
  });

  /* ================= DELETE ================= */
  const deleteMutation = useMutation({
    mutationFn: async id => {
      await axiosClient.delete(`/livestreams/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-streams'] });
      toast.success('Live stream deleted');
    },
    onError: err => toast.error(err?.response?.data?.message || 'Failed to delete stream'),
  });

  /* ================= OPEN ================= */
  const handleOpen = item => {
    if (item) {
      setEditingItem(item);
      setFormData(item);
    } else {
      setEditingItem(null);
      setFormData({ is_live: false });
    }
    setIsOpen(true);
  };

  /* ================= CLOSE ================= */
  const handleClose = () => {
    setIsOpen(false);
    setEditingItem(null);
    setFormData({});
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = e => {
    e.preventDefault();

    if (editingItem) {
      updateMutation.mutate({
        id: editingItem._id, // ✅ FIXED
        data: formData,
      });
    } else {
      createMutation.mutate(formData);
    }
  };

  /* ================= TOGGLE LIVE ================= */
  const toggleLive = stream => {
    updateMutation.mutate({
      id: stream._id, // ✅ FIXED
      data: { ...stream, is_live: !stream.is_live },
    });
  };

  const liveStream = streams.find(s => s.is_live);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-900">Manage Live Streams</h2>
        <Button
          onClick={() => handleOpen()}
          className="bg-amber-500 hover:bg-amber-600 text-slate-900"
        >
          <Plus className="w-4 h-4 mr-2" /> Add Stream
        </Button>
      </div>

      {/* CURRENTLY LIVE */}
      {liveStream && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Radio className="w-6 h-6 text-red-500" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping" />
            </div>
            <div>
              <p className="font-semibold text-red-800">Currently Live: {liveStream.title}</p>
              <p className="text-sm text-red-600">{liveStream.stream_url}</p>
            </div>
          </div>
          <Button
            variant="outline"
            className="border-red-300 text-red-700"
            onClick={() => toggleLive(liveStream)}
          >
            <StopCircle className="w-4 h-4 mr-2" /> End Stream
          </Button>
        </div>
      )}

      {/* LIST */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2].map(i => (
            <div key={i} className="h-20 bg-slate-100 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : streams.length === 0 ? (
        <div className="text-center py-12 text-slate-500">
          <Video className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No live streams configured.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {streams.map(stream => (
            <div
              key={stream._id} // ✅ FIXED
              className="flex items-center gap-4 p-4 border rounded-lg hover:bg-slate-50"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-slate-900">{stream.title}</h3>
                  {stream.is_live && (
                    <Badge className="bg-red-100 text-red-800">
                      <Radio className="w-3 h-3 mr-1" /> Live
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-slate-600 truncate">
                  {stream.stream_url || 'No URL set'}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant={stream.is_live ? 'destructive' : 'outline'}
                  size="sm"
                  onClick={() => toggleLive(stream)}
                >
                  {stream.is_live ? (
                    <>
                      <StopCircle className="w-4 h-4 mr-1" /> Stop
                    </>
                  ) : (
                    <>
                      <Radio className="w-4 h-4 mr-1" /> Go Live
                    </>
                  )}
                </Button>

                <Button variant="ghost" size="icon" onClick={() => handleOpen(stream)}>
                  <Pencil className="w-4 h-4" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteMutation.mutate(stream._id)} // ✅ FIXED
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingItem ? 'Edit Live Stream' : 'Add Live Stream'}</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Title"
              value={formData.title || ''}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              required
            />

            <Textarea
              placeholder="Description"
              value={formData.description || ''}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
            />

            <Input
              placeholder="Stream URL"
              value={formData.stream_url || ''}
              onChange={e => setFormData({ ...formData, stream_url: e.target.value })}
            />

            <Input
              type="datetime-local"
              value={formData.scheduled_date || ''}
              onChange={e => setFormData({ ...formData, scheduled_date: e.target.value })}
            />

            <div className="flex items-center gap-2">
              <Switch
                checked={formData.is_live || false}
                onCheckedChange={v => setFormData({ ...formData, is_live: v })}
              />
              <span className="text-sm">Currently Live</span>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit">{editingItem ? 'Save Changes' : 'Add Stream'}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
