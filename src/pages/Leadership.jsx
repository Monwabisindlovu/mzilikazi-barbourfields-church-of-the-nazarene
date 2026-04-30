import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axiosClient from '@/api/client/axiosClient';
import { motion } from 'framer-motion';
import { User, X } from 'lucide-react';

export default function Leadership() {
  const [selectedLeader, setSelectedLeader] = useState(null);

  const { data: leaders = [], isLoading } = useQuery({
    queryKey: ['leaders'],
    queryFn: async () => {
      const res = await axiosClient.get('/leaders');
      return res.data;
    },
  });
  const sortedLeaders = [...leaders].sort((a, b) => a.displayOrder - b.displayOrder);

  const pastor = sortedLeaders[0];
  const otherLeaders = sortedLeaders.slice(1);

  // initials helper
  const getInitials = name => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500">Loading leadership...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* HERO */}
      <section className="relative h-[40vh] min-h-[300px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1920')",
          }}
        >
          <div className="absolute inset-0 bg-slate-900/70" />
        </div>

        <div className="relative z-10 h-full flex items-center justify-center text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-bold text-white">Our Leadership</h1>
            <p className="text-white/80 mt-2">Serving with dedication and love</p>
          </motion.div>
        </div>
      </section>

      {/* PASTOR */}
      <section className="py-20 bg-amber-50">
        <div className="max-w-4xl mx-auto text-center px-4">
          <div className="w-52 h-52 mx-auto rounded-full overflow-hidden border-4 border-amber-400 shadow-lg">
            {pastor?.photo ? (
              <img src={pastor.photo} alt={pastor.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-400 to-amber-600 text-white text-3xl font-bold">
                {getInitials(pastor?.name)}
              </div>
            )}
          </div>

          <h2 className="text-3xl font-bold mt-6">{pastor?.name || 'Pastor'}</h2>

          {pastor?.bio && <p className="text-slate-600 mt-4 max-w-2xl mx-auto">{pastor.bio}</p>}
        </div>
      </section>

      {/* LEADERS GRID */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-center text-3xl font-bold mb-12">Church Leadership</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {otherLeaders.map(leader => (
              <motion.div
                key={leader._id}
                whileHover={{ scale: 1.03 }}
                onClick={() => setSelectedLeader(leader)}
                className="cursor-pointer text-center group"
              >
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border shadow-md group-hover:border-amber-400 transition">
                  {leader.photo ? (
                    <img
                      src={leader.photo}
                      alt={leader.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-200 to-slate-300 text-slate-700 font-bold text-xl">
                      {getInitials(leader.name)}
                    </div>
                  )}
                </div>

                <h4 className="mt-3 font-semibold">{leader.name}</h4>
                <p className="text-sm text-amber-600">{leader.title}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MODAL */}
      {selectedLeader && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6 relative">
            <button onClick={() => setSelectedLeader(null)} className="absolute top-3 right-3">
              <X className="w-5 h-5" />
            </button>

            <div className="text-center">
              <div className="w-28 h-28 mx-auto rounded-full overflow-hidden mb-4">
                {selectedLeader.photo ? (
                  <img src={selectedLeader.photo} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-200 to-slate-300 font-bold">
                    {getInitials(selectedLeader.name)}
                  </div>
                )}
              </div>

              <h3 className="text-xl font-bold">{selectedLeader.name}</h3>
              <p className="text-amber-600 mb-3">{selectedLeader.title}</p>

              {selectedLeader.bio ? (
                <p className="text-slate-600 text-sm">{selectedLeader.bio}</p>
              ) : (
                <p className="text-slate-400 text-sm">No bio available</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
