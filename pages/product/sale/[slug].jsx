import React, { useState } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import { Disclosure, Tab } from '@headlessui/react';
import { MinusSmIcon, PlusSmIcon } from '@heroicons/react/outline';

import { client, urlFor } from '../../../lib/client';
import { useStateContext } from '../../../context/stateContext';

const shippingReturns = {
  details: [
    {
      name: 'Shipping',
      items: [
        'Free shipping on orders over €150',
        'International shipping available',
        'Expedited shipping options',
        'Signature required upon delivery',
      ],
    },
    {
      name: 'Returns',
      items: [
        'Easy return requests',
        'Pre-paid shipping label included',
        '10% restocking fee for returns',
        '60 day return window',
      ],
    },
  ],
};

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ProductDetails({ product }) {
  const { image, name, originalPrice, salePrice, details, features } = product;

  const [index, setIndex] = useState(0);
  const { decQty, incQty, qty, onAdd } = useStateContext();

  function handleSubmit(e) {
    e.preventDefault();
    onAdd(product, qty);
  }

  function handleBuyNow(e) {
    e.preventDefault();

    onAdd(product, qty);
    Router.push('/cart');
  }

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          <Tab.Group as="div" className="flex flex-col-reverse">
            <div className="hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
              <Tab.List className="grid grid-cols-4 gap-6">
                {image.map((img, idx) => (
                  <Tab
                    key={img._key}
                    className="relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50"
                  >
                    {({ selected }) => (
                      <>
                        <span className="absolute inset-0 rounded-md overflow-hidden">
                          <img
                            src={urlFor(image && image[idx])}
                            alt="Image of the product"
                            onMouseEnter={() => setIndex(idx)}
                            className="w-full h-full object-center object-cover"
                          />
                        </span>
                        <span
                          className={classNames(
                            selected ? 'ring-sky-500' : 'ring-transparent',
                            'absolute inset-0 rounded-md ring-2 ring-offset-2 pointer-events-none'
                          )}
                          aria-hidden="true"
                        />
                      </>
                    )}
                  </Tab>
                ))}
              </Tab.List>
            </div>

            <Tab.Panels className="w-full aspect-w-1 aspect-h-1">
              {image.map((img) => (
                <Tab.Panel key={img._key}>
                  <img
                    src={urlFor(image && image[0])}
                    alt="Image of selected product"
                    className="w-full h-full object-center object-cover sm:rounded-lg"
                  />
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>

          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            <h1 className="text-3xl font-extrabold font-paragraphHeading tracking-tight text-sky-700">
              {name}
            </h1>

            <div className="mt-3 flex">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl text-gray-700 font-paragraph">
                €{salePrice}
              </p>
              <p className="text-xl text-gray-500 font-paragraph ml-4 line-through decoration-red-700">
                €{originalPrice}
              </p>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>
              <p className="text-gray-500 font-paragraph text-sm">{details}</p>

              <div
                className="text-base text-gray-700 space-y-6"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>

            <form className="mt-6">
              <div className="flex mt-3 items-center">
                <p className="mr-2 font-paragraph">Quantity:</p>
                <div className="border flex border-gray-500">
                  <div
                    className="p-2 border-r border-gray-500 cursor-pointer"
                    onClick={decQty}
                  >
                    <MinusSmIcon className="w-5 h-5" />
                  </div>
                  <div className="p-2 border-r border-gray-500">{qty}</div>
                  <div className="p-2 border-r cursor-pointer" onClick={incQty}>
                    <PlusSmIcon className="w-5 h-5" />
                  </div>
                </div>
              </div>
              <div className="mt-10 sm:flex sm:flex-col1">
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="w-40 font-paragraph text-sm mx-auto sm:mx-0 bg-sky-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-sky-500"
                >
                  Add to bag
                </button>

                <Link href="/cart">
                  <button
                    type="button"
                    onClick={handleBuyNow}
                    className="w-40 font-paragraph text-sm mx-auto mt-4 sm:mx-0 sm:ml-4 sm:mt-0 bg-white border border-sky-600 rounded-md py-3 px-8 flex items-center justify-center font-medium text-sky-600 hover:bg-gray-100 hover:border-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-sky-500 "
                  >
                    Buy now
                  </button>
                </Link>
              </div>
            </form>

            <section aria-labelledby="details-heading" className="mt-12">
              <h2 id="details-heading" className="sr-only">
                Additional details
              </h2>

              <div className="border-t divide-y divide-gray-200">
                <Disclosure as="div">
                  {({ open }) => (
                    <>
                      <h3>
                        <Disclosure.Button className="group relative w-full py-6 flex justify-between items-center text-left">
                          <span
                            className={classNames(
                              open ? 'text-sky-600' : 'text-gray-900',
                              'text-sm font-medium'
                            )}
                          >
                            Features
                          </span>
                          <span className="ml-6 flex items-center">
                            {open ? (
                              <MinusSmIcon
                                className="block h-6 w-6 text-sky-400 group-hover:text-sky-500"
                                aria-hidden="true"
                              />
                            ) : (
                              <PlusSmIcon
                                className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                aria-hidden="true"
                              />
                            )}
                          </span>
                        </Disclosure.Button>
                      </h3>
                      {features.map((feature, idx) => (
                        <Disclosure.Panel
                          key={idx}
                          as="div"
                          className="pb-2 prose prose-sm"
                        >
                          <ul role="list">
                            <li>{feature}</li>
                          </ul>
                        </Disclosure.Panel>
                      ))}
                    </>
                  )}
                </Disclosure>

                {shippingReturns.details.map((detail) => (
                  <Disclosure as="div" key={detail.name}>
                    {({ open }) => (
                      <>
                        <h3>
                          <Disclosure.Button className="group relative w-full py-6 flex justify-between items-center text-left">
                            <span
                              className={classNames(
                                open ? 'text-sky-600' : 'text-gray-900',
                                'text-sm font-medium'
                              )}
                            >
                              {detail.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusSmIcon
                                  className="block h-6 w-6 text-sky-400 group-hover:text-sky-500"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusSmIcon
                                  className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel
                          as="div"
                          className="pb-6 prose prose-sm"
                        >
                          <ul role="list">
                            {detail.items.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }`;
  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "saleItems" && slug.current == '${slug}'][0]`;
  const product = await client.fetch(query);
  try {
    if (!product) {
      return { notFound: true };
    }
    console.log('product', product);
    console.log(`Building slug: ${slug}`);
    return {
      props: { product },
    };
  } catch (err) {
    return { notFound: true };
  }
};
