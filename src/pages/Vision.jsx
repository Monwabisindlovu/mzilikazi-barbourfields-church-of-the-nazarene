import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Users, Sparkles, Globe, Heart, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Vision() {
  const visionPoints = [
    {
      icon: Users,
      title: 'Discipleship',
      description:
        'The Church of the Nazarene aims to nurture individuals to become Christlike through spiritual growth and a deepening relationship with God.',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: Sparkles,
      title: 'Holiness',
      description:
        'The church upholds the belief in the pursuit of personal holiness and the transformation of life through the Holy Spirit.',
      color: 'bg-purple-100 text-purple-600',
    },
    {
      icon: Globe,
      title: 'Global Mission',
      description:
        'It seeks to spread the message of Jesus Christ across the world, focusing on both local and international communities.',
      color: 'bg-emerald-100 text-emerald-600',
    },
    {
      icon: Heart,
      title: 'Community & Service',
      description:
        "The church emphasizes the importance of living out one's faith in service to others, reflecting Christ's love and compassion in practical ways.",
      color: 'bg-red-100 text-red-600',
    },
    {
      icon: Zap,
      title: 'Empowerment',
      description:
        'It aims to equip and empower individuals for ministry and service within their communities, helping them to actively participate in the mission of the church.',
      color: 'bg-amber-100 text-amber-600',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1507692049790-de58290a4334?w=1920')`,
          }}
        >
          <div className="absolute inset-0 bg-slate-900/70" />
        </div>
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Vision</h1>
            <p className="text-xl text-white/80 max-w-2xl">
              Building a global community committed to living out their faith
            </p>
          </motion.div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 bg-amber-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-lg text-slate-700 leading-relaxed">
            The vision of the Church of the Nazarene is centered around the mission to make
            Christlike disciples in the nations. It emphasizes the following key aspects:
          </p>
        </div>
      </section>

      {/* Vision Points */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visionPoints.map((point, i) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-slate-100"
              >
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${point.color}`}
                >
                  <point.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{point.title}</h3>
                <p className="text-slate-600">{point.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Conclusion */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-lg text-slate-300 mb-8">
              These elements are part of the broader vision to build a global community of believers
              who are committed to living out their faith and sharing the gospel of Jesus Christ.
            </p>
            <Button
              className="bg-amber-500 hover:bg-amber-600 text-slate-900"
              onClick={() =>
                window.open('https://asiapacificnazarene.org/about-us/mission-statement/', '_blank')
              }
            >
              Read more on global Nazarene website <ExternalLink className="ml-2 w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
