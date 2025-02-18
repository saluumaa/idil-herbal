// import React, { useState } from 'react';
// import apiRequest from '../../utils/apiRequest';

// export default function AddProduct() {

//   const [isFormVisible, setIsFormVisible] = useState(false);
//   const [product, setProduct] = useState({
//     name: '',
//     price: '',
//     description: '',
//     images:[],
//     stock: '',
//     stockStatus: 'in-stock',
//     category: '',
//     deals: false,
//     newProduct: false,
//     topProduct: false,
//   });

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     const fieldValue = type === 'checkbox' ? checked : value;
//     setProduct((prev) => ({ ...prev, [name]: fieldValue }));
//   };

//   const handleFileChange = (e) => {
//     const files = Array.from(e.target.files); 
//     setProduct((prev) => ({
//       ...prev,
//       images: [...prev.images, ...files], // Append new files to the existing array
//     }));
//   };
  

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append('name', product.name);
//     formData.append('price', product.price);
//     formData.append('description', product.description);
//     formData.append('stock', product.stock);
//     formData.append('stockStatus', product.stockStatus);
//     formData.append('category', product.category);
//     formData.append('deals', product.deals);
//     formData.append('newProduct', product.newProduct);
//     formData.append('topProduct', product.topProduct);
    
    
//     product.images.forEach((image) => {
//         formData.append('images', image); // Field name matches multer config
//     });
    
//     try {
//         // Make the API request using Axios
//         const response = await apiRequest.post('/products', formData, {
//             headers: {
//                 'Content-Type': 'multipart/form-data',
//             },
//         });
        
//         console.log('Product added:', response.data);

//         // Reset the form after successful submission
//         setProduct({
//             name: '',
//             price: '',
//             description: '',
//             images: [],
//             stock: '',
//             stockStatus: 'in-stock',
//             category: '',
//             deals: false,
//             newProduct: false,
//             topProduct: false,
//         });
//         setIsFormVisible(false); // Hide the form
//     } catch (error) {
//         console.error('Error adding product:', error);
//     }
// };


//   return (
//     <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//       {/* <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Profile</h1> */}

//       {/* Add Product Button */}
//       <button
//         onClick={() => setIsFormVisible(!isFormVisible)}
//         className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors mb-8"
//       >
//         {isFormVisible ? 'Cancel' : 'Add Product'}
//       </button>

//       {/* Add Product Form */}
//       {isFormVisible && (
//         <form
//           onSubmit={handleSubmit}
//           className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto"
//         >
//           <h2 className="text-xl font-semibold text-gray-900 mb-4">Add New Product</h2>

//           {/* Product Name */}
//           <div className="mb-4">
//             <label htmlFor="name" className="block text-sm font-medium text-gray-700">
//               Product Name
//             </label>
//             <input
//               type="text"
//               name="name"
//               value={product.name}
//               onChange={handleInputChange}
//               required
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
//               placeholder="Enter product name"
//             />
//           </div>

//           {/* Product Price */}
//           <div className="mb-4">
//             <label htmlFor="price" className="block text-sm font-medium text-gray-700">
//               Price ($)
//             </label>
//             <input
//               type="number"
//               name="price"
//               value={product.price}
//               onChange={handleInputChange}
//               required
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
//               placeholder="Enter product price"
//             />
//           </div>

//           {/* Preview Images */}
//           <div className="mb-4">
//             <label htmlFor="images" className="block text-sm font-medium text-gray-700">
//                 Product Images
//             </label>
//             <input
//                 type="file"
//                 name="images"
//                 onChange={handleFileChange}
//                 multiple
//                 accept="image/*"
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
//             />
//          </div>


//           {/* Product Stock */}
//           <div className="mb-4">
//             <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
//               Stock
//             </label>
//             <input
//               type="number"
//               name="stock"
//               value={product.stock}
//               onChange={handleInputChange}
//               required
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
//               placeholder="Enter stock quantity"
//             />
//           </div>

