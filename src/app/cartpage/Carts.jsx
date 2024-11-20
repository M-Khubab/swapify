// components/Cart.js
"use client"
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { incrementQuantity,decrementQuantity,removeFromCart } from '@/redux/cartSlice';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart) 
  const dispatch = useDispatch();
  const router = useRouter();

  const handleCheckoutClick = (e) => {
    e.preventDefault();
    router.push("checkout");
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-8">Shopping Cart</h2>
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <div key={item.id} className="flex items-center justify-between py-4 bg-white rounded-lg shadow-md mb-4">
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 relative">
                <Image 
                  src={item.imageUrl} 
                  alt={item.title} 
                  layout="fill" 
                  objectFit="cover" 
                  className="rounded-lg"
                />
              </div>
              <span className="text-lg font-semibold">{item.title}</span>
            </div>

            <div className="flex items-center space-x-4">
              <button 
                onClick={() => dispatch(decrementQuantity(item.id))}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-200"
              >
                -
              </button>
              <span className="text-lg">{item.quantity}</span>
              <button 
                onClick={() => dispatch(incrementQuantity(item.id))}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition duration-200"
              >
                +
              </button>
              <button 
              onClick={() => dispatch(removeFromCart(item.id))}
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition duration-200"
            >
              Remove
            </button>
            </div>

            <span className="text-right w-1/3 font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">Your cart is empty</p>
      )}
      <p className="font-bold mt-4 text-lg">Total: ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</p>
      <button 
        className="mt-6 w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-200" 
        onClick={handleCheckoutClick}
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default Cart;
