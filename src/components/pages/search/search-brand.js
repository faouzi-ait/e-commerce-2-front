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

  const handleChange = (e) => {
    let chks = document.getElementsByTagName('input');
    const selected = [];

    for (let i = 0; i < chks.length; i++) {
      if (chks[i].checked) {
        selected.push(chks[i].value);
      }
    }
    setSearchBrand(e.target.value);
  };

  const DisplayBrands = () => {
    return (
      <ul className={`${cmpStyle.brandList}`}>
        {(brand || []).map((item) => (
          <li
            key={item}
            className={`${cmpStyle.brandLabelDisplay} ${cmpStyle.brandLabel}`}>
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
              className={`${cmpStyle.brandLabelDisplay} ${
                cmpStyle.brandLabel
              } ${searchBrand === item && cmpStyle.priceLimitColor}`}>
              {item}
            </label>
          </li>
        ))}
        {searchBrand && (
          <div
            onClick={() => setSearchBrand(null)}
            className={`${cmpStyle.clear} ${cmpStyle.clearMargin}`}>
            <i className="fa fa-chevron-left"></i> Clear Filter
          </div>
        )}
      </ul>
    );
  };

  return (
    <div className={cmpStyle.starLayout}>
      <span className={`${cmpStyle.starTitle} ${localCmpStyle.marginTop}`}>
        Filter Products by Brand
      </span>
      <DisplayBrands />
    </div>
  );
}

export default Brand;
