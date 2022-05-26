import React from 'react';
import Link from 'next/link';
import { Popover, Transition } from '@headlessui/react';
import { SearchIcon, ShoppingBagIcon } from '@heroicons/react/outline';

import Cart from './Cart';
import { useStateContext } from '../context/stateContext';

const navigation = [
  { name: 'All Products', href: '/products' },
  { name: 'Stores', href: '#' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
  const { showCart, setShowCart, totalQuantities } = useStateContext();

  return (
    <div className="bg-white">
      <header className="relative bg-white">
        <nav aria-label="Top" className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="border-b border-gray-200 px-4 pb-14 sm:px-0 sm:pb-0">
            <div className="h-16 flex items-center justify-between">
              <div className="flex-1 flex">
                <Link href="/">
                  <a>
                    <span className="sr-only">Workflow</span>
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600"
                      alt=""
                    />
                  </a>
                </Link>
              </div>

              <Popover.Group className="absolute bottom-0 inset-x-0 sm:static sm:flex-1 sm:self-stretch">
                <div className="border-t h-14 px-4 flex space-x-8 overflow-x-auto pb-px sm:h-full sm:border-t-0 sm:justify-center sm:overflow-visible sm:pb-0">
                  {navigation.map((item) => (
                    <Link key={item.name} href={item.href}>
                      <a className="flex items-center text-xl font-medium text-gray-700 hover:text-gray-800">
                        {item.name}
                      </a>
                    </Link>
                  ))}
                </div>
              </Popover.Group>

              <div className="flex-1 flex items-center justify-end">
                <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Search</span>
                  <SearchIcon className="w-6 h-6" aria-hidden="true" />
                </a>

                <div className="ml-4 flow-root lg:ml-8">
                  <Link href="/cart">
                    <a className="group -m-2 p-2 flex items-center">
                      <ShoppingBagIcon
                        className="flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                      <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                        {totalQuantities}
                      </span>
                      <span className="sr-only">items in cart, view bag</span>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
