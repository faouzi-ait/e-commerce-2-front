import React from 'react';
import { useDispatch } from 'react-redux';
import SelectWrapper from '../../../../ui/select';
import { getLimit, getPage } from '../../pagination/actions';
import {
  limitSelectOptions,
  limitSelectStyles,
} from '../../../../../utils';
import { starLayout, starTitle } from '../styles.module.scss';

function Limit() {
  const dispatch = useDispatch();



  return (
    <div className={starLayout}>
      <span className={starTitle}>Number of Items per Page</span>
      <SelectWrapper
        options={limitSelectOptions}
        styles={limitSelectStyles}
        defaultValue={{ label: 'Select', value: null }}
        onChange={(e) => {
          dispatch(getLimit(e.value));
          dispatch(getPage(1));
        }}
      />
    </div>
  );
}

export default Limit;
