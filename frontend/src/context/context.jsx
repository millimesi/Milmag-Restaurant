import React, { createContext, useReducer } from 'react';

export const cartContext = createContext();

export const Context = (props) => {
  const reducer = (state, action) => {
    switch (action.type) {
      case "ADD":
        // console.log("Action payload quantity:", action.payload.quantity);
        // console.log("Current state:", state);

        // Check if the item already exists in the cart
        const existingItemIndex = state.findIndex((cartItem) => cartItem.id === action.payload.item.id);
        if (existingItemIndex >= 0) {
          // If it exists, update the quantity of that item
          const updatedCart = state.map((cartItem, index) => {
          if (index === existingItemIndex) {
            return {
              ...cartItem,
              // quantity: cartItem.quantity + action.payload.quantity,
              quantity: action.payload.quantity,
            };
          }
          return cartItem;
        });
          return updatedCart;
        } else {
           // If it does not exist, add the item with the specified quantity
           return [...state, { ...action.payload.item, quantity: action.payload.quantity }]
        };
      case "INCREMENT_QUANTITY":
        console.log("State", state);
        return state.map((cartItem) =>
          cartItem.id === action.payload
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
      );
      // case "INCREMENT_QUANTITY":
      //   console.log("State", state);
      //   return state.map((cartItem) => {
      //     console.log("Cart Item:", cartItem);       // Logs each cart item in the array
      //     console.log("Action Payload:", action.payload); // Logs the payload for each iteration
      //     return cartItem.id === action.payload
      //       ? { ...cartItem, quantity: cartItem.quantity + 1 }
      //       : cartItem;
      //   });

      case "DECREMENT_QUANTITY":
        return state.map((cartItem) =>
          cartItem.id === action.payload && cartItem.quantity > 0
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );

      case "DELETE_ITEM":
        return state.filter((cartItem) =>
          cartItem.id !== action.payload
      );

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, []);

  const info = {state, dispatch};

  return (
    <cartContext.Provider value={info}>
      {props.children}
    </cartContext.Provider>
  );
};
