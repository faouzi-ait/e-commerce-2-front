import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { switchLayout } from './actions';

import { viewSwitch, productCount } from './styles.module.scss';

function LayoutSwitch() {
  const dispatch = useDispatch();
  const { isRow } = useSelector((state) => state.products);
  const { items } = useSelector((state) => state.products.products.data);

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
          <i class="fa fa-bars" aria-hidden="true"></i>
        ) : (
          <i class="fa fa-columns" aria-hidden="true"></i>
        )}
      </span>
      <span className={productCount}>Showing: {items.length} Products</span>
    </div>
  );
}

export default LayoutSwitch;
