import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { starLayout, starTitle } from '../styles.module.scss';

function Brand() {
  const {
    data: { items },
  } = useSelector((state) => state.products.products);
  const [brands, setBrands] = useState(null);

  useEffect(() => {
    const list = items.map((item) => item.brand);
    const filteredList = [...new Set(list)];
    setBrands(filteredList);
  }, [items]);

  console.log(brands);

  const DisplayBrands = () => {
    return <div>Brands</div>;
  };

  return (
    <div className={starLayout}>
      <span className={starTitle}>Filter Products by Brand</span>
      <DisplayBrands />
    </div>
  );
}

export default Brand;
