import React from 'react';
import Stars from './Stars';
import { useDispatch, useSelector } from 'react-redux';
import { getRating } from '../../pagination/actions';

import {
  starLayout,
  starStyling,
  starTitle,
  starLabel,
  clear,
} from '../styles.module.scss';

function StarsFilter() {
  const dispatch = useDispatch();
  const { rating } = useSelector((state) => state.search);

  const StarItems = ({ nb }) => {
    return (
      <li
        style={{ display: 'flex', cursor: 'pointer' }}
        onClick={() => dispatch(getRating(`&ratings[gt]=${nb}`))}>
        <Stars starrating={nb} />
        &nbsp;<span className={starLabel}>&amp; Up</span>
      </li>
    );
  };

  return (
    <div className={starLayout}>
      <span className={starTitle}>Avg. Customer Review</span>
      <ul className={starStyling}>
        <StarItems nb={1} />
        <StarItems nb={2} />
        <StarItems nb={3} />
        <StarItems nb={4} />
      </ul>
      {rating && (
        <div onClick={() => dispatch(getRating(''))} className={clear}>
          <i className="fa fa-chevron-left"></i> Clear Filter
        </div>
      )}
    </div>
  );
}

export default StarsFilter;
