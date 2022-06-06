import React from 'react';

import { Product } from '../../components/index';
import { client } from '../../lib/client';

export default function household({ products }) {
  return (
    <>
      <div className="bg-white">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>
          <h1 className="font-header text-4xl text-center text-sky-900 mb-12 md:text-6xl">
            Consumer Electronics
          </h1>

          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products?.map(
              (product) =>
                product.category === 'consumer' && (
                  <Product key={product._id} product={product} />
                )
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  return {
    props: { products },
  };
};
