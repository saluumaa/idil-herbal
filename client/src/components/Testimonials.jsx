import React from 'react';
import { Star } from 'lucide-react';
import {motion} from 'framer-motion';

const testimonials = [
  {
    name: 'Sarah',
    image: './blankImage.png',
    quote: 'After 3 months of use, my hair is noticeably thicker and healthier. The natural ingredients make all the difference!',
    rating: 3
  },
  {
    name: 'Hamda',
    image: './blankImage.png',
    quote: 'Finally found a natural solution that actually works. My hair loss has significantly reduced.',
    rating: 5
  },
  {
    name: 'Shukria',
    image: './blankImage.png',
    quote: 'The transformation in my hair texture and shine is amazing. Worth every penny!',
    rating: 5
  }
];

export default function Testimonials() {
  return (
    <motion.section className="py-20 bg-gray-50"
      initial={{ opacity: 0, y: 150 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
          Real Results from Our Customers
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}