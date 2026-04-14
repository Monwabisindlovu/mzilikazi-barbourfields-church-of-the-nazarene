import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axiosClient from '@/api/client/axiosClient';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function AnnouncementSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data: announcements = [] } = useQuery({
    queryKey: ['announcements'],
    queryFn: async () => {
      const res = await axiosClient.get(
        '/announcements?is_active=true&limit=10&sort=display_order'
      );

      // ✅ NORMALIZE DATA (VERY IMPORTANT)
      return (res.data || []).map(item => ({
        ...item,
        image_url: item.image_url || item.url || null,
        video_url: item.video_url || null,
      }));
    },
  });

  // ✅ FALLBACK (UNCHANGED)
  const fallbackAnnouncements = [
    {
      id: '1',
      title: 'Upcoming Youth Camp',
      content:
        'Join us for a week of fun, fellowship, and spiritual growth at our annual Youth Camp.',
      image_url: 'https://images.unsplash.com/photo-1598514982370-1245c81e9d5c?w=600',
      link_url: '#',
      link_text: 'Register Now',
    },
    {
      id: '2',
      title: 'Sunday Special Service',
      content: 'Don’t miss our special Sunday service featuring guest speakers and worship.',
      image_url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600',
    },
  ];

  const displayAnnouncements = announcements.length > 0 ? announcements : fallbackAnnouncements;

  // ✅ AUTO SLIDE
  useEffect(() => {
    if (displayAnnouncements.length > 1) {
      const timer = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % displayAnnouncements.length);
      }, 6000);
      return () => clearInterval(timer);
    }
  }, [displayAnnouncements.length]);

  if (!displayAnnouncements.length) return null;

  const current = displayAnnouncements[currentIndex];

  return (
    <section className="py-12 bg-gradient-to-br from-amber-50 to-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-sm font-semibold text-amber-600 uppercase">Announcements</h2>

          {displayAnnouncements.length > 1 && (
            <div className="flex gap-2">
              <Button
                size="icon"
                variant="outline"
                onClick={() =>
                  setCurrentIndex(
                    prev => (prev - 1 + displayAnnouncements.length) % displayAnnouncements.length
                  )
                }
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>

              <Button
                size="icon"
                variant="outline"
                onClick={() => setCurrentIndex(prev => (prev + 1) % displayAnnouncements.length)}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>

        {/* SLIDER */}
        <div className="relative overflow-hidden rounded-2xl shadow-xl bg-white min-h-[320px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current._id || current.id}
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -80 }}
              transition={{ duration: 0.4 }}
              className="grid md:grid-cols-2"
            >
              {/* MEDIA */}
              {(current.video_url || current.image_url) && (
                <div className="relative h-64 md:h-full">
                  {/* VIDEO */}
                  {current.video_url ? (
                    <video
                      src={current.video_url}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={current.image_url}
                      alt={current.title}
                      className="w-full h-full object-cover"
                    />
                  )}

                  {/* GRADIENT OVERLAY */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
              )}

              {/* CONTENT */}
              <div
                className={`p-8 flex flex-col justify-center ${
                  !current.image_url && !current.video_url ? 'md:col-span-2 text-center' : ''
                }`}
              >
                {/* BADGE */}
                {current.is_active && (
                  <Badge className="bg-amber-500 text-white w-fit mb-3">Important</Badge>
                )}

                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                  {current.title}
                </h3>

                <p className="text-slate-600 text-lg mb-6 whitespace-pre-line">{current.content}</p>

                {/* LINK */}
                {current.link_url && (
                  <Button
                    className="bg-amber-500 hover:bg-amber-600 text-slate-900 w-fit"
                    onClick={() => window.open(current.link_url, '_blank')}
                  >
                    {current.link_text || 'Learn More'}
                    <ExternalLink className="ml-2 w-4 h-4" />
                  </Button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* DOTS */}
        {displayAnnouncements.length > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            {displayAnnouncements.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-2 rounded-full transition-all ${
                  i === currentIndex ? 'bg-amber-500 w-6' : 'bg-slate-300 w-2'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
