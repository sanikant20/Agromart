import React, { createContext, useContext, useReducer } from 'react';

// Define action types as constants
const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const UPDATE_CART_ITEM = 'UPDATE_CART_ITEM';
const CLEAR_CART = 'CLEAR_CART';

// Initial state for the cart
const initialState = [];

// CartContext to hold cart state and dispatch function
const CartContext = createContext();

// Reducer function to handle cart state changes
const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          qty: action.qty,
          size: action.size,
          price: action.price,
          img: action.img
        }
      ];

    case REMOVE_FROM_CART:
      return state.filter((item, index) => index !== action.index);

    case UPDATE_CART_ITEM:
      return state.map(item => {
        if (item.id === action.id) {
          return {
            ...item,
            qty: parseInt(action.qty) + item.qty,
            price: action.price + item.price
          };
        }
        return item;
      });

    case CLEAR_CART:
      return [];
    default:
      console.error("Error in reducer");
      return state;
  }
};

// CartProvider component to wrap application with cart context
export const CartProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ cartState, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to access cart state and dispatch
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
