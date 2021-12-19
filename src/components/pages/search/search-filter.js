import React from 'react';
import SelectWrapper from '../../ui/select';
import { limitSelectOptions, limitSelectStyles } from '../../../utils';

import * as sideBarStyle from '../../components/product_display/sidebar/styles.module.scss';

function SearchFilter({ setSearchPage, setSearchLimit }) {
  return (
    <div className={sideBarStyle.starLayout}>
      <span className={sideBarStyle.starTitle}>Number of Items per Page</span>
      <SelectWrapper
        options={limitSelectOptions}
        styles={limitSelectStyles}
        defaultValue={{ label: 'Select', value: null }}
        onChange={(e) => {
          setSearchPage(1);
          setSearchLimit(e.value);
        }}
      />
    </div>
  );
}

export default SearchFilter;
