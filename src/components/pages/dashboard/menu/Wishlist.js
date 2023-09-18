import React from 'react';

import Row from '../../../components/product_display/row';

const Wishlist = ({ favorites }) => {
  const obj = {
    data: {
      items: favorites,
    },
  };

  return (
    <section style={{ paddingTop: '1.35rem', paddingRight: '.8rem' }}>
      <Row products={obj} showDetails={false} />
    </section>
  );
};

export default Wishlist;
