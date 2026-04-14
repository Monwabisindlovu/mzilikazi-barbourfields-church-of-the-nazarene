import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axiosClient from '@/api/client/axiosClient';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ArrowRight, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { format } from 'date-fns';
import LiveStreamBanner from '../components/church/LiveStreamBanner';
import AnnouncementSlider from '../components/church/AnnouncementSlider';
import MoreAboutSection from '../components/church/MoreAboutSection';

export default function Home() {
  /* ---------------- FEATURED EVENTS ---------------- */

  const { data: events = [] } = useQuery({
    queryKey: ['featured-events'],
    queryFn: async () => {
      const res = await axiosClient.get('/events?featured=true');
      return res.data || [];
    },
  });

  /* ---------------- LIVESTREAM ---------------- */

  const { data: livestream } = useQuery({
    queryKey: ['livestream'],
    queryFn: async () => {
      const res = await axiosClient.get('/livestream/active');
      return res.data || null;
    },
  });

  return (
    <div className="min-h-screen bg-white">
      {/* HERO */}
      <section className="relative h-[90vh] min-h-[600px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=1920&q=80')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/50 to-slate-900/80" />
        </div>

        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <p className="text-amber-400 font-medium tracking-[0.3em] uppercase text-sm mb-4">
              Welcome to
            </p>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Mzilikazi Church
              <span className="block text-amber-400">of the Nazarene</span>
            </h1>

            <p className="text-xl md:text-2xl text-white/80 font-light italic mb-8">
              "Holiness Unto The Lord"
            </p>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8 border border-white/20">
              <p className="text-white/90 text-lg md:text-xl">
                "Come to me, all you who are weary and burdened, and I will give you rest."
              </p>
              <p className="text-amber-400 font-medium mt-2">— Matthew 11:28</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold px-8"
              >
                <Link to="/events" className="flex items-center">
                  View Events
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-slate-900 px-8"
              >
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* LIVESTREAM */}
      {livestream?.is_live && <LiveStreamBanner stream={livestream} />}

      {/* ANNOUNCEMENTS */}
      <AnnouncementSlider />

      {/* SERVICES */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-sm font-semibold text-amber-600 tracking-wider uppercase mb-2">
              Join Us
            </h2>

            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Our Services</h3>

            <div className="space-y-4">
              {[
                { day: 'Sunday Service', time: '09:00 – 12:30', icon: '⛪' },
                { day: 'Youth (Saturday)', time: '14:00 – 16:00', icon: '👥' },
                { day: 'Women (Thursday)', time: '14:00 – 16:00', icon: '💐' },
              ].map((service, i) => (
                <div key={i} className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm">
                  <span className="text-2xl">{service.icon}</span>

                  <div>
                    <p className="font-semibold text-slate-900">{service.day}</p>
                    <p className="text-slate-600">{service.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* PASTOR CARD */}

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <img
              src="https://raw.githubusercontent.com/Monwabisindlovu/portfolio-landing_page/main/images/pastor.jpg"
              alt="Pastor"
              className="w-48 h-48 object-cover rounded-full mx-auto mb-4"
            />

            <h4 className="text-xl font-bold text-slate-900">Pastor Rev I. Msipha</h4>

            <p className="text-slate-600 italic mt-2">"A bond-servant of the Lord Jesus Christ"</p>
          </div>
        </div>
      </section>

      {/* FEATURED EVENTS */}

      {events.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-sm font-semibold text-amber-600 uppercase">What's Coming</h2>

              <h3 className="text-3xl md:text-4xl font-bold text-slate-900">Featured Events</h3>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {events.map(event => (
                <div key={event.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <img
                    src={
                      event.image_url ||
                      'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600'
                    }
                    alt={event.title}
                    className="w-full h-48 object-cover"
                  />

                  <div className="p-5">
                    <Badge className="mb-2">{event.category}</Badge>

                    <h4 className="font-bold text-lg text-slate-900">{event.title}</h4>

                    {event.date && (
                      <div className="flex items-center gap-2 text-slate-600 text-sm mt-2">
                        <Calendar className="w-4 h-4" />
                        {format(new Date(event.date), 'MMM d, yyyy')}
                      </div>
                    )}

                    {event.location && (
                      <div className="flex items-center gap-2 text-slate-600 text-sm">
                        <MapPin className="w-4 h-4" />
                        {event.location}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Button variant="outline" size="lg">
                <Link to="/events" className="flex items-center">
                  View All Events
                  <ChevronRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* ABOUT */}
      <MoreAboutSection />

      {/* CONTACT */}

      <section className="py-20 bg-slate-900 text-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Join Our Family?</h2>

        <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
          We'd love to welcome you to our community.
        </p>

        <div className="flex justify-center gap-4">
          <Button className="bg-amber-500 hover:bg-amber-600 text-slate-900">
            <Link to="/contact">Contact Us</Link>
          </Button>

          <Button variant="outline">
            <Link to="/partnership">Partner With Us</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
