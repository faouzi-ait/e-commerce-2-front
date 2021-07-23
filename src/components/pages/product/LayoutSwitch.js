import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { switchLayout } from './actions';

import {
  viewSwitch,
  productCount,
  viewSwitchContainer,
} from './styles.module.scss';

function LayoutSwitch() {
  const dispatch = useDispatch();
  const { isRow, products } = useSelector((state) => state.products);
  const { totalNumberOfPages, currentPage } = products;
  const { items } = products.data;

  return (
    <div
      onClick={() => dispatch(switchLayout())}
      className={viewSwitchContainer}>
      <span className={viewSwitch}>
        Change View
        {!isRow ? (
          <i className="fa fa-bars" aria-hidden="true"></i>
        ) : (
          <i className="fa fa-columns" aria-hidden="true"></i>
        )}
      </span>
      <span className={productCount}>
        Showing {items?.length} Products | Page {currentPage} /{' '}
        {totalNumberOfPages}
      </span>
    </div>
  );
}

export default LayoutSwitch;
