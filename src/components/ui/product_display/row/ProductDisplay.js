import React from 'react';

function ProductDisplay({ isRow, openModal, item }) {
  return (
    <div className={`${isRow ? 'cardRowContainer' : 'rowContainer'}`}>
      <img
        src={item.photo}
        alt="product"
        className={`${isRow ? 'row-image' : 'image'}`}
      />
      <div className={`${isRow ? ' productCardDisplay' : 'productRowDisplay'}`}>
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
