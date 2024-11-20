"use client"
import { useState } from 'react';
import Image from 'next/image';

export default function CarouselAd() {
  const ads = [
    {
      image: '/pic3.png',
      title: 'Special Offer 1',
      description: 'Get 50% off on all products!',
    },
    {
      image: '/pic1_1.png',
      title: 'Limited Time Deal',
      description: 'Buy one get one free!',
    },
    {
      image: '/pic2_1.png',
      title: 'New Arrivals',
      description: 'Check out the latest products now!',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Handle next and previous ads
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % ads.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + ads.length) % ads.length);
  };

  return (
    <div className="relative w-[1325px] mx-auto mt-8">
      <div className="w-full h-64 overflow-hidden rounded-lg shadow-lg">
        <img
          src={ads[currentIndex].image}
          alt={ads[currentIndex].title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="text-center mt-4">
        <h2 className="text-xl font-semibold">{ads[currentIndex].title}</h2>
        <p className="text-gray-600">{ads[currentIndex].description}</p>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-0 top-32 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-gray-700 z-40"
      >
        &#10094; {/* Left Arrow */}
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-0 top-32 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-gray-700 z-40"
      >
        &#10095; {/* Right Arrow */}
      </button>

      <div className="flex justify-center mt-4 space-x-2">
        {ads.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? 'bg-indigo-600' : 'bg-gray-300'
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
}
