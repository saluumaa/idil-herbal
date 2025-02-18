
import { Link } from 'react-router-dom';
import ProductGrid from '../components/products/ProductGrid';
import { ArrowBigLeftIcon } from 'lucide-react';

// Sample product data
const products = [
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
  // Add more products as needed
];

export default function Products() {
  return (
    <div className="mb-10">
       {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> */}
      {/* Hero Section */}
      <div className="relative bg-green-700 py-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="absolute inset-0">
          <img
            src="./herbalPhoto.jpeg"
            alt="Natural Hair Care Background"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-green-900/50 to-green-600/40"></div>
        </div>

        {/* Content */}
        <div className="relative max-w-6xl mx-auto px-6 sm:px-8 lg:px-10 text-center">
          <div className="flex justify-center items-center gap-4 mb-6">
            <Link to="/" className="text-lg font-semibold text-white px-4 py-2 rounded-lg hover:bg-green-500 transition duration-300">
              Home
            </Link>
            
            <span className="text-3xl text-green-300 transform transition-all duration-300 group-hover:translate-x-1">
              <ArrowBigLeftIcon />
            </span>

            <Link to="/products" className="text-lg font-semibold text-white px-4 py-2 rounded-lg hover:bg-green-500 transition duration-300">
              Products
            </Link>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 leading-tight drop-shadow-lg">
            Discover the Power of Nature
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-green-100 max-w-3xl mx-auto">
            Elevate your hair care routine with our pure and natural products,  
            crafted with love and tradition.
          </p>
        </div>
      </div>


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProductGrid products={products} />
      {/* </div> */}
      </div>
    </div>
  );
}