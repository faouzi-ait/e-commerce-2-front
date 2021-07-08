import React from 'react';
import ProductDisplay from './ProductDisplay';
import { container } from './styles.module.scss';

function HomeProducts({ products }) {
  const { bestSeller, deals, featured, topRated } = products;
  console.log(featured);
  return (
    <div className={container}>
      <ProductDisplay title="Best Selling Products" item={bestSeller} />
      <ProductDisplay title="Latest Products Deals" item={deals} />
      <ProductDisplay title="Featured Products" item={featured} />
      <ProductDisplay title="Top Rated Products" item={topRated} />
    </div>
  );
}

export default HomeProducts;
