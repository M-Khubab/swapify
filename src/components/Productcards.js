"use client"
import Link from 'next/link';
import { db } from '@/firebase';
import { collection, getDocs } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { addToCart } from '@/redux/cartSlice';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';

const Card = ({ id, title, price, imageUrl, brand, description }) => {
    const dispatch = useDispatch();
  const router = useRouter();

  const handleAddToCart = () => {
    dispatch(addToCart({ id, title, price, imageUrl, brand }));

  };
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col cursor-pointer hover:shadow-xl transition">
        <Link href={`/product/${id}`}>
        <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
        <div className="p-4 flex-grow">
          <h3 className="text-xl font-bold">{title}</h3>
          <p className="text-gray-700 mb-2">{description}</p>
          <p className="text-gray-500 mb-1">${price}</p>
          <p className="text-gray-400 text-sm">{brand}</p>
        </div>
    </Link>
        <button className="bg-blue-500 text-white py-2 rounded-b-lg hover:bg-blue-600" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
  );
};

const ProductGrid = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const productsCollection = collection(db, 'products');
      const productSnapshot = await getDocs(productsCollection);
      const productList = productSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productList);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {products.map((product) => (
        <Card key={product.id} {...product} />
      ))}
    </div>
  );
};

export default ProductGrid;
