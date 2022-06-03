import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBagIcon } from '@heroicons/react/solid';

import { useStateContext } from '../context/stateContext';

export default function Success() {
  const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();

  useEffect(() => {
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
  }, []);

  return (
    <>
      <div className="max-w-3xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <div className="bg-gray-200 rounded-2xl px-6 py-16 sm:p-16 text-center">
          <ShoppingBagIcon
            className="flex-shrink-0 h-12 w-12 text-green-500 mx-auto"
            aria-hidden="true"
          />
          <h1 className="text-5xl font-extrabold my-4">Order cancelled</h1>
          <p>
            Please feel free to continue browsering through our other products
          </p>
          <Link href="/">
            <a class="relative inline-flex items-center mt-4 px-12 py-3 overflow-hidden text-lg font-medium text-indigo-600 border-2 border-indigo-600 rounded-full hover:text-white group hover:bg-gray-50">
              <span class="absolute left-0 block w-full h-0 transition-all bg-indigo-600 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
              <span class="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </span>
              <span class="relative">Continue shopping</span>
            </a>
          </Link>
        </div>
      </div>
    </>
  );
}
