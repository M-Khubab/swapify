// components/Checkout.js
"use client";
import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { saveOrderToFirestore } from "../services/firebaseservices";
import Image from "next/image";
import { incrementQuantity,decrementQuantity } from "@/redux/cartSlice";
import {auth} from "@/redux/userInfoSlice";

const Checkout = () => {
    const cartItems = useSelector((state) => state.cart) || [];
    const auth = useSelector((state)=> state.auth.user)
    const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const router = useRouter();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
        paymentMethod: "creditCard",
    });
    // Update formData with auth information when the component mounts
    useEffect(() => {
      if (auth) {
          setFormData({
              name: auth.name || "",
              email: auth.email || "",
              address: auth.address || "",
              paymentMethod: "creditCard",
          });
      }
  }, [auth]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        // Save order to Firestore
        router.push("/account");
        await saveOrderToFirestore({
            ...formData,
            items: cartItems,
            total: cartTotal
        });
    };
    // Example usage: updating user info
  const updateUserInfo = (newInfo) => {
    dispatch(setUserInfo(newInfo));
  };


    return (
        <div className="checkout-page bg-gray-100 min-h-screen p-8">
            <h1 className="text-3xl font-bold text-center mb-8">Checkout</h1>
            
            <div className="cart-items bg-white p-6 rounded-lg shadow-lg mb-8">
                <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
                {cartItems.map((item) => (
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
                    </div>
        
                    <span className="text-right w-1/3 font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
            </div>
            
            <form className="bg-white p-6 rounded-lg shadow-lg mb-8" onSubmit={handlePlaceOrder}>
                <h2 className="text-2xl font-semibold mb-4">Shipping Details</h2>
                
                <input 
                    className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    type="text" 
                    name="name" 
                    placeholder="Full Name" 
                    value={formData.name} 
                    onChange={handleInputChange} 
                    required 
                />
                
                <input 
                    type="email" 
                    name="email" 
                    placeholder="Enter Email" 
                    value={formData.email} 
                    onChange={handleInputChange} 
                    required 
                    className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
                
                <input 
                    type="text" 
                    name="address" 
                    placeholder="Enter Address" 
                    value={formData.address} 
                    onChange={handleInputChange} 
                    required 
                    className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
                
                <button 
                    type="submit"
                    className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
                >
                    Place Order
                </button>
            </form>
        </div>
    );
};

export default Checkout;
