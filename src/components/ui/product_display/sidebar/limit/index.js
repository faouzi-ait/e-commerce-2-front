import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Select from 'react-select';

import { getProducts } from '../../../../pages/product/actions';
import { getLimit } from '../../pagination/actions';
import {
  defaultUrl,
  filteredCategoryUrl /* queryUrl */,
} from '../../../../../utils';

import { starLayout, starTitle } from '../styles.module.scss';

function Limit() {
  const dispatch = useDispatch();
  const { limit, rating, brand, page } = useSelector((state) => state.search);

  const options = [
    { value: 10, label: '10' },
    { value: 15, label: '15' },
    { value: 20, label: '20' },
    { value: 25, label: '25' },
    { value: 30, label: '30' },
  ];

  const styles = {
    control: (base) => ({
      ...base,
      border: '1px solid #cecece',
      boxShadow: 'none',
      width: '10rem',
      height: 37.05,
    }),
    option: (provided, state) => ({
      ...provided,
      fontWeight: state.isSelected ? 'bold' : 'normal',
      fontSize: '1.3rem',
    }),
  };

  useEffect(() => {
    dispatch(getProducts(`${defaultUrl(page, limit)}${rating}${brand}`));
  }, [defaultUrl, dispatch, limit]);

  return (
    <div className={starLayout}>
      <span className={starTitle}>Number of Items</span>
      <Select
        options={options}
        styles={styles}
        defaultValue={{ label: 10, value: limit }}
        onChange={(e) => dispatch(getLimit(e.value))}
      />
    </div>
  );
}

export default Limit;
