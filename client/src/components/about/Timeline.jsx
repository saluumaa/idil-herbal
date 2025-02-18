import React from 'react';
import { Calendar, Award, Users, Sprout } from 'lucide-react';

const timelineEvents = [
  {
    year: '2010',
    title: 'Our Beginning',
    description: 'Started with a small herbal garden and a dream to revolutionize hair care.',
    icon: Sprout
  },
  {
    year: '2015',
    title: 'First Store Opening',
    description: 'Opened our first physical store in downtown, bringing natural hair care to the community.',
    icon: Calendar
  },
  {
    year: '2018',
    title: 'Quality Recognition',
    description: 'Received organic certification and industry recognition for product excellence.',
    icon: Award
  },
  {
    year: '2023',
    title: 'Global Community',
    description: 'Expanded to serve customers worldwide, building a community of natural hair care enthusiasts.',
    icon: Users
  }
];

export default function Timeline() {
  return (
    <div className="py-16 bg-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Journey</h2>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-green-200" />
          
          {/* Timeline events */}
          <div className="space-y-16">
            {timelineEvents.map((event, index) => (
              <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <event.icon className="h-8 w-8 text-green-600 mb-4" />
                    <div className="text-green-600 font-bold text-lg mb-2">{event.year}</div>
                    <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                    <p className="text-gray-600">{event.description}</p>
                  </div>
                </div>
                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-green-600 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}