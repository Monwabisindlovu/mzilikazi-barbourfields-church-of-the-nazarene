import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axiosClient from '@/api/client/axiosClient';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Calendar, MapPin, ChevronRight, ArrowRight, Play, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import LiveStreamBanner from '@/components/church/LiveStreamBanner';
import AnnouncementSlider from '@/components/church/AnnouncementSlider';
import MoreAboutSection from '@/components/church/MoreAboutSection';

const SERVICES = [
  {
    day: 'Sunday Worship',
    time: '09:00 AM – 12:30 PM',
    icon: '⛪',
    accent: 'bg-amber-50 border-amber-200',
  },
  {
    day: 'Youth (Saturday)',
    time: '14:00 PM – 16:00 PM',
    icon: '👥',
    accent: 'bg-sky-50 border-sky-200',
  },
  {
    day: 'Women (Thursday)',
    time: '14:00 PM – 16:00 PM',
    icon: '💐',
    accent: 'bg-rose-50 border-rose-200',
  },
];

const NAV_STATS = [
  { number: '100+', label: 'Members' },
  { number: '15+', label: 'Years' },
  { number: '3', label: 'Ministries' },
];

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handler = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const { data: events = [] } = useQuery({
    queryKey: ['featured-events'],
    queryFn: () => base44.entities.Event.filter({ is_featured: true }, '-date', 6),
  });

  const { data: livestream } = useQuery({
    queryKey: ['livestream'],
    queryFn: async () => {
      const streams = await base44.entities.LiveStream.filter(
        { is_live: true },
        '-created_date',
        1
      );
      return streams[0] || null;
    },
  });
  const { data: leaders = [] } = useQuery({
    queryKey: ['leaders'],
    queryFn: async () => {
      const res = await axiosClient.get('/leaders');
      return res.data;
    },
  });

  const pastor = [...leaders].sort((a, b) => (a.displayOrder ?? 999) - (b.displayOrder ?? 999))[0];

  return (
    <div className="min-h-screen bg-white">
      {/* ─── HERO ─── */}
      <section className="relative h-[75vh] max-h-[650px] overflow-hidden bg-black">
        {/* Parallax BG */}
        <div
          className="absolute inset-0 bg-cover bg-center will-change-transform"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=1920&q=80')`,
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        />
        {/* Layered gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/20" />

        {/* Gold top bar */}
        <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 z-20" />

        <div className="relative z-10 h-full flex flex-col justify-end pb-14 sm:justify-center sm:pb-0 px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="max-w-2xl"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="h-px w-10 bg-amber-400" />
              <span className="text-amber-400 font-semibold tracking-[0.25em] uppercase text-xs">
                Bulawayo, Zimbabwe
              </span>
            </motion.div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.0] tracking-tight mb-4">
              A Church
              <br />
              <span className="text-amber-400">For Every</span>
              <br />
              <span className="text-white/90 font-light italic">Soul</span>
            </h1>

            <p className="text-white/60 text-sm sm:text-lg leading-relaxed mb-6 max-w-md">
              Mzilikazi Church of the Nazarene — where faith is lived, community is built, and lives
              are transformed.
            </p>

            <div className="flex flex-wrap gap-3 mb-7">
              <Link
                to={createPageUrl('ContactUs')}
                className="inline-flex items-center gap-2 px-7 py-3 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-full transition-all text-sm tracking-wide shadow-lg shadow-amber-500/30 hover:scale-[1.02]"
              >
                Plan Your Visit <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to={createPageUrl('Media')}
                className="inline-flex items-center gap-2 px-7 py-3 border border-white/30 text-white hover:bg-white/10 font-semibold rounded-full transition-all text-sm backdrop-blur-sm"
              >
                <Play className="w-4 h-4 fill-white" /> Watch Sermons
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-6">
              {NAV_STATS.map(s => (
                <div key={s.label}>
                  <p className="text-xl sm:text-2xl font-black text-white">{s.number}</p>
                  <p className="text-white/40 text-xs uppercase tracking-wider">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          className="absolute bottom-8 right-8 flex flex-col items-center gap-2"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
        >
          <div className="w-px h-12 bg-gradient-to-b from-white/0 to-white/40" />
          <span className="text-white/40 text-[10px] tracking-widest uppercase rotate-90 origin-center translate-x-3">
            Scroll
          </span>
        </motion.div>
      </section>

      {/* ─── LIVE STREAM ─── */}
      {livestream?.is_live && <LiveStreamBanner stream={livestream} />}

      {/* ─── SCRIPTURE BAND ─── */}
      <section className="bg-amber-500 py-5 overflow-hidden">
        <motion.div
          className="flex gap-16 items-center whitespace-nowrap text-black/80 font-semibold text-sm"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="flex items-center gap-4">
              <span className="font-black text-black">Matthew 11:28</span>
              <span className="italic font-normal">
                "Come to me, all you who are weary and burdened, and I will give you rest."
              </span>
              <span className="text-black/30">✦</span>
            </span>
          ))}
        </motion.div>
      </section>

      {/* ─── ANNOUNCEMENTS ─── */}
      <AnnouncementSlider />

      {/* ─── SERVICES + PASTOR ─── */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left: Pastor card — modern asymmetric design */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="flex justify-center"
            >
              <div className="relative w-full max-w-sm mx-auto px-2 sm:px-0">
                <div className="overflow-hidden rounded-3xl shadow-2xl">
                  {pastor?.photo ? (
                    <img
                      src={pastor.photo}
                      alt={pastor.name}
                      className="w-full aspect-[4/5] object-cover object-center"
                    />
                  ) : (
                    <div className="w-full aspect-[4/5] flex items-center justify-center bg-slate-200">
                      No Pastor Image
                    </div>
                  )}
                </div>

                {/* Glass info card */}
                <div className="mt-4 bg-white/70 backdrop-blur-md border border-white/40 rounded-2xl p-4 shadow-lg">
                  <p className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-1">
                    {pastor?.title || 'Senior Pastor'}
                  </p>

                  <h3 className="text-lg font-black text-slate-900 leading-tight">
                    {pastor?.name || 'Pastor'}
                  </h3>

                  <p className="text-slate-500 text-xs italic mt-1">
                    {pastor?.bio
                      ? `"${pastor.bio.slice(0, 80)}${pastor.bio.length > 80 ? '...' : ''}"`
                      : '"A bond-servant of the Lord"'}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right: Services */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-amber-500 font-bold tracking-widest uppercase text-xs mb-3">
                Join Us
              </p>
              <h2 className="text-4xl font-black text-slate-900 leading-tight mb-4">
                Worship With
                <br />
                <span className="text-amber-500">Us This Week</span>
              </h2>
              <p className="text-slate-500 text-base leading-relaxed mb-8">
                Experience authentic worship, powerful preaching, and genuine community every week
                at Mzilikazi Church.
              </p>

              <div className="space-y-4">
                {SERVICES.map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className={`flex items-center gap-4 p-4 sm:p-5 rounded-2xl border-2 ${s.accent} transition-all hover:shadow-md`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-2xl shadow-sm flex-shrink-0">
                      {s.icon}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-slate-900">{s.day}</p>
                      <div className="flex items-center gap-1.5 text-slate-500 text-sm mt-0.5">
                        <Clock className="w-3.5 h-3.5" />
                        {s.time}
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-300" />
                  </motion.div>
                ))}
              </div>

              <Link
                to={createPageUrl('ContactUs')}
                className="inline-flex items-center gap-2 mt-8 text-sm font-bold text-amber-500 hover:text-amber-600 transition-colors"
              >
                Get directions <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── FEATURED EVENTS ─── */}
      {events.length > 0 && (
        <section className="py-16 bg-gradient-to-br from-slate-50 via-amber-50/40 to-orange-50/30">
          <div className="max-w-7xl mx-auto px-6 sm:px-10">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-amber-500 font-bold tracking-widest uppercase text-xs mb-2">
                  Upcoming
                </p>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
                  Events
                  <br />
                  <span className="text-amber-500">Calendar</span>
                </h2>
              </div>
              <Link
                to={createPageUrl('UpcomingEvents')}
                className="flex items-center gap-1 text-sm font-bold text-slate-500 hover:text-amber-500 transition-colors"
              >
                View All <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Mobile + tablet horizontal scroll */}
            <div className="flex gap-4 overflow-x-auto pb-3 -mx-6 px-6 lg:hidden snap-x snap-mandatory">
              {events.map((event, i) => (
                <EventCard key={event.id} event={event} i={i} dark={false} />
              ))}
            </div>

            {/* Desktop grid */}
            <div className="hidden lg:grid lg:grid-cols-3 gap-6">
              {events.slice(0, 3).map((event, i) => (
                <EventCard key={event.id} event={event} i={i} dark={false} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── MORE ABOUT NAZARENES ─── */}
      <MoreAboutSection />

      {/* ─── MISSION STRIP ─── */}
      <section className="relative py-28 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=1920&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-black/75" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-amber-400" />
              <span className="text-amber-400 font-bold text-xs tracking-widest uppercase">
                Our Mission
              </span>
              <div className="h-px w-12 bg-amber-400" />
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight mb-8">
              Making Christlike
              <br />
              <span className="text-amber-400">Disciples</span> in the
              <br />
              Nations
            </h2>
            <p className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-10">
              We exist to know God, grow in faith, and make His love known throughout Bulawayo and
              beyond.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to={createPageUrl('ContactUs')}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-500 hover:bg-amber-400 text-black font-black rounded-full transition-all text-sm tracking-wide shadow-2xl shadow-amber-500/20"
              >
                Join Our Community <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to={createPageUrl('Partnership')}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/20 text-white hover:border-amber-400 hover:text-amber-400 font-bold rounded-full transition-all text-sm"
              >
                Partner With Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function EventCard({ event, i, dark }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.1 }}
      className={`group flex-shrink-0 snap-start rounded-2xl overflow-hidden ${dark ? 'bg-white/5 border border-white/10 hover:border-amber-400/40' : 'bg-white shadow-md border border-slate-100 hover:shadow-xl'} transition-all duration-300`}
      style={{ width: 'calc(50vw - 28px)', minWidth: '200px', maxWidth: '280px' }}
    >
      <div className="relative h-44 overflow-hidden">
        <img
          src={event.image || 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600'}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500 text-black">
            {event.category}
          </span>
        </div>
      </div>
      <div className="p-5">
        <h4
          className={`font-black text-base leading-tight mb-3 ${dark ? 'text-white' : 'text-slate-900'}`}
        >
          {event.title}
        </h4>
        <div
          className={`flex items-center gap-2 text-xs mb-1.5 ${dark ? 'text-white/50' : 'text-slate-400'}`}
        >
          <Calendar className="w-3.5 h-3.5" />
          {event.date && format(new Date(event.date), 'MMM d, yyyy')}
        </div>
        {event.location && (
          <div
            className={`flex items-center gap-2 text-xs ${dark ? 'text-white/50' : 'text-slate-400'}`}
          >
            <MapPin className="w-3.5 h-3.5" />
            {event.location}
          </div>
        )}
      </div>
    </motion.div>
  );
}
