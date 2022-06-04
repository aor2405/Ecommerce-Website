import React, { Fragment, useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Popover } from '@headlessui/react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { SearchIcon, ShoppingCartIcon } from '@heroicons/react/outline';
import toast from 'react-hot-toast';

import { useStateContext } from '../context/stateContext';
import { client } from '../lib/client';

const navigation = [
  { name: 'Household Appliances', href: 'household' },
  { name: 'Consumer Electronics', href: 'general' },
  { name: 'Sale Products', href: 'sale' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
  const [searchData, setSearchData] = useState('');
  const { totalQuantities, loadingHandler } = useStateContext();

  function changeHandler(e) {
    const value = e.target.value;
    setSearchData({
      [e.target.name]: value,
    });
  }

  const searchBar = async (productName) => {
    try {
      const query = '*[_type == "product"]';
      const product = await client.fetch(query);
      for (let i = 0; i < product.length; i++) {
        if (
          product[i].name
            .toLowerCase()
            .includes(productName.search.toLowerCase())
        ) {
          const newProduct = product[i];
          toast.loading('Product found', {
            duration: 2000,
          });
          return Router.push(`/product/${newProduct.slug.current}`);
        }
      }
      toast.error('No product found');
    } catch (err) {
      console.log(err.message);
    }
  };

  function onKeyDownHandler(e) {
    if (e.keyCode === 13) {
      searchBar(searchData);
    }
  }

  return (
    <div className="bg-white">
      <header className="relative bg-white">
        <nav aria-label="Top" className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="border-b border-gray-200 px-4 pb-14 sm:px-0 sm:pb-0">
            <div className="h-16 flex items-center justify-between">
              <div className="flex-1 flex">
                <Link href="/">
                  <a onClick={loadingHandler}>
                    <span className="sr-only">Workflow</span>
                    <p>Rye River Electronics</p>
                  </a>
                </Link>
              </div>

              <Popover.Group className="absolute bottom-0 inset-x-0 sm:static sm:flex-1 sm:self-stretch">
                <div className="border-t h-14 px-4 flex space-x-8 overflow-x-auto pb-px sm:h-full sm:border-t-0 sm:justify-center sm:overflow-visible sm:pb-0">
                  <Link href="/products">
                    <a
                      className="flex items-center text-xl font-medium text-gray-700 hover:text-gray-800"
                      onClick={loadingHandler}
                    >
                      All Products
                    </a>
                  </Link>
                  <Menu as="div" className="relative inline-block text-left">
                    <div class="group relative dropdown cursor-pointer text-base">
                      <Menu.Button className="inline-flex group relative dropdown justify-center py-4 bg-white text-xl text-gray-700 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                        Categories
                        <ChevronDownIcon
                          className="-mr-1 ml-2 mt-1 h-5 w-5"
                          aria-hidden="true"
                        />
                      </Menu.Button>

                      <div class="group-hover:block dropdown-menu absolute hidden h-auto">
                        <div class="top-0 w-60 bg-gray-50 relative z-50 shadow px-6 py-8">
                          {navigation.map((item) => (
                            <Link key={item.name} href={item.href}>
                              <p
                                class="block cursor-pointer border-b-2 text-lg hover:text-xl"
                                onClick={loadingHandler}
                              >
                                {item.name}
                              </p>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Menu>
                </div>
              </Popover.Group>

              <div className="flex-1 flex items-center justify-end">
                <div className="flex-1 flex items-center justify-center px-2 lg:ml-6 lg:justify-end">
                  <div
                    className="max-w-lg w-full lg:max-w-xs"
                    onKeyDown={onKeyDownHandler}
                  >
                    <label htmlFor="search" className="sr-only">
                      Search
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SearchIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </div>
                      <input
                        id="search"
                        name="search"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Search"
                        type="search"
                        onChange={changeHandler}
                      />
                    </div>
                  </div>
                </div>

                <div className="ml-4 flow-root lg:ml-8">
                  <Link href="/cart">
                    <a className="group -m-2 p-2 flex items-center">
                      <ShoppingCartIcon
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
