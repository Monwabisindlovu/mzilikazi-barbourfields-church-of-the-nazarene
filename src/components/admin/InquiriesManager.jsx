import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosClient from '@/api/client/axiosClient';
import { Trash2, MessageSquare, Mail, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { format } from 'date-fns';

export default function InquiriesManager() {
  const queryClient = useQueryClient();

  /* ================= FETCH ================= */
  const { data: inquiries = [], isLoading } = useQuery({
    queryKey: ['admin-inquiries'],
    queryFn: async () => {
      const res = await axiosClient.get('/partnership-inquiries?sort=-created_date');
      return res.data;
    },
  });

  /* ================= UPDATE ================= */
  const updateMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      const res = await axiosClient.put(`/partnership-inquiries/${id}`, { status });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-inquiries'] });
      toast.success('Status updated');
    },
    onError: err => toast.error(err?.response?.data?.message || 'Failed to update status'),
  });

  /* ================= DELETE ================= */
  const deleteMutation = useMutation({
    mutationFn: async id => {
      await axiosClient.delete(`/partnership-inquiries/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-inquiries'] });
      toast.success('Inquiry deleted');
    },
    onError: err => toast.error(err?.response?.data?.message || 'Failed to delete inquiry'),
  });

  /* ================= STATUS CONFIG ================= */
  const statusColors = {
    new: 'bg-blue-100 text-blue-800',
    contacted: 'bg-yellow-100 text-yellow-800',
    resolved: 'bg-green-100 text-green-800',
  };

  const statusIcons = {
    new: AlertCircle,
    contacted: Clock,
    resolved: CheckCircle,
  };

  /* ================= UI ================= */
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-900">Partnership Inquiries</h2>

        <Badge variant="secondary">
          {inquiries.filter(i => (i.status || 'new') === 'new').length} new
        </Badge>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-24 bg-slate-100 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : inquiries.length === 0 ? (
        <div className="text-center py-12 text-slate-500">
          <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No inquiries yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {inquiries.map(inquiry => {
            const status = inquiry.status || 'new';
            const StatusIcon = statusIcons[status] || AlertCircle;

            return (
              <div key={inquiry._id} className="p-4 border rounded-lg hover:bg-slate-50">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-slate-900">{inquiry.name}</h3>

                      <Badge className={statusColors[status]}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {status}
                      </Badge>
                    </div>

                    <a
                      href={`mailto:${inquiry.email}`}
                      className="text-sm text-amber-600 hover:underline flex items-center gap-1"
                    >
                      <Mail className="w-3 h-3" /> {inquiry.email}
                    </a>

                    <p className="text-slate-600 mt-2 whitespace-pre-line">{inquiry.message}</p>

                    <p className="text-xs text-slate-400 mt-2">
                      {inquiry.created_date &&
                        format(new Date(inquiry.created_date), 'MMM d, yyyy h:mm a')}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* ✅ FIXED STATUS UPDATE */}
                    <Select
                      value={status}
                      onValueChange={v =>
                        updateMutation.mutate({
                          id: inquiry._id,
                          status: v,
                        })
                      }
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="contacted">Contacted</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                      </SelectContent>
                    </Select>

                    {/* ✅ FIXED DELETE */}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteMutation.mutate(inquiry._id)}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
