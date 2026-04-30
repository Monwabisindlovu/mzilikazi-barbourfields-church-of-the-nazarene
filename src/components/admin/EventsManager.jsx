import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosClient from '@/api/client/axiosClient';
import { Plus, Pencil, Trash2, Star, StarOff, Calendar } from 'lucide-react';
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
import { format } from 'date-fns';
import FileUploader from './FileUploader';

export default function EventsManager() {
  const [isOpen, setIsOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    contactPhone: '',
    contactEmail: '',
    date: '',
    start_time: '',
    end_time: '',
    location: '',
    venue: '',
    is_featured: false,
    files: [],
  });

  const queryClient = useQueryClient();

  /* ================= FETCH ================= */
  const { data: events = [], isLoading } = useQuery({
    queryKey: ['admin-events'],
    queryFn: async () => {
      const { data } = await axiosClient.get('/events?sort=-date');
      return data;
    },
  });

  /* ================= CREATE ================= */
  const createMutation = useMutation({
    mutationFn: async data => {
      const res = await axiosClient.post('/events', data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-events'] });
      toast.success('Event created');
      handleClose();
    },
  });

  /* ================= UPDATE ================= */
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }) => {
      const res = await axiosClient.put(`/events/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-events'] });
      toast.success('Event updated');
      handleClose();
    },
  });

  /* ================= DELETE ================= */
  const deleteMutation = useMutation({
    mutationFn: async id => {
      await axiosClient.delete(`/events/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-events'] });
      toast.success('Event deleted');
    },
  });

  /* ================= OPEN ================= */
  const handleOpen = item => {
    if (item) {
      setEditingItem(item);

      const [phone = '', email = ''] = (item.contact_info || '').split('|');

      setFormData({
        title: item.title || '',
        description: item.description || '',
        category: item.category || '',
        contactPhone: phone,
        contactEmail: email,
        date: item.date ? item.date.split('T')[0] : '',
        start_time: item.start_time || '',
        end_time: item.end_time || '',
        location: item.location || '',
        venue: item.venue || '',
        is_featured: item.is_featured || false,
        files: item.image ? [{ url: item.image }] : [], // ✅ same pattern as announcements
      });
    } else {
      setEditingItem(null);
      setFormData({
        title: '',
        description: '',
        category: '',
        contactPhone: '',
        contactEmail: '',
        date: '',
        start_time: '',
        end_time: '',
        location: '',
        venue: '',
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

    // fallback (important for edit)
    if (!finalUrl && editingItem?.image) {
      finalUrl = editingItem.image;
    }

    if (!finalUrl) {
      toast.error('Upload an image');
      return;
    }

    const contact_info = `${formData.contactPhone}|${formData.contactEmail}`;

    const payload = {
      title: formData.title,
      description: formData.description,
      category: formData.category || 'Other',
      date: formData.date,
      start_time: formData.start_time,
      end_time: formData.end_time,
      location: formData.location,
      venue: formData.venue,
      is_featured: formData.is_featured,
      contact_info,
      image: finalUrl,
    };

    if (editingItem) {
      updateMutation.mutate({
        id: editingItem._id,
        data: payload, // ✅ clean payload (same pattern as announcements)
      });
    } else {
      createMutation.mutate(payload);
    }
  };

  /* ================= TOGGLE FEATURED ================= */
  const toggleFeatured = event => {
    updateMutation.mutate({
      id: event._id,
      data: {
        is_featured: !event.is_featured, // ✅ FIXED
      },
    });
  };

  /* ================= UI ================= */
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between mb-6">
        <h2 className="text-xl font-bold">Manage Events</h2>

        <Button onClick={() => handleOpen()}>
          <Plus className="w-4 h-4 mr-2" /> Add Event
        </Button>
      </div>

      {isLoading ? (
        <div>Loading...</div>
      ) : events.length === 0 ? (
        <div className="text-center py-12 text-slate-500">
          <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
          No events yet
        </div>
      ) : (
        <div className="space-y-4">
          {events.map(event => (
            <div key={event._id} className="flex gap-4 p-4 border rounded-lg">
              {event.image && (
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-slate-100">
                  <img src={event.image} className="w-full h-full object-cover" />
                </div>
              )}

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{event.title}</h3>

                  {event.is_featured && (
                    <Badge className="bg-yellow-100 text-yellow-800">Featured</Badge>
                  )}
                </div>

                <p className="text-sm text-slate-500">{event.category}</p>

                {event.date && (
                  <p className="text-sm text-slate-400">
                    {format(new Date(event.date), 'MMM d, yyyy')}
                  </p>
                )}
              </div>

              <div className="flex gap-2">
                <Button size="icon" onClick={() => toggleFeatured(event)}>
                  {event.is_featured ? <Star /> : <StarOff />}
                </Button>

                <Button size="icon" onClick={() => handleOpen(event)}>
                  <Pencil />
                </Button>

                <Button
                  size="icon"
                  variant="destructive"
                  onClick={() => deleteMutation.mutate(event._id)}
                >
                  <Trash2 />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-h-[90vh] flex flex-col overflow-hidden">
          <DialogHeader className="shrink-0">
            <DialogTitle>{editingItem ? 'Edit Event' : 'Add Event'}</DialogTitle>
          </DialogHeader>

          {/* SCROLLABLE FORM AREA */}
          <form
            id="event-form"
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
              placeholder="Description"
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
            />

            <Input
              type="date"
              value={formData.date}
              onChange={e => setFormData({ ...formData, date: e.target.value })}
              required
            />

            <div className="flex gap-2">
              <Input
                type="time"
                value={formData.start_time}
                onChange={e => setFormData({ ...formData, start_time: e.target.value })}
              />
              <Input
                type="time"
                value={formData.end_time}
                onChange={e => setFormData({ ...formData, end_time: e.target.value })}
              />
            </div>

            <Input
              placeholder="Location"
              value={formData.location}
              onChange={e => setFormData({ ...formData, location: e.target.value })}
              required
            />

            <Input
              placeholder="Venue"
              value={formData.venue}
              onChange={e => setFormData({ ...formData, venue: e.target.value })}
            />

            <div className="flex gap-2">
              <Input
                placeholder="Phone"
                value={formData.contactPhone}
                onChange={e => setFormData({ ...formData, contactPhone: e.target.value })}
              />
              <Input
                type="email"
                placeholder="Email"
                value={formData.contactEmail}
                onChange={e => setFormData({ ...formData, contactEmail: e.target.value })}
              />
            </div>

            <Input
              placeholder="Category"
              value={formData.category}
              onChange={e => setFormData({ ...formData, category: e.target.value })}
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
              accept="image/*,video/*"
            />

            <div className="flex items-center gap-2 pb-2">
              <Switch
                checked={formData.is_featured}
                onCheckedChange={v => setFormData({ ...formData, is_featured: v })}
              />
              Featured
            </div>
          </form>

          {/* FOOTER ALWAYS VISIBLE */}
          <DialogFooter className="shrink-0 border-t pt-3 bg-white">
            <Button type="button" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" form="event-form">
              {editingItem ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
