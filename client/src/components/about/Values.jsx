import React from 'react';
import { Leaf, Heart, Shield, Recycle } from 'lucide-react';

const values = [
  {
    icon: Leaf,
    title: 'Natural & Pure',
    description: 'We use only the finest natural ingredients, sourced responsibly from trusted suppliers worldwide.'
 },
  {
    icon: Heart,
    title: 'Customer Care',
    description: 'Your satisfaction and hair health are our top priorities. Were here to support your journey.'
  },
  {
    icon: Shield,
    title: 'Quality Assured',
    description: 'Every product undergoes rigorous testing to ensure the highest standards of quality and safety.'
  },
  {
    icon: Recycle,
    title: 'Sustainability',
    description: 'Were committed to eco-friendly practices and sustainable packaging solutions.'
  }
];

export default function Values() {
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div key={index} className="group hover:transform hover:scale-105 transition-all duration-300">
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-green-100 rounded-full group-hover:bg-green-200 transition-colors">
                    <value.icon className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-center mb-3">{value.title}</h3>
                <p className="text-gray-600 text-center">{value.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}