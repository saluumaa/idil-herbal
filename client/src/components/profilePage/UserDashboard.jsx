import React, { useEffect, useState } from "react";
import apiRequest from "../../utils/apiRequest";

const UserDashboard = () => {
  const [favorites, setFavorites] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await apiRequest.get("/orders");
        setOrders(response.data);
      } catch (err) {
        console.error("Error fetching user orders:", err.message || "Unknown error");
      }
    };
    
    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto p-6">
      {/* Favorites Section */}
      <h2 className="text-3xl font-bold text-gray-800 mb-4">My Favorites</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.length > 0 ? (
          favorites.map((product) => (
            <div
              key={product.id}
              className="bg-white border rounded-lg p-4 shadow-lg hover:shadow-xl transition"
            >
              <h3 className="text-lg font-semibold text-gray-700">{product.name}</h3>
              <p className="text-gray-600">${product.price.toFixed(2)}</p>
              <button className="mt-3 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                Remove
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No favorites added yet.</p>
        )}
      </div>

      {/* Orders Section */}
      <h2 className="text-3xl font-bold text-gray-800 mt-12">My Orders</h2>
      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-gray-700 font-semibold">Order ID</th>
              <th className="px-6 py-3 text-left text-gray-700 font-semibold">Status</th>
              <th className="px-6 py-3 text-left text-gray-700 font-semibold">Delivery</th>
              <th className="px-6 py-3 text-left text-gray-700 font-semibold">Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order._id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4">{order._id.toString().slice(0, 8)}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 text-sm font-medium rounded-full ${
                        order.paymentStatus === "cancelled"
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 text-sm font-medium rounded-full ${
                        order.deliveryStatus === "completed"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {order.deliveryStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-800">${order.totalAmount.toFixed(2)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                  No orders placed yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserDashboard;
