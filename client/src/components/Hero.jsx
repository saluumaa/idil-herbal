import React, { useEffect, useRef, useState } from 'react';
import {  Leaf, Star, Shield, Award } from 'lucide-react';

export default function Hero() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);


  return (
    <div className="relative min-h-full overflow-hidden">
     <div className="relative min-h-full overflow-hidden">
      {/* Background Container */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className="relative w-full h-full">
          {/* Fallback image while video loads */}
          <img
            src="./hennaImage.jpeg"
            alt="Natural hair care"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              isVideoLoaded ? "opacity-0" : "opacity-100"
            }`}
          />

          {/* Local Video */}
          <video
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              isVideoLoaded ? "opacity-100" : "opacity-0"
            }`}
            autoPlay
            loop
            muted
            playsInline
            onLoadedData={() => setIsVideoLoaded(true)}
          >
            <source src="/video/heroVideo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40 z-10" />
         </div>
        </div>

      {/* Hero Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20 text-center lg:pt-14">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
          Transform Your Hair
          <span className="block text-green-400 mt-2">Naturally Beautiful</span>
        </h1>
        <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed">
          Experience the power of ancient herbal wisdom combined with modern science.
          Our organic hair treatments restore, repair, and revitalize your hair from root to tip.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="px-8 py-4 bg-green-600 text-white rounded-full text-lg font-semibold hover:bg-green-700 transition-transform hover:scale-105">
            Shop Now
          </button>
          <button className="px-8 py-4 border-2 border-white text-white rounded-full text-lg font-semibold hover:bg-white/10 transition-transform hover:scale-105">
            Learn More
          </button>
        </div>
      </div>


          {/* Trust badges */}
          {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
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
                className="bg-black/55 backdrop-blur-sm rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in-up" 
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col items-center">
                  <div className="p-3 bg-green-100/20 rounded-full mb-3">
                    <badge.icon className="h-6 w-6 text-green-400" />
                  </div>
                  <h3 className="font-semibold text-white">{badge.text}</h3>
                  <p className="text-sm text-white/80">{badge.subtext}</p>
                </div>
              </div>
            ))}
          </div> */}
        </div>
      </div>
  );
}


// import React from 'react';
// import { ArrowRight, Leaf, Star, Shield, Award } from 'lucide-react';
// import { Link } from 'react-router-dom';

// export default function Hero() {
//   return (
//     <div className="relative min-h-screen bg-gradient-to-b from-green-50 via-white to-green-50 overflow-hidden">
//       {/* Animated background patterns */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute -top-1/2 -right-1/2 w-[1000px] h-[1000px] bg-gradient-to-b from-green-100/30 to-transparent rounded-full animate-float" />
//         <div className="absolute -bottom-1/2 -left-1/2 w-[800px] h-[800px] bg-gradient-to-t from-green-100/30 to-transparent rounded-full animate-float-delayed" />
//       </div>

//       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center lg:pt-32">
//         {/* Main content */}
//         <div className="animate-fade-in">
//           <div className="flex justify-center mb-8 animate-bounce-slow">
//             <div className="bg-green-100 p-4 rounded-full">
//               <Leaf className="h-12 w-12 text-green-600" />
//             </div>
//           </div>

//           <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 tracking-tight">
//             Transform Your Hair
//             <span className="block text-green-600 mt-2">Naturally Beautiful</span>
//           </h1>

//           <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
//             Experience the power of ancient herbal wisdom combined with modern science.
//             Our organic hair treatments restore, repair, and revitalize your hair from root to tip.
//           </p>

//           {/* CTA Buttons */}
//           <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16 animate-fade-in-up">
//            <Link to='/products'>
//               <button className="group inline-flex items-center px-8 py-4 bg-green-600 text-white rounded-full text-lg font-semibold hover:bg-green-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl">
//                 Shop Now
//                 <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
//               </button>
//             </Link>
//             <Link to='/about'>
//               <button className="inline-flex items-center px-8 py-4 border-2 border-green-600 text-green-600 rounded-full text-lg font-semibold hover:bg-green-50 transition-all transform hover:scale-105">
//                 Learn More
//               </button>
//             </Link>
//           </div>

//           {/* Trust badges */}
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16">
//             {[
//               {
//                 icon: Leaf,
//                 text: "100% Natural",
//                 subtext: "Pure Ingredients"
//               },
//               {
//                 icon: Shield,
//                 text: "Certified Organic",
//                 subtext: "Quality Assured"
//               },
//               {
//                 icon: Star,
//                 text: "4.7/5 Rating",
//                 subtext: "200+ Reviews"
//               },
//               {
//                 icon: Award,
//                 text: "Money Back",
//                 subtext: "120-Day Guarantee"
//               }
//             ].map((badge, index) => (
//               <div key={index} className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
//                 <div className="flex flex-col items-center">
//                   <div className="p-3 bg-green-100 rounded-full mb-3">
//                     <badge.icon className="h-6 w-6 text-green-600" />
//                   </div>
//                   <h3 className="font-semibold text-gray-900">{badge.text}</h3>
//                   <p className="text-sm text-gray-600">{badge.subtext}</p>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Featured products preview */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
//             {[
//               {
//                 image: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=600&q=80",
//                 title: "Growth Oil",
//                 description: "Stimulate natural hair growth"
//               },
//               {
//                 image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=600&q=80",
//                 title: "Repair Mask",
//                 description: "Deep conditioning treatment"
//               },
//               {
//                 image: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?auto=format&fit=crop&w=600&q=80",
//                 title: "Scalp Revival",
//                 description: "Balanced scalp care"
//               }
//             ].map((product, index) => (
//               <div 
//                 key={index} 
//                 className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in-up"
//                 style={{ animationDelay: `${index * 200}ms` }}
//               >
//                 <div className="aspect-w-3 aspect-h-4">
//                   <img
//                     src={product.image}
//                     alt={product.title}
//                     className="w-full h-full max-h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                   <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
//                     <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
//                     <p className="text-sm text-gray-200">{product.description}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }