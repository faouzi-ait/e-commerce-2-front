import React from 'react';
import StarsFilter from './stars';
import Brand from './brand';
import Limit from './limit';
import Clear from './clearing';

import { useSelector, useDispatch } from 'react-redux';
import { getRating, getBrand } from '../pagination/actions';

import { clear } from './styles.module.scss';

function Sidebar() {
  const dispatch = useDispatch();
  const { rating, brand } = useSelector((state) => state.search);

  return (
    <div>
      <Limit />
      <StarsFilter />

      {rating && (
        <div onClick={() => dispatch(getRating(''))} className={clear}>
          <i className="fa fa-chevron-left"></i> Clear Filter
        </div>
      )}

      <Brand />

      {brand && (
        <div onClick={() => dispatch(getBrand(''))} className={clear}>
          <i className="fa fa-chevron-left"></i> Clear Filter
        </div>
      )}
    </div>
  );
}

export default Sidebar;
