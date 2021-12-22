import React from 'react';
import * as cmpStyle from '../../components/product_display/sidebar/styles.module.scss';
import * as localCmpStyle from './styles.module.scss';

function Price({ searchPrice, setSearchPrice, setSearchPage }) {
  const prices = [100, 200, 300, 400];

  return (
    <div
      className={`${cmpStyle.starLayout} ${cmpStyle.priceBottomMargin} ${localCmpStyle.marginTop}`}>
      <span className={`${cmpStyle.starTitle} ${cmpStyle.titleBottomMargin}`}>
        Price Limit
      </span>
      {prices.map((item) => (
        <li key={item} style={{ listStyle: 'none', marginBottom: '.5rem' }}>
          <label
            className={`${cmpStyle.brandLabel} ${
              searchPrice === item && cmpStyle.priceLimitColor
            }`}
            onClick={() => {
              setSearchPage(1);
              setSearchPrice(item);
            }}>
            <i
              className="fa fa-chevron-right"
              style={{ marginRight: '.5rem' }}></i>
            ${item}
          </label>
        </li>
      ))}
      {searchPrice !== null && (
        <div onClick={() => setSearchPrice(null)} className={cmpStyle.clear}>
          <i className="fa fa-chevron-left"></i> Clear Filter
        </div>
      )}
    </div>
  );
}

export default Price;
