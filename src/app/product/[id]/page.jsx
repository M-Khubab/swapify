"use client";

import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import { useParams } from 'next/navigation'; 

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        const productDoc = await getDoc(doc(db, 'products', id));
        if (productDoc.exists()) {
          setProduct(productDoc.data());
        } else {
          console.error("Product not found!");
        }
      };
      fetchProduct();
    }
  }, [id]);

  if (!product) return <p className="text-center text-gray-600">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.title}</h1>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Product Image */}
        <div className="flex-1">
          <img 
            src={product.imageUrl} 
            alt={product.title} 
            className="w-full h-auto rounded-lg object-cover shadow-lg" 
          />
        </div>

        {/* Product Details */}
        <div className="flex-1 space-y-4">
          <p className="text-2xl font-semibold text-green-600">${product.price}</p>
          <p className="text-md text-gray-700 leading-relaxed">{product.description}</p>
          <button className="mt-4 bg-blue-600 text-white font-medium px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
