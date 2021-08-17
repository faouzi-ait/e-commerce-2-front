import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';

import { getLimit, getPage } from '../../pagination/actions';
import { starLayout, starTitle } from '../styles.module.scss';

function Limit() {
  const dispatch = useDispatch();
  const { limit } = useSelector((state) => state.search);

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

  return (
    <div className={starLayout}>
      <span className={starTitle}>Number of Items per Page</span>
      <Select
        options={options}
        styles={styles}
        defaultValue={{ label: limit ? limit : 'Select...', value: limit }}
        onChange={(e) => {
          dispatch(getLimit(e.value));
          dispatch(getPage(1));
        }}
      />
    </div>
  );
}

export default Limit;
