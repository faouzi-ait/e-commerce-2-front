import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { switchLayout } from './actions';

import { viewSwitch, productCount } from './styles.module.scss';

function LayoutSwitch({ products }) {
  const dispatch = useDispatch();
  const { isRow } = useSelector((state) => state.products);

  return (
    <div
      onClick={() => dispatch(switchLayout())}
      style={{
        alignItems: 'center',
        display: 'flex',
        height: '4.2rem',
        background: 'rgb(21, 25, 31)',
      }}>
      <span className={viewSwitch}>
        Change View
        {!isRow ? (
          <i className="fa fa-bars" aria-hidden="true"></i>
        ) : (
          <i className="fa fa-columns" aria-hidden="true"></i>
        )}
      </span>
      <span className={productCount}>Showing: {products?.data?.items?.length} Products</span>
    </div>
  );
}

export default LayoutSwitch;
