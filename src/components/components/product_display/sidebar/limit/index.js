import React from 'react';
import { useDispatch } from 'react-redux';
import SelectWrapper from '../../../../ui/select';
import { getLimit, getPage } from '../../pagination/actions';
import { limitSelectOptions, limitSelectStyles } from '../../../../../utils';
import { starLayout, starTitle } from '../styles.module.scss';

function Limit() {
  const dispatch = useDispatch();

  return (
    <section className={starLayout}>
      <h4
        tabIndex={0}
        aria-label="Number of Items per Page"
        className={starTitle}>
        Number of Items per Page
      </h4>
      <SelectWrapper
        options={limitSelectOptions}
        styles={limitSelectStyles}
        defaultValue={{ label: 'Select', value: null }}
        onChange={(e) => {
          dispatch(getLimit(e.value));
          dispatch(getPage(1));
        }}
      />
    </section>
  );
}

export default Limit;
