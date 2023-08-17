import React from 'react';
import { useDispatch } from 'react-redux';
import { getPrice, getPage } from '../../pagination/actions';
import * as cmpStyle from '../styles.module.scss';

function Price({ pricing }) {
  const dispatch = useDispatch();
  const prices = [100, 200, 300, 400];

  const pricingFormat = pricing?.split('=')[1];

  return (
    <section className={`${cmpStyle.starLayout} ${cmpStyle.priceBottomMargin}`}>
      <h4
        tabIndex={0}
        aria-label="Price Limit"
        className={`${cmpStyle.starTitle} ${cmpStyle.titleBottomMargin}`}>
        Price Limit
      </h4>

      <ul style={{ margin: 0, padding: 0, marginLeft: '-22px' }}>
        {prices.map((item) => (
          <li key={item} className="price-list-style">
            
            <button
              type="button"
              style={{ border: 0, background: 'none' }}
              onClick={() => {
                if (item === 400) {
                  dispatch(getPage(1));
                  dispatch(getPrice(`&price[gte]=${item}`));
                } else {
                  dispatch(getPage(1));
                  dispatch(getPrice(`&price[lte]=${item}`));
                }
              }}>
              <p
                aria-label={`price filter ${
                  item === 400 ? 'above' : 'below'
                } ${item} dollars`}
                className={`${cmpStyle.priceLabel} ${
                  parseInt(pricingFormat) === item && cmpStyle.priceLimitColor
                }`}>
                <i className="fa fa-chevron-right brand-visibility-margin"></i>
                {item}$
              </p>
            </button>

          </li>
        ))}
      </ul>

      {pricing !== '' && (
        <button
          type="button"
          className={cmpStyle.clear}
          aria-label="Clear price filter"
          onClick={() => dispatch(getPrice(''))}>
          <i className="fa fa-chevron-left"></i> Clear Filter
        </button>
      )}
    </section>
  );
}

export default Price;
