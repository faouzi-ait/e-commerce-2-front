import React from 'react';
import {} from './styles.module.scss';

function Card({ products, category }) {
  const list = products?.data?.items;
  // console.log(items);
  return (
    <div>
      <div>Card</div>
      {(list || []).map((item) => (
        <div key={item.title}>{item.quantity}</div>
      ))}
    </div>
  );
}

export default Card;
