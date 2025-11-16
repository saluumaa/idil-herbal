import React from 'react';
import { Check, Droplet, Sprout, Shield } from 'lucide-react';
import {motion} from 'framer-motion';

const benefits = [
  {
    icon: Sprout,
    title: 'Natural Growth',
    description: 'Stimulates follicles and promotes healthy hair growth naturally'
  },
  {
    icon: Shield,
    title: 'Repair & Protect',
    description: 'Strengthens hair structure and prevents future damage'
  },
  {
    icon: Droplet,
    title: 'Deep Nourishment',
    description: 'Infuses hair with essential nutrients and moisture'
  }
];

export default function Benefits() {
    return (
      <motion.section 
        className="py-16 bg-white"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        // viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Transform Your Hair Journey
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Experience the power of nature with our unique blend of herbs
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
            }}
          >
            {benefits.map((benefit, index) => (
              <motion.div 
                key={index} 
                className="text-center"
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-green-100 rounded-full">
                    <benefit.icon className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>
  
          <motion.div 
            className="mt-20 bg-green-50 rounded-2xl p-8"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h3 className="text-2xl font-bold text-center mb-8">
              Key Ingredients
            </h3>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
              }}
            >
              {[
                'Organic Aloe Vera',
                'Bhringraj Extract',
                'Amla Oil',
                'Rosemary Essential Oil',
                'Coconut Oil',
                'Neem Extract'
              ].map((ingredient, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-center space-x-3 bg-white p-4 rounded-lg"
                  variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.5 }}
                >
                  <Check className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">{ingredient}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    );
}