import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getBrand, getPage } from '../../pagination/actions';

import {
  starLayout,
  starTitle,
  brandLabel,
  brandLabelDisplay,
  brandList,
  clear,
  clearMargin
} from '../styles.module.scss';

function Brand() {
  const dispatch = useDispatch();
  const [brands, setBrands] = useState(null);
  const { data } = useSelector((state) => state?.products?.products);
  const { brand } = useSelector((state) => state.search);

  useEffect(() => {
    const list = data.items.map((item) => item.brand);
    const filteredList = [...new Set(list)];
    setBrands(filteredList);
  }, [data]);

  const handleChange = (e) => {
    let chks = document.getElementsByTagName('input');
    const selected = [];

    for (let i = 0; i < chks.length; i++) {
      if (chks[i].checked) {
        selected.push(chks[i].value);
      }
    }

    dispatch(getPage(1));
    dispatch(getBrand(`&brand=${e.target.value}`));
    // dispatch(getBrand(`&brand=${selected.join(',')}`));
  };

  const DisplayBrands = () => {
    return (
      <ul className={brandList}>
        {(brands || []).map((item) => (
          <li key={item} className={`${brandLabelDisplay} ${brandLabel}`}>
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
            <label
              htmlFor={`custom-checkbox-${item}`}
              className={`${brandLabelDisplay} ${brandLabel}`}>
              {item}
            </label>
          </li>
        ))}
        {brand && (
          <div
            onClick={() => dispatch(getBrand(''))}
            className={`${clear} ${clearMargin}`}>
            <i className="fa fa-chevron-left"></i> Clear Filter
          </div>
        )}
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
