// import React, { useState } from "react";
// import { Filter, Search } from "lucide-react";

// export default function ProductGrid({ products }) {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [priceRange, setPriceRange] = useState([0, 1000]);

//   const filteredProducts = products.filter((product) => {
//     const matchesSearch = product.name
//       .toLowerCase()
//       .includes(searchTerm.toLowerCase());
//     const matchesCategory =
//       selectedCategory === "all" || product.category === selectedCategory;
//     const matchesPrice =
//       product.price >= priceRange[0] && product.price <= priceRange[1];
//     return matchesSearch && matchesCategory && matchesPrice;
//   });

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <div className="flex flex-col md:flex-row gap-8">
//         {/* Filters */}
//         <div className="w-full md:w-64 space-y-6">
//           {/* Search Filter */}
//           <div>
//             <h3 className="font-semibold mb-2">Search</h3>
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search products..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 border rounded-lg"
//               />
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
//             </div>
//           </div>

//           {/* Category Filter */}
//           <div>
//             <h3 className="font-semibold mb-2">Categories</h3>
//             <select
//               value={selectedCategory}
//               onChange={(e) => setSelectedCategory(e.target.value)}
//               className="w-full p-2 border rounded-lg"
//             >
//               <option value="all">All Categories</option>
//               <option value="shampoo">Shampoo</option>
//               <option value="conditioner">Conditioner</option>
//               <option value="oil">Hair Oil</option>
//               <option value="mask">Hair Mask</option>
//             </select>
//           </div>

//           {/* Price Filter */}
//           <div>
//             <h3 className="font-semibold mb-2">Price Range</h3>
//             <div className="space-y-2">
//               <input
//                 type="range"
//                 min="0"
//                 max="1000"
//                 value={priceRange[1]}
//                 onChange={(e) =>
//                   setPriceRange([priceRange[0], Number(e.target.value)])
//                 }
//                 className="w-full"
//               />
//               <div className="flex justify-between text-sm text-gray-600">
//                 <span>${priceRange[0]}</span>
//                 <span>${priceRange[1]}</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Product Grid */}
//         <div className="flex-1">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {filteredProducts.map((product) => (
//               <div
//                 key={product.id}
//                 className="bg-white rounded-lg shadow-md overflow-hidden"
//               >
//                 <img
//                   src={product.image}
//                   alt={product.name}
//                   className="w-full h-48 object-cover"
//                 />
//                 <div className="p-4">
//                   <h3 className="font-semibold text-gray-900">{product.name}</h3>
//                   <p className="text-sm text-gray-600 mb-2">
//                     {product.description}
//                   </p>
//                   <div className="flex justify-between items-center">
//                     <span className="text-green-600 font-medium">
//                       ${product.price}
//                     </span>
//                     <span
//                       className={`text-sm ${
//                         product.stockStatus === "in-stock"
//                           ? "text-green-600"
//                           : product.stockStatus === "low-stock"
//                           ? "text-yellow-600"
//                           : "text-red-600"
//                       }`}
//                     >
//                       {product.stockStatus.replace("-", " ")}
//                     </span>
//                   </div>
//                   <button className="mt-4 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors">
//                     Add to Cart
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



import React, { useState, useEffect } from "react";
import { Filter, Search } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import apiRequest from "../../utils/apiRequest";
import { useCart } from "../../context/CartContext";
import CategoryFilter from "./CategoryFilter";

export default function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories] = useState([
    "Shampoo",
    "Hair Accessories",
    "Hair Oils",
    "Hair Masks",
  ]);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const { dispatch } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  // Extract selected category from query parameters
  const queryParams = new URLSearchParams(location.search);
  const selectedCategory = queryParams.get("category") || "all";


  const handleAddToCart = (id) => {
    navigate(`/product/${id}`);
  };



  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await apiRequest.get("/products", {
          params: {
            page: currentPage,
            limit: 10,
            search: searchTerm,
            category: selectedCategory !== "all" ? selectedCategory : undefined,
            minPrice: priceRange[0],
            maxPrice: priceRange[1],
          },
        });
        setProducts(data.products);
        setTotalPages(data.totalPages);
      } catch (err) {
        console.error("Error fetching products", err);
      }
    };
    fetchProducts();
  }, [currentPage, searchTerm, selectedCategory, priceRange, location.search]);

  console.log(products)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters */}
        <div className="w-full md:w-64 space-y-6">
          {/* Search Filter */}
          <div>
            <h3 className="font-semibold mb-2">Search</h3>
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>
          
          {/* Category Filter */}
          <div>
            <h3 className="font-semibold mb-2">Categories</h3>
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={(category) =>
                navigate(`/products?category=${category}`)
              }
            />
          </div>

          {/* Price Filter */}
          <div>
            <h3 className="font-semibold mb-2">Price Range</h3>
            <div className="space-y-2">
              <input
                type="range"
                min="0"
                max="100"
                value={priceRange[1]}
                onChange={(e) =>
                  setPriceRange([priceRange[0], Number(e.target.value)])
                }
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products?.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={`http://localhost:5000/${product.images?.[0]}`}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">
                    {/* Original Price (with line-through if discounted) */}
                    <span className={`${product.discount ? "line-through text-gray-500" : "text-black"}`}>
                      ${product.price.toFixed(2)}
                    </span>

                    {/* Discounted Price (without line-through) */}
                    {product.discount > 0 && (
                      <span className="text-green-600 font-medium ml-2">
                        ${product.discount.toFixed(2)}
                      </span>
                    )}
                  </span>

                    {/* Discounted Price */}
               
                    <span
                      className={`text-sm ${
                        product.stockStatus === "in-stock"
                          ? "text-green-600"
                          : product.stockStatus === "low-stock"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {product.stockStatus.replace("-", " ")}
                    </span>
                  </div>
                  <button
                    className="mt-4 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors"
                    onClick={() => handleAddToCart(product._id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-6 flex justify-between items-center">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 rounded-lg disabled:bg-gray-300"
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 rounded-lg disabled:bg-gray-300"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
