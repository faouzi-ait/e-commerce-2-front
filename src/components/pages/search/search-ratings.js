import React from 'react';
import Stars from '../../components/stars';

import * as localCmpStyle from './styles.module.scss';
import * as cmpStyle from '../../components/product_display/sidebar/styles.module.scss';

const StarsFilter = ({ rating, setStarRating, ariaLabel }) => {
  const StarItems = ({ nb }) => {
    return (
      <button
        type="button"
        tabIndex={0}
        aria-label={ariaLabel}
        style={{ display: 'flex', background: 'none', border: 0 }}
        onClick={() => setStarRating(nb)}>
        <Stars starrating={nb} />
      </button>
    );
  };

  return (
    <section className={`${cmpStyle.starLayout} ${localCmpStyle.marginTop}`}>
      <h4
        tabIndex={0}
        aria-label="Customer Ratings and Reviews"
        className={cmpStyle.starTitle}>
        Customer Ratings &amp; Reviews
      </h4>
      <ul className={cmpStyle.starsContainer}>
        <StarItems nb={5} ariaLabel={`show products with 5 stars rating`} />
        <StarItems nb={4} ariaLabel={`show products with 4 stars rating`} />
        <StarItems nb={3} ariaLabel={`show products with 3 stars rating`} />
        <StarItems nb={2} ariaLabel={`show products with 2 stars rating`} />
        <StarItems nb={1} ariaLabel={`show products with 1 stars rating`} />
      </ul>
      {rating && (
        <button
          type="button"
          aria-label="Clear star ratings"
          onClick={() => setStarRating(null)}
          className={`${cmpStyle.clear} ${localCmpStyle.marginTop} ${localCmpStyle.marginBottom}`}>
          <i className="fa fa-chevron-left"></i> Clear Filter
        </button>
      )}
    </section>
  );
};

export default StarsFilter;
