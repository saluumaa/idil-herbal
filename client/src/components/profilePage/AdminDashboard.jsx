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



// import React, { useState, useEffect } from 'react';
// import { Trash, Home, ShoppingCart, BarChart2, Menu } from 'lucide-react';
// import Chart from 'react-apexcharts';
// import apiRequest from '../../utils/apiRequest';
// import Spinner from '../spinner/Spinner';

// const AdminDashboard = () => {
//   const [orders, setOrders] = useState([]);
//   const [updatingOrderId, setUpdatingOrderId] = useState(null);
//   const [monthlySales, setMonthlySales] = useState([]);
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [activeSection, setActiveSection] = useState('home');

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await apiRequest.get('/orders');
//         setOrders(response.data);
//       } catch (err) {
//         console.error('Error fetching orders:', err.message);
//       }
//     };

//     const fetchSalesData = async () => {
//       try {
//         const response = await apiRequest.get('/orders/monthly-sales');
//         setMonthlySales(response.data);
//       } catch (err) {
//         console.error('Error fetching sales data:', err.message);
//       }
//     };

//     fetchOrders();
//     fetchSalesData();
//   }, []);

//   const updateDeliveryStatus = async (orderId, deliveryStatus) => {
//     try {
//       setUpdatingOrderId(orderId);
//       const response = await apiRequest.put('/orders/delivery-status', { orderId, deliveryStatus });
//       setOrders((prevOrders) =>
//         prevOrders.map((order) =>
//           order._id === orderId ? { ...order, deliveryStatus: response.data.order.deliveryStatus } : order
//         )
//       );
//     } catch (err) {
//       console.error('Error updating delivery status:', err.message);
//     } finally {
//       setUpdatingOrderId(null);
//     }
//   };

//   const handleDeleteOrder = async (orderId) => {
//     try {
//       await apiRequest.delete(`/orders/${orderId}`);
//       setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
//     } catch (err) {
//       console.error('Error deleting order:', err.message);
//     }
//   };

//   return (
//     <div className="flex w-full h-full mb-10 ">
//       {/* Sidebar Toggle for Mobile */}
//       <button className="lg:hidden p-4" onClick={() => setSidebarOpen(!sidebarOpen)}>
//         <Menu size={24} />
//       </button>

//       {/* Sidebar */}
//       <div className={`lg:flex flex-col p-6 bg-gray-800 text-white w-full lg:w-64 h-full fixed lg:relative transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>        
//         <h2 className="text-xl font-bold mb-6">Admin Dashboard</h2>
//         <ul className='flex flex-col p-5 gap-5'>
//           <li className="mb-4 flex items-center cursor-pointer" onClick={() => setActiveSection('home')}>
//             <Home className="mr-2" /> Home
//           </li>
//           <li className="mb-4 flex items-center cursor-pointer" onClick={() => setActiveSection('orders')}>
//             <ShoppingCart className="mr-2" /> Orders
//           </li>
//           <li className="mb-4 flex items-center cursor-pointer" onClick={() => setActiveSection('sales')}>
//             <BarChart2 className="mr-2" /> Sales Report
//           </li>
//         </ul>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-6 lg:ml-64">
//         {activeSection === 'home' && <h2 className="text-2xl font-bold">Welcome to the Admin Dashboard</h2>}
//         {activeSection === 'sales' || 'home' && (
//           <>
//             <h2 className="text-2xl font-bold mb-4">Monthly Sales</h2>
//             <Chart
//               options={{ xaxis: { categories: monthlySales.map(sale => sale.month) } }}
//               series={[{ name: "Sales", data: monthlySales.map(sale => sale.total) }]}
//               type="bar"
//               height={300}
//             />
//           </>
//         )}
//         {activeSection === 'orders' || 'home' && (
//           <>
//             <h2 className="text-2xl font-bold mt-6">Orders</h2>
//             <div className="overflow-x-auto">
//               <table className="w-full mt-4 border-collapse">
//                 <thead>
//                   <tr className="bg-gray-200">
//                     <th className="p-2">Order ID</th>
//                     <th className="p-2">Customer</th>
//                     <th className="p-2">Payment Status</th>
//                     <th className="p-2">Delivery Status</th>
//                     <th className="p-2">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {orders.map((order) => (
//                     <tr key={order._id} className="border-b">
//                       <td className="p-2">{order._id.slice(0, 8)}</td>
//                       <td className="p-2">{order.user?.name || 'Unknown'}</td>
//                       <td className="p-2">{order.paymentStatus}</td>
//                       <td className="p-2">
//                         <select
//                           value={order.deliveryStatus}
//                           onChange={(e) => updateDeliveryStatus(order._id, e.target.value)}
//                           className="border p-1"
//                           disabled={updatingOrderId === order._id}
//                         >
//                           <option value="pending">Pending</option>
//                           <option value="shipped">Shipped</option>
//                           <option value="completed">Completed</option>
//                         </select>
//                         {updatingOrderId === order._id && <Spinner />}
//                       </td>
//                       <td className="p-2">
//                         <button onClick={() => handleDeleteOrder(order._id)} className="text-red-600">
//                           <Trash />
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;


