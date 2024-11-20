// store/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const exists = state.find((cartItem) => cartItem.id === item.id);

      if (exists) {
        exists.quantity += 1;
      } else {
        state.push({ ...item, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => state.filter(item => item.id !== action.payload),

    incrementQuantity: (state, action) => {
      const item = state.find(cartItem => cartItem.id === action.payload);
      if(item) item.quantity += 1;
    },
    decrementQuantity: (state, action) => {
      const item = state.find(cartItem => cartItem.id === action.payload);
      if(item && item.quantity >1) item.quantity -=1
    }
  },
});

export const { addToCart, removeFromCart,incrementQuantity,decrementQuantity } = cartSlice.actions;
export default cartSlice.reducer;