//           {/* Stock Status */}
//           <div className="mb-4">
//             <label htmlFor="stockStatus" className="block text-sm font-medium text-gray-700">
//               Stock Status
//             </label>
//             <select
//               name="stockStatus"
//               value={product.stockStatus}
//               onChange={handleInputChange}
//               required
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
//             >
//               <option value="in-stock">In Stock</option>
//               <option value="low-stock">Low Stock</option>
//               <option value="out-of-stock">Out of Stock</option>
//             </select>
//           </div>

//           {/* Product Category */}
//           <div className="mb-4">
//             <label htmlFor="category" className="block text-sm font-medium text-gray-700">
//               Category
//             </label>
//             <input
//               type="text"
//               name="category"
//               value={product.category}
//               onChange={handleInputChange}
//               required
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
//               placeholder="Enter product category"
//             />
//           </div>

//           {/* Checkboxes */}
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">Product Attributes</label>
//             <div className="flex items-center">
//               <input
//                 type="checkbox"
//                 name="deals"
//                 checked={product.deals}
//                 onChange={handleInputChange}
//                 className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
//               />
//               <label htmlFor="deals" className="ml-2 text-sm text-gray-700">
//                 Deals
//               </label>
//             </div>
//             <div className="flex items-center mt-2">
//               <input
//                 type="checkbox"
//                 name="newProduct"
//                 checked={product.newProduct}
//                 onChange={handleInputChange}
//                 className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
//               />
//               <label htmlFor="newProduct" className="ml-2 text-sm text-gray-700">
//                 New Product
//               </label>
//             </div>
//             <div className="flex items-center mt-2">
//               <input
//                 type="checkbox"
//                 name="topProduct"
//                 checked={product.topProduct}
//                 onChange={handleInputChange}
//                 className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
//               />
//               <label htmlFor="topProduct" className="ml-2 text-sm text-gray-700">
//                 Top Product
//               </label>
//             </div>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
//           >
//             Add Product
//           </button>
//         </form>
//       )}
//     </div>
//   );
// }

import React, { useState } from 'react';
import apiRequest from '../../utils/apiRequest';

