import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../../../pages/product/actions';
import { getQuery } from '../../../ui/product_display/pagination/actions';
import Stars from './Stars';
import {
  starLayout,
  starStyling,
  starTitle,
  starLabel,
  clear,
} from './styles.module.scss';

function StarsFilter() {
  const dispatch = useDispatch();
  const { defaultUrl, query } = useSelector((state) => state.search);

  useEffect(() => {
    dispatch(getQuery(`${query}`));
    dispatch(getProducts(`${defaultUrl}${query}`));
  }, [query, defaultUrl, dispatch]);

  const StarItems = ({ nb }) => {
    return (
      <li
        style={{ display: 'flex', cursor: 'pointer' }}
        onClick={() => dispatch(getQuery(`&ratings[gt]=${nb}`))}>
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
      {query && (
        <div onClick={() => dispatch(getQuery(''))} className={clear}>
          <i className="fa fa-chevron-left"></i> Clear: {query.split('=')[1]}{' '}
          stars +
        </div>
      )}
    </div>
  );
}

export default StarsFilter;
