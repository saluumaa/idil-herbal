// import React, { useState } from 'react';
// import AddProduct from '../addProduct/AddProduct';
// import { Link } from 'react-router-dom';

// const AdminDashboard = () => {
//   const [products, setProducts] = useState([]); // Replace with actual products from API
//   const [addForm, setAddForm] = useState(false);
//   const [orders, setOrders] = useState([]);
  
//   return (
//     <div>
//       <h2 className="text-2xl font-bold text-gray-800">Manage Products</h2>
//       <div className="mt-4">
//         {/* Add Product Form */}
//         {/* <Link to="/add-product" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"> */}
//           <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//             onClick={() => setAddForm(!addForm)}
//           >
//             Add Product
//           </button>
//         {/* </Link> */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
//           {/* Replace with actual product cards */}
//           {products.map((product) => (
//             <div
//               key={product.id}
//               className="bg-gray-50 border rounded-lg p-4 shadow hover:shadow-md"
//             >
//               <h3 className="text-lg font-semibold">{product.name}</h3>
//               <p className="text-gray-600">${product.price}</p>
//               <div className="flex space-x-2 mt-2">
//                 <button className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600">
//                   Edit
//                 </button>
//                 <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <h2 className="text-2xl font-bold text-gray-800 mt-10">Manage Orders</h2>
//       <div className="mt-4">
//         {/* Orders Table */}
//         <table className="min-w-full bg-white rounded shadow">
//           <thead>
//             <tr>
//               <th className="px-4 py-2 text-left text-gray-600">Order ID</th>
//               <th className="px-4 py-2 text-left text-gray-600">Customer</th>
//               <th className="px-4 py-2 text-left text-gray-600">Status</th>
//               <th className="px-4 py-2 text-left text-gray-600">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {/* Replace with actual order rows */}
//             {orders.map((order) => (
//               <tr key={order.id}>
//                 <td className="px-4 py-2">{order.id}</td>
//                 <td className="px-4 py-2">{order.customerName}</td>
//                 <td className="px-4 py-2">{order.status}</td>
//                 <td className="px-4 py-2">
//                   <button className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600">
//                     Mark Complete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {
//         addForm && <AddProduct />
//       }
//     </div>


//   );
// };

// export default AdminDashboard;

