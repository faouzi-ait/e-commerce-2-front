import React from 'react';
import {
  cardRowContainer,
  rowContainer,
  productCardDisplay,
  productRowDisplay,
  rowImage,
  image,
} from './styles.module.scss';

function ProductDisplay({ isRow, openModal, item }) {
  return (
    <div className={`${isRow ? cardRowContainer : rowContainer}`}>
      <img src={item.photo} alt="p" className={`${isRow ? rowImage : image}`} />
      <div className={`${isRow ? productCardDisplay : productRowDisplay}`}>
        <span>{item.brand}</span>
        <span>{item.description}</span>
        <span>Model: {item.name}</span>
        <span>Price: ${item.price}</span>
        <span>Quantity Available: {item.quantity}</span>
        <div>
          <button onClick={openModal}>
            View Product <i className="fa fa-eye"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDisplay;
