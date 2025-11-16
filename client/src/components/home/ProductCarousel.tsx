// import React from 'react';
// import { ChevronLeft, ChevronRight } from 'lucide-react';
// import { Product } from '../../types';

// interface ProductCarouselProps {
//   products: Product[];
// }

// export default function ProductCarousel({ products }: ProductCarouselProps) {
//   const [currentIndex, setCurrentIndex] = React.useState(0);

//   const nextSlide = () => {
//     setCurrentIndex((prev) => (prev + 1) % Math.ceil(products.length / 4));
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prev) => (prev - 1 + Math.ceil(products.length / 4)) % Math.ceil(products.length / 4));
//   };

//   return (
//     <div className="relative">
//       <div className="overflow-hidden">
//         <div
//           className="flex transition-transform duration-300 ease-in-out"
//           style={{ transform: `translateX(-${currentIndex * 100}%)` }}
//         >
//           {products.map((product) => (
//             <div key={product.id} className="min-w-[25%] p-4">
//               <div className="bg-white rounded-lg shadow-md overflow-hidden group">
//                 <div className="relative">
//                   <img
//                     src={product.image}
//                     alt={product.name}
//                     className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
//                   />
//                   <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity" />
//                 </div>
//                 <div className="p-4">
//                   <h3 className="font-semibold text-gray-900">{product.name}</h3>
//                   <p className="text-green-600 font-medium">${product.price}</p>
//                   <button className="mt-2 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors">
//                     Add to Cart
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//       <button
//         onClick={prevSlide}
//         className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
//       >
//         <ChevronLeft className="h-6 w-6 text-gray-600" />
//       </button>
//       <button
//         onClick={nextSlide}
//         className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
//       >
//         <ChevronRight className="h-6 w-6 text-gray-600" />
//       </button>
//     </div>
//   );
// }