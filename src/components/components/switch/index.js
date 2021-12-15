import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { switchLayout } from '../../pages/product/actions';
import { productData } from '../../pages/product/selector';

import * as cmpStyle from './styles.module.scss';

function LayoutSwitch() {
  const dispatch = useDispatch();
  // const { isRow, products } = useSelector(productData);
  const { isRow, products } = useSelector(productData);
  // const { currentPage, totalNumberOfItems, startIndex, numberOfItemsPerPage } =
  //   products;

  const paginationItems = products;

  const recordCounts = () => {
    let str = '';
    const index = paginationItems?.startIndex === 0 ? 1 : paginationItems?.startIndex;
    const endIndex = paginationItems?.startIndex * paginationItems?.currentPage >= paginationItems?.totalNumberOfItems;

    if (!endIndex) {
      str = `Showing ${index} - ${
        paginationItems?.paginationItems?.currentPage
      } of ${paginationItems?.totalNumberOfItems} results`;
    } else {
      str = `Showing ${paginationItems?.totalNumberOfItems} of ${paginationItems?.totalNumberOfItems} results`;
    }

    return str;
  };

  return (
    <div className={cmpStyle.viewSwitchContainer}>
      <span
        className={cmpStyle.viewSwitch}
        onClick={() => dispatch(switchLayout())}>
        Change View
        {!isRow ? (
          <i className="fa fa-bars" aria-hidden="true"></i>
        ) : (
          <i className="fa fa-columns" aria-hidden="true"></i>
        )}
      </span>
      <span className={cmpStyle.productCount}>{recordCounts()}</span>
    </div>
  );
}

export default LayoutSwitch;
