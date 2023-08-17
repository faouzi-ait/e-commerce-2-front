import React from 'react';
import SelectWrapper from '../../ui/select';
import { limitSelectOptions, limitSelectStyles } from '../../../utils';

import * as sideBarStyle from '../../components/product_display/sidebar/styles.module.scss';
import * as localCmpStyle from './styles.module.scss';

function SearchFilter({ setSearchPage, setSearchLimit }) {
  return (
    <section
      className={`${sideBarStyle.starLayout} ${localCmpStyle.marginBottom}`}>
      <h4
        tabIndex={0}
        aria-label="Number of Items per Page"
        style={{ fontWeight: 'bold', margin: '1rem 0 1rem 0' }}>
        Number of Items per Page
      </h4>
      <SelectWrapper
        options={limitSelectOptions}
        styles={limitSelectStyles}
        defaultValue={{ label: 'Select', value: null }}
        onChange={({ value }) => {
          setSearchPage(1);
          setSearchLimit(value);
        }}
      />
    </section>
  );
}

export default SearchFilter;
