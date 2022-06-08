import React, { useRef } from 'react';
import Link from 'next/link';
import {
  MinusSmIcon,
  PlusSmIcon,
  EmojiSadIcon,
} from '@heroicons/react/outline';
import toast from 'react-hot-toast';

import { useStateContext } from '../../context/stateContext';
import { urlFor } from '../../lib/client';
import getStripe from '../../lib/getStripe';
import StripeLogo from '../../public/StripeLogo';

import {
  CheckIcon,
  QuestionMarkCircleIcon,
  XIcon,
} from '@heroicons/react/solid';

export default function Cart() {
  const cartRef = useRef();

  const {
    totalPrice,
    cartItems,
    onRemove,
    toggleCartItemQuantity,
    loadingHandler,
  } = useStateContext();

  if (typeof window !== 'undefined') {
    const cartProducts = JSON.parse(localStorage.getItem('cart'));
  }

  const handleCheckout = async (e) => {
    e.preventDefault();

    const stripe = await getStripe();

    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItems),
    });

    if (response.statusCode === 500) return;

    const data = await response.json();

    toast.loading('Redirecting...');

    stripe.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <div className="bg-white" ref={cartRef}>
      <div className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-extrabold font-header tracking-tight text-gray-900 sm:text-4xl">
          Shopping Cart
        </h1>

        <form className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
          {cartItems.length < 1 && (
            <div className="col-span-7 col-start-4">
              <div className="sm:px-6 lg:px-8">
                <div className="bg-gray-200 rounded-2xl px-6 py-16 sm:p-16 text-center">
                  <EmojiSadIcon className="mx-auto w-12 h-12 text-sky-600" />
                  <p className="font-black text-3xl my-2">
                    Your cart is currently empty
                  </p>

                  <Link href="/">
                    <a
                      className="relative inline-flex items-center mt-4 px-12 py-3 overflow-hidden text-lg font-medium text-sky-800 border-2 border-sky-600 rounded-full hover:text-white group hover:bg-gray-50"
                      onClick={loadingHandler}
                    >
                      <span className="absolute left-0 block w-full h-0 transition-all bg-sky-600 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                      <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          ></path>
                        </svg>
                      </span>
                      <span className="relative">Keep shopping</span>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          )}

          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>

            {cartItems?.map((item) => (
              <ul
                key={item._id}
                role="list"
                className="border-t border-b border-gray-200 divide-y divide-gray-200"
              >
                <li className="flex py-6 sm:py-10">
                  <div className="flex-shrink-0">
                    <img
                      src={urlFor(item?.image[0])}
                      alt="Image of product"
                      className="w-24 h-24 rounded-md object-center object-cover sm:w-48 sm:h-48"
                    />
                  </div>

                  <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                      <div>
                        <div className="flex justify-between"></div>
                        <p className="mt-1 text-sm font-medium font-paragraphHeading text-gray-900">
                          {item.name}
                        </p>
                        {item.price ? (
                          <p className="mt-1 text-sm font-medium font-paragraph text-gray-900">
                            €{item.price}
                          </p>
                        ) : (
                          <p className="mt-1 text-sm font-medium font-paragraph text-gray-900">
                            €{item.salePrice}
                          </p>
                        )}
                      </div>

                      <div className="flex mt-3 items-center">
                        <p className="mr-2">Quantity:</p>
                        <div className="border flex border-gray-500">
                          <div
                            className="p-2 border-r border-gray-500 cursor-pointer"
                            onClick={() =>
                              toggleCartItemQuantity(item._id, 'dec')
                            }
                          >
                            <MinusSmIcon className="w-5 h-5" />
                          </div>
                          <div className="p-2 border-r border-gray-500">
                            {item.quantity}
                          </div>
                          <div
                            className="p-2 border-r cursor-pointer"
                            onClick={() =>
                              toggleCartItemQuantity(item._id, 'inc')
                            }
                          >
                            <PlusSmIcon className="w-5 h-5 " />
                          </div>
                        </div>

                        <div className="absolute top-0 right-0">
                          <button
                            type="button"
                            onClick={() => onRemove(item)}
                            className="-m-2 p-2 inline-flex text-gray-400 hover:text-gray-500"
                          >
                            <span className="sr-only">Remove</span>
                            <XIcon className="h-5 w-5" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                      <p className="mt-4 flex text-sm text-gray-700 space-x-2">
                        <CheckIcon
                          className="flex-shrink-0 h-5 w-5 text-green-500"
                          aria-hidden="true"
                        />
                        <span>In stock </span>
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            ))}
          </section>

          {cartItems.length >= 1 && (
            <section
              aria-labelledby="summary-heading"
              className="mt-16 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5"
            >
              <h2
                id="summary-heading"
                className="text-lg font-medium text-gray-900"
              >
                Order summary
              </h2>

              <dl className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-600">Subtotal</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    €{totalPrice}
                  </dd>
                  {console.log(totalPrice)}
                </div>
                <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                  <dt className="flex items-center text-sm text-gray-600">
                    <span>Shipping estimate</span>
                    <a
                      href="#"
                      className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">
                        Learn more about how shipping is calculated
                      </span>
                      <QuestionMarkCircleIcon
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </a>
                  </dt>
                  {totalPrice > 150 ? (
                    <dd className="text-sm font-medium text-gray-900">Free</dd>
                  ) : (
                    <dd className="text-sm font-medium text-gray-900">
                      €15.00
                    </dd>
                  )}
                </div>

                <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                  <dt className="text-base font-medium text-gray-900">
                    Order total
                  </dt>
                  {totalPrice > 150 ? (
                    <dd className="text-sm font-medium text-gray-900">
                      €{totalPrice}
                    </dd>
                  ) : (
                    <dd className="text-sm font-medium text-gray-900">
                      €{totalPrice + 15}
                    </dd>
                  )}
                </div>
              </dl>

              <div className="mt-6">
                <button
                  type="submit"
                  onClick={handleCheckout}
                  className="w-full flex justify-center bg-sky-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-sky-500"
                >
                  <div className="flex items-center">
                    Pay with
                    <StripeLogo />
                  </div>
                </button>
              </div>
            </section>
          )}
        </form>
      </div>
    </div>
  );
}
