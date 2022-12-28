import React from 'react';

function Advert({ image }) {
  return (
    <div className='advert-padding'>
      <img src={image} alt="banner" />
    </div>
  );
}

export default Advert;
