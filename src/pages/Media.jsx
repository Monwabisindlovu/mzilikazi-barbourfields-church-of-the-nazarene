import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axiosClient from '@/api/client/axiosClient';
import { motion, AnimatePresence } from 'framer-motion';
import { Play } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent } from '@/components/ui/dialog';

export default function Media() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [filter, setFilter] = useState('all');

  const { data: mediaItems = [], isLoading } = useQuery({
    queryKey: ['media'],
    queryFn: async () => {
      const res = await axiosClient.get('/media');
      return res.data;
    },
  });

  const categories = ['all', ...new Set(mediaItems.map(m => m.category).filter(Boolean))];
  const filteredMedia =
    filter === 'all' ? mediaItems : mediaItems.filter(m => m.category === filter);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500">Loading media...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Filters */}
      <section className="py-8 bg-white border-b sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === cat
                    ? 'bg-amber-500 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat === 'all' ? 'All' : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <AnimatePresence mode="popLayout">
              {filteredMedia.map((item, i) => (
                <motion.div
                  key={item._id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.05 }}
                  className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
                  onClick={() => setSelectedItem(item)}
                >
                  {item.type === 'video' ? (
                    <div className="w-full h-full bg-slate-900 flex items-center justify-center">
                      <video src={item.url} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                          <Play className="w-8 h-8 text-amber-600 ml-1" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <img
                      src={item.url}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-white font-medium">{item.title}</p>
                      {item.category && (
                        <Badge className="mt-1 bg-white/20 text-white">{item.category}</Badge>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-4xl p-0 bg-transparent border-0">
          {selectedItem && (
            <div className="relative">
              {selectedItem.type === 'video' ? (
                <video
                  src={selectedItem.url}
                  controls
                  autoPlay
                  className="w-full max-h-[80vh] rounded-lg"
                />
              ) : (
                <img
                  src={selectedItem.url}
                  alt={selectedItem.title}
                  className="w-full max-h-[80vh] object-contain rounded-lg"
                />
              )}

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                <h3 className="text-white text-xl font-bold">{selectedItem.title}</h3>
                {selectedItem.description && (
                  <p className="text-white/80 mt-2">{selectedItem.description}</p>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
