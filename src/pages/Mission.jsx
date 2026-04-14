import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Globe2, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Mission() {
  const locations = ['Mzilikazi', 'Bulawayo', 'Zimbabwe', 'Worldwide'];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1478147427282-58a87a120781?w=1920')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-900/70" />
        </div>
        <div className="relative z-10 h-full flex flex-col justify-center px-4">
          <div className="max-w-6xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl"
            >
              <Globe2 className="w-12 h-12 text-amber-400 mb-6" />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Our Mission
              </h1>
              <p className="text-xl md:text-2xl text-white/80">
                To make Christlike disciples in the nations
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-sm font-semibold text-amber-600 tracking-wider uppercase mb-2">
              Our Reach
            </h2>
            <h3 className="text-3xl font-bold text-slate-900">Making Disciples Everywhere</h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {locations.map((location, i) => (
              <motion.div
                key={location}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-amber-600" />
                </div>
                <h4 className="text-xl font-bold text-slate-900">{location}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Statement */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Statement of Mission</h2>
            <p className="text-lg text-slate-600 mb-8">
              Our Statement of Mission defines who we are, why we exist, and our reason for being.
              It guides our efforts in spreading the message of holiness and Christlike living to
              communities near and far.
            </p>
            <Button
              className="bg-amber-500 hover:bg-amber-600 text-slate-900"
              onClick={() => window.open('https://www.nazarene.org/mission', '_blank')}
            >
              Read more on global Nazarene website <ExternalLink className="ml-2 w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
