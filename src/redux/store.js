// app/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice'; // Import your slice reducer
import authReducer from "./authslice"
import userReducer from "./userInfoSlice"
import { useReducer } from 'react';



const store = configureStore({
  reducer: {
    cart: cartReducer, // Add your slice reducer here
    auth: authReducer,
    user: userReducer
  },
});

export default store;

// steps:
// 1.create store
// 2.wrap app component in provider
// 3.create slice
// 4.register reducer in store
