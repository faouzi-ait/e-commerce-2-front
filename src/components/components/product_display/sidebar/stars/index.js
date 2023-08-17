import React from 'react';
import Stars from '../../../stars';

import { useDispatch } from 'react-redux';
import { getRating, getPage } from '../../pagination/actions';

import * as cmpStyle from '../styles.module.scss';

function StarsFilter({ rating }) {
  const dispatch = useDispatch();

  const StarItems = ({ nb, ariaLabel }) => {
    return (
      <button
        tabIndex={0}
        aria-label={ariaLabel}
        className={cmpStyle.starsStyles}
        onClick={() => {
          dispatch(getRating(`&ratings=${nb}`));
          getPage(0);
        }}>
        <Stars starrating={nb} />
      </button>
    );
  };

  return (
    <section className={cmpStyle.starLayout}>
      <section className={cmpStyle.starStyling}>
        <h4
          tabIndex={0}
          aria-label="Customer Ratings and Reviews"
          className={cmpStyle.starTitle}>
          Customer Ratings &amp; Reviews
        </h4>
        <StarItems nb={5} ariaLabel={`show products with 5 stars rating`} />
        <StarItems nb={4} ariaLabel={`show products with 4 stars rating`} />
        <StarItems nb={3} ariaLabel={`show products with 3 stars rating`} />
        <StarItems nb={2} ariaLabel={`show products with 2 stars rating`} />
        <StarItems nb={1} ariaLabel={`show products with 1 stars rating`} />
      </section>
      {rating && (
        <button
          type="button"
          className={cmpStyle.clear}
          aria-label="Clear star ratings"
          onClick={() => dispatch(getRating(''))}>
          <i className="fa fa-chevron-left"></i>
          {' '}Clear Filter
        </button>
      )}
    </section>
  );
}

export default StarsFilter;
