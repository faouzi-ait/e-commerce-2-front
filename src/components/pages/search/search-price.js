import React from 'react';
import * as cmpStyle from '../../components/product_display/sidebar/styles.module.scss';
import * as localCmpStyle from './styles.module.scss';

function Price({ searchPrice, setSearchPrice, setSearchPage }) {
  const prices = [100, 200, 300, 400];

  return (
    <section
      className={`${cmpStyle.starLayout} ${cmpStyle.priceBottomMargin} ${localCmpStyle.marginTop}`}>
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
                setSearchPage(1);
                setSearchPrice(item);
              }}>
              <p
                className={`${cmpStyle.brandLabel} ${
                  searchPrice === item && cmpStyle.priceLimitColor
                }`}>
                <i className="fa fa-chevron-right brand-visibility-margin"></i>$
                {item}
              </p>
            </button>
          </li>
        ))}
      </ul>

      {searchPrice !== null && (
        <button
          type="button"
          className={cmpStyle.clear}
          aria-label="Clear price filter"
          onClick={() => setSearchPrice(null)}>
          <i className="fa fa-chevron-left"></i> Clear Filter
        </button>
      )}
    </section>
  );
}

export default Price;
