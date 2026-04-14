import React from 'react';
import { motion } from 'framer-motion';
import { Radio, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LiveStreamBanner({ stream }) {
  if (!stream?.is_live) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-red-600 to-red-700 text-white py-4"
    >
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Radio className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-ping" />
          </div>
          <div>
            <p className="font-bold text-lg">We're Live Now!</p>
            <p className="text-red-100 text-sm">{stream.title}</p>
          </div>
        </div>
        {stream.stream_url && (
          <Button
            className="bg-white text-red-600 hover:bg-red-50"
            onClick={() => window.open(stream.stream_url, '_blank')}
          >
            Watch Live <ExternalLink className="ml-2 w-4 h-4" />
          </Button>
        )}
      </div>
    </motion.div>
  );
}
