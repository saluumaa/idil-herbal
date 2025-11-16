import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Contact() {
  return (
    <div className="mb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="relative bg-green-600 py-20">
          <div className="absolute inset-0">
            <img
              src="./herbalPhoto.jpeg"
              alt="Contact background"
              className="w-full h-full object-cover opacity-20"
            />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className='flex justify-start items-center -mt-16 cursor-pointer'>
              <Link to='/' className= "text-xl font-bold text-white py-2">Home</Link>
              <span className="text-xl font-bold text-green-300 py-2 rounded-md  mx-2">
                /
              </span>
              <p className= "text-xl font-bold text-white py-2  rounded-md ">Contact</p>
          </div>

            <motion.h1 className="text-4xl font-bold text-white mb-4 mt-4"
              initial={{ opacity: 0, y: -90 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >Get in Touch</motion.h1>
            <motion.p className="text-xl text-green-100 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 90 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
            >
              Have questions about our products or services? We're here to help you achieve your best hair naturally.
            </motion.p>
          </div>
         
        </div>
        
          
          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 mt-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center">
              <Mail className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-gray-600">support@herbalcare.com</p>
            </div>
            <div className="text-center">
              <Phone className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-gray-600">+(252) 63-4507712</p>
            </div>
            <div className="text-center">
              <MapPin className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-gray-600">Borama, Awdal, Somaliland</p>
            </div>
          </motion.div>

        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -90 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >

              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Your name"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 90 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="your@email.com"
              />
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
            <input
              type="text"
              id="subject"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="How can we help?"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              id="message"
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Your message..."
            ></textarea>
          </motion.div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
          >
            <Send className="h-5 w-5" />
            <span>Send Message</span>
          </button>
      </form>
        </div>
      </div>
    </div>
  );
}