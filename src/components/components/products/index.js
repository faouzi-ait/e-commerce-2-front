import React from 'react';
import ProductDisplay from './ProductDisplay';
import { container } from './styles.module.scss';

function HomeProducts({ products }) {
  return (
    <div className={container}>
      <ProductDisplay
        title="Best Selling Products"
        item={products?.bestSeller}
      />
      <ProductDisplay title="Latest Products Deals" item={products?.deals} />
      <ProductDisplay title="Featured Products" item={products?.featured} />
      <ProductDisplay title="Top Rated Products" item={products?.topRated} />
    </div>
  );
}

export default HomeProducts;
