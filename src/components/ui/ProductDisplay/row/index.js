import React from 'react';
import Modal from '../../modal';
import {
  container,
  image,
  rowContainer,
  productRowDisplay,
} from './styles.module.scss';

function Row({ products, category }) {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const { items } = products?.data;

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

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
              <button onClick={openModal}>
                View Product <i className="fa fa-eye"></i>
              </button>
            </div>
          </div>
        </div>
      ))}
      <Modal modalIsOpen={modalIsOpen} closeModal={closeModal} />
    </div>
  );
}

export default Row;
