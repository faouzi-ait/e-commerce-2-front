import React, { useState, useEffect } from 'react';

import * as localCmpStyle from './styles.module.scss';
import * as cmpStyle from '../../components/product_display/sidebar/styles.module.scss';

function Brand({ searchBrand, setSearchBrand, data }) {
  const [brand, setBrand] = useState(null);

  useEffect(() => {
    const list = data?.items?.map((item) => item.brand);
    const filteredList = [...new Set(list)];
    setBrand(filteredList);
  }, [data]);

  const DisplayBrands = () => {
    return (
      <ul className={`${cmpStyle.brandList}`}>
        {(brand || []).map((item) => (
          <li
            key={item}
            className={`${cmpStyle.brandLabelDisplay} ${cmpStyle.brandLabel}`}>
            <button
              type="button"
              style={{ display: 'flex', border: 0, background: 'none' }}
              onClick={() => setSearchBrand(item)}>
              <i className="fa fa-chevron-right brand-visibility-margin"></i>

              <p
                className={`${cmpStyle.brandpDisplay} ${cmpStyle.brandLabel} ${
                  searchBrand === item && cmpStyle.priceLimitColor
                }`}>
                {item}
              </p>
            </button>
          </li>
        ))}
        {searchBrand && (
          <button
            type="button"
            aria-label="Clear brand filter"
            onClick={() => setSearchBrand(null)}
            className={`${cmpStyle.clear}`}>
            <i className="fa fa-chevron-left"></i> Clear Filter
          </button>
        )}
      </ul>
    );
  };

  return (
    <div className={cmpStyle.starLayout}>
      <h4
        tabIndex={0}
        aria-label="Filter by brand name"
        className={`${cmpStyle.starTitle} ${localCmpStyle.marginTop}`}>
        Filter Products by Brand
      </h4>
      <DisplayBrands />
    </div>
  );
}

export default Brand;
