import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getProducts } from '../../../../pages/product/actions';
import { getBrand } from '../../pagination/actions';

import {
  starLayout,
  starTitle,
  brandLabel,
  brandList,
} from '../styles.module.scss';

function Brand() {
  const dispatch = useDispatch();
  const { defaultUrl, rating, brand } = useSelector((state) => state.search);
  const {
    data: { items },
  } = useSelector((state) => state.products.products);
  const [brands, setBrands] = useState(null);

  useEffect(() => {
    const list = items.map((item) => item.brand);
    const filteredList = [...new Set(list)];
    setBrands(filteredList);
  }, [items]);

  useEffect(() => {
    dispatch(getProducts(`${defaultUrl}${rating}${brand}`));
  }, [defaultUrl, brand, rating, dispatch]);

  const handleChange = () => {
    let chks = document.getElementsByTagName('input');
    const selected = [];

    for (let i = 0; i < chks.length; i++) {
      if (chks[i].checked) {
        selected.push(chks[i].value);
      }
    }

    const newQuery = `&brand=${selected.join(',')}`;
    dispatch(getBrand(`${newQuery}`));
  };

  const DisplayBrands = () => {
    return (
      <ul className={brandList}>
        {(brands || []).map((item) => (
          <li key={item} className={brandLabel}>
            <input
              type="checkbox"
              name={item}
              value={item}
              id={`custom-checkbox-${item}`}
              onChange={handleChange}
              style={{ visibility: 'hidden' }}
            />
            <i
              className="fa fa-chevron-right"
              style={{ marginRight: '.5rem' }}></i>
            <label htmlFor={`custom-checkbox-${item}`} className={brandLabel}>
              {item}
            </label>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className={starLayout}>
      <span className={starTitle}>Filter Products by Brand</span>
      <DisplayBrands />
    </div>
  );
}

export default Brand;
