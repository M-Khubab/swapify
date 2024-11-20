"use client";
import { productCategories, navLinks } from '@/constant';
import { logout } from '@/redux/authslice';
import Link from 'next/link';
import { router, useRouter } from 'next/navigation';
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Header = () => {
  const userData = useSelector((state)=>state.auth.user);
  const dispatch = useDispatch();


  // States for dropdowns and user roles
  const [isOpen, setIsOpen] = useState(false);
  const [userRole, setUserRole] = useState(null); // "buyer" or "seller"
  const [openCategory, setOpenCategory] = useState(null);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  
  const dropdownRef = useRef(null);
  const userDropdownRef = useRef(null);
  const router = useRouter();

  // Toggle main category dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setOpenCategory(null);
  };

  // Toggle user dropdown menu
  const toggleUserDropdown = () => {
    setUserDropdownOpen(!userDropdownOpen);
  };

  // Handle clicks outside dropdowns to close them
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setOpenCategory(null);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClick = () =>{
      router.push("/account")  
  }

     const handleLogOut = () =>{
     dispatch(logout());
     Router.push("/login")
     }

  return (
    <div>
      <nav className=''>
        <div className='flex justify-between flex-wrap bg-blue-600 text-white p-5'>
          <div className='logo ml-5'>
            <Link href="/" className='font-bold text-2xl hover:text-green-700'>Swapify</Link>
          </div>    

          <div className='mr-72'>
            <input type="text" placeholder='What are you looking for?' className='w-[28rem] border rounded-md bg-white' />
          </div>

          {navLinks.map((item, index) => (
            <div className='mr-5 font-semibold' key={index}>
              <Link href={item.route}>{item.navlinksName}</Link>
            </div>
          ))}
           <div className='flex justify-end pr-5'>
        <div className="relative" ref={userDropdownRef}>
        {userData == null || userData == undefined ? (
<>
<button
            onClick={toggleUserDropdown}
            className="inline-flex items-center bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
          >
            Profile
            <svg className={`ml-2 h-5 w-5 transform transition-transform ${userDropdownOpen ? 'rotate-180' : 'rotate-0'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.292 7.707a1 1 0 011.414 0L10 11l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
</>
              ):(

              
       
          <button
          onClick={toggleUserDropdown}
          className="inline-flex items-center bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
        >
        Hi {userData.name}
          <svg className={`ml-2 h-5 w-5 transform transition-transform ${userDropdownOpen ? 'rotate-180' : 'rotate-0'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.292 7.707a1 1 0 011.414 0L10 11l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
)}
          {userDropdownOpen && (
            <div className="absolute right-0 mt-7 w- bg-white rounded-md shadow-lg z-50">
  

                <button className="block px-4 py-2 text-gray-700 hover:bg-gray-200" onClick={handleClick}>Accounts</button>
  

              <Link href="/settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Settings</Link>

              {/* {userRole === "seller" ? (
                <>
                  <Link href="/seller/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Dashboard</Link>
                  <Link href="/seller/products" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">My Products</Link>
                  <Link href="/seller/orders" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Sales History</Link>
                </>
              ) : userRole === "buyer" ? (
                <>
                  <Link href="/buyer/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Dashboard</Link>
                  <Link href="/buyer/orders" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">My Orders</Link>
                  <Link href="/buyer/wishlist" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Wishlist</Link>
                </>
              ) : null} */}

              <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200" onClick={handleLogOut}>Logout</button>
            </div>
          )}
        </div>
      </div>
        </div>
      </nav>
      
      {/* Main Categories Dropdown */}
      <nav>
        <div className='border pt-2 flex text-blue-800'>
          <div className="relative inline-block text-left" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="inline-flex justify-center w-full px-4 py-2 bg-indigo-600 text-white text-lg font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Categories
              <svg className={`ml-2 h-5 w-5 transform transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.292 7.707a1 1 0 011.414 0L10 11l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          {/* Render Product Categories */}
          {productCategories.map((item, index) => (
            <div className='ml-32 pt-2 flex w-[72rem] justify-between font-semibold' key={index}>
              <Link href={item.route}>{item.categoryName}</Link>
            </div>
          ))}
        </div>
      </nav>

      {/* User Profile Dropdown */}
     
    </div>
  );
};

export default Header;
