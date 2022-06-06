import React, { useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Disclosure, Menu, Popover } from '@headlessui/react';
import { SearchIcon, ChevronDownIcon } from '@heroicons/react/solid';
import { MenuIcon, XIcon, ShoppingCartIcon } from '@heroicons/react/outline';
import toast from 'react-hot-toast';

import { useStateContext } from '../context/stateContext';
import { client } from '../lib/client';

const navigation = [
  { name: 'Household Appliances', href: '/products/household' },
  { name: 'Consumer Electronics', href: '/products/consumer' },
  { name: 'Sale Products', href: '/products/sale' },
  { name: 'Cart', href: '/cart' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function NavBar() {
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
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="sm:border-b border-sky-500 px-4 sm:px-0 ">
              <div className="h-16 flex items-center justify-between ">
                <div className="flex items-center sm:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>

                <div className="flex-1 flex invisible sm:visible">
                  <Link href="/">
                    <a onClick={loadingHandler}>
                      <span className="sr-only">Workflow</span>
                      <p>Rye River Electronics</p>
                    </a>
                  </Link>
                </div>

                <Popover.Group className="absolute bottom-0 inset-x-0  sm:static sm:flex-1 sm:self-stretch invisible sm:visible">
                  <div className="flex justify-start space-x-8 overflow-x-auto sm:h-full sm:items-center sm:overflow-visible sm:pb-0">
                    <Link href="/products">
                      <a
                        className="flex items-center text-xl font-medium text-gray-700 hover:text-gray-800"
                        onClick={loadingHandler}
                      >
                        All Products
                      </a>
                    </Link>
                    <Menu as="div" className="relative inline-block text-left">
                      <div className="group relative dropdown cursor-pointer text-base">
                        <Menu.Button className="inline-flex group relative dropdown justify-center pt-3 sm:py-4 bg-white text-xl text-gray-700 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-sky-500">
                          Categories
                          <ChevronDownIcon
                            className="-mr-1 ml-2 sm:mt-1 h-5 w-5"
                            aria-hidden="true"
                          />
                        </Menu.Button>

                        <div className="group-hover:block dropdown-menu absolute hidden h-auto">
                          <div className="top-0 w-60 bg-gray-50 relative z-50 shadow px-6 py-8">
                            {navigation.map((item) => (
                              <Link key={item.name} href={item.href}>
                                <p
                                  className="block cursor-pointer border-b-2 text-lg hover:text-xl"
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
                <div className="flex items-center justify-end px-2 lg:ml-6">
                  <div className="max-w-lg w-full lg:max-w-xs">
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
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                        placeholder="Search"
                        type="search"
                      />
                    </div>
                  </div>

                  <div className="invisible sm:visible flow-root sm:ml-4 lg:ml-8">
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

            <Disclosure.Panel className="lg:hidden">
              <div className="pt-2 pb-3 space-y-1">
                <Link href="/products">
                  <Disclosure.Button
                    as="a"
                    className="bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                  >
                    All Products
                  </Disclosure.Button>
                </Link>

                {navigation.map((item) => (
                  <Link key={item.name} href={item.href}>
                    <Disclosure.Button
                      as="a"
                      className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                    >
                      {item.name}
                    </Disclosure.Button>
                  </Link>
                ))}
              </div>
            </Disclosure.Panel>
          </div>
        </>
      )}
    </Disclosure>
  );
}
