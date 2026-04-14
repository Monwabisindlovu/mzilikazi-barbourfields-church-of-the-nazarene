import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import axiosClient from '@/api/client/axiosClient';
import { motion } from 'framer-motion';
import { Sprout, BookOpen, Building, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

export default function Partnership() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const submitMutation = useMutation({
    mutationFn: async data => {
      const response = await axiosClient.post('/partnership-inquiries', data);
      return response.data;
    },
    onSuccess: () => {
      setSubmitted(true);
      toast.success('Thank you for your interest! We will contact you soon.');
    },
    onError: () => {
      toast.error('Something went wrong. Please try again.');
    },
  });

  const handleSubmit = e => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all fields');
      return;
    }

    submitMutation.mutate(formData);
  };

  const initiatives = [
    {
      icon: Sprout,
      title: 'Vegetable Farming',
      description: 'Support our sustainable garden that feeds the community and educates youth.',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600',
    },
    {
      icon: BookOpen,
      title: 'Pre-school Education',
      description: 'Help us shape the future through early childhood learning opportunities.',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600',
    },
    {
      icon: Building,
      title: 'Build a Classroom',
      description: 'Contribute to our mission of expanding safe and inspiring learning spaces.',
      image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1920')",
          }}
        >
          <div className="absolute inset-0 bg-slate-900/70" />
        </div>

        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Partner With Us</h1>
            <p className="text-xl text-white/80 max-w-2xl">
              Join us in advancing God's work through meaningful initiatives
            </p>
          </motion.div>
        </div>
      </section>

      {/* Initiatives */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-sm font-semibold text-amber-600 tracking-wider uppercase mb-2">
              Our Initiatives
            </h2>
            <h3 className="text-3xl font-bold text-slate-900">Ways to Make an Impact</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {initiatives.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all group"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="p-6">
                  <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-amber-600" />
                  </div>

                  <h4 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h4>

                  <p className="text-slate-600">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-2xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Get Involved</h2>
            <p className="text-slate-300">
              Fill out the form below to learn more or ask questions about partnering with us.
            </p>
          </motion.div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl p-8 text-center"
            >
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Thank You!</h3>
              <p className="text-slate-600">
                We've received your message and will get back to you soon.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-xl">
              <div className="space-y-4">
                <Input
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                />

                <Input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                />

                <Textarea
                  rows={5}
                  placeholder="Tell us how you'd like to partner..."
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                />

                <Button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold"
                  disabled={submitMutation.isPending}
                >
                  {submitMutation.isPending ? (
                    'Sending...'
                  ) : (
                    <>
                      Send Message <Send className="ml-2 w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
