import React from 'react';

import * as styles from './styles.module.scss';

const CartDisplay = ({ item }) => {
  return (
    <div className={styles.cartContentDisplay}>
      <img src={item.photo} alt="product" className="confirm-product" />
      <div style={{ fontSize: '1.25rem' }}>
        <div style={{ fontWeight: 'bold' }}>{item.description}</div>
        <div>
          Unit Price: ${item.price} | Quantity: {item.quantity}
        </div>
        <div>Total: ${item.price * item.quantity}</div>
      </div>
    </div>
  );
}

export default CartDisplay;