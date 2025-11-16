import React, { useEffect, useState } from 'react';
import { Leaf, Star, Shield, Award } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  return (
    <div className="relative min-h-full overflow-hidden">
      {/* Background Container */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className="relative w-full h-full">
          {/* Fallback image while video loads */}
          <motion.img
            src="./hennaImage.jpeg"
            alt="Natural hair care"
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 1 }}
            animate={{ opacity: isVideoLoaded ? 0 : 1 }}
            transition={{ duration: 1 }}
          />

          {/* Local Video */}
          <motion.video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            onLoadedData={() => setIsVideoLoaded(true)}
            initial={{ opacity: 0 }}
            animate={{ opacity: isVideoLoaded ? 1 : 0 }}
            transition={{ duration: 1 }}
          >
            <source src="/video/heroVideo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </motion.video>

          {/* Overlay */}
          <motion.div 
            className="absolute inset-0 bg-black/40 z-10" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          />
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20 text-center lg:pt-14">
        <motion.h1
          className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight"
          initial={{ opacity: 0, y: -150 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Transform Your Hair
          <span className="block text-green-400 mt-2">Naturally Beautiful</span>
        </motion.h1>
        
        <motion.p
          className="text-xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed"
          initial={{ opacity: 0, x: 150 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          Experience the power of ancient herbal wisdom combined with modern science.
          Our organic hair treatments restore, repair, and revitalize your hair from root to tip.
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row justify-center gap-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-green-600 text-white rounded-full text-lg font-semibold hover:bg-green-700 transition-transform"
          >
            Shop Now
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 border-2 border-white text-white rounded-full text-lg font-semibold hover:bg-white/10 transition-transform"
          >
            Learn More
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
