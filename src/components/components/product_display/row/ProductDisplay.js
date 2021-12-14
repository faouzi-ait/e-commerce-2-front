import React from 'react';
import * as cmpStyle from './styles.module.scss';

function ProductDisplay({ isRow, openModal, item, setProductId }) {
  return (
    <div
      className={`${
        isRow ? cmpStyle.cardRowContainer : cmpStyle.rowContainer
      }`}>
      <img
        src={item.photo}
        alt="p"
        className={`${isRow ? cmpStyle.rowImage : cmpStyle.image}`}
      />
      <div
        className={`${
          isRow ? cmpStyle.productCardDisplay : cmpStyle.productRowDisplay
        }`}>
        <span>{item.brand}</span>
        <span>{item.description}</span>
        <span>Model: {item.name}</span>
        <span>Price: ${item.price}</span>
        <span>Quantity Available: {item.quantity}</span>
        <div onClick={() => setProductId(item._id)}>
          <button onClick={openModal}>
            View Product <i className="fa fa-eye"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDisplay;
