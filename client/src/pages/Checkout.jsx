// import React, { useContext, useState } from "react";
// import { useLocation } from "react-router-dom";
// import apiRequest from "../utils/apiRequest";
// import { AuthContext } from "../context/AuthContext";
// import SuccessPage from "../components/success/SuccessPage";

// const Checkout = () => {
//   const location = useLocation();
//   const { order } = location.state || {}; 
//   const orderId = order?._id || "";
//   const totalAmount = order?.totalAmount || 0;
//   const {currentUser} = useContext(AuthContext) || 'Guest';
//   const [paymentMethod, setPaymentMethod] = useState("zaad");
//   const [transactionId, setTransactionId] = useState("");
//   const [successPage, setSuccessPage] = useState(false);

//   const handlePaymentSubmit = async () => {
//     const orderData = {
//       orderId,
//       paymentMethod,
//       paymentReference:
//         paymentMethod === "zaad" || paymentMethod === "edahab" ? transactionId : null,
//     };
    
//     console.log("Order Data being sent:", orderData);

//     try {
//       const response = await apiRequest.post("/payments", orderData);

//       if (response.status === 200 || response.status === 201) {
//         setSuccessPage(true);
//       } else {
//         console.error('Error creating order:', response.data.error || 'Unknown error');
//       }
//     } catch (error) {
//       console.error("Error processing payment:", error.message);
//     }
//   };

//   return (
  
    
//     <div className="p-6 bg-gray-100 rounded-lg shadow-lg max-w-lg mx-auto">
//      {!successPage && (
//       <>
//       <h1 className="text-2xl font-bold mb-4">Checkout</h1>
//       <h2 className="text-xl mb-4">Total: ${totalAmount.toFixed(2)}</h2>
//       <p className="text-gray-700 mb-4">User: {currentUser?.name}</p>

//       <div className="mb-4">
//         <label className="block font-medium text-gray-700 mb-2">Payment Method:</label>
//         <select
//           value={paymentMethod}
//           onChange={(e) => setPaymentMethod(e.target.value)}
//           className="w-full p-2 border rounded"
//         >
//           <option value="zaad">Zaad</option>
//           <option value="edahab">E-Dahab</option>
//           <option value="paypal">PayPal</option>
//           <option value="flutterwave">Flutterwave</option>
//           <option value="cash-on-delivery">Cash on Delivery</option>
//         </select>
//       </div>

//       {(paymentMethod === "zaad" || paymentMethod === "edahab") && (
//         <div className="mb-4">
//           <label className="block font-medium text-gray-700 mb-2">Transaction ID:</label>
//           <input
//             type="text"
//             value={transactionId}
//             onChange={(e) => setTransactionId(e.target.value)}
//             className="w-full p-2 border rounded"
//             placeholder="Enter your transaction ID"
//           />
//         </div>
//       )}

//       <button
//         onClick={handlePaymentSubmit}
//         className="w-full bg-green-500 text-white p-2 rounded mt-4 hover:bg-green-600"
//       >
//         Submit Payment
//       </button>
//       </>
//   )}

//       {successPage && (
//           <SuccessPage paymentMethod={paymentMethod} />
//       )
//       }
//     </div>
//   );
// };

// export default Checkout;

import { useState } from "react";
import axios from "axios";

const Checkout = ({ cartItems, totalAmount }) => {
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("zaad");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post("/api/orders", {
        products: cartItems.map((item) => ({
          product: item._id,
          quantity: item.quantity,
          price: item.price,
        })),
        totalAmount,
        paymentMethod,
        shippingInfo,
      });

      setSuccess("Order placed successfully!");
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Checkout</h2>

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <form onSubmit={handleOrderSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Full Name" value={shippingInfo.name} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="email" name="email" placeholder="Email" value={shippingInfo.email} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="phone" placeholder="Phone Number" value={shippingInfo.phone} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="address" placeholder="Shipping Address" value={shippingInfo.address} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="city" placeholder="City" value={shippingInfo.city} onChange={handleChange} className="w-full p-2 border rounded" required />

        <label className="block font-semibold">Payment Method:</label>
        <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="w-full p-2 border rounded">
          <option value="zaad">Zaad</option>
          <option value="edahab">E-Dahab</option>
          <option value="paypal">PayPal</option>
          <option value="flutterwave">Flutterwave</option>
          <option value="cash-on-delivery">Cash on Delivery</option>
        </select>

        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded disabled:opacity-50" disabled={loading}>
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </form>
    </div>
  );
};

export default Checkout;
