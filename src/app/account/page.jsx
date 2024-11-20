"use client"
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { db } from '@/firebase'; // Adjust based on your file structure
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const page = () => {
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const userId = useSelector((state) => state.user.id); // Assuming you store user ID in Redux

  useEffect(() => {
    const fetchPurchases = async () => {
      const docRef = doc(db, "purchaseHistory", userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setPurchaseHistory(docSnap.data().purchases);
      } else {
        console.log("No purchase history found!");
      }
    };
    fetchPurchases();
  }, [userId]);

  const deletePurchase = async (purchaseId) => {
    const docRef = doc(db, "purchaseHistory", userId);
    const updatedPurchases = purchaseHistory.filter((purchase) => purchase.id !== purchaseId);
    setPurchaseHistory(updatedPurchases);
    await updateDoc(docRef, {
      purchases: updatedPurchases,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Your Purchase History</h2>
      {purchaseHistory.length > 0 ? (
        purchaseHistory.map((purchase) => (
          <div key={purchase.id} className="flex items-center justify-between bg-white p-4 mb-4 rounded-lg shadow-sm border border-gray-200">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{purchase.title}</h3>
              <p className="text-gray-600">Quantity: {purchase.quantity}</p>
              <p className="text-gray-600">Price: ${purchase.price}</p>
              <p className="text-gray-500 text-sm">Purchased on: {new Date(purchase.purchaseDate).toLocaleDateString()}</p>
            </div>
            <button
              onClick={() => deletePurchase(purchase.id)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
            >
              Delete
            </button>
          </div>
        ))
      ) : (
        <p className="text-gray-600">You have no purchase history.</p>
      )}
    </div>
  );
};

export default page;
