import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Select from 'react-select';

import { getProducts } from '../../../../pages/product/actions';
import { getLimit, /* getPage */ } from '../../pagination/actions';
import { defaultUrl } from '../../../../../utils';

import { starLayout, starTitle } from '../styles.module.scss';

function Limit() {
  const dispatch = useDispatch();
  const { limit, rating, brand, page } = useSelector((state) => state.search);

  const options = [
    { value: 5, label: '5' },
    { value: 10, label: '10' },
    { value: 15, label: '15' },
    { value: 20, label: '20' },
  ];

  const styles = {
    control: (base) => ({
      ...base,
      border: '1px solid #cecece',
      boxShadow: 'none',
      width: '10vw',
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
  }, [dispatch, limit, brand, page, rating]);

  return (
    <div className={starLayout}>
      <span className={starTitle}>Number of Items</span>
      <Select
        options={options}
        styles={styles}
        defaultValue={{ label: 'Select', value: null }}
        onChange={(e) => dispatch(getLimit(e.value))}
      />
    </div>
  );
}

export default Limit;
