import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { switchLayout } from '../../pages/product/actions';
import { productData } from '../../pages/product/selector';

import * as cmpStyle from './styles.module.scss';

function LayoutSwitch() {
  const dispatch = useDispatch();
  const { isRow, products } = useSelector(productData);
  const paginationItems = products;

  const recordCounts = () => {
    let str = '';
    const index =
      paginationItems?.startIndex === 0 ? 1 : paginationItems?.startIndex;
    const endIndex =
      paginationItems?.startIndex * paginationItems?.currentPage >=
      paginationItems?.totalNumberOfItems;

    if (!endIndex) {
      str = `Showing ${index} - ${
        paginationItems?.numberOfItemsPerPage * paginationItems?.currentPage
      } of ${paginationItems?.totalNumberOfItems} results`;
    } else {
      str = `Showing ${paginationItems?.totalNumberOfItems} of ${paginationItems?.totalNumberOfItems} results`;
    }

    return str;
  };

  return (
    <div className={cmpStyle.viewSwitchContainer}>
      <>
        <button
          type="button"
          className={cmpStyle.viewSwitch}
          onClick={() => dispatch(switchLayout())}>
          Change View
          <i
            className={`fa fa-${!isRow ? 'bars' : 'columns'}`}
            aria-hidden="true"
          />
        </button>
        <span className={cmpStyle.productCount}>{recordCounts()}</span>
      </>
    </div>
  );
}

export default LayoutSwitch;
