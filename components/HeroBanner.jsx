import React from 'react';
import { ChevronDownIcon } from '@heroicons/react/outline';

export default function HeroBanner() {
  const handleClick = () => {
    document
      .getElementById('firstProduct')
      .scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <div className="relative  bg-gray-900 rounded-3xl mx-2 xl:mx-auto xl:max-w-7xl">
        <div
          aria-hidden="true"
          className="absolute inset-0 overflow-hidden rounded-3xl"
        >
          <img
            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070"
            alt="Promo banner of headphones"
            className="w-full h-full object-center object-cover"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gray-900 opacity-50 rounded-3xl"
        />
        <div className="relative max-w-xl py-32 px-6 flex flex-col items-center text-center sm:py-64 lg:px-2">
          <h1 className="text-4xl font-header tracking-tight text-white lg:text-6xl">
            Rye River Electronics
          </h1>
          <p className="mt-4 text-lg font-paragraph text-white">
            Please explore our wide range of household and consumer electronics.
          </p>
          <ChevronDownIcon
            className="text-white w-16 h-16 animate-bounce cursor-pointer"
            onClick={handleClick}
          />
        </div>
      </div>
    </>
  );
}
