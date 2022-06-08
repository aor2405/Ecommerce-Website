import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { urlFor } from '../lib/client';
import { useStateContext } from '../context/stateContext';

export default function Product({ product: { image, name, slug, price } }) {
  const { loadingHandler } = useStateContext();

  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div>
          <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
            <img
              src={urlFor(image && image[0])}
              layout="fill"
              onClick={loadingHandler}
              alt="product image"
              className="w-full sm:max-h-80 cursor-pointer object-center object-cover transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110"
            />
          </div>
          <h3 className="mt-4 text-sm font-paragraphHeading text-gray-700">
            {name}
          </h3>
          <p className="mt-1 text-lg font-medium font-paragraph text-gray-900">
            €{price}
          </p>
        </div>
      </Link>
    </div>
  );
}
