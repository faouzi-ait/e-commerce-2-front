import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { switchLayout } from './actions';
import { productData } from './selector';

import {
  viewSwitch,
  productCount,
  viewSwitchContainer,
} from './styles.module.scss';

function LayoutSwitch() {
  const dispatch = useDispatch();
  const { isRow, products } = useSelector(productData);
  const {
    currentPage,
    totalNumberOfItems,
    startIndex,
    numberOfItemsPerPage,
  } = products;

  const recordCounts = () => {
    let str = '';
    const index = startIndex === 0 ? 1 : startIndex;
    const endIndex = startIndex * currentPage >= totalNumberOfItems;

    if (!endIndex) {
      str = `Showing ${index} - ${numberOfItemsPerPage * currentPage} of ${totalNumberOfItems} results`;
    } else {
      str = `Showing ${totalNumberOfItems} of ${totalNumberOfItems} results`;
    }

    return str;
  };

  return (
    <div className={viewSwitchContainer}>
      <span className={viewSwitch} onClick={() => dispatch(switchLayout())}>
        Change View
        {!isRow ? (
          <i className="fa fa-bars" aria-hidden="true"></i>
        ) : (
          <i className="fa fa-columns" aria-hidden="true"></i>
        )}
      </span>
      <span className={productCount}>{recordCounts()}</span>
    </div>
  );
}

export default LayoutSwitch;
