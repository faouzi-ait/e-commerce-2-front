import React from 'react';

import Row from '../../../components/product_display/row';

function Wishlist({ favorites }) {

  const obj = {
    data: {
      items: favorites,
    },
  };

  return (
    <div style={{ paddingTop: '1.35rem', paddingRight: '.8rem' }}>
      <Row products={obj} showDetails={false} />
    </div>
  );
}

export default Wishlist;
