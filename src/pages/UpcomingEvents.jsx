import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axiosClient from '@/api/client/axiosClient';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Calendar, Clock, MapPin, Building } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export default function UpcomingEvents() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const { data: events = [], isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const response = await axiosClient.get('/events');
      return response.data || [];
    },
  });

  // fallback events if backend returns empty
  const fallbackEvents = [
    {
      id: '1',
      title: 'Christmas Party',
      description: 'Join us in spreading joy to orphans and widows with music, food, and gifts.',
      category: 'Community',
      date: '2025-12-24',
      start_time: '14:00',
      end_time: '18:00',
      location: 'Mzilikazi Church Grounds',
      venue: 'Main Hall',
      image_url: 'https://images.unsplash.com/photo-1512389142860-9c449e58a814?w=600',
    },
    {
      id: '2',
      title: 'Prison Visitations',
      description: 'Bringing hope and prayer to inmates through gospel and encouragement.',
      category: 'Outreach',
      date: '2025-11-10',
      start_time: '10:00',
      end_time: '13:00',
      location: 'Bulawayo Central Prison',
      venue: 'Chapel Room',
      image_url: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=600',
    },
    {
      id: '3',
      title: 'Sports Events',
      description: 'A day of soccer, races, and fun for community youth.',
      category: 'Fun',
      date: '2025-08-12',
      start_time: '10:00',
      end_time: '16:00',
      location: 'Mzilikazi Sports Grounds',
      venue: 'Field A',
      image_url: 'https://images.unsplash.com/photo-1461896836934-4278d1b6d5b7?w=600',
    },
  ];

  const displayEvents = events.length > 0 ? events : fallbackEvents;

  const categoryColors = {
    Community: 'bg-blue-100 text-blue-800',
    Outreach: 'bg-purple-100 text-purple-800',
    Compassion: 'bg-pink-100 text-pink-800',
    Health: 'bg-green-100 text-green-800',
    Fun: 'bg-yellow-100 text-yellow-800',
    Spiritual: 'bg-indigo-100 text-indigo-800',
    Prayer: 'bg-red-100 text-red-800',
    Youth: 'bg-orange-100 text-orange-800',
    Other: 'bg-slate-100 text-slate-800',
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[300px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1920')",
          }}
        >
          <div className="absolute inset-0 bg-slate-900/70" />
        </div>

        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Upcoming Events</h1>
            <p className="text-xl text-white/80">
              Stay tuned and get involved in our life-changing events!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Events */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white rounded-2xl h-96 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayEvents.map((event, i) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all cursor-pointer group"
                  onClick={() => setSelectedEvent(event)}
                >
                  <div className="h-48 overflow-hidden relative">
                    <img
                      src={
                        event.image ||
                        'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600'
                      }
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    <div className="absolute top-4 left-4">
                      <Badge className={categoryColors[event.category] || categoryColors.Other}>
                        {event.category}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-bold text-xl text-slate-900 mb-3">{event.title}</h3>

                    <div className="space-y-2 text-slate-600 text-sm">
                      {event.date && (
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-amber-500" />
                          {format(new Date(event.date), 'MMMM d, yyyy')}
                        </div>
                      )}

                      {event.start_time && (
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-amber-500" />
                          {event.start_time}
                          {event.end_time && ` - ${event.end_time}`}
                        </div>
                      )}

                      {event.location && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-amber-500" />
                          {event.location}
                        </div>
                      )}
                    </div>

                    <Button variant="link" className="text-amber-600 p-0 mt-4">
                      Learn More →
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedEvent?.title}</DialogTitle>
          </DialogHeader>

          {selectedEvent && (
            <div className="space-y-4">
              {selectedEvent?.image && (
                <img
                  src={selectedEvent.image}
                  alt={selectedEvent.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
              )}

              <p className="text-slate-600">{selectedEvent.description}</p>

              <div className="space-y-2 text-sm">
                {selectedEvent.date && (
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-amber-500" />
                    {format(new Date(selectedEvent.date), 'MMMM d, yyyy')}
                  </div>
                )}

                {selectedEvent.start_time && (
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-amber-500" />
                    {selectedEvent.start_time}
                    {selectedEvent.end_time && ` - ${selectedEvent.end_time}`}
                  </div>
                )}

                {selectedEvent.location && (
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-amber-500" />
                    {selectedEvent.location}
                  </div>
                )}

                {selectedEvent.venue && (
                  <div className="flex items-center gap-3">
                    <Building className="w-5 h-5 text-amber-500" />
                    {selectedEvent.venue}
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
