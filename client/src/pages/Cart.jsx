import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";
import apiRequest from "../utils/apiRequest";

const Cart = () => {
  const { cartItems, dispatch } = useCart();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("zaad");
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
  });

  const calculateSubtotal = () =>
    parseFloat(
      cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)
    );

  const handleRemoveItem = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: { _id: id } });
  };

  const handleInputChange = (e) => {
    setCustomerDetails({ ...customerDetails, [e.target.name]: e.target.value });
  };

  const handleProceedToCheckout = async () => {
    const orderData = {
      shippingInfo: {
        name: customerDetails.name,
        email: customerDetails.email,
        phone: customerDetails.phone,
        address: customerDetails.address,
        city: customerDetails.city,
      },
      products: cartItems.map((item) => ({
        product: item._id,
        quantity: item.quantity,
        price: item.price,
      })),
      totalAmount: calculateSubtotal(),
      paymentMethod: paymentMethod === "cash" ? "cash-on-delivery" : paymentMethod, 
    };

    try {
      const response = await apiRequest.post("/orders", orderData);
      console.log("Order created successfully:", response.data);
      if (response.status === 201) {
        dispatch({ type: "CLEAR_CART" });
        navigate("/success", { state :{ paymentMethod, customerDetails } });
      } else {
        console.error("Error creating order:", response.data.error || "Unknown error");
      }
    } catch (err) {
      console.error("Error creating order:", err.message || "Unknown error");
      
    }
  };


  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Order Details Form - Left on Desktop, Bottom on Mobile */}
        <div className="md:col-span-1 order-2 md:order-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Order Details</h2>
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={customerDetails.name}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={customerDetails.email}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={customerDetails.phone}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
              <textarea
                name="address"
                placeholder="Shipping Address"
                value={customerDetails.address}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />

              <input
                type="text"
                name="city"
                placeholder="City"
                value={customerDetails.city}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
              <label className="block text-gray-700">Payment Method</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="block w-full border border-gray-300 rounded-md p-2"
              >
                <option value="zaad">Online Payment</option>
                <option value="cash">Cash on Delivery</option>
              </select>
            </div>
          </div>
        </div>

        {/* Cart Items - Right on Desktop, Top on Mobile */}
        <div className="md:col-span-2 order-1 md:order-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

            {cartItems.length === 0 ? (
              <div className="text-center text-gray-600">Your cart is empty</div>
            ) : (
              <ul className="-my-6 divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <li key={item._id} className="py-6 flex flex-wrap">
                    <img
                      src={`http://localhost:5000/${item.image}`}
                      alt={item.name}
                      className="h-24 w-24 rounded-md object-cover border border-gray-200"
                    />
                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-500">${item.price.toFixed(2) * item.quantity}</p>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-gray-500">Quantity: {item.quantity}</span>
                        <button
                          onClick={() => handleRemoveItem(item._id)}
                          className="text-red-500 hover:text-red-600 flex items-center"
                        >
                          <Trash2 className="h-5 w-5 mr-1" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-6 flex justify-between font-semibold text-lg">
              <span>Subtotal:</span>
              <span>${calculateSubtotal()}</span>
            </div>

            <button
              onClick={handleProceedToCheckout}
              className="w-full mt-4 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Trash2 } from 'lucide-react';
// import { useCart } from '../context/CartContext';
// import apiRequest from '../utils/apiRequest';

// const Cart = () => {
//   const { cartItems, dispatch } = useCart();
//   const navigate = useNavigate();
//   const [paymentMethod, setPaymentMethod] = useState('zaad'); 

//   const calculateSubtotal = () =>
//     parseFloat(
//       cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)
//     );
  

//   const handleRemoveItem = (id) => {
//     dispatch({ type: 'REMOVE_FROM_CART', payload: { _id: id } }); // Use '_id' to match the reducer
//   };
  

//   const handleProceedToCheckout = async () => {
//     const orderData = {
//       products: cartItems.map((item) => ({
//         product: item._id,
//         quantity: item.quantity,
//         price: item.price,
//       })),
//       totalAmount: calculateSubtotal(),
//       paymentMethod,
//     };

//     try {
//       const response = await apiRequest.post('/orders', orderData);
//       console.log('Order created successfully:', response.data);
//       if (response.status === 201) {
//         const order = response.data.order;
//         dispatch({ type: 'CLEAR_CART' });
//         navigate('/checkout', {
//           state: { order },
//         });
//       } else {
//         console.error('Error creating order:', response.data.error || 'Unknown error');
//       }
//     } catch (err) {
//       console.error('Error creating order:', err.message || 'Unknown error');
//     }
//   };



//   return (
//     <div className="py-16">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

//         {cartItems.length === 0 ? (
//           <div className="bg-white rounded-lg shadow-md p-6 mb-8">
//             <div className="text-center text-gray-600">Your cart is empty</div>
//           </div>
//         ) : (
//           <div className="bg-white rounded-lg shadow-md p-6 mb-8">
//             <ul className="-my-6 divide-y divide-gray-200">
//               {cartItems.map((item) => (
//                 <li key={item._id} className="py-6 flex flex-wrap">
//                   <img
//                     src={`http://localhost:5000/${item.image}`}
//                     alt={item.name}
//                     className="h-24 w-24 rounded-md object-cover border border-gray-200"
//                   />
//                   <div className="ml-4 flex flex-1 flex-col">
//                     <div>
//                       <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
//                       <p className="text-sm text-gray-500">${item.price.toFixed(2) * item.quantity }</p>
//                     </div>
//                     <div className="flex items-center justify-between mt-4">
//                       <span className="text-gray-500">Quantity: {item.quantity}</span>
//                       <button
//                         onClick={() => handleRemoveItem(item._id)}
//                         className="text-red-500 hover:text-red-600 flex items-center"
//                       >
//                         <Trash2 className="h-5 w-5 mr-1" />
//                         Remove
//                       </button>
//                     </div>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}

//         <div className="bg-gray-50 rounded-lg p-6">
//           <div className="flex justify-between mb-4">
//             <span className="text-gray-600">Subtotal</span>
//             <span className="font-semibold">${calculateSubtotal()}</span>
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-700">Payment Method</label>
//             <select 
//               value={paymentMethod}
//               onChange={(e) => setPaymentMethod(e.target.value)}
//               className="mt-2 block w-full bg-white border border-gray-300 rounded-md"
//             >
//               <option value="zaad">Online Payment</option>
//               <option value="cash">Cash on Delivery</option>
//             </select>
//           </div>

//           <button
//             onClick={handleProceedToCheckout}
//             className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
//           >
//             Proceed to Checkout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;

