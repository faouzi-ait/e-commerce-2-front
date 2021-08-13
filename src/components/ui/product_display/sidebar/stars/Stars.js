import React from 'react';
import { stars } from '../styles.module.scss';

function Stars({ starrating = 1 }) {
  const DisplayStars = () => {
    const emptystars = 5 - starrating;

    const generateStars = (star, img) => {
      return Array.from(Array(star), (e, i) => {
        return (
          <span key={i}>
            <img src={img} alt="empty" className={stars} />
          </span>
        );
      });
    };

    return (
      <>
        {generateStars(starrating, '/icons/star-full.png')}
        {generateStars(emptystars, '/icons/star-empty.png')}
      </>
    );
  };

  return <DisplayStars />;
}

export default Stars;
