import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../../../../pages/product/actions';
import { getRating } from '../../pagination/actions';
import Stars from './Stars';
import {
  starLayout,
  starStyling,
  starTitle,
  starLabel,
} from '../styles.module.scss';

function StarsFilter() {
  const dispatch = useDispatch();
  const { defaultUrl, rating, brand } = useSelector((state) => state.search);

  useEffect(() => {
    dispatch(getProducts(`${defaultUrl}${rating}${brand}`));
  }, [defaultUrl, rating, brand, dispatch]);

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
    </div>
  );
}

export default StarsFilter;
