
// import React from 'react';
// import { useCart } from '../context/CartContext';
// import { Trash2 } from 'lucide-react';

// export default function Cart() {
//   const { cart, dispatch } = useCart();

//   const handleRemoveItem = (id) => {
//     dispatch({ type: 'REMOVE_FROM_CART', payload: { id } });
//   };

//   const calculateSubtotal = () => {
//     return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
//   };

//   return (
//     <div className="py-16">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
//         {cart.length === 0 ? (
//           <div className="bg-white rounded-lg shadow-md p-6 mb-8">
//             <div className="text-center text-gray-600">Your cart is empty</div>
//           </div>
//         ) : (
//           <div className="bg-white rounded-lg shadow-md p-6 mb-8">
//             <ul className="-my-6 divide-y divide-gray-200">
//               {cart.map((item) => (
//                 <li key={item.id} className="py-6 flex">
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className="h-24 w-24 rounded-md object-cover border border-gray-200"
//                   />
//                   <div className="ml-4 flex flex-1 flex-col">
//                     <div>
//                       <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
//                       <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
//                     </div>
//                     <div className="flex items-center justify-between mt-4">
//                       <span className="text-gray-500">Quantity: {item.quantity}</span>
//                       <button
//                         onClick={() => handleRemoveItem(item.id)}
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
//           <button className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors">
//             Proceed to Checkout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import apiRequest from '../utils/apiRequest';

const Cart = () => {
  const { cartItems, dispatch } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('zaad'); 

  const calculateSubtotal = () =>
    parseFloat(
      cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)
    );
  

  const handleRemoveItem = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { _id: id } }); // Use '_id' to match the reducer
  };
  

  const handleProceedToCheckout = async () => {
    const orderData = {
      products: cartItems.map((item) => ({
        product: item._id,
        quantity: item.quantity,
        price: item.price,
      })),
      totalAmount: calculateSubtotal(),
      paymentMethod,
    };

    try {
      const response = await apiRequest.post('/orders', orderData);
      console.log('Order created successfully:', response.data);
      if (response.status === 201) {
        const order = response.data.order;
        dispatch({ type: 'CLEAR_CART' });
        navigate('/checkout', {
          state: { order },
        });
      } else {
        console.error('Error creating order:', response.data.error || 'Unknown error');
      }
    } catch (err) {
      console.error('Error creating order:', err.message || 'Unknown error');
    }
  };



  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="text-center text-gray-600">Your cart is empty</div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
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
                      <p className="text-sm text-gray-500">${item.price.toFixed(2) * item.quantity }</p>
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
          </div>
        )}

        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex justify-between mb-4">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-semibold">${calculateSubtotal()}</span>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Payment Method</label>
            <select 
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mt-2 block w-full bg-white border border-gray-300 rounded-md"
            >
              <option value="zaad">Online Payment</option>
              <option value="cash">Cash on Delivery</option>
            </select>
          </div>

          <button
            onClick={handleProceedToCheckout}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;

