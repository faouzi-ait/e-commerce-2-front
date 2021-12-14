import React from 'react';
import Stars from '../../../stars';
import { useDispatch } from 'react-redux';
import { getRating } from '../../pagination/actions';
import * as cmpStyle from '../styles.module.scss';

function StarsFilter({ rating }) {
  const dispatch = useDispatch();

  const StarItems = ({ nb }) => {
    return (
      <li
        style={{ display: 'flex', cursor: 'pointer' }}
        onClick={() => dispatch(getRating(`&ratings=${nb}`))}>
        <Stars starrating={nb} />
        &nbsp;<span className={cmpStyle.starLabel}></span>
      </li>
    );
  };

  return (
    <div className={cmpStyle.starLayout}>
      <span className={cmpStyle.starTitle}>Customer Ratings &amp; Reviews</span>
      <ul className={cmpStyle.starStyling}>
        <StarItems nb={1} />
        <StarItems nb={2} />
        <StarItems nb={3} />
        <StarItems nb={4} />
        <StarItems nb={5} />
      </ul>
      {rating && (
        <div onClick={() => dispatch(getRating(''))} className={cmpStyle.clear}>
          <i className="fa fa-chevron-left"></i> Clear Filter
        </div>
      )}
    </div>
  );
}

export default StarsFilter;