export default function AddProduct() {
  // const [isFormVisible, setIsFormVisible] = useState(false);
  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    images: [],
    stock: '',
    stockStatus: 'in-stock',
    category: '',
    deals: false,
    newProduct: false,
    topProduct: false,
    size: [],
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    setProduct((prev) => ({ ...prev, [name]: fieldValue }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setProduct((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));
  };

  const handleSizeChange = (index, field, value) => {
    const updatedSizes = [...product.size];
    updatedSizes[index][field] = value;
    setProduct((prev) => ({ ...prev, size: updatedSizes }));
  };

  const addSize = () => {
    setProduct((prev) => ({
      ...prev,
      size: [...prev.size, { name: '', price: '', weight: '' }],
    }));
  };

  const removeSize = (index) => {
    setProduct((prev) => ({
      ...prev,
      size: prev.size.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(product).forEach(([key, value]) => {
      if (key === 'images') {
        value.forEach((image) => formData.append('images', image));
      } else if (key === 'size') {
        value.forEach((size, index) => {
          formData.append(`size[${index}][name]`, size.name);
          formData.append(`size[${index}][price]`, size.price);
          formData.append(`size[${index}][weight]`, size.weight);
        });
      } else {
        formData.append(key, value);
      }
    });

    try {
      const response = await apiRequest.post('/products', formData);
      console.log('Product added:', response.data);
      setProduct({
        name: '',
        price: '',
        description: '',
        images: [],
        stock: '',
        stockStatus: 'in-stock',
        category: '',
        deals: false,
        newProduct: false,
        topProduct: false,
        size: [],
      });
      // setIsFormVisible(false);
    } catch (error) {
      console.error('Error adding product:', error.response?.data || error.message);
    }
  };

  return (
    <div className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
       <h2 className="text-xl font-semibold text-gray-900 mb-4">Add New Product</h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md w-full mx-auto flex flex-col gap-4 "
        >

            {/* Product Name */}
          <div className="mb-4 flex flex-col gap-4 md:flex-row ">
             <label htmlFor="name" className="block text-sm font-medium text-gray-700 ">
              Product Name
            </label>
             <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-md border-none outline-none "
              placeholder="Enter product name"
            />
          </div>

          {/* Product Price */}
          <div className="mb-4 flex flex-col gap-4 md:flex-row ">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Price ($)
            </label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-md border-gray-500 outline-none "
              placeholder="Enter product price"
            />
          </div>

          {/* Product Description */} 

          <div className="mb-4 flex flex-col gap-4 md:flex-row ">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea 
              name="description"
              value={product.description}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              placeholder="Enter product description"
            />
          </div>

          {/* Preview Images */}
          <div className="mb-4 flex flex-col gap-4 md:flex-row ">
            <label htmlFor="images" className="block text-sm font-medium text-gray-700">
                Product Images
            </label>
            <input
                type="file"
                name="images"
                onChange={handleFileChange}
                multiple
                accept="image/*"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
         </div>


          {/* Product Stock */}
          <div className="mb-4 flex flex-col gap-4 md:flex-row ">
            <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
              Stock
            </label>
            <input
              type="number"
              name="stock"
              value={product.stock}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              placeholder="Enter stock quantity"
            />
          </div>

          {/* Stock Status */}
          <div className="mb-4 flex flex-col gap-4 md:flex-row ">
            <label htmlFor="stockStatus" className="block text-sm font-medium text-gray-700">
              Stock Status
            </label>
            <select
              name="stockStatus"
              value={product.stockStatus}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            >
              <option value="in-stock">In Stock</option>
              <option value="low-stock">Low Stock</option>
              <option value="out-of-stock">Out of Stock</option>
            </select>
          </div>

          {/* Product Category */}
          <div className="mb-4 flex flex-col gap-4 md:flex-row ">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <input
              type="text"
              name="category"
              value={product.category}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              placeholder="Enter product category"
            />
          </div>

          {/* Checkboxes */}
          <div className="mb-4 flex flex-col gap-4 ">
            <label className="block text-sm font-medium text-gray-700">Product Attributes</label>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="deals"
                checked={product.deals}
                onChange={handleInputChange}
                className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <label htmlFor="deals" className="ml-2 text-sm text-gray-700">
                Deals
              </label>
            </div>
            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                name="newProduct"
                checked={product.newProduct}
                onChange={handleInputChange}
                className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <label htmlFor="newProduct" className="ml-2 text-sm text-gray-700">
                New Product
              </label>
            </div>
            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                name="topProduct"
                checked={product.topProduct}
                onChange={handleInputChange}
                className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <label htmlFor="topProduct" className="ml-2 text-sm text-gray-700">
                Top Product
              </label>
            </div>
          </div>
          {/* Size Options */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Product Sizes</label>
            {product.size.map((size, index) => (
              <div key={index} className="flex space-x-2 mt-2">
                <input
                  type="text"
                  placeholder="Size Name"
                  value={size.name}
                  onChange={(e) => handleSizeChange(index, 'name', e.target.value)}
                  className="w-1/3 border-gray-300 rounded-md"
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={size.price}
                  onChange={(e) => handleSizeChange(index, 'price', e.target.value)}
                  className="w-1/3 border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  placeholder="Weight"
                  value={size.weight}
                  onChange={(e) => handleSizeChange(index, 'weight', e.target.value)}
                  className="w-1/3 border-gray-300 rounded-md"
                />
                <button type="button" onClick={() => removeSize(index)} className="text-red-500">✕</button>
              </div>
            ))}
            <button type="button" onClick={addSize} className="mt-2 text-blue-500">+ Add Size</button>
          </div>
          
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
          >
            Add Product
          </button>
        </form>
      
    </div>
  );
}
