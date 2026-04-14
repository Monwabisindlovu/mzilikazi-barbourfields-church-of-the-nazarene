import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function ContactUs() {
  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      details: ['innomsipha@gmail.com'],
      link: 'mailto:innomsipha@gmail.com',
    },
    {
      icon: Phone,
      title: 'Phone',
      details: ['+263 77 409 4307', '+263 71 292 0101'],
    },
    {
      icon: MapPin,
      title: 'Address',
      details: ['41396 Barbourfields', 'Bulawayo, Zimbabwe'],
    },
    {
      icon: Clock,
      title: 'Service Times',
      details: ['Sunday: 09:00 AM - 12:30 PM', 'Youth (Sat): 14:00 - 16:00'],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[300px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920')`,
          }}
        >
          <div className="absolute inset-0 bg-slate-900/70" />
        </div>
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Contact Us</h1>
            <p className="text-xl text-white/80">We'd love to hear from you</p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, i) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-slate-50 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <info.icon className="w-7 h-7 text-amber-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-3">{info.title}</h3>
                <div className="space-y-1">
                  {info.details.map((detail, j) => (
                    <p key={j} className="text-slate-600">
                      {info.link ? (
                        <a href={info.link} className="hover:text-amber-600 transition-colors">
                          {detail}
                        </a>
                      ) : info.title === 'Phone' ? (
                        <a
                          href={`tel:${detail.replace(/\s/g, '')}`}
                          className="hover:text-amber-600 transition-colors"
                        >
                          {detail}
                        </a>
                      ) : (
                        detail
                      )}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3780.6!2d28.55!3d-20.17!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sBarbourfields%2C%20Bulawayo%2C%20Zimbabwe!5e0!3m2!1sen!2s!4v1234567890"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Church Location"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
