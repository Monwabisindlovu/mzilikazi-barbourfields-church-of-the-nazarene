import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ExternalLink } from 'lucide-react';

const cards = [
  {
    title: 'Core Values',
    description: 'The essence of our identity and calling',
    img: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=800',
    link: 'https://www.nazarene.org/who-we-are/core-values',
  },
  {
    title: 'Our Beliefs',
    description: 'What we believe, preach, and teach',
    img: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800',
    link: 'https://www.nazarene.org/beliefs',
  },
  {
    title: 'Articles of Faith',
    description: 'Our foundational theological truths',
    img: 'https://images.unsplash.com/photo-1507036066871-b7e8032b3dea?w=800',
    link: 'https://www.nazarene.org/who-we-are/articles-faith',
  },
];

export default function MoreAboutSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">

        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-amber-500 font-bold tracking-widest uppercase text-xs mb-2">Discover More</p>
            <h2 className="text-4xl font-black text-slate-900 leading-tight">
              More About<br /><span className="text-amber-500">The Nazarenes</span>
            </h2>
          </div>
          <a
            href="https://www.nazarene.org"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-amber-500 transition-colors"
          >
            Visit Nazarene.org <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile horizontal scroll — 2 cards visible at once */}
        <div className="flex gap-3 overflow-x-auto pb-3 -mx-6 px-6 sm:hidden snap-x snap-mandatory">
          {cards.map((card, i) => (
            <MobileCard key={card.title} card={card} i={i} />
          ))}
        </div>

        {/* Desktop: big featured layout */}
        <div className="hidden sm:grid grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <motion.a
              key={card.title}
              href={card.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="group relative rounded-3xl overflow-hidden cursor-pointer block"
              style={{ aspectRatio: i === 0 ? '3/4' : '4/5' }}
            >
              <img
                src={card.img}
                alt={card.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <p className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Learn More
                </p>
                <h3 className="text-2xl font-black text-white mb-2 leading-tight">{card.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{card.description}</p>
                <div className="mt-4 flex items-center gap-2 text-amber-400 text-sm font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  Explore <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Mobile: Visit link */}
        <div className="sm:hidden mt-6 text-center">
          <a
            href="https://www.nazarene.org"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-bold text-amber-500"
          >
            Visit Nazarene.org <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
}

function MobileCard({ card, i }) {
  return (
    <motion.a
      href={card.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.08 }}
      className="flex-shrink-0 snap-start relative rounded-2xl overflow-hidden block"
      style={{ aspectRatio: '3/4', width: 'calc(50vw - 28px)' }}
    >
      <img src={card.img} alt={card.title} className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h4 className="text-sm font-black text-white leading-tight">{card.title}</h4>
        <p className="text-white/60 text-xs mt-1 line-clamp-2">{card.description}</p>
      </div>
    </motion.a>
  );
}
