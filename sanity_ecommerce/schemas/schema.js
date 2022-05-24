import createSchema from 'part:@sanity/base/schema-creator';
import schemaTypes from 'all:part:@sanity/base/schema-type';

import product from './product';
import saleItems from './saleItems';
import featuredProducts from './featuredProducts';

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([product, saleItems, featuredProducts]),
});
