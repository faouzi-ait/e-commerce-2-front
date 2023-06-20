import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getQuery } from '../../pagination/actions';

import { clear } from '../styles.module.scss';

function Clear() {
  const dispatch = useDispatch();
  const { query } = useSelector((state) => state?.search);

  return (
    <div>
      {query && (
        <div onClick={() => dispatch(getQuery(''))} className={clear}>
          <i className="fa fa-chevron-left"></i> Clear Filter
        </div>
      )}
    </div>
  );
}

export default Clear;
