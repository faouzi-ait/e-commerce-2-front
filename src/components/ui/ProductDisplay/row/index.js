import React from 'react';
import {
  container,
  image,
  rowContainer,
  productRowDisplay,
} from './styles.module.scss';

function index({ products, category }) {
  const { items } = products?.data;

  return (
    <div>
      <div className={container}>{category.category}</div>
      {(items || []).map((item) => (
        <div className={rowContainer} key={item._id}>
          <img src={item.photo} alt="product" className={image} />
          <div className={productRowDisplay}>
            <span>{item.brand}</span>
            <span>Description: {item.description}</span>
            <span>Model: {item.name}</span>
            <span>Price: ${item.price}</span>
            <span>Quantity Available: {item.quantity}</span>
            <div>
              <button>
                View Product <i className="fa fa-eye"></i>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default index;
