import React from 'react';
import { motion } from 'framer-motion';

const cards = [
  {
    title: 'CORE VALUES',
    description: 'Discover the essence of our identity',
    img: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=600',
    link: 'https://www.nazarene.org/who-we-are/core-values',
    color: 'from-amber-500 to-orange-600',
  },
  {
    title: 'OUR BELIEFS',
    description: 'What we believe and teach',
    img: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=600',
    link: 'https://www.nazarene.org/beliefs',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    title: 'ARTICLES OF FAITH',
    description: 'Our foundational truths',
    img: 'https://images.unsplash.com/photo-1507036066871-b7e8032b3dea?w=600',
    link: 'https://www.nazarene.org/who-we-are/articles-faith',
    color: 'from-emerald-500 to-teal-600',
  },
];

export default function MoreAboutSection() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-sm font-semibold text-amber-600 tracking-wider uppercase mb-2">
            Discover More
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900">More About Nazarenes</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <motion.a
              key={card.title}
              href={card.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer"
            >
              <img
                src={card.img}
                alt={card.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div
                className={`absolute inset-0 bg-gradient-to-t ${card.color} opacity-80 group-hover:opacity-90 transition-opacity`}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                <h4 className="text-2xl font-bold mb-2">{card.title}</h4>
                <p className="text-white/80 text-center">{card.description}</p>
                <span className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity text-sm border-b border-white">
                  Learn More →
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
