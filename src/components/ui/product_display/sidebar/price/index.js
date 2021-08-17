import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPrice } from '../../pagination/actions';

import {
  starLayout,
  starTitle,
  titleBottomMargin,
  priceBottomMargin,
  brandLabel,
  priceLimitColor,
  clear
} from '../styles.module.scss';

function Price() {
  const dispatch = useDispatch();
  const prices = [100, 200, 300, 400];
  const { pricing } = useSelector((state) => state?.search);

  const pricingFormat = pricing.split('=')[1];

  return (
    <div className={`${starLayout} ${priceBottomMargin}`}>
      <span className={`${starTitle} ${titleBottomMargin}`}>Price Limit</span>
      {prices.map((item) => (
        <li key={item} style={{ listStyle: 'none', marginBottom: '.5rem' }}>
          <label>
            <input
              type="radio"
              name="price"
              value={item}
              id={`custom-radio-${item}`}
              style={{ visibility: 'hidden' }}
              onChange={() => {
                if (item === 400) {
                  dispatch(getPrice(`&price[gte]=${item}`));
                } else {
                  dispatch(getPrice(`&price[lte]=${item}`));
                }
              }}
            />
            <i
              className="fa fa-chevron-right"
              style={{ marginRight: '.5rem' }}></i>
            <span
              className={`${brandLabel} ${
                parseInt(pricingFormat) === item && priceLimitColor
              }`}>
              {item}$
            </span>
          </label>
        </li>
      ))}
      {pricing && (
        <div onClick={() => dispatch(getPrice(''))} className={clear}>
          <i className="fa fa-chevron-left"></i> Clear Filter
        </div>
      )}
    </div>
  );
}

export default Price;
