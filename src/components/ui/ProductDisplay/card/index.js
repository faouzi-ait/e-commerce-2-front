import React from 'react';
import {} from './styles.module.scss';

function Card({ products, category }) {
  const { items } = products?.data;

  return (
    <div>
      {(items || []).map((item, i) => (
        <div key={i}>{item.quantity}</div>
      ))}
    </div>
  );
}

export default Card;
