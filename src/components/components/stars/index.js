import React, { Fragment } from 'react';
import { stars } from './styles.module.scss';

function Stars({ starrating = 1, ...rest }) {
  const DisplayStars = () => {
    const emptystars = 5 - starrating;

    const generateStars = (star, img) => {
      return Array.from(Array(star), (e, i) => {
        return (
          <Fragment key={i}>
            <img src={img} alt={`${i} star`} className={stars} {...rest} />
          </Fragment>
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
