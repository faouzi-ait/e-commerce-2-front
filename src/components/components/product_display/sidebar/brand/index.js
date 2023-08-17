import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getBrand, getPage } from '../../pagination/actions';
import * as cmpStyle from '../styles.module.scss';

function Brand({ brand, data }) {
  const dispatch = useDispatch();
  const [brands, setBrands] = useState(null);

  useEffect(() => {
    const list = data?.items?.map((item) => item.brand);
    const filteredList = [...new Set(list)];
    setBrands(filteredList);
  }, [data]);

  const brandFormat = brand?.split('=')[1];

  const DisplayBrands = () => {
    return (
      <ul className={cmpStyle.brandList}>
        {(brands || []).map((item) => (
          <li key={item} className="price-list-style">
            <button
              type="button"
              style={{ border: 0, background: 'none' }}
              onClick={(e) => {
                dispatch(getPage(0));
                dispatch(getBrand(`&brand=${item}`));
              }}>



              <i className="fa fa-chevron-right brand-visibility-margin"></i>
              <p
                className={`${cmpStyle.brandpDisplay} ${cmpStyle.brandLabel} ${
                  brandFormat === item && cmpStyle.priceLimitColor
                }`}>
                {item}
              </p>



            </button>
          </li>
        ))}
        {brand && (
          <button
            type="button"
            aria-label="Clear brand filter"
            onClick={() => dispatch(getBrand(''))}
            className={`${cmpStyle.clear} ${cmpStyle.clearMargin}`}>
            <i className="fa fa-chevron-left"></i> Clear Filter
          </button>
        )}
      </ul>
    );
  };

  return (
    <section className={cmpStyle.starLayout}>
      <h4
        tabIndex={0}
        aria-label="Filter by brand name"
        className={cmpStyle.starTitle}>
        Filter Products by Brand
      </h4>
      <DisplayBrands />
    </section>
  );
}

export default Brand;
