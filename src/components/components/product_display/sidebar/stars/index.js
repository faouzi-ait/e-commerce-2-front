import React from 'react';
import Stars from '../../../stars';
import { useDispatch } from 'react-redux';
import { getRating, getPage } from '../../pagination/actions';
import * as cmpStyle from '../styles.module.scss';

function StarsFilter({ rating }) {
  const dispatch = useDispatch();

  const StarItems = ({ nb }) => {
    return (
      <li
        className={cmpStyle.starsStyles}
        onClick={() => {
          dispatch(getRating(`&ratings=${nb}`));
          getPage(0);
        }}>
        <Stars starrating={nb} />
        &nbsp;<span className={cmpStyle.starLabel}></span>
      </li>
    );
  };

  return (
    <div className={cmpStyle.starLayout}>
      <span className={cmpStyle.starTitle}>Customer Ratings &amp; Reviews</span>
      <ul className={cmpStyle.starStyling}>
        <StarItems nb={5} />
        <StarItems nb={4} />
        <StarItems nb={3} />
        <StarItems nb={2} />
        <StarItems nb={1} />
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
