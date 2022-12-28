import React from 'react';
import { useDispatch } from 'react-redux';
import { getPrice, getPage } from '../../pagination/actions';
import * as cmpStyle from '../styles.module.scss';

function Price({ pricing }) {
  const dispatch = useDispatch();
  const prices = [100, 200, 300, 400];

  const pricingFormat = pricing?.split('=')[1];

  return (
    <div className={`${cmpStyle.starLayout} ${cmpStyle.priceBottomMargin}`}>
      <span className={`${cmpStyle.starTitle} ${cmpStyle.titleBottomMargin}`}>
        Price Limit
      </span>
      {prices.map((item) => (
        <li key={item} className="price-list-style">
          <label>
            <input
              type="radio"
              name="price"
              value={item}
              id={`custom-radio-${item}`}
              className="brand-visibility-margin brand-visibility"
              onChange={() => {
                if (item === 400) {
                  dispatch(getPage(1));
                  dispatch(getPrice(`&price[gte]=${item}`));
                } else {
                  dispatch(getPage(1));
                  dispatch(getPrice(`&price[lte]=${item}`));
                }
              }}
            />
            <i className="fa fa-chevron-right brand-visibility-margin"></i>
            <span
              className={`${cmpStyle.brandLabel} ${
                parseInt(pricingFormat) === item && cmpStyle.priceLimitColor
              }`}>
              {item}$
            </span>
          </label>
        </li>
      ))}
      {pricing !== '' && (
        <div onClick={() => dispatch(getPrice(''))} className={cmpStyle.clear}>
          <i className="fa fa-chevron-left"></i> Clear Filter
        </div>
      )}
    </div>
  );
}

export default Price;