import React, { useState, useEffect } from 'react';
import { Trash } from 'lucide-react';
import AddProduct from '../addProduct/AddProduct';
import apiRequest from '../../utils/apiRequest';
import { Link } from 'react-router-dom';
import Spinner from '../spinner/Spinner';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [addForm, setAddForm] = useState(false);
  const [updatingOrderId, setUpdatingOrderId] = useState(null);
  

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await apiRequest.get('/products');
        setProducts(response.data);
      } catch (err) {
        console.error('Error fetching products:', err.message);
      }
    };

    fetchProducts();
  }, []);

  // Fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await apiRequest.get('/orders');
        setOrders(response.data);
      } catch (err) {
        console.error('Error fetching orders:', err.message);
      }
    };

    fetchOrders();
  }, []);

  // Update order status
  const updateOrderStatus = async (orderId, status) => {
    try {
      setUpdatingOrderId(orderId); // Show loader for this order
      const response = await apiRequest.put('/orders/status', { orderId, status });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: response.data.order.status } : order
        )
      );
    } catch (err) {
      console.error('Error updating order status:', err.message);
    } finally {
      setUpdatingOrderId(null); // Hide loader
    }
  };

  //update delivery status
  const updateDeliveryStatus = async (orderId, deliveryStatus) => {
    try {
      setUpdatingOrderId(orderId); // Show loader
      const response = await apiRequest.put('/orders/delivery-status', { orderId, deliveryStatus });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, deliveryStatus: response.data.order.deliveryStatus } : order
        )
      );
    } catch (err) {
      console.error('Error updating delivery status:', err.message);
    } finally {
      setUpdatingOrderId(null); // Hide loader
    }
  };
  

  // Delete order
  const handleDeleteOrder = async (orderId) => {
    try {
      await apiRequest.delete(`/orders/${orderId}`);
      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
    } catch (err) {
      console.error('Error deleting order:', err.message);
      alert('Failed to delete order');
    }
  };

  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-bold text-gray-800">Manage Products and Blogs</h2>
      <div className="mt-4">
        <Link to={'/add-product'}>
        <button
          className="px-4 py-3 mr-8 mb-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          
        >
          Add Product
        </button>
        </Link>
        <Link to="/add-blog">
          <button className="px-4 py-3 bg-blue-500 text-white rounded hover:bg-blue-600">
            Create Blog
          </button>
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {Array.products?.length > 0 &&
          products?.map((product) => (
            <div
              key={product._id}
              className="bg-gray-50 border rounded-lg p-4 shadow hover:shadow-md"
            >
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-600">${product.price}</p>
              <div className="flex space-x-2 mt-2">
                <button className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600">
                  Edit
                </button>
                <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mt-10">Manage Orders</h2>
      <div className="mt-4 flex-1">
        {/* <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-gray-600">Order ID</th>
              <th className="px-4 py-2 text-left text-gray-600">Customer</th>
              <th className="px-4 py-2 text-left text-gray-600">Products</th>
              <th className="px-4 py-2 text-left text-gray-600">Status</th>
              <th className="px-4 py-2 text-left text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-b">
                <td className="px-4 py-2">{order._id.slice(0, 8)}</td>
                <td className="px-4 py-2">{order.user.name}</td>
                <td className="px-4 py-2">
                  {order.products.map((product) => (
                    <div key={product._id}>
                      {product.product?.name} (x{product.quantity})
                    </div>
                  ))}
                </td>
                <td className="px-4 py-2">
                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                    className="px-3 py-1 border rounded"
                    disabled={updatingOrderId === order._id} 
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  {updatingOrderId === order._id && <Spinner />} 
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDeleteOrder(order._id)}
                    className="px-3 py-1 text-red-600"
                  >
                    <Trash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table> */}
        <table className="min-w-full bg-white rounded shadow">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left text-gray-600">Order ID</th>
            <th className="px-4 py-2 text-left text-gray-600">Customer</th>
            <th className="px-4 py-2 text-left text-gray-600">Products</th>
            <th className="px-4 py-2 text-left text-gray-600">Payment Method</th>
            <th className="px-4 py-2 text-left text-gray-600">Payment Status</th>
            <th className="px-4 py-2 text-left text-gray-600">Delivery Status</th>
            <th className="px-4 py-2 text-left text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="border-b">
              <td className="px-4 py-2">{order._id.slice(0, 8)}</td>
              <td className="px-4 py-2">{order.user.name}</td>
              <td className="px-4 py-2">
                {order.products.map((product) => (
                  <div key={product._id}>
                    {product.product?.name} (x{product.quantity})
                  </div>
                ))}
              </td>
              <td className="px-4 py-2">{order.paymentMethod}</td>
              <td className="px-4 py-2">{order.paymentStatus}</td>
              <td className="px-4 py-2">
                <select
                  value={order.deliveryStatus}
                  onChange={(e) => updateDeliveryStatus(order._id, e.target.value)}
                  className="px-3 py-1 border rounded"
                  disabled={updatingOrderId === order._id}
                >
                  <option value="pending">Pending</option>
                  <option value="shipped">Shipped</option>
                  <option value="completed">Completed</option>
                </select>
                {updatingOrderId === order._id && <Spinner />}
              </td>
              <td className="px-4 py-2">
                <button
                  onClick={() => handleDeleteOrder(order._id)}
                  className="px-3 py-1 text-red-600"
                >
                  <Trash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      </div>

      {addForm && <AddProduct />}
    </div>
  );
};

export default AdminDashboard;

