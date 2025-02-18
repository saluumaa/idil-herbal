import { Leaf, Award, Users, Shield, Star, ArrowBigLeftIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="mb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Hero Section */}
    <div className="relative bg-green-700 py-6">
      <div className="absolute inset-0">
        <img
          src="./herbalPhoto.jpeg"
          alt="Natural Hair Care Background"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-green-800/60 to-green-600/40"></div>
      </div>

      {/* Content */}
      <div className="relative max-w-6xl mx-auto px-6 sm:px-8 lg:px-10 text-center">
        {/* Navigation Links */}
        <div className="flex justify-center items-center gap-3 mb-4">
          <Link to="/" className="text-lg font-semibold text-white px-4 py-2 rounded-lg hover:bg-green-500 transition">
            Home
          </Link>
          <span className="text-xl text-green-300">
            <ArrowBigLeftIcon />
          </span>
          <Link to="/about" className="text-lg font-semibold text-white px-4 py-2 rounded-lg hover:bg-green-500 transition">
            About
          </Link>
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 leading-tight">
          Our Story of Natural Innovation
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl text-green-100 max-w-3xl mx-auto">
          From humble beginnings to becoming a leader in natural hair care,  
          our journey is rooted in tradition and powered by innovation.
        </p>
      </div>
    </div>

        
       {/* Trust badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-10">
            {[
              {
                icon: Leaf,
                text: "100% Natural",
                subtext: "Pure Ingredients"
              },
              {
                icon: Shield,
                text: "Certified Organic",
                subtext: "Quality Assured"
              },
              {
                icon: Star,
                text: "4.9/5 Rating",
                subtext: "2000+ Reviews"
              },
              {
                icon: Award,
                text: "Money Back",
                subtext: "90-Day Guarantee"
              }
            ].map((badge, index) => (
              <div 
                key={index} 
                className="bg-green-400/70 backdrop-blur-sm rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in-up" 
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col items-center">
                  <div className="p-3 bg-green-100/40 rounded-full mb-3">
                    <badge.icon className="h-6 w-6 " />
                  </div>
                  <h3 className="font-semibold text-white">{badge.text}</h3>
                  <p className="text-sm text-white/80">{badge.subtext}</p>
                </div>
              </div>
            ))}
          </div>

        {/* Mission Statement */}
      <div className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-xl text-gray-600">
            To revolutionize hair care through the power of natural ingredients,
            making traditional herbal wisdom accessible to everyone while preserving
            our planet for future generations.
          </p>
        </div>
      </div>

        {/* Values */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-green-100 rounded-full">
                <Leaf className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Natural Ingredients</h3>
            <p className="text-gray-600">100% natural and organic ingredients sourced from trusted suppliers.</p>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-green-100 rounded-full">
                <Award className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Quality Assured</h3>
            <p className="text-gray-600">Rigorous testing and quality control for every product.</p>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-green-100 rounded-full">
                <Users className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Customer First</h3>
            <p className="text-gray-600">Dedicated to providing the best experience for our customers.</p>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}