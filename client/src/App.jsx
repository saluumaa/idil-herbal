import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header.jsx';
import Footer from './components/layout/Footer.jsx';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
// import Services from './pages/Services';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Account from './pages/Account.jsx';
import Checkout from './pages/Checkout.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
import BlogDetail from './pages/BlogDetail.jsx';
import AddBlog from './components/Blogs/AddBlog.jsx';
import SupportButton from './pages/Support.jsx';
import FAQ from './components/FAQ.jsx';
import Shipping from './components/Shipping.jsx';
import Return from './components/Returns.jsx';
import AddProduct from './components/addProduct/AddProduct.jsx';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            {/* <Route path="/services" element={<Services />} /> */}
            <Route path="/blog" element={<Blog />} />
            <Route path="/add-blog" element={<AddBlog />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/account" element={<Account />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path='/faq' element={<FAQ /> } />
            <Route path='/shipping' element={<Shipping /> } />
            <Route path="/returns" element={<Return />} />
            <Route path="/add-product" element={<AddProduct />} />
          </Routes>
        </main>
        <Footer />
        <SupportButton />
      </div>
    </Router>
  );
}

export default App;