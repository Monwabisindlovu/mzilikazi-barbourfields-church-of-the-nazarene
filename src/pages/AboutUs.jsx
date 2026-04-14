import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, BookOpen, Heart, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AboutUs() {
  const sections = [
    {
      title: 'Our Articles of Faith',
      description:
        'Our Articles of faith are our foundational beliefs, and set forth the essential truths which guide every area of practice.',
      image: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=600',
      link: 'https://www.nazarene.org/who-we-are/articles-faith',
      icon: BookOpen,
      reverse: false,
    },
    {
      title: 'Our Core Values',
      description:
        'Our Core Values are the essence of our identity and support the vision of our denomination and help shape our culture.',
      image: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=600',
      link: 'https://www.nazarene.org/who-we-are/core-values',
      icon: Heart,
      reverse: true,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?w=1920')`,
          }}
        >
          <div className="absolute inset-0 bg-slate-900/70" />
        </div>
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About Us</h1>
            <p className="text-xl text-white/80 max-w-2xl">
              Learn more about our mission, values, and what makes us who we are.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 bg-amber-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Globe className="w-12 h-12 text-amber-600 mx-auto mb-6" />
          <p className="text-lg text-slate-700 leading-relaxed">
            The Church of the Nazarene is a Protestant Christian church in the Wesleyan-Holiness
            tradition. Organized in 1908, the denomination is now home to about 2.5 million members
            worshipping in more than 30,000 congregations in 165 world areas.
          </p>
          <Button
            className="mt-6 bg-amber-500 hover:bg-amber-600 text-slate-900"
            onClick={() => window.open('https://www.nazarene.org/index.php/manual', '_blank')}
          >
            Read Our Manual <ExternalLink className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </section>

      {/* Sections */}
      {sections.map((section, i) => (
        <section
          key={section.title}
          className={`py-20 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}
        >
          <div className="max-w-6xl mx-auto px-4">
            <div
              className={`grid md:grid-cols-2 gap-12 items-center ${section.reverse ? 'md:flex-row-reverse' : ''}`}
            >
              <motion.div
                initial={{ opacity: 0, x: section.reverse ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={section.reverse ? 'md:order-2' : ''}
              >
                <div className="relative rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src={section.image}
                    alt={section.title}
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: section.reverse ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={section.reverse ? 'md:order-1' : ''}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-amber-100 rounded-xl">
                    <section.icon className="w-6 h-6 text-amber-600" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900">{section.title}</h2>
                </div>
                <p className="text-slate-600 text-lg mb-6">{section.description}</p>
                <Button variant="outline" onClick={() => window.open(section.link, '_blank')}>
                  Read more on global Nazarene website <ExternalLink className="ml-2 w-4 h-4" />
                </Button>
              </motion.div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
