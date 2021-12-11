import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getBrand, getPage } from '../../pagination/actions';
import * as cmpStyle from '../styles.module.scss';

function Brand({ brand, data }) {
  const dispatch = useDispatch();
  const [brands, setBrands] = useState(null);

  useEffect(() => {
    const list = data.items.map((item) => item.brand);
    const filteredList = [...new Set(list)];
    setBrands(filteredList);
  }, [data]);

  const brandFormat = brand?.split('=')[1];

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
      <ul className={cmpStyle.brandList}>
        {(brands || []).map((item) => (
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
              } ${brandFormat === item && cmpStyle.priceLimitColor}`}>
              {item}
            </label>
          </li>
        ))}
        {brand && (
          <div
            onClick={() => dispatch(getBrand(''))}
            className={`${cmpStyle.clear} ${cmpStyle.clearMargin}`}>
            <i className="fa fa-chevron-left"></i> Clear Filter
          </div>
        )}
      </ul>
    );
  };

  return (
    <div className={cmpStyle.starLayout}>
      <span className={cmpStyle.starTitle}>Filter Products by Brand</span>
      <DisplayBrands />
    </div>
  );
}

export default Brand;
