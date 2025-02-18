
// import { ShoppingCart, Menu, Search, User } from 'lucide-react';
// import { Link } from 'react-router-dom';

// export default function Header() {
//   return (
//     <header className="bg-white shadow-sm sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           <Link to="/" className="flex items-center space-x-2">
//             <span className="text-2xl font-bold text-green-600">HerbalCare</span>
//           </Link>

//           <nav className="hidden md:flex space-x-8">
//             <Link to="/" className="text-gray-700 hover:text-green-600">Home</Link>
//             <Link to="/about" className="text-gray-700 hover:text-green-600">About</Link>
//             <Link to="/products" className="text-gray-700 hover:text-green-600">Products</Link>
//             <Link to="/services" className="text-gray-700 hover:text-green-600">Services</Link>
//             <Link to="/blog" className="text-gray-700 hover:text-green-600">Blog</Link>
//             <Link to="/contact" className="text-gray-700 hover:text-green-600">Contact</Link>
//           </nav>

//           <div className="flex items-center space-x-4">
//             <button className="p-2 hover:bg-gray-100 rounded-full">
//               <Search className="h-5 w-5" />
//             </button>
//             <Link to="/cart" className="p-2 hover:bg-gray-100 rounded-full relative">
//               <ShoppingCart className="h-5 w-5" />
//               <span className="absolute top-0 right-0 bg-green-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
//                 0
//               </span>
//             </Link>
//             <button className="p-2 hover:bg-gray-100 rounded-full md:hidden">
//               <Menu className="h-5 w-5" />
//             </button>
//             <Link to="/account" className="p-2 hover:bg-gray-100 rounded-full hidden md:block">
//               <User className="h-5 w-5" />
//             </Link>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }


import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Search, ShoppingCart, User } from "heroicons-react";
import { Leaf } from "lucide-react";
import { useCart } from "../../context/CartContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {cartItems} = useCart();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const totalItems = cartItems?.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Leaf className="h-6 w-6 text-green-600" />
            <div>
              <span className="text-2xl font-bold text-green-600">Idil</span>
              <span className="text-2xl font-bold text-gray-700">Beauty</span>
              <p className="text-xs text-gray-500 -mt-1">Nature's wisdom for healthy hair</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-green-600">Home</Link>
            <Link to="/about" className="text-gray-700 hover:text-green-600">About</Link>
            <Link to="/products" className="text-gray-700 hover:text-green-600">Products</Link>
            {/* <Link to="/services" className="text-gray-700 hover:text-green-600">Services</Link> */}
            <Link to="/blog" className="text-gray-700 hover:text-green-600">Blog</Link>
            <Link to="/contact" className="text-gray-700 hover:text-green-600">Contact</Link>
          </nav>

          {/* Icons and Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            {/* <button className="p-2 hover:bg-gray-100 rounded-full">
              <Search className="h-5 w-5" />
            </button> */}
            <Link to="/cart" className="p-2 hover:bg-gray-100 rounded-full relative">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-green-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="p-2 hover:bg-gray-100 rounded-full md:hidden"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            {/* User Icon (Desktop Only) */}
            <Link to="/account" className="p-2 hover:bg-gray-100 rounded-full hidden md:block">
              <User className="h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden bg-white shadow-lg p-4 space-y-2">
            <Link
              to="/"
              className="block text-gray-700 hover:text-green-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="block text-gray-700 hover:text-green-600"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/products"
              className="block text-gray-700 hover:text-green-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              to="/services"
              className="block text-gray-700 hover:text-green-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              to="/blog"
              className="block text-gray-700 hover:text-green-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              to="/contact"
              className="block text-gray-700 hover:text-green-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              to="/account"
              className="block text-gray-700 hover:text-green-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Account
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
