import React from 'react';
import {} from './styles.module.scss';

function Card({ products, category }) {
  const { items } = products.data;
  return (
    <div>
      <div>Card</div>
      {(items || []).map((item) => (
        <div>{item.quantity}</div>
      ))}
    </div>
  );
}

export default Card;
