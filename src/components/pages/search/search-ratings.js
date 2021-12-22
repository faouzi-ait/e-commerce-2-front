import React from 'react';
import Stars from '../../components/stars';

import * as localCmpStyle from './styles.module.scss';
import * as cmpStyle from '../../components/product_display/sidebar/styles.module.scss';

function StarsFilter({ rating, setStarRating }) {
  const StarItems = ({ nb }) => {
    return (
      <li
        style={{ display: 'flex', cursor: 'pointer' }}
        onClick={() => setStarRating(nb)}>
        <Stars starrating={nb} />
        &nbsp;<span className={cmpStyle.starLabel}></span>
      </li>
    );
  };

  return (
    <div className={`${cmpStyle.starLayout} ${localCmpStyle.marginTop}`}>
      <span className={cmpStyle.starTitle}>Customer Ratings &amp; Reviews</span>
      <ul style={{ marginLeft: '-4rem', marginTop: '0rem' }}>
        <StarItems nb={1} />
        <StarItems nb={2} />
        <StarItems nb={3} />
        <StarItems nb={4} />
        <StarItems nb={5} />
      </ul>
      {rating && (
        <div
          onClick={() => setStarRating(null)}
          className={`${cmpStyle.clear} ${localCmpStyle.marginTop} ${localCmpStyle.marginBottom}`}>
          <i className="fa fa-chevron-left"></i> Clear Filter
        </div>
      )}
    </div>
  );
}

export default StarsFilter;
