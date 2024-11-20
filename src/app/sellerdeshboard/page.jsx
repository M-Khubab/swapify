// SellerDashboard.js
"use client"
import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useSelector } from "react-redux";

const SellerDashboard = () => {
  const [accountInfo, setAccountInfo] = useState({});
  const [salesData, setSalesData] = useState([]);
  const userData = useSelector((state)=>state.auth.user)
console.log(userData,"sss")

  return (
    <div className="min-h-screen flex bg-gray-100 mt-20">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-700 text-white flex flex-col">
        <div className="p-6 text-center">
          <h1 className="text-2xl font-bold">Seller Dashboard {userData?.name}</h1>
        </div>
        <nav className="flex-1 p-6 space-y-4">
          <a href="#" className="block px-4 py-2 rounded hover:bg-blue-600">
            Dashboard Overview
          </a>
          <a href="#" className="block px-4 py-2 rounded hover:bg-blue-600">
            Account Info
          </a>
          <a href="#" className="block px-4 py-2 rounded hover:bg-blue-600">
            Sales Data
          </a>
          <a href="#" className="block px-4 py-2 rounded hover:bg-blue-600">
            Settings
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-semibold text-gray-800">Welcome, Seller</h2>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500">
            Log Out
          </button>
        </header>

        {/* Account Information Card */}
        <section className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Account Information</h3>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(accountInfo).map(([key, value], index) => (
              <div key={index} className="text-gray-700">
                <strong className="capitalize">{key.replace(/([A-Z])/g, " $1")}: </strong>
                <span>{value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Sales Data Table */}
        <section className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Sales Data</h3>
          {salesData.length > 0 ? (
            <table className="min-w-full bg-white border">
              <thead>
                <tr>
                  <th className="py-2 px-4 bg-gray-100 border-b text-left text-gray-600 font-semibold">Product</th>
                  <th className="py-2 px-4 bg-gray-100 border-b text-left text-gray-600 font-semibold">Amount</th>
                  <th className="py-2 px-4 bg-gray-100 border-b text-left text-gray-600 font-semibold">Date</th>
                </tr>
              </thead>
              <tbody>
                {salesData.map((sale, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2 px-4 text-gray-800">{sale.productName}</td>
                    <td className="py-2 px-4 text-green-600 font-semibold">${sale.amount}</td>
                    <td className="py-2 px-4 text-gray-500">{sale.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-600">No sales data available.</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default SellerDashboard;
