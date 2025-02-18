import React from 'react';
import Hero from '../components/Hero';
import Benefits from '../components/Benefits';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import Newsletter from '../components/Newsletter';

// Sample product data
const sampleProducts = [
  {
    id: '1',
    name: 'Herbal Growth Shampoo',
    description: 'Natural hair growth formula',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=300&q=80',
    category: 'shampoo',
    ingredients: ['Aloe Vera', 'Bhringraj'],
    hairConcerns: ['growth', 'volume'],
    stockStatus: 'in-stock'
  },
  // Add more sample products as needed
];

export default function Home() {
  return (
    <div>
      <Hero />
      <Benefits />
      <Testimonials />
      <FAQ />
      <Newsletter />
    </div>
  );
}