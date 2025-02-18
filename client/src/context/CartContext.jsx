
// import React, { createContext, useContext, useReducer } from 'react';

// const CartContext = createContext();

// const cartReducer = (state, action) => {
//   switch (action.type) {
//     case 'ADD_TO_CART':
//       const existingItem = state.find((item) => item.id === action.payload.id);
//       if (existingItem) {
//         return state.map((item) =>
//           item.id === action.payload.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       }
//       return [...state, { ...action.payload, quantity: 1 }];
//     case 'REMOVE_FROM_CART':
//       return state.filter((item) => item.id !== action.payload.id);
//     default:
//       return state;
//   }
// };

// export const CartProvider = ({ children }) => {
//   const [cart, dispatch] = useReducer(cartReducer, []);

//   return (
//     <CartContext.Provider value={{ cart, dispatch }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => {
//   return useContext(CartContext);
// };


import React, { createContext, useContext, useReducer, useEffect } from 'react';


const CartContext = createContext();

const initialState = {
  cartItems: [], 
};

// Define the cartReducer

const cartReducer = (state, action) => {
  const cartItems = state.cartItems || []; 
  switch (action.type) {
    case "ADD_TO_CART":
      const existingProductIndex = cartItems.findIndex(
        (item) => item._id === action.payload._id
      );

      if (existingProductIndex !== -1) {
        // Increment quantity by 1 for existing product
        const updatedCartItems = cartItems.map((item, index) =>
          index === existingProductIndex
            ? { ...item, quantity: item.quantity + 1 } // Increment quantity here
            : item
        );
        return { ...state, cartItems: updatedCartItems };
      } else {
        // Add new product to cart with quantity = 1
        return {
          ...state,
          cartItems: [...cartItems, { ...action.payload, quantity: 1 }],
        };
      }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartItems: cartItems.filter((item) => item._id !== action.payload._id),
      };

    case "UPDATE_QUANTITY":
      const updatedItems = cartItems.map((item) =>
        item._id === action.payload._id
          ? { ...item, quantity: action.payload.quantity } // Just update the quantity directly
          : item
      );
      return { ...state, cartItems: updatedItems };

    default:
      return state;
  }
};


// Define the CartProvider
export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialState, () => {
    // Load the cart from localStorage on initialization
    const savedCart = localStorage.getItem('cart');
    try {
      return savedCart ? JSON.parse(savedCart) : initialState;
    } catch {
      // If parsing fails, fallback to initialState
      return initialState;
    }
  });

  // Save the cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cartItems: cart.cartItems || [], dispatch }}>
      {children}
    </CartContext.Provider>
  );
};


export const useCart = () => {
  return useContext(CartContext);
};

// Utility function to clear the cart from localStorage
export const clearCartFromLocalStorage = () => {
  localStorage.removeItem('cart');
};