import React, { useState, useEffect } from 'react';
import { 
  Trash, Home, ShoppingCart, BarChart2, Menu, X, 
  Plus, Edit, User, Settings, Package, DollarSign, ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Chart from 'react-apexcharts';
import apiRequest from '../../utils/apiRequest';
import Spinner from '../spinner/Spinner';
import { motion, AnimatePresence } from 'framer-motion';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [updatingOrderId, setUpdatingOrderId] = useState(null);
  const [monthlySales, setMonthlySales] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
    totalUsers: 0
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ordersRes, salesRes, productsRes, statsRes] = await Promise.all([
          apiRequest.get('/orders'),
          apiRequest.get('/orders/monthly-sales'),
          apiRequest.get('/products'),
          apiRequest.get('/admin/stats')
        ]);
        setOrders(ordersRes.data);
        setMonthlySales(salesRes.data);
        setProducts(productsRes.data);
        setStats(statsRes.data);
      } catch (err) {
        console.error('Error fetching data:', err.message);
      }
    };

    fetchData();
  }, []);

  const updateDeliveryStatus = async (orderId, deliveryStatus) => {
    try {
      setUpdatingOrderId(orderId);
      const response = await apiRequest.put('/orders/delivery-status', { orderId, deliveryStatus });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, deliveryStatus: response.data.order.deliveryStatus } : order
        )
      );
    } catch (err) {
      console.error('Error updating delivery status:', err.message);
    } finally {
      setUpdatingOrderId(null);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      await apiRequest.delete(`/orders/${orderId}`);
      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
    } catch (err) {
      console.error('Error deleting order:', err.message);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await apiRequest.delete(`/products/${productId}`);
      setProducts(products.filter(product => product._id !== productId));
    } catch (err) {
      console.error('Error deleting product:', err.message);
    }
  };

  const handleEditProduct = (productId) => {
    navigate(`/edit-product${productId}`);
  };

  return (
    <div className="flex w-full min-h-screen bg-gray-50">
      {/* Mobile Sidebar Toggle */}
      <button 
        className="lg:hidden fixed bottom-6 left-6 z-50 p-3 bg-indigo-600 text-white rounded-full shadow-lg"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X size={46} /> : <Menu size={46} />}
      </button>

      {/* Sidebar */}
      <motion.div 
        initial={{ x: -400 }}
        animate={{ x: sidebarOpen ? 0 : -400 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed left-0 lg:relative z-40 w-64 h-full bg-gradient-to-b from-gray-800 to-gray-900 text-white shadow-xl"
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-8 flex items-center">
            <span className="bg-indigo-600 p-2 rounded-lg mr-3">
              <Settings size={20} />
            </span>
            Admin Panel
          </h2>
          
          <nav className="space-y-2">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <button 
                onClick={() => {
                  setActiveSection('home');
                  setSidebarOpen(false);
                }}
                className={`flex items-center w-full px-4 py-3 rounded-lg transition-all ${activeSection === 'home' ? 'bg-indigo-700 text-white' : 'hover:bg-gray-700'}`}
              >
                <Home className="mr-3" size={18} />
                Dashboard
              </button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <button 
                onClick={() => {
                  setActiveSection('orders');
                  setSidebarOpen(false);
                }}
                className={`flex items-center w-full px-4 py-3 rounded-lg transition-all ${activeSection === 'orders' ? 'bg-indigo-700 text-white' : 'hover:bg-gray-700'}`}
              >
                <ShoppingCart className="mr-3" size={18} />
                Orders
                <span className="ml-auto bg-indigo-500 text-white text-xs px-2 py-1 rounded-full">
                  {stats.totalOrders}
                </span>
              </button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <button 
                onClick={() => {
                  setActiveSection('products');
                  setSidebarOpen(false);
                }}
                className={`flex items-center w-full px-4 py-3 rounded-lg transition-all ${activeSection === 'products' ? 'bg-indigo-700 text-white' : 'hover:bg-gray-700'}`}
              >
                <Package className="mr-3" size={18} />
                Products
                <span className="ml-auto bg-indigo-500 text-white text-xs px-2 py-1 rounded-full">
                  {stats.totalProducts}
                </span>
              </button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <button 
                onClick={() => {
                  setActiveSection('sales');
                  setSidebarOpen(false);
                }}
                className={`flex items-center w-full px-4 py-3 rounded-lg transition-all ${activeSection === 'sales' ? 'bg-indigo-700 text-white' : 'hover:bg-gray-700'}`}
              >
                <BarChart2 className="mr-3" size={18} />
                Sales Analytics
              </button>
            </motion.div>
          </nav>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 p-6 lg:ml-64">
        {/* Dashboard Home */}
        {activeSection === 'home' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500"
              >
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                    <ShoppingCart size={20} />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Total Orders</p>
                    <p className="text-2xl font-bold">{stats.totalOrders}</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500"
              >
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                    <DollarSign size={20} />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Total Revenue</p>
                    <p className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-xl shadow-md border-l-4 border-purple-500"
              >
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
                    <Package size={20} />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Total Products</p>
                    <p className="text-2xl font-bold">{stats.totalProducts}</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-xl shadow-md border-l-4 border-orange-500"
              >
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-orange-100 text-orange-600 mr-4">
                    <User size={20} />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Total Users</p>
                    <p className="text-2xl font-bold">{stats.totalUsers}</p>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Sales Chart */}
            <div className="bg-white p-6 rounded-xl shadow-md mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Monthly Sales</h2>
                <button 
                  onClick={() => setActiveSection('sales')}
                  className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  View Details →
                </button>
              </div>
              <Chart
                options={{
                  chart: {
                    toolbar: {
                      show: true,
                      tools: {
                        download: true,
                        selection: true,
                        zoom: true,
                        zoomin: true,
                        zoomout: true,
                        pan: true,
                        reset: true
                      }
                    }
                  },
                  colors: ['#4f46e5'],
                  xaxis: {
                    categories: monthlySales.map(sale => sale.month),
                    labels: {
                      style: {
                        colors: '#6b7280',
                        fontSize: '12px'
                      }
                    }
                  },
                  yaxis: {
                    labels: {
                      style: {
                        colors: '#6b7280',
                        fontSize: '12px'
                      },
                      formatter: (value) => `$${value.toLocaleString()}`
                    }
                  },
                  dataLabels: {
                    enabled: false
                  },
                  plotOptions: {
                    bar: {
                      borderRadius: 4,
                      horizontal: false,
                    }
                  },
                  grid: {
                    borderColor: '#f3f4f6'
                  }
                }}
                series={[{ name: "Sales", data: monthlySales.map(sale => sale.total) }]}
                type="bar"
                height={350}
              />
            </div>
            
            {/* Recent Orders and Products */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Orders */}
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-800">Recent Orders</h2>
                  <button 
                    onClick={() => setActiveSection('orders')}
                    className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                  >
                    View All →
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Order ID</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Status</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.slice(0, 5).map((order) => (
                        <motion.tr 
                          key={order._id}
                          whileHover={{ backgroundColor: '#f9fafb' }}
                          className="border-b"
                        >
                          <td className="py-3 px-4 text-sm text-gray-800">#{order._id.slice(0, 8)}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              order.deliveryStatus === 'completed' 
                                ? 'bg-green-100 text-green-800' 
                                : order.deliveryStatus === 'shipped' 
                                  ? 'bg-blue-100 text-blue-800' 
                                  : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {order.deliveryStatus}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-sm font-medium">${order.totalAmount.toFixed(2)}</td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              {/* Products Section */}
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-800">Products</h2>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => setActiveSection('products')}
                      className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                      View All →
                    </button>
                    <button 
                      onClick={() => navigate('/add-product')}
                      className="flex items-center text-sm bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-md"
                    >
                      <Plus size={16} className="mr-1" /> Add Product
                    </button>
                  </div>
                </div>
                
                {/* Products List */}
                <div className="space-y-4">
                {Array.isArray(products.products) ? products.products.slice(0, 3).map((product) => (
                  <motion.div
                    key={product._id}
                    whileHover={{ scale: 1.01 }}
                    className="flex items-center p-3 border border-gray-200 rounded-lg hover:shadow-sm"
                  >
                    <div className="bg-gray-100 w-12 h-12 rounded-md flex items-center justify-center mr-4">
                      <Package size={20} className="text-gray-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{product.name}</h3>
                      <p className="text-sm text-gray-500">${product.price}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleEditProduct(product._id)}
                        className="p-1 text-blue-600 hover:text-blue-800"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDeleteProduct(product._id)}
                        className="p-1 text-red-600 hover:text-red-800"
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  </motion.div>
                )) : null}

                </div>
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Orders Section */}
        {activeSection === 'orders' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-800">Orders Management</h1>
              <button 
                onClick={() => setActiveSection('home')}
                className="flex items-center text-sm text-gray-600 hover:text-gray-800"
              >
                <ArrowLeft size={16} className="mr-1" /> Back to Dashboard
              </button>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Order ID</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Customer</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Amount</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Payment</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <motion.tr 
                        key={order._id}
                        whileHover={{ backgroundColor: '#f9fafb' }}
                        className="border-b"
                      >
                        <td className="py-3 px-4 text-sm text-gray-800">#{order._id.slice(0, 8)}</td>
                        <td className="py-3 px-4 text-sm text-gray-800">{order.user?.name || 'Guest'}</td>
                        <td className="py-3 px-4 text-sm font-medium">${order.totalAmount.toFixed(2)}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            order.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {order.paymentStatus}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <select
                            value={order.deliveryStatus}
                            onChange={(e) => updateDeliveryStatus(order._id, e.target.value)}
                            className={`text-xs px-2 py-1 rounded-full font-medium ${
                              order.deliveryStatus === 'completed' 
                                ? 'bg-green-100 text-green-800' 
                                : order.deliveryStatus === 'shipped' 
                                  ? 'bg-blue-100 text-blue-800' 
                                  : 'bg-yellow-100 text-yellow-800'
                            }`}
                            disabled={updatingOrderId === order._id}
                          >
                            <option value="pending">Pending</option>
                            <option value="shipped">Shipped</option>
                            <option value="completed">Completed</option>
                          </select>
                          {updatingOrderId === order._id && <Spinner size="small" />}
                        </td>
                        <td className="py-3 px-4">
                          <button 
                            onClick={() => handleDeleteOrder(order._id)}
                            className="text-red-600 hover:text-red-800 p-1"
                          >
                            <Trash size={16} />
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Sales Analytics Section */}
        {activeSection === 'sales' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-800">Sales Analytics</h1>
              <button 
                onClick={() => setActiveSection('home')}
                className="flex items-center text-sm text-gray-600 hover:text-gray-800"
              >
                <ArrowLeft size={16} className="mr-1" /> Back to Dashboard
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Monthly Sales */}
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Monthly Sales</h2>
                <Chart
                  options={{
                    chart: {
                      toolbar: {
                        show: true
                      }
                    },
                    colors: ['#4f46e5'],
                    xaxis: {
                      categories: monthlySales.map(sale => sale.month),
                      labels: {
                        style: {
                          colors: '#6b7280',
                          fontSize: '12px'
                        }
                      }
                    },
                    yaxis: {
                      labels: {
                        style: {
                          colors: '#6b7280',
                          fontSize: '12px'
                        },
                        formatter: (value) => `$${value.toLocaleString()}`
                      }
                    },
                    dataLabels: {
                      enabled: false
                    },
                    plotOptions: {
                      bar: {
                        borderRadius: 4,
                        horizontal: false,
                      }
                    }
                  }}
                  series={[{ name: "Sales", data: monthlySales.map(sale => sale.total) }]}
                  type="bar"
                  height={350}
                />
              </div>
              
              {/* Sales by Category */}
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Sales by Category</h2>
                <Chart
                  options={{
                    labels: ['Electronics', 'Clothing', 'Books', 'Home', 'Other'],
                    colors: ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'],
                    legend: {
                      position: 'bottom'
                    },
                    dataLabels: {
                      enabled: false
                    },
                    plotOptions: {
                      pie: {
                        donut: {
                          size: '65%'
                        }
                      }
                    }
                  }}
                  series={[35, 25, 20, 15, 5]}
                  type="donut"
                  height={350}
                />
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Products Management Section */}
        {activeSection === 'products' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-800">Products Management</h1>
              <div className="flex space-x-3">
                <button 
                  onClick={() => setActiveSection('home')}
                  className="flex items-center text-sm text-gray-600 hover:text-gray-800"
                >
                  <ArrowLeft size={16} className="mr-1" /> Back to Dashboard
                </button>
                <button 
                  onClick={() => navigate('/admin/add-product')}
                  className="flex items-center text-sm bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-md"
                >
                  <Plus size={16} className="mr-1" /> Add Product
                </button>
              </div>
            </div>
            
            {/* Products List */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Product</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Category</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Price</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Stock</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                  {Array.isArray(products.products) ? products.products.slice(0, 3).map((product) => (
                      <motion.tr 
                        key={product._id}
                        whileHover={{ backgroundColor: '#f9fafb' }}
                        className="border-b"
                      >
                        <td className="py-4 px-4">
                          <div className="flex items-center">
                            <div className="bg-gray-100 w-10 h-10 rounded-md flex items-center justify-center mr-4">
                              <Package size={16} className="text-gray-500" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-800">{product.name}</p>
                              <p className="text-xs text-gray-500 line-clamp-1">{product.description}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-800 capitalize">{product.category}</td>
                        <td className="py-4 px-4 text-sm font-medium">${product.price}</td>
                        <td className="py-4 px-4 text-sm text-gray-800">{product.stock}</td>
                        <td className="py-4 px-4">
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => handleEditProduct(product._id)}
                              className="p-1 text-blue-600 hover:text-blue-800"
                            >
                              <Edit size={16} />
                            </button>
                            <button 
                              onClick={() => handleDeleteProduct(product._id)}
                              className="p-1 text-red-600 hover:text-red-800"
                            >
                              <Trash size={16} />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    )): null}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;




