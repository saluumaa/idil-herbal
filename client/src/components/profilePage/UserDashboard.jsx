import React, { useEffect, useState } from 'react';
import apiRequest from '../../utils/apiRequest';

const UserDashboard = () => {
  const [favorites, setFavorites] = useState([]); // Replace with actual data from API
  const [orders, setOrders] = useState([]); // Replace with actual user orders

  const fetchOrders = async () => {
    try {
      const response = await apiRequest.get('/orders');
      setOrders(response.data);
    } catch (err) {
      console.error('Error fetching user orders:', err.message || 'Unknown error');
    }
  }

  useEffect(() => {
    fetchOrders();

  }, []);



  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800">My Favorites</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {favorites.map((product) => (
          <div
            key={product.id}
            className="bg-gray-50 border rounded-lg p-4 shadow hover:shadow-md"
          >
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-600">${product.price}</p>
            <button className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
              Remove
            </button>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mt-10">My Orders</h2>
      <div className="mt-4">
        {/* Orders Table */}
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-gray-600">Order ID</th>
              <th className="px-4 py-2 text-left text-gray-600">Status</th>
              <th className="px-4 py-2 text-left text-gray-600">Delivery</th>
              <th className="px-4 py-2 text-left text-gray-600">Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="px-4 py-2">
                {order._id.toString().slice(0, 8)}
                </td>
                <td className="px-4 py-2">
                <span
                  className={
                    order.status === "cancelled"
                      ? "text-red-500"
                      : "text-green-500"
                  }
                >
                  {order.paymentStatus}
                </span>
                </td>
                <td className="px-4 py-2">
                <span
                  className={
                    order.deliveryStatus === "completed"
                      ? "text-red-500"
                      : "text-green-500"
                  }
                >
                  {order.deliveryStatus}
                </span>
                </td>
                <td className="px-4 py-2">${order.totalAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserDashboard;
