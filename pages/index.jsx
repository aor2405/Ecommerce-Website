import React from 'react';

import { Product, HeroBanner, SaleProduct } from '../components/index';
import { client } from '../lib/client';

export default function Home({ products, saleProducts }) {
  console.log('sale', saleProducts);
  console.log('sale2', products);
  return (
    <>
      <div className="bg-white">
        <HeroBanner />
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>
          <h1 className="text-4xl text-center mb-12">Featured Products</h1>

          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products?.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>

          <h1 className="text-4xl text-center my-12">Sale Items</h1>
          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {saleProducts?.map((product) => (
              <SaleProduct key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async () => {
  const query = '*[_type == "featuredProducts"]';
  const products = await client.fetch(query);

  const saleQuery = '*[_type == "saleItems"]';
  const saleProducts = await client.fetch(saleQuery);

  return {
    props: { products, saleProducts },
  };
};
