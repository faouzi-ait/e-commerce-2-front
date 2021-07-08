import React from 'react';

function Advert({ image }) {
  return (
    <div style={{ padding: '1.5rem' }}>
      <img src={image} alt="banner" />
    </div>
  );
}

export default Advert;
